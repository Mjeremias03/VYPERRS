import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import storage from "./Storage/storage";
import axios from "axios";

import { Navbar } from "./frontend/navbar/Navbar";

import { Inicio } from "./frontend/inicio/Inicio";
import { About } from "./frontend/about/About";
import { Shop } from "./frontend/shop/Shop";
import { Favoritos } from "./frontend/favoritos/Favoritos";
import { Carrito } from "./frontend/cart/Carrito";
import { Checkout } from "./frontend/checkout/Checkout";
import { Review } from "./frontend/review/Review";
import { News } from "./frontend/news/News";
import { Register } from "./frontend/register/Register";
import { Login } from "./frontend/login/Login";

import Home from "./backend/Home";
import Atributos from "./backend/atributo/Atributos";
import Categories from "./backend/category/Categories";
import Products from "./backend/product/Products";
import Create from "./backend/product/Create";
import Edit from "./backend/product/Edit";
import Terminos from "./backend/termino/Terminos";
import Grupos from "./backend/grupo/Grupos";
import Marcas from "./backend/marca/Marcas";
import Cupons from "./backend/cupon/Cupons";

import "./App.css";

function App() {
  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin
  
  if (storage.get("showAmbiente") === null) {
    storage.set("showAmbiente", 'frontend');
  }

  if (storage.get("carroNumber") === null) {
    storage.set("carroNumber", 0);
  }
  
  const [countHeartProducts, setCountHeartProducts] = useState(0);
  const [countCartProducts, setCountCartProducts] = useState(0);

  /**
   * Cada vez que se ingresa en la aplicación, se
   * corrige el contador de items del
   * carro de compras
   */
  const correccionCart = async () => {
    try {
      const cart = await axios.post(endpoint + "/carroitem/totales", {
        header_id: storage.get("carroNumber"),
        accion: "COUNT",
      });

      setCountCartProducts(cart.data.total);

    } catch (errors) {
      console.log(errors);
    }
  };
  
  correccionCart();

  /**
   * Cada vez que se ingresa en la aplicación, se
   * corrige el contador de items que 
   * estan en favoritos
   */
  const correccionHeart = async () => {
    try {
      const heart = await axios.post(endpoint + "/favoritos/totales", {
        comprador_id: storage.get("authUserId"),
        accion: "COUNT",
      });
      
      setCountHeartProducts(heart.data.total);

    } catch (errors) {
      console.log(errors);
    }
  };
  
  correccionHeart();

  return (
    <>
      <BrowserRouter>
        <Navbar
        setCountHeartProducts={setCountHeartProducts}
        countHeartProducts={countHeartProducts}
        setCountCartProducts={setCountCartProducts}
        countCartProducts={countCartProducts}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Inicio
                setCountHeartProducts={setCountHeartProducts}
                countHeartProducts={countHeartProducts}
                setCountCartProducts={setCountCartProducts}
                countCartProducts={countCartProducts}
              />
            }
          />

          <Route
            path="/inicio"
            element={
            <Inicio
              setCountHeartProducts={setCountHeartProducts}
              countHeartProducts={countHeartProducts}
              setCountCartProducts={setCountCartProducts}
              countCartProducts={countCartProducts}
            />
            }
          />
          <Route
            path="/shop"
            element={
              <Shop
                setCountHeartProducts={setCountHeartProducts}
                countHeartProducts={countHeartProducts}
                setCountCartProducts={setCountCartProducts}
                countCartProducts={countCartProducts}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route
            path="/favoritos"
            element={
              <Favoritos
                setCountHeartProducts={setCountHeartProducts}
                countHeartProducts={countHeartProducts}
                setCountCartProducts={setCountCartProducts}
                countCartProducts={countCartProducts}
              />
            }
          />
          <Route
            path="/carrito"
            element={
              <Carrito
                setCountHeartProducts={setCountHeartProducts}
                countHeartProducts={countHeartProducts}
                setCountCartProducts={setCountCartProducts}
                countCartProducts={countCartProducts}
              />
            }
          />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/review" element={<Review />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/home" element={<Home />} />

          <Route path="/categories" element={<Categories />} />
          <Route path="/atributos" element={<Atributos />} />
          <Route path="/terminos" element={<Terminos />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/marcas" element={<Marcas />} />
          <Route path="/cupons" element={<Cupons />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<Create />} />
          <Route path="/products/edit" element={<Edit />} />

          <Route path="/success" element={<Inicio />} />
          <Route path="/failure" element={<Inicio />} />
          <Route path="/pending" element={<Inicio />} />
          <Route path="/webhook" element={<Inicio />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
