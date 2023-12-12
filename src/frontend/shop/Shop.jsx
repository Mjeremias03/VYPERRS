import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import storage from "../../Storage/storage";
import Footfixed from "../../components/footfixed/Footfixed";
import { Review } from "../review/Review";
import Swal from "sweetalert2";
import axios from "axios";

import "./shop.css";

export const Shop = ({ 
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

  const [categories, setCategories] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [products, setProducts] = useState([]);

  const [showFilter, setShowFilter] = useState(true);
  const showFilterRef = useRef();
  const showModalRef = useRef();

  /*
   * Leer todas las categorías
   */
  const allCategories = async () => {
    try {
      const response = await axios.get(endpoint + "/categories");

      setCategories(response.data);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todas los grupos
   */
  const allGrupos = async () => {
    try {
      const response = await axios.get(endpoint + "/grupos");

      setGrupos(response.data);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todas las marcas
   */
  const allMarcas = async () => {
    try {
      const response = await axios.get(endpoint + "/marcas");

      setMarcas(response.data);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todos los productos
   */
  const allProducts = async () => {
    try {
      const response = await axios.get(
        endpoint + "/product/filter/"+ "filtros" +"/inicio/"+ 0 +"/filas/"+ 50 +"/category/"+ storage.get("shop-filter-category-id") +"/grupo/"+ storage.get("shop-filter-grupo-id") +"/marca/"+ storage.get("shop-filter-marca-id")
      );

      setProducts(response.data.rows);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    allCategories();
    allGrupos();
    allMarcas();
    allProducts();
  }, []);

  const handlerShopFilter = () => {
    if (showFilter) {
      showModalRef.current.style.display = "block";
      showFilterRef.current.style.left = "0";
      setShowFilter(false);
    } else {
      showModalRef.current.style.display = "none";
      showFilterRef.current.style.left = "-405px";
      setShowFilter(true);
    }
  };

  const handlerSelectedItem = (id, name, slug, tab) => {
    if (tab === 1) {
      storage.set("shop-filter-category-slug", slug);
      storage.set("shop-filter-category-name", name);
      storage.set("shop-filter-category-id", id);
    }

    if (tab === 2) {
      storage.set("shop-filter-grupo-slug", slug);
      storage.set("shop-filter-grupo-name", name);
      storage.set("shop-filter-grupo-id", id);
    }

    if (tab === 3) {
      storage.set("shop-filter-marca-slug", slug);
      storage.set("shop-filter-marca-name", name);
      storage.set("shop-filter-marca-id", id);
    }

    handlerShopFilter();

    allProducts();
  };

  const handlerSelectedItemBorrar = (tab) => {
    if (tab === 1) {
      storage.set("shop-filter-category-slug", "");
      storage.set("shop-filter-category-name", "");
      storage.set("shop-filter-category-id", 0);
    }

    if (tab === 2) {
      storage.set("shop-filter-grupo-slug", "");
      storage.set("shop-filter-grupo-name", "");
      storage.set("shop-filter-grupo-id", 0);
    }

    if (tab === 3) {
      storage.set("shop-filter-marca-slug", "");
      storage.set("shop-filter-marca-name", "");
      storage.set("shop-filter-marca-id", 0);
    }

    handlerShopFilter();

    allProducts();
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
   * Agrego un producto entre los favoritos
   */
  const handlerAddFavorito = async (product_id) => {
    try {
      await axios.post(endpoint + "/favorito", {
        comprador_id: storage.get("authUserId"),
        product_id: product_id,
      });

      setCountHeartProducts(countHeartProducts + 1);

      handlerMessage(
        "Se ha agregado su producto, en sus favoritos!"
      );

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Crear cabecera del carro de compras en caso de que la variable local
   * "carroNumber", no exista o se encuentre en cero
   */
  const handlerAddCart = async (product_id, listPrecio) => {
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
    await createCarroItem(storage.get("carroNumber"), product_id, listPrecio);

    /**
     * Calcula los totales del carro de compras
     */
    await totalCarro(storage.get("carroNumber"));
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
  const totalCarro = async (header_id) => {
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
        accion: "SUM",
        header_id: header_id,
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

      handlerMessage(
        "Se ha agregado su producto elegido, a su carro de compras!"
      );

      setCountCartProducts(countCartProducts + 1);

    } catch (errors) {
      console.log(errors);
    }
  };

  /**
   * Función llamada desde el ícono eye, para ir a la página de
   * revisión del producto
   */
  const handlerReview = (id) => {

    storage.set("review_id", id);

    <Review />

    navigate("/review");

  }

  return (
    <>
      <section className="container-fluid">
        <div className="shop-pageModal" ref={showModalRef}></div>

        <div className="shop-filter" ref={showFilterRef}>
          <div className="contenedor-cierre">
            <img
              onClick={() => handlerShopFilter()}
              src="public/images/close.svg"
              alt="close"
            />
          </div>
          <div className="box">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item" style={{background: "#000"}}>
                <h2 className="accordion-header" id="flush-headingUno">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseUno"
                    aria-expanded="false"
                    aria-controls="flush-collapseUno"
                    style={{
                      background: "#000", 
                      color: "#FFF",
                      border: "none"
                    }}
                  >
                    Filtros Actuales
                  </button>
                </h2>

                <div
                  id="flush-collapseUno"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingUno"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>
                      <Link
                          onClick={() => handlerSelectedItemBorrar(1)}
                          className="borrar-flex"
                          style={{color: "#FFF"}}
                          to="/shop"
                        >
                          {storage.get("shop-filter-category-name")}
                          {storage.get("shop-filter-category-id") > 0 ? (
                            <span>
                              <img src="public/images/close.svg" alt="x" />
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </Link>
                        <Link
                          onClick={() => handlerSelectedItemBorrar(2)}
                          className="borrar-flex"
                          to="/shop"
                        >
                          {storage.get("shop-filter-grupo-name")}
                          {storage.get("shop-filter-grupo-id") > 0 ? (
                            <span>
                              <img src="public/images/close.svg" alt="x" />
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </Link>
                        <Link
                          onClick={() => handlerSelectedItemBorrar(3)}
                          className="borrar-flex"
                          style={{color: "#FFF"}}
                          to="/shop"
                        >
                          {storage.get("shop-filter-marca-name")}
                          {storage.get("shop-filter-marca-id") > 0 ? (
                            <span>
                              <img src="public/images/close.svg" alt="x" />
                            </span>
                          ) : (
                            <span></span>
                          )}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item" style={{background: "#000"}}>
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                    style={{
                      background: "#000", 
                      color: "#FFF",
                      border: "none",
                      outline: "none"
                    }}
                  >
                    Categorías
                  </button>
                </h2>

                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <ul>
                      {categories.map((item, i) => (
                        <li key={i}>
                          <Link
                            onClick={() =>
                              handlerSelectedItem(
                                item.id,
                                item.name,
                                item.slug,
                                1
                              )
                            }
                            style={{color: "#FFF"}}
                            to="/shop"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item" style={{background: "#000"}}>
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                    style={{
                      background: "#000", 
                      color: "#FFF",
                      border: "none",
                      outline: "none"
                    }}
                  >
                    Grupos
                  </button>
                </h2>

                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <ul>
                      {grupos.map((item, i) => (
                        <li key={i}>
                          <Link
                            onClick={() =>
                              handlerSelectedItem(
                                item.id,
                                item.name,
                                item.slug,
                                2
                              )
                            }
                            style={{color: "#FFF"}}
                            to="/shop"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item" style={{background: "#000"}}>
                <h2 className="accordion-header" id="flush-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                    style={{
                      background: "#000", 
                      color: "#FFF",
                      border: "none",
                      outline: "none"
                    }}
                  >
                    Marcas
                  </button>
                </h2>

                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="flush-headingThree"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <ul>
                      {marcas.map((item, i) => (
                        <li key={i}>
                          <Link
                            onClick={() =>
                              handlerSelectedItem(
                                item.id,
                                item.name,
                                item.slug,
                                3
                              )
                            }
                            style={{color: "#FFF"}}
                            to="/shop"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 className="title">tienda</h3>

        <div className="shop-line-command">
          <div className="shop-line-command-izq">
            <Link
              onClick={() => handlerShopFilter()} 
              className="btn btn-secondary"
              style={{width: "200px"}}
              to = "/shop"
            >
              Show filtros
            </Link>
          </div>
          <div className="shop-line-command-der"></div>
        </div>

        <div className="shop-flex">
          <div className="row">
            {products.map((item, i) => (
              <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                <div className="box">
                  <div className="ribon">
                    <h3>{item.grupo_name}</h3>
                  </div>
                  <div className="imagen">
                    <img
                      src={`${url_images}${item.imagen1}`}
                      width="400"
                      alt="i1"
                    />
                  </div>
                  <div className="coment">
                    <h5>{item.nombre}</h5>
                    <p>
                      ${item.listPrecio} - <del>${item.precio2}</del>
                    </p>
                  </div>
                  <div className="overlay">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      onClick={() => handlerAddFavorito(item.id)}
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      onClick={() => handlerAddCart(item.id, item.listPrecio)}
                      className="bi bi-basket-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.071 1.243a.5.5 0 0 1 .858.514L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 6h1.717L5.07 1.243zM3.5 10.5a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3zm2.5 0a.5.5 0 1 0-1 0v3a.5.5 0 0 0 1 0v-3z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      onClick={() => handlerReview(item.id)}
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                    </svg>
                  </div>
                </div>
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
