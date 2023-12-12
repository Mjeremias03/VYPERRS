import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footfixed from "../../components/footfixed/Footfixed";
import storage from "../../Storage/storage";
import Swal from "sweetalert2";
import axios from "axios";

import "./carrito.css";

export const Carrito = ({ 
  setCountHeartProducts, countHeartProducts, 
  setCountCartProducts, countCartProducts 
 }) => {

  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin

  let navigate = useNavigate();

  const [carroHeader, setCarroHeader] = useState([]);
  const [carroItems, setCarroItems] = useState([]);

  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [cupon, setCupon] = useState([]);

  /*
   * Leer todos los items del carro de compras
   */
  const allCarroItems = async () => {
    const header_id = storage.get("carroNumber");

    try {
      const response = await axios.get(endpoint + "/carroitems/" + header_id);

      setCarroItems(response.data);
      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Lee el encabezado del carro de compras
   */
  const allCarroHeaders = async () => {
    const header_id = storage.get("carroNumber");

    if (header_id > 0) {
      try {
        const response = await axios.get(
          endpoint + "/carroheader/" + header_id
        );

        setCarroHeader(response.data);
        return true;
      } catch (errors) {
        console.log(errors);
      }
    }
  };

  useEffect(() => {
    allCarroItems();
    allCarroHeaders();
  }, []);

  /*
   * Buscar cupon y verificar que existe
   */
  const buscarCupon = async (codigo) => {
    try {
      const response = await axios.post(endpoint + "/cupon/auxiliares", {
        accion: "EXIST",
        codigo: codigo,
      });

      setCuponAplicado(response.data.status);

      if (cuponAplicado) {
        setCupon(response.data.cupon);
      }

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  const createPreference = async () => {
    try {
      const response = await axios.post(endpoint + "/create_preference", {
        title: "Total de tus compras",
        price: carroHeader.total,
        quantity: 1,
        currency_id: "ARS",
      });

      console.log(response);

      storage.set("initPoint", response.data.response.init_point);

      return true;
    } catch (e) {
      console.log(e);
    }
  };

  const handlerMercadoPago = async () => {
    await createPreference();
  };

  const handlerCuponAplicar = async () => {
    const form = document.getElementById("formCupon");
    const formData = new FormData(form);

    await buscarCupon(formData.get("codigo"));

    if (cuponAplicado) {
      const fecha = new Date();
      const hoy =
        fecha.getFullYear().toString() +
        (fecha.getMonth() + 1).toString() +
        fecha.getDate().toString();

      if (hoy > cupon.vencimiento) {
        handlerMessage("El cupón se encuentra vencido!");
      }

      /**
       * Obtenemos los datos del header del carro de compras, para
       * actualizar sus valores
       */
      const carroheader = await axios.get(
        endpoint + "/carroheader/" + storage.get("carroNumber")
      );

      let descuento = 0;

      if (cupon.pje > 0) {
        descuento = (carroheader.data.subtotal * cupon.pje) / 100;
      } else {
        descuento = cupon.importe;
      }

      let total =
        carroheader.data.subtotal - descuento - carroheader.data.envio;

      /**
       * Actualiza el header del carro de compras
       */
      await axios.put(endpoint + "/carroheader/" + storage.get("carroNumber"), {
        cupon_id: cupon.id,
        vencimiento: cupon.vencimiento,
        anoVenc: cupon.anoVenc,
        mesVenc: cupon.mesVenc,
        diaVenc: cupon.diaVenc,
        codigo: cupon.codigo,
        nombreCupon: cupon.nombre,
        importe: cupon.importe,
        pje: cupon.pje,
        veces: 1,
        descuento: descuento,
        total: total,
      });

      handlerMessage(
        "El cupón de descuento, ya ha sido asignado a esta compra, puede ver su descuento, en este momento"
      );

      navigate("/carrito");
    } else {
      handlerMessage(
        "El cupón no existe con el código informado, verifique por favor!"
      );
    }
  };

  /*
   * Borrar o Eliminar item del carro de compras
   */
  const handlerDelete = async (id) => {
    try {
      /**
       * Eliminamos el item del carro de compras
       */
      await axios.delete(endpoint + "/carroitem/" + id);

      /**
       * Obtenemos el nuevo total de los items restantes
       * del carro de compras
       */
      const nuevoTotal = await axios.post(endpoint + "/carroitem/totales", {
        header_id: storage.get("carroNumber"),
        accion: "SUM",
      });

      /**
       * Obtenemos los datos del header del carro de compras, para
       * actualizar sus valores
       */
      const carroheader = await axios.get(
        endpoint + "/carroheader/" + storage.get("carroNumber")
      );

      let subtotal = parseInt(nuevoTotal.data.total);
      let total =
        subtotal - carroheader.data.descuento - carroheader.data.envio;

      /**
       * Actualiza el header del carro de compras
       */
      await axios.put(endpoint + "/carroheader/" + storage.get("carroNumber"), {
        subtotal: subtotal,
        total: total,
      });

      /**
       * Obtenemos cuantos items pueden seguir quedando
       * asociados al carro de compras.
       * En caso de que no quede ninguno, se eliminará
       * la cabecera del carro de compras
       */
      const cuantos = await axios.post(endpoint + "/carroitem/totales", {
        accion: "COUNT",
        header_id: storage.get("carroNumber"),
      });

      setCountCartProducts(countCartProducts - 1);

      if (parseInt(cuantos.data.total) === 0) {
        await axios.delete(
          endpoint + "/carroheader/" + storage.get("carroNumber")
        );

        storage.set("carroNumber", 0);

        handlerMessage(
          "El item del carro de compras, se ha eliminado con éxito!"
        );

        allCarroItems();

        navigate("/carrito");
      } else {
        handlerMessage(
          "El item del carro de compras, se ha eliminado con éxito!"
        );

        allCarroHeaders();
        allCarroItems();

        navigate("/carrito");
      }
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * SWAL: MESSAGE -> manejo con Swal
   */
  const handlerMessage = async (text) => {
    Swal.fire({
      icon: "success",
      text: text,
    });
  };

  /*
   * SWAL: MESSAGE -> manejo con Swal
   */
  const handlerAdvertencia = async (text) => {
    Swal.fire({
      icon: "warning",
      text: text,
    });
  };

  /*
   * RESTAR cantidad a un item del carro de compras
   */
  const handlerMinus = async (id) => {
    try {
      /**
       * Obtengo el header del carro de compras
       */
      const carroheader = await axios.get(
        endpoint + "/carroheader/" + storage.get("carroNumber")
      );

      /**
       * Obtengo el item del carro de compras que se modificará
       * la cantidad
       */
      const carroitem = await axios.get(endpoint + "/carroitem/" + id);

      /**
       * Continúa el proceso si la cantidad es mayor a 1
       */
      if (carroitem.data.cantidad > 1) {
        let wcantidad = carroitem.data.cantidad - 1;
        let wsubtotal = carroitem.data.precio * wcantidad;

        /**
         * Actualizo los valores en el item del carro de compras
         */
        await axios.put(endpoint + "/carroitem/" + id, {
          cantidad: wcantidad,
          subtotal: wsubtotal,
        });

        /**
         * Obtengo la nueva valorización de la compra
         */
        const response = await axios.post(endpoint + "/carroitem/totales", {
          accion: "SUM",
          header_id: storage.get("carroNumber"),
        });

        let total =
          response.data.total -
          carroheader.data.descuento -
          carroheader.data.envio;

        let subtotal = response.data.total;

        /**
         * Actualizamos todos los valores globales en el header
         * del carro de compras
         */
        await axios.put(
          endpoint + "/carroheader/" + storage.get("carroNumber"),
          {
            subtotal: subtotal,
            total: total,
          }
        );

        handlerMessage(
          "Se ha actualizado la cantidad y todos los valores de su carro de compras!"
        );
      } else {
        handlerAdvertencia(
          "No puede usted reducir más la cantidad, en este momento esta en 1 !"
        );
      }

      allCarroHeaders();
      allCarroItems();

      navigate("/carrito");
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * SUMAR cantidad a un item del carro de compras
   */
  const handlerPlus = async (id) => {
    try {
      /**
       * Obtengo el header del carro de compras
       */
      const carroheader = await axios.get(
        endpoint + "/carroheader/" + storage.get("carroNumber")
      );

      /**
       * Obtengo el item del carro de compras que se modificará
       * la cantidad
       */
      const carroitem = await axios.get(endpoint + "/carroitem/" + id);

      let wcantidad = carroitem.data.cantidad + 1;
      let wsubtotal = carroitem.data.precio * wcantidad;

      /**
       * Actualizo los valores en el item del carro de compras
       */
      await axios.put(endpoint + "/carroitem/" + id, {
        cantidad: wcantidad,
        subtotal: wsubtotal,
      });

      /**
       * Obtengo la nueva valorización de la compra
       */
      const response = await axios.post(endpoint + "/carroitem/totales", {
        accion: "SUM",
        header_id: storage.get("carroNumber"),
      });

      let total =
        response.data.total -
        carroheader.data.descuento -
        carroheader.data.envio;

      let subtotal = response.data.total;

      /**
       * Actualizamos todos los valores globales en el header
       * del carro de compras
       */
      await axios.put(endpoint + "/carroheader/" + storage.get("carroNumber"), {
        subtotal: subtotal,
        total: total,
      });

      handlerMessage(
        "Se ha actualizado la cantidad y todos los valores de su carro de compras!"
      );

      allCarroHeaders();
      allCarroItems();

      navigate("/carrito");
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <section className="container">
        <h3 className="title">tus compras</h3>

        {storage.get("carroNumber") === 0 ? (
          <>
            <div className="container no-hay-items-carro">
              <h3 className="title">
                En este momento su carro de compras, no tiene ningún producto
                seleccionado.
              </h3>
            </div>
          </>
        ) : (
          <>
            <div className="carro-flex">
              <div className="products">
                {carroItems.map((item, i) => (
                  <div key={i} className="box">
                    <div className="eliminar__box--carro">
                      <img
                        onClick={() => handlerDelete(item.id)}
                        src="public/images/icon-close.svg"
                        alt="close"
                      />
                    </div>
                    <div className="imagen">
                      <img
                        src={`${url_images}${item.imagen1}`}
                        width="400"
                        alt="i1"
                      />
                    </div>
                    <div className="carro__product">
                      <p>{item.nombre}</p>
                    </div>
                    <div className="carro__price">
                      <p>${item.precio}</p>
                    </div>
                    <div className="details__product-quantity">
                      <div className="input">
                        <img
                          onClick={() => handlerMinus(item.id)}
                          className="input__minus"
                          src="public/images/icon-minus.svg"
                          alt="minus"
                        />
                        <input
                          className="input__number"
                          type="text"
                          value={item.cantidad}
                          readOnly
                        />
                        <img
                          onClick={() => handlerPlus(item.id)}
                          className="input__plus"
                          src="public/images/icon-plus.svg"
                          alt="plus"
                        />
                      </div>
                    </div>
                    <div className="carro__subtotal">
                      <p>${item.subtotal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div className="cupon">
                  <h3 className="title">cupón de descuento</h3>
                  <form id="formCupon">
                    <div className="mb-3">
                      <label className="form-label">
                        Ingresa tu Código de Descuento
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="codigo"
                      />
                    </div>
                    <Link
                      to="/carrito"
                      onClick={() => handlerCuponAplicar()}
                      className="boton-cupon --button"
                    >
                      Aplicar
                    </Link>
                  </form>
                </div>
              </div>

              <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
                <div className="totales">
                  <h3 className="title">totales</h3>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td className="orientacion">${carroHeader.subtotal}</td>
                      </tr>
                      <tr>
                        {storage.get("carroNumber") === 0 ? (
                          <td>Descuento:</td>
                        ) : carroHeader.cupon_id === 0 ? (
                          <td>Descuento:</td>
                        ) : (
                          <td>Descuento ( {carroHeader.pje}% ) :</td>
                        )}
                        <td className="orientacion">
                          ${carroHeader.descuento}
                        </td>
                      </tr>
                      <tr>
                        <td>Envío:</td>
                        <td className="orientacion">${carroHeader.envio}</td>
                      </tr>
                      <tr>
                        <td>Total:</td>
                        <td className="orientacion">${carroHeader.total}</td>
                      </tr>
                    </tbody>
                  </table>

                  <Link
                    onClick={handlerMercadoPago}
                    to="/checkout"
                    className="--button"
                  >
                    CHECKOUT
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="areaMenuDesktop"></div>
      </section>

      <Footfixed />
    </>
  );
}
