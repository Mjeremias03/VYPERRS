import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import storage from "../../Storage/storage";

import "bootstrap/dist/css/bootstrap.min.css";

import "./navbar.css";

export const Navbar = ({
  setCountHeartProducts,
  countHeartProducts,
  setCountCartProducts,
  countCartProducts,
}) => {
  /**
   * Para el manejo de que encabezado mostrar o sea indicar en que
   * ambiente nos encontramos, se utilizan 2 hooks
   * showAmbiente: Indica cual es el ambiente en el que nos encontramos
   * ambiente: Es el true y false del cambio de ambiente
   */
  const [showAmbiente, setShowAmbiente] = useState(storage.get("showAmbiente"));

  let navigate = useNavigate();

  const [panel1, setPanel1] = useState(true);
  const [panel2, setPanel2] = useState(true);
  const [panel3, setPanel3] = useState(true);

  const panel1Ref = useRef();
  const panel2Ref = useRef();
  const panel3Ref = useRef();

  const [showMenuVertical, setShowMenuVertical] = useState(true);
  const showMenuVerticalRef = useRef();
  const showModalRef = useRef();

  const [showLogin, setShowLogin] = useState(true);
  const showModalAuthRef = useRef();
  const showLoginRef = useRef();

  const handlerCambioMenu = () => {
    if (showAmbiente === "frontend") {
      storage.set("showAmbiente", "backend");
      setShowAmbiente("backend");

      navigate("/home");
    } else {
      storage.set("showAmbiente", "frontend");
      setShowAmbiente("frontend");

      navigate("/");
    }
  };

  const handlerShowMenuVertical = () => {
    if (showMenuVertical) {
      showModalRef.current.style.display = "block";
      showMenuVerticalRef.current.style.left = "0";
      setShowMenuVertical(false);
    } else {
      showModalRef.current.style.display = "none";
      showMenuVerticalRef.current.style.left = "-500px";
      setShowMenuVertical(true);
    }
  };

  const handlerGoToCategory = () => {
    handlerShowMenuVertical();

    navigate("/categories");
  };

  const handlerGoToGrupo = () => {
    handlerShowMenuVertical();

    navigate("/grupos");
  };

  const handlerGoToMarca = () => {
    handlerShowMenuVertical();

    navigate("/marcas");
  };

  const handlerGoToAtributo = () => {
    handlerShowMenuVertical();

    navigate("/atributos");
  };

  const handlerGoToTermino = () => {
    handlerShowMenuVertical();

    navigate("/terminos");
  };

  const handlerGoToProduct = () => {
    handlerShowMenuVertical();

    navigate("/products");
  };

  const handlerGoToCupon = () => {
    handlerShowMenuVertical();

    navigate("/cupons");
  };

  const handlerGoToHome = () => {
    handlerShowMenuVertical();

    navigate("/home");
  };

  const handlerShowLogin = () => {
    if (showLogin) {
      showModalAuthRef.current.style.display = "block";
      showLoginRef.current.style.left = "5";
      setShowLogin(false);
    } else {
      showModalAuthRef.current.style.display = "none";
      showLoginRef.current.style.left = "-800px";
      setShowLogin(true);
    }
  };

  const handlerLogout = () => {
    storage.set("showAmbiente", "frontend");

    setShowAmbiente("frontend");

    storage.remove("authToken");
    storage.remove("authUserId");
    storage.remove("authUser");
    storage.remove("auth");

    navigate("/");
  };

  const handlerAccordion = (panel) => {
    if (panel === 1) {
      if (panel1) {
        panel1Ref.current.style.display = "block";
        setPanel1(false);
      } else {
        panel1Ref.current.style.display = "none";
        setPanel1(true);
      }
    }

    if (panel === 2) {
      if (panel2) {
        panel2Ref.current.style.display = "block";
        setPanel2(false);
      } else {
        panel2Ref.current.style.display = "none";
        setPanel2(true);
      }
    }

    if (panel === 3) {
      if (panel3) {
        panel3Ref.current.style.display = "block";
        setPanel3(false);
      } else {
        panel3Ref.current.style.display = "none";
        setPanel3(true);
      }
    }
  };

  return (
    <>
      <div className="user-background" ref={showModalAuthRef}></div>
      <div className="box-container" ref={showLoginRef}>
        <div className="box-login">
          <div className="cerrar-login">
            <img
              onClick={() => handlerShowLogin()}
              src="images/close.svg"
              alt="close"
            />
          </div>
        </div>
      </div>

      <div className="menu-background" ref={showModalRef}></div>
      <div className="menu-vertical" ref={showMenuVerticalRef}>
        <div className="contenedor-cierre">
          <img
            onClick={() => handlerShowMenuVertical()}
            src="images/close.svg"
            alt="close"
          />
        </div>
        <div className="box">
          <button onClick={() => handlerAccordion(1)} className="accordion">
            entidades
          </button>
          <div className="panel1" ref={panel1Ref}>
            <ul>
              <li onClick={() => handlerGoToCategory()}>Categorías</li>
              <li onClick={() => handlerGoToGrupo()}>Grupos</li>
              <li onClick={() => handlerGoToMarca()}>Marcas</li>
              <li onClick={() => handlerGoToAtributo()}>Atributos</li>
              <li onClick={() => handlerGoToTermino()}>Términos</li>
            </ul>
          </div>

          <button onClick={() => handlerAccordion(2)} className="accordion">
            producto
          </button>
          <div className="panel2" ref={panel2Ref}>
            <ul>
              <li onClick={() => handlerGoToProduct()}>Productos</li>
            </ul>
          </div>

          <button onClick={() => handlerAccordion(3)} className="accordion">
            web
          </button>
          <div className="panel3" ref={panel3Ref}>
            <ul>
              <li onClick={() => handlerGoToCupon()}>Cupones</li>
              <li onClick={() => handlerGoToHome()}>Home</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container-fluid propaganda">
        {showAmbiente !== "backend" ? (
          <div className="logos2">
            <div className="logos2-slide">
              <span>
                3 CUOTAS SIN INTERÉS CON VISA, MASTER CARD, AMEX BANCARIAS -20%
                OFF TRANSFERENCIA - 20% USDT/USDC - ENVÍO GRATIS %50.000
              </span>
              <span>
                3 CUOTAS SIN INTERÉS CON VISA, MASTER CARD, AMEX BANCARIAS -20%
                OFF TRANSFERENCIA - 20% USDT/USDC - ENVÍO GRATIS %50.000
              </span>
              <span>
                3 CUOTAS SIN INTERÉS CON VISA, MASTER CARD, AMEX BANCARIAS -20%
                OFF TRANSFERENCIA - 20% USDT/USDC - ENVÍO GRATIS %50.000
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <header className="header">
        <div className="header__izq">
          <a href="/" className="ml-8 ">
            <img src="images/logo.png" className="object-cover" alt="logo" />
          </a>
          {showAmbiente === "frontend" ? (
            <div className="menu--frontend">
              <nav>
                <a href="/inicio" >INICIO</a>
                <a href="/shop">TIENDA</a>
                <a href="/favoritos">FAVORITOS</a>
              </nav>
            </div>
          ) : (
            <div className="menu--backend">
              <nav>
                <div
                  onClick={() => handlerShowMenuVertical()}
                  className="hamburger"
                >
                  <img src="images/list.svg" alt="menu" />
                </div>
              </nav>
            </div>
          )}
        </div>
        <div className="header__der">
          <div className="icons">
            {showAmbiente === "frontend" ? (
              <>
                <Link to="/favoritos">
                  <img
                    className="heart"
                    src="public/images/bag.svg"
                    alt="heart"
                  />
                </Link>
                <Link to="/carrito">
                  <img src="public/images/cart.svg" alt="cart" />
                </Link>
                <div className="heart-overlay">
                  <h3>{countHeartProducts}</h3>
                </div>
                <div className="cart-overlay">
                  <h3>{countCartProducts}</h3>
                </div>
              </>
            ) : (
              <></>
            )}

            {!storage.get("auth") ? (
              <Link /* onClick={() => handlerShowLogin()} */ to="/login">
                <img src="public/images/person-fill.svg" alt="login" />
              </Link>
            ) : (
              <div className="dropdown-3">
                <button
                  className="dropbtn-3"
                  style={{
                    background: "none",
                    color: "#000",
                  }}
                >
                  <img src="public/images/person-fill.svg" alt="login" />
                  <span style={{ textTransform: "uppercase" }}>
                    {storage.get("auth") ? storage.get("authUser").name : null}
                  </span>
                </button>
                <div className="dropdown-3-content">
                  {showAmbiente === "frontend" ? (
                    <Link onClick={() => handlerCambioMenu()} to="/home">
                      Ambiente
                    </Link>
                  ) : (
                    <Link onClick={() => handlerCambioMenu()} to="/">
                      Ambiente
                    </Link>
                  )}
                  <Link onClick={handlerLogout} to="/">
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
