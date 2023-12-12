import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footfixed from "../../components/footfixed/Footfixed";
import storage from "../../Storage/storage";
import Swal from "sweetalert2";
import axios from "axios";

import './favoritos.css';

export const Favoritos = ({ 
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

  const [favoritos, setFavoritos] = useState([]);
  
  let navigate = useNavigate();

  /*
   * Obtener todos los favoritos de un comprador determinado
   */
  const allFavoritos = async () => {
    
    const comprador_id = storage.get("authUserId");

    try {
      const response = await axios.get(endpoint + "/favoritos/" + comprador_id);

      setFavoritos(response.data);
      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    allFavoritos();
  }, []);
  
  /*
   * Borrar o Eliminar favorito
   */
  const handlerDelete = async (id) => {
    try {
      await axios.delete(endpoint + "/favorito/" + id);

      handlerMessage("Se ha eliminado el favorito con éxito!");

      setCountHeartProducts(countHeartProducts - 1);

      allFavoritos();

      navigate('/favoritos');

    } catch (errors) {
      console.log(errors);
    }
  }
  
  /*
   * SWAL: MESSAGE -> manejo con Swal
   */
  const handlerMessage = async (text) => {
    Swal.fire({
      icon: 'success',
      text: text
    });
  }

  /*
   * Crear cabecera del carro de compras en caso de que la variable local
   * "carroNumber", no exista o se encuentre en cero
   */
  const handlerAddCart = async (favorito_id, product_id, listPrecio) => {

    let header_id = 0;

    if (storage.get("carroNumber") === null) {

      header_id = await createHeaderEmpty();

      storage.set("carroNumber", header_id);

    } else {

      if (storage.get("carroNumber") === 0) {

        header_id = await createHeaderEmpty();

        storage.set("carroNumber", header_id);

      }

    }

    /*
     * Agrega el items al carro de compras
     */
    await createCarroItem(storage.get("carroNumber"), product_id, listPrecio, favorito_id);

    /**
     * Calcula los totales del carro de compras
     */
    await totalCarro(storage.get("carroNumber"), favorito_id);
  };

  /*
   * Acá crea otra cabecera del carro de compras, para luego comenzar
   * a cargar los items. Devuelve el numero o id del carro
   * creado
   */
  const createHeaderEmpty = async () => {
    try {
      const response = await axios.post(endpoint + "/carroheader", {
        estado: 0,
        cupon_id: 0,
        anoVenc: 0,
        mesVenc: 0,
        diaVenc: 0,
        importe: 0,
        pje: 0,
        veces: 0,
        subtotal: 0,
        descuento: 0,
        envio: 0,
        total: 0,
        user_id: storage.get("authUserId"),
        rol: storage.get("authUser").rol,
      });
      return response.data.carroHeader[0].id;
    } catch (errors) {
      console.log(errors);
    }
  };

  /**
   * Crea el item del carro de compras, con el producto
   * elejido por el usuario
   */
  const createCarroItem = async (header_id, product_id, listPrecio) => {
    try {
      const response = await axios.post(endpoint + "/carroitem", {
        product_id: product_id,
        header_id: header_id,
        precio: listPrecio,
        cantidad: 1,
        subtotal: listPrecio,
      });
      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * leer todos los items del carro de compras, hacer
   * los cálculos de los totales y
   * actualizar la cabecera
   */
  const totalCarro = async (header_id, favorito_id) => {
    try {
      /**
       * Lee todos los items del carro de compras y calcula
       * el total de toda la compra
       * Accion: significa que al pasar el parámetro en "SUM",
       * va a sumar el total de cada item del
       * carro de compras.
       * Si la acción dice: "COUNT", en ese caso, va a 
       * devolver la cantidad de items
       * del carro de compras
       */
      const carroitems = await axios.post(endpoint + "/carroitem/totales", {
        accion: "SUM", header_id: header_id,
      });

      let subtotal = parseInt(carroitems.data.total);

      /**
       * Lee el encabezado del carro de compras
       */
      const carroheader = await axios.get(
        endpoint + "/carroheader/" + header_id
      );

      let total =
        subtotal - carroheader.data.descuento - carroheader.data.envio;

      /**
       * Actualiza los datos recalculados en la cabecera
       * del carro de compras
       */
      const response = await axios.put(endpoint + "/carroheader/" + header_id, {
        subtotal: subtotal,
        total: total,
      });

      handlerMessage("Se ha agregado su favorito elegido, a su carro de compras!");

      setCountHeartProducts(countHeartProducts - 1);
      setCountCartProducts(countCartProducts + 1);

      /**
       * Elimino el favorito ya que fué agregado al carro de compras
       */
      await axios.delete(endpoint + "/favorito/" + favorito_id);

      allFavoritos();

      navigate('/favoritos');

    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <>
      <section className="container">
        <h3 className="title">tus favoritos</h3>

        <div className="favorito-flex">
          <div className="products">
            {favoritos.map((item, i) => (
              <div key={i} className="box">
                <div className="eliminar__box--favorito">
                  <img 
                    onClick={() => handlerDelete(item.id)}
                    src="public/images/close-negro.svg" 
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
                <div className="favorito__product">
                  <p>{item.nombre}</p>
                </div>
                <div className="favorito__price">
                  <p>${item.listPrecio}</p>
                </div>
                <Link 
                    onClick={() => handlerAddCart(item.id, item.product_id, item.listPrecio)}
                    to="/favoritos" 
                    className="--button button-addFavorito">
                  Agregar Carrito
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="areaMenuDesktop"></div>

      </section>

      <Footfixed />
    </>
  );
}
