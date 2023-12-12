import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footfixed from "../../components/footfixed/Footfixed";
import storage from "../../Storage/storage";
import { Review } from "../review/Review";
import Swal from "sweetalert2";
import axios from "axios";
import { FaShoppingBag,FaEye } from "react-icons/fa";
import "./inicio.css";
import { Tb12Hours, Tb24Hours, TbClockHour8 } from "react-icons/tb";
/* Jeremias */
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Subscribe from "../Suscribite/Subscribed";
import Footer from "../footer/footer";
import { TbTruckDelivery } from "react-icons/tb";
import { FiPackage } from "react-icons/fi";
import { CiCreditCard1 } from "react-icons/ci";
import ImagenesRopa from "../ImagenesRopa/ImagenesRopa";

export const Inicio = ({
  setCountHeartProducts,
  countHeartProducts,
  setCountCartProducts,
  countCartProducts,
}) => {
  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin

  let navigate = useNavigate();

  const showBackgroundRef = useRef();
  const showPreviewRef = useRef();

  const [productsDestacados, setProductsDestacados] = useState([]);
  const [productsMasVendidos, setProductsMasVendidos] = useState([]);
  const [productsEnPromocion, setProductsEnPromocion] = useState([]);
  const [products, setProducts] = useState([]);

  const [product, setProduct] = useState([]);

  const [marcas, setMarcas] = useState([]);

  const [preview, setPreview] = useState(false);

  /*
   * Recupera el número del carro de compras, siempre y cuando el carro no haya sido
   * comprado(estado = 0), para aquellos usuarios que estan logeados.
   */
  const hayCarroPendiente = async () => {
    try {
      const response = await axios.post(endpoint + "/carroheader/totales", {
        accion: "USU",
        user_id: storage.get("authUserId"),
      });

      if (response.data.status === true) {
        storage.set("carroNumber", parseInt(response.data.numero));
      }

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todos los productos
   */
  const productos = async () => {
    try {
      const response = await axios.get(endpoint + "/product/filter/grupos/1");

      setProducts(response.data.rows);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todos los productos destacados
   */
  const productosDestacados = async () => {
    try {
      const response = await axios.get(endpoint + "/product/filter/grupos/2");

      setProductsDestacados(response.data.rows);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todos los productos vendidos
   */
  const productosMasVendidos = async () => {
    try {
      const response = await axios.get(endpoint + "/product/filter/grupos/3");

      setProductsMasVendidos(response.data.rows);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todos los productos en promocion
   */
  const productosEnPromocion = async () => {
    try {
      const response = await axios.get(endpoint + "/product/filter/grupos/4");

      setProductsEnPromocion(response.data.rows);
      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer un producto
   */
  const oneProduct = async (id) => {
    try {
      const response = await axios.get(endpoint + "/product/" + id);

      setProduct(response.data);
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

  useEffect(() => {
    hayCarroPendiente();
    /* 
    productosDestacados();
    productosMasVendidos();
    productosEnPromocion();
 */
    productos();
    allMarcas();
  }, []);

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

      handlerMessage("Se ha agregado un nuevo producto, a sus favoritos!");

      setCountHeartProducts(countHeartProducts + 1);

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

  /*
   * Obtener información del producto seleccionado
   */
  const handlerSelected = async (id) => {
    await oneProduct(id);

    if (!preview) {
      showBackgroundRef.current.style.display = "block";
      showPreviewRef.current.style.display = "block";
      setPreview(true);
    } else {
      showBackgroundRef.current.style.display = "none";
      showPreviewRef.current.style.display = "none";
      setPreview(false);
    }
  };

  /*
   * Cierre del zoom del producto
   */
  const handlerCerrarZoom = async () => {
    showBackgroundRef.current.style.display = "none";
    showPreviewRef.current.style.display = "none";
    setPreview(false);
  };

  /**
   * Función llamada desde el ícono eye, para ir a la página de
   * revisión del producto
   */
  const handlerReview = (id) => {
    storage.set("review_id", id);

    <Review />;

    navigate("/review");
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={false}
        centeredSlides={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => ""}
        className="w-full h-full mt-20 rela"
        autoplay={{ delay: 9000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <div className="relative h-full">
            <img
              className="w-full h-full object-cover object-center"
              src="/kongo.webp"
              alt="11"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full">
            <img
              className="w-full h-full object-cover object-center"
              src="/kongo.webp"
              alt="11"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <section className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-4 h-full p-7 mt-0 w-[90%] mx-auto bg-black">
        <div className="flex items-center mb-3 md:mb-0 mx-auto">
          <TbTruckDelivery className="text-white" size="60" />
          <div className="ml-4 w-80 mx-auto">
            <h1 className="text-white text-xl mx-auto font-semibold text-center">
              Envíos a todo el pais
            </h1>
            <p className="text-white text-center mx-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum ad
            </p>
          </div>
        </div>

        <div className="flex items-center mb-3 md:mb-0 mx-auto">
          <FiPackage className="text-white" size="60" />
          <div className="ml-4 w-80">
            <h1 className="text-white mx-auto text-xl font-semibold text-center">
              Tu pedido seguro
            </h1>
            <p className="text-white text-center mx-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum ad
              l
            </p>
          </div>
        </div>
        <div className="flex items-center mb-3 md:mb-0 mx-auto">
          <CiCreditCard1 className="text-white " size="60" />
          <div className="ml-4  w-80">
            <h1 className="text-white text-xl font-semibold text-center">
              Hasta 3 cuotas sin interés
            </h1>
            <p className="text-white text-center">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum ad
              consequatur
            </p>
          </div>
        </div>
        <div className="flex items-center mb-3 md:mb-0 mx-auto">
          <Tb24Hours className="text-white" size="60" />
          <div className="ml-4 w-80 mx-auto">
            <h1 className="text-white text-xl mx-auto font-semibold text-center">
             Menos de 24 horas en CBA
            </h1>
            <p className="text-white text-center mx-auto">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum ad
            </p>
          </div>
        </div>
      </section>

      <section className=" flex flex-col items-center  justify-center w-4/5 mt-24 mx-auto">
  <h3 className="text-center font-bold text-4xl">DESTACADOS</h3>
  <div className="grid shado grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
    {products.map((item, i) => (
      <div key={i} className="w-full h-full">
        <div className="w-96 mx-auto shadow-lg relative p-11 items-center justify-center">
          <div className="text-center absolute bg-red-600 right-0">
            <h3>10 % OFF</h3>
          </div>
          <div>
            <img src={`${url_images}${item.imagen1}`} width="400" alt="i1" loading="lazy" />
          </div>
          <div className="font-bold">
            <h5>{item.nombre}</h5>
            <p>${item.listPrecio} - <del>${item.precio2}</del></p>
          </div>
          <div className="flex items-center">
            <CiCreditCard1 className="text-red-500 mr-1" />
            <p className="text-red-500">Hasta 3 cuotas sin interés</p>
          </div>
          <div className="flex  items-center">
            <FaShoppingBag className="mr-2 cursor-pointer" size="20"/>
            <FaEye  size="20"/>
          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="container">
    <div className="box-button">
      <Link to="/shop" className="box-button__button">
        <span>Ver Más</span>
      </Link>
    </div>
  </div>
</section>
      <ImagenesRopa/>
      <Subscribe />

      <Footer />

      <Footfixed />
    </>
  );
};
