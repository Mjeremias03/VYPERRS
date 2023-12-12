import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footfixed from "../../components/footfixed/Footfixed";
import storage from "../../Storage/storage";
import Swal from "sweetalert2";
import axios from "axios";

import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

import 'bootstrap/dist/css/bootstrap.min.css';

import './checkout.css';

export const Checkout = () => {

  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin

  initMercadoPago("TEST-d3bdca60-a213-4d1d-b9cf-6fced4be17f3");

  const [datosEnvio, setDatosEnvio] = useState(false);

  let navigate = useNavigate();

  const handlerDatosEnvio = async () => {
    const form = document.getElementById("formDatosEnvio");
    const formData = new FormData(form);

    let error = 0;

    if (formData.get("nombre") > "") {
    } else {
      handlerError("El campo nombre es obligatorio, debe informarlo!");
      error = 1;
    }

    if(error === 0){
      if (formData.get("apellido") > "") {
      } else {
        handlerError("El campo apellido es obligatorio, debe informarlo!");
        error = 1;
      }  
    }

    if(error === 0){
      if (formData.get("email") > "") {
      } else {
        handlerError("El campo email es obligatorio, debe informarlo!");
        error = 1;
      }  
    }

    if(error === 0){
      if (formData.get("direccion") > "") {
      } else {
        handlerError("El campo direccion es obligatorio, debe informarlo!");
        error = 1;
      }
    }

    if(error === 0){
      if (formData.get("telefono") > "") {
      } else {
        handlerError("El campo telefono es obligatorio, debe informarlo!");
        error = 1;
      }
    }

    if (error === 0) {
      try {
        const response = await axios.put(endpoint + "/carroheader/" + storage.get("carroNumber"),
          {
            nombre: formData.get("nombre"),
            apellido: formData.get("apellido"),
            email: formData.get("email"),
            direccion: formData.get("direccion"),
            telefono: formData.get("telefono"),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        handlerMessage("Toda la información de datos de envío, ha sido registrada!");
        
        setDatosEnvio(true);

        navigate("/checkout");

      } catch (errors) {
        console.log(errors);
      }

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
   * Errores -> manejo con Swal
   */
  const handlerError = async (text) => {
    Swal.fire({
      icon: "error",
      text: text,
    });
  };

  return (
    <>
      <section className="container">
        <h3 className="title">checkout</h3>

        <div className="row">
          <div className="checkout-datos col-sm-6 border-top">
            <h3>Información del Envío</h3>
            <form id="formDatosEnvio">
              <div className="mt-3 mb-3">
                <label className="form-label">*Nombre</label>
                <input type="text" name="nombre" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">*Apellido</label>
                <input type="text" name="apellido" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">*Email</label>
                <input type="email" name="email" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">*Dirección</label>
                <input type="text" name="direccion" className="form-control" />
              </div>
              <div className="mb-3">
                <label className="form-label">*Teléfono</label>
                <input type="text" name="telefono" className="form-control" />
              </div>

              <Link to="/checkout" onClick={() => handlerDatosEnvio()} className="--button">
                Capturar Datos del Envío
              </Link>
            </form>
          </div>

          <div className="checkout-pagar col-sm-6 border-top">
            <h3>Formas de Pago</h3>
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Mercado de Pago
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p>Tarjetas de Crédito y Débito hasta en 18 CUOTAS</p>

                    <div className="frame-tarjetas">
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/visa.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/master.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/amex.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/naranja.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/tarshop.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/cabal.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/cencosud.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/diners.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                    </div>

                    <div className="frame-tarjetas mt-3">
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/argencard.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/cordobesa.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                      <img
                        src="https://www.mercadopago.com/org-img/MP3/API/logos/cmr.gif"
                        className="mp-img-fluid mp-img-tarjetas"
                        alt=""
                      />
                    </div>
                    {datosEnvio ? (
                      <a
                        href={storage.get("initPoint")}
                        target="_blank"
                        type="button"
                        className="--button"
                      >
                        PAGAR con MERCADO PAGO
                      </a>
                    ) : (
                      <a
                        href="/checkout"
                        target="_blank"
                        type="button"
                        className="--button"
                      >
                        PAGAR con MERCADO PAGO
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Tarjetas de Débito
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <img
                      src="https://www.mercadopago.com/org-img/MP3/API/logos/debmaster.gif"
                      className="mp-img-fluid mp-img-tarjetas"
                      alt=""
                    />
                    <img
                      src="https://www.mercadopago.com/org-img/MP3/API/logos/debcabal.gif"
                      className="mp-img-fluid mp-img-tarjetas"
                      alt=""
                    />
                    <img
                      src="https://www.mercadopago.com/org-img/MP3/API/logos/debvisa.gif"
                      className="mp-img-fluid mp-img-tarjetas"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Pagos en Efectivo
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <img
                      src="https://www.mercadopago.com/org-img/MP3/API/logos/2004.gif"
                      className="mp-img-fluid mp-img-tarjetas"
                      alt=""
                    />
                    <img
                      src="https://www.mercadopago.com/org-img/MP3/API/logos/2022.gif"
                      className="mp-img-fluid mp-img-tarjetas"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="areaMenuDesktop"></div>
      </section>

      <Footfixed />
    </>
  );
}
