import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Footfixed from "../../components/footfixed/Footfixed";
import storage from "../../Storage/storage";
import axios from "axios";

import "./review.css";

export const Review = () => {
  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin

  const [count, setCount] = useState(1);

  const [maxImage, setMaxImage] = useState(0);
  const [idxImage, setIdxImage] = useState(1);

  const [lanzar, setLanzar] = useState(true);

  const imagen1Ref = useRef();
  const imagen2Ref = useRef();
  const imagen3Ref = useRef();
  const imagen4Ref = useRef();
  const imagen5Ref = useRef();
  const imagen6Ref = useRef();
  const imagen7Ref = useRef();
  const imagen8Ref = useRef();

  /**
   * Campos del producto
   */
  const [nombre, setNombre] = useState("");
  const [listPrecio, setListPrecio] = useState(0);
  const [precio2, setPrecio2] = useState(0);
  const [stock, setStock] = useState(0);
  const [slug, setSlug] = useState("");

  const [imagen1, setImagen1] = useState("");
  const [imagen2, setImagen2] = useState("");
  const [imagen3, setImagen3] = useState("");
  const [imagen4, setImagen4] = useState("");
  const [imagen5, setImagen5] = useState("");
  const [imagen6, setImagen6] = useState("");
  const [imagen7, setImagen7] = useState("");
  const [imagen8, setImagen8] = useState("");

  const [lin1, setLin1] = useState("");
  const [lin2, setLin2] = useState("");
  const [lin3, setLin3] = useState("");
  const [lin4, setLin4] = useState("");
  const [lin5, setLin5] = useState("");
  const [lin6, setLin6] = useState("");
  const [lin7, setLin7] = useState("");

  const [categoryId, setCategoryId] = useState(0);
  const [marcaId, setMarcaId] = useState(0);
  const [grupoId, setGrupoId] = useState(0);

  /*
   * Leer un producto
   */
  const producto = async () => {
    const id = storage.get("review_id");

    try {
      const response = await axios.get(endpoint + "/product/" + id);

      setNombre(response.data.nombre);
      setSlug(response.data.slug);
      setListPrecio(response.data.listPrecio);
      setPrecio2(response.data.precio2);
      setStock(response.data.stock);

      setImagen1(response.data.imagen1);
      setImagen2(response.data.imagen2);
      setImagen3(response.data.imagen3);
      setImagen4(response.data.imagen4);
      setImagen5(response.data.imagen5);
      setImagen6(response.data.imagen6);
      setImagen7(response.data.imagen7);
      setImagen8(response.data.imagen8);

      setLin1(response.data.lin1);
      setLin2(response.data.lin2);
      setLin3(response.data.lin3);
      setLin4(response.data.lin4);
      setLin5(response.data.lin5);
      setLin6(response.data.lin6);
      setLin7(response.data.lin7);

      setCategoryId(response.data.category_id);
      setGrupoId(response.data.grupo_id);
      setMarcaId(response.data.marca_id);

      /**
       * Calcula el máximo de imágenes que tiene
       * este producto
       */
      setMaxImage(0);

      if (imagen1 === null) {
      } else {
        setMaxImage(maxImage + 1);
      }
      if (imagen2 === null) {
      } else {
        setMaxImage(maxImage + 1);
      }
      if (imagen3 === null) {
      } else {
        setMaxImage(maxImage + 1);
      }
      if (imagen4 === null) {
      } else {
        setMaxImage(maxImage + 1);
      }
      if (imagen5 === null) {
      } else {
        setMaxImage(maxImage + 1);
      }

      console.log(maxImage);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /**
   * Lanza la recuperacion de los datos del producto
   */
  if (lanzar) {
    setLanzar(false);

    producto();
  }

  /**
   * Carrusel de imágenes
   */
  const imagePrevious = () => {
    if (idxImage > 1) {
      if (idxImage === 2) {
        imagen2Ref.current.className = "image";
        setIdxImage(idxImage - 1);
        imagen1Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 3) {
        imagen3Ref.current.className = "image";
        setIdxImage(idxImage - 1);
        imagen2Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 4) {
        imagen4Ref.current.className = "image";
        setIdxImage(idxImage - 1);
        imagen3Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 5) {
        imagen5Ref.current.className = "image";
        setIdxImage(idxImage - 1);
        imagen4Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 6) {
        imagen6Ref.current.className = "image";
        setIdxImage(idxImage - 1);
        imagen5Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 7) {
        imagen7Ref.current.className = "image";
        setIdxImage(idxImage - 1);
        imagen6Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 8) {
        imagen8Ref.current.className = "image";
        setIdxImage(idxImage - 1);
        imagen7Ref.current.className = "image-show";
        return;
      }
    }
  };

  const imageNext = () => {
    if (idxImage < maxImage) {
      if (idxImage === 1) {
        imagen1Ref.current.className = "image";
        setIdxImage(idxImage + 1);
        imagen2Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 2) {
        imagen2Ref.current.className = "image";
        setIdxImage(idxImage + 1);
        imagen3Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 3) {
        imagen3Ref.current.className = "image";
        setIdxImage(idxImage + 1);
        imagen4Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 4) {
        imagen4Ref.current.className = "image";
        setIdxImage(idxImage + 1);
        imagen5Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 5) {
        imagen5Ref.current.className = "image";
        setIdxImage(idxImage + 1);
        imagen6Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 6) {
        imagen6Ref.current.className = "image";
        setIdxImage(idxImage + 1);
        imagen7Ref.current.className = "image-show";
        return;
      }
      if (idxImage === 7) {
        imagen7Ref.current.className = "image";
        setIdxImage(idxImage + 1);
        imagen8Ref.current.className = "image-show";
        return;
      }
    }
  };

  /**
   * Para no dejar en cero el contador, previamente pregunta si
   * el contador es mayor a cero.
   */
  const subtractCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <>
      <div className="container-fluid section">
        <h3 className="title">revisión</h3>

        <div className="container preview__contenido">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <div className="preview__lateral-images">
                <div className="row">
                  <div className="col-sm-12 col-md-6">
                    <img
                      id="1"
                      className="image-show"
                      src={`${url_images}${imagen1}`}
                      width="400"
                      alt="i1"
                      ref={imagen1Ref}
                    />
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <img
                      id="2"
                      className="image-show"
                      src={`${url_images}${imagen1}`}
                      width="400"
                      alt="i1"
                      ref={imagen1Ref}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-6">
              <div className="preview__lateral-info">
                
                <div className="title">VYPERRS</div>
                
                <div className="name">Remera</div>

                <div className="description">
                  Lorem ipsum dolor sit amet consectetur
                </div>
                <div className="description">
                  Lorem ipsum dolor sit amet consectetur
                </div>
                <div className="description">
                  Lorem ipsum dolor sit amet consectetur
                </div>
                <div className="description">
                  Lorem ipsum dolor sit amet consectetur
                </div>

                <div className="variantes">
                  <div className="atributo">
                    <h3>TALLE</h3>
                  </div>
                  <div className="termino">
                    <h3>37</h3>
                    <h3>38</h3>
                    <h3>39</h3>
                    <h3>40</h3>
                    <h3>41</h3>
                    <h3>42</h3>
                    <h3>43</h3>
                    <h3>44</h3>
                    <h3>45</h3>
                  </div>
                </div>

                <div className="prices">
                  <p>${listPrecio}</p>
                </div>

                <div className="details__separador"></div>

                <div className="quantity">
                  <div className="input">
                    <img
                      onClick={() => subtractCount()}
                      className="input__minus"
                      src="public/images/review/minus.svg"
                      alt="minus"
                    />
                    <input
                      className="input__number"
                      onChange={(e) => {
                        setCount(e.target.value);
                      }}
                      name="cantidad"
                      type="text"
                      value={count}
                    />
                    <img
                      onClick={() => setCount(count + 1)}
                      className="input__plus"
                      src="public/images/review/plus.svg"
                      alt="plus"
                    />
                  </div>
                  <button className="details__button">
                    <span>agregar al carrito</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section container-fluid">
        <h3 className="title">revisión</h3>

        <section className="content">
          <div className="gallery">
            <div className="gallery__izq">
              <div className="gallery__thumnails">
                {!imagen1 ? null : (
                  <img
                    id="1"
                    className="gallery__thumnail"
                    src={`${url_images}${imagen1}`}
                    alt="thumnail"
                  />
                )}
                {!imagen2 ? null : (
                  <img
                    id="2"
                    className="gallery__thumnail"
                    src={`${url_images}${imagen2}`}
                    alt="thumnail"
                  />
                )}
                {!imagen3 ? null : (
                  <img
                    id="3"
                    className="gallery__thumnail"
                    src={`${url_images}${imagen3}`}
                    alt="thumnail"
                  />
                )}
                {!imagen4 ? null : (
                  <img
                    id="4"
                    className="gallery__thumnail"
                    src={`${url_images}${imagen4}`}
                    alt="thumnail"
                  />
                )}
                {imagen5 === null ? null : (
                  <img
                    id="5"
                    className="gallery__thumnail"
                    src={`${url_images}${imagen5}`}
                    alt="thumnail"
                  />
                )}
              </div>
            </div>
            <div className="gallery__der">
              <div className="gallery__image-container">
                <img
                  id="1"
                  className="image-show"
                  src={`${url_images}${imagen1}`}
                  width="400"
                  alt="i1"
                  ref={imagen1Ref}
                />
                {imagen2 === null ? null : (
                  <img
                    id="2"
                    className="image"
                    src={`${url_images}${imagen2}`}
                    alt="i2"
                    ref={imagen2Ref}
                  />
                )}
                {imagen3 === null ? null : (
                  <img
                    id="3"
                    className="image"
                    src={`${url_images}${imagen3}`}
                    alt="i3"
                    ref={imagen3Ref}
                  />
                )}
                {imagen4 === null ? null : (
                  <img
                    id="4"
                    className="image"
                    src={`${url_images}${imagen4}`}
                    alt="i4"
                    ref={imagen4Ref}
                  />
                )}
                {imagen5 === null ? null : (
                  <img
                    id="5"
                    className="image"
                    src={`${url_images}${imagen5}`}
                    alt="i5"
                    ref={imagen5Ref}
                  />
                )}
                <img
                  onClick={() => imagePrevious()}
                  className="gallery__previous"
                  src="public/images/review/chevron-left.svg"
                  alt="previous"
                />
                <img
                  onClick={() => imageNext()}
                  className="gallery__next"
                  src="public/images/review/chevron-right.svg"
                  alt="next"
                />
              </div>
            </div>
          </div>

          <div className="details">
            <h2 className="details__company">VYPERRS</h2>
            <h2 className="details__title">{nombre}</h2>
            <p className="details__description">
              <span>{lin1}</span>
              <br />
              <span>{lin2}</span>
              <br />
              <span>{lin3}</span>
            </p>
            <div className="details__variantes">
              <div className="atributo">
                <h3>TALLE</h3>
              </div>
              <div className="termino">
                <h3>37</h3>
                <h3>38</h3>
                <h3>39</h3>
                <h3>40</h3>
                <h3>41</h3>
                <h3>42</h3>
                <h3>43</h3>
                <h3>44</h3>
                <h3>45</h3>
              </div>
            </div>
            <div className="details__prices">
              <p className="details__now">${listPrecio}</p>
            </div>
            <div className="details__separador"></div>

            <div className="details__Review-quantity">
              <div className="input">
                <img
                  onClick={() => subtractCount()}
                  className="input__minus"
                  src="public/images/review/minus.svg"
                  alt="minus"
                />
                <input
                  className="input__number"
                  onChange={(e) => {
                    setCount(e.target.value);
                  }}
                  name="cantidad"
                  type="text"
                  value={count}
                />
                <img
                  onClick={() => setCount(count + 1)}
                  className="input__plus"
                  src="public/images/review/plus.svg"
                  alt="plus"
                />
              </div>

              <button className="details__button">
                <span>agregar al carrito</span>
              </button>
            </div>
          </div>
        </section>

        <div className="areaMenuDesktop"></div>
      </div>

      <Footfixed />
    </>
  );
};
