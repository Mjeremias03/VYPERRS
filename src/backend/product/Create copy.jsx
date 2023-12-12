import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import './product.css';

function Create() {
  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin

  let navigate = useNavigate();

  const image1Ref = useRef();
  const image2Ref = useRef();
  const image3Ref = useRef();
  const image4Ref = useRef();

  const [categorias, setCategorias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [marcas, setMarcas] = useState([]);

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
   * Leer todas las categorías
   */
  const leerCategorias = async () => {
    try {
      const response = await axios.get(endpoint + "/categories");

      setCategorias(response.data);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Leer todas los grupos
   */
  const leerGrupos = async () => {
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
  const leerMarcas = async () => {
    try {
      const response = await axios.get(endpoint + "/marcas");

      setMarcas(response.data);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    leerCategorias();
    leerGrupos();
    leerMarcas();
  }, []);

  /*
   * Errores -> manejo con Swal
   */
  const handlerError = async (text) => {
    Swal.fire({
      icon: "error",
      text: text,
    });
  };

  /*
   * OnChange list Categories
   */
  const handlerChangeCategory = (e) => {
    setCategoryId(e.target.value);
  };

  /*
   * OnChange list Grupos
   */
  const handlerChangeGrupo = (e) => {
    setGrupoId(e.target.value);
  };

  /*
   * OnChange list Marcas
   */
  const handlerChangeMarca = (e) => {
    setMarcaId(e.target.value);
  };

  /*
   * OnChange Images
   */
  const handlerChangeImage = (e, n) => {

    if(n === 1){
      if (e.target.files[0]) {
        image1Ref.current.src = URL.createObjectURL(e.target.files[0]);
      } else {
        image1Ref.current.src = url_images + "marco-photo.png";
      }  
    }

    if(n === 2){
      if (e.target.files[0]) {
        image2Ref.current.src = URL.createObjectURL(e.target.files[0]);
      } else {
        image2Ref.current.src = url_images + "marco-photo.png";
      }  
    }

    if(n === 3){
      if (e.target.files[0]) {
        image3Ref.current.src = URL.createObjectURL(e.target.files[0]);
      } else {
        image3Ref.current.src = url_images + "marco-photo.png";
      }  
    }

    if(n === 4){
      if (e.target.files[0]) {
        image4Ref.current.src = URL.createObjectURL(e.target.files[0]);
      } else {
        image4Ref.current.src = url_images + "marco-photo.png";
      }  
    }

  };

  /*
   * Crear el producto
   */
  const handlerCreate = async () => {
    console.log("entro");
    const form = document.getElementById("form-agregar");
    console.log(from);
    const formData = new FormData(form);

    let error = 0;

    if (formData.get("nombre") > "") {
    } else {
      handlerError("Debe informar el nombre del producto");
      error = 1;
    }

    if (error === 0) {
      if (formData.get("listPrecio") > 0) {
      } else {
        handlerError("Debe informar el precio de lista");
        error = 1;
      }
    }

    if (error === 0) {
      if (formData.get("precio2") > 0) {
      } else {
        handlerError("Debe informar el precio anterior por referencia");
        error = 1;
      }
    }

    if (error === 0) {
      if (formData.get("stock") > 0) {
      } else {
        handlerError("Debe informar la existencia actual del producto");
        error = 1;
      }
    }

    if (error === 0) {
      if (formData.get("imagen1") > "") {
      } else {
        handlerError("Debe informar la imagen principal del producto");
        error = 1;
      }
    }

    if (error === 0) {
      if (categoryId > 0) {
      } else {
        handlerError("Debe informar a que categoría pertenece este producto");
        error = 1;
      }
    }

    if (error === 0) {
      if (marcaId > 0) {
      } else {
        handlerError("Debe informar a que marca pertenece este producto");
        error = 1;
      }
    }

    if (error === 0) {
      if (grupoId > 0) {
      } else {
        handlerError("Debe informar a que grupo pertenece este producto");
        error = 1;
      }
    }

    if (error === 0) {
      try {
        const response = await axios.post(endpoint + "/product",
          {
            nombre: formData.get("nombre"),
            slug: formData.get("slug"),
            listPrecio: formData.get("listPrecio"),
            precio2: formData.get("precio2"),
            stock: formData.get("stock"),
            lin1: formData.get("lin1"),
            lin2: formData.get("lin2"),
            lin3: formData.get("lin3"),
            lin4: formData.get("lin4"),
            lin5: formData.get("lin5"),
            lin6: formData.get("lin6"),
            lin7: formData.get("lin7"),
            image: formData.get("imagen1"),
            atributo1_id: 0,
            atributo2_id: 0,
            atributo3_id: 0,
            atributo4_id: 0,
            grupo_id: grupoId,
            category_id: categoryId,
            marca_id: marcaId,
            status: 1,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);

      } catch (errors) {
        console.log(errors);
      }
    }

    console.log("salimos");

    navigate("/products");
  };

  function slugify(texto) {
    return texto
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  return (
    <>
      <main>
        <div className="backend container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <h3 className="title">agregar producto</h3>
            </div>
          </div>
          <div className="comandos">
            <form
              id="form-agregar"
              action=""
              method="POST"
              encType="multipart/form-data"
            >
              <p className="contenedor-colapso">
                <a
                  className="btn btn-sm btn-outline-secondary --button250"
                  data-bs-toggle="collapse"
                  href="#collapseExample1"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample1"
                >
                  Datos Varios
                </a>
                <a
                  className="btn btn-sm btn-outline-secondary --button250"
                  data-bs-toggle="collapse"
                  href="#collapseExample2"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample2"
                >
                  Descripción
                </a>
                <a
                  className="btn btn-sm btn-outline-secondary --button250"
                  data-bs-toggle="collapse"
                  href="#collapseExample3"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample3"
                >
                  Imágenes
                </a>
                <a
                  className="btn btn-sm btn-outline-secondary --button250"
                  data-bs-toggle="collapse"
                  href="#collapseExample4"
                  role="button"
                  aria-expanded="false"
                  aria-controls="collapseExample4"
                >
                  Relaciones
                </a>
              </p>

              <div className="collapse" id="collapseExample1">
                <div className="card card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control mb-3"
                        value={nombre}
                        onChange={(e) => {
                          setSlug(slugify(e.target.value));
                          setNombre(e.target.value);
                        }}
                        name="nombre"
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">Precio Anterior</label>
                      <input
                        type="number"
                        className="form-control mb-3"
                        value={precio2}
                        onChange={(e) => {
                          setPrecio2(e.target.value);
                        }}
                        name="precio2"
                      />
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label">Precio de Lista</label>
                      <input
                        type="number"
                        className="form-control mb-3"
                        value={listPrecio}
                        onChange={(e) => {
                          setListPrecio(e.target.value);
                        }}
                        name="listPrecio"
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">Existencias</label>
                      <input
                        type="number"
                        className="form-control mb-3"
                        value={stock}
                        onChange={(e) => {
                          setStock(e.target.value);
                        }}
                        name="stock"
                      />
                      <input
                        type="hidden"
                        className="form-control mb-3"
                        value={slug}
                        name="slug"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="collapse" id="collapseExample2">
                <div className="card card-body">
                  <input
                    type="text"
                    className="lin1 form-control"
                    value={lin1}
                    onChange={(e) => {
                      setLin1(e.target.value);
                    }}
                    name="lin1"
                  />
                  <input
                    type="text"
                    className="lin2 form-control"
                    value={lin2}
                    onChange={(e) => {
                      setLin2(e.target.value);
                    }}
                    name="lin2"
                  />
                  <input
                    type="text"
                    className="lin3 form-control"
                    value={lin3}
                    onChange={(e) => {
                      setLin3(e.target.value);
                    }}
                    name="lin3"
                  />
                  <input
                    type="text"
                    className="lin4 form-control"
                    value={lin4}
                    onChange={(e) => {
                      setLin4(e.target.value);
                    }}
                    name="lin4"
                  />
                  <input
                    type="text"
                    className="lin5 form-control"
                    value={lin5}
                    onChange={(e) => {
                      setLin5(e.target.value);
                    }}
                    name="lin5"
                  />
                  <input
                    type="text"
                    className="lin6 form-control"
                    value={lin6}
                    onChange={(e) => {
                      setLin6(e.target.value);
                    }}
                    name="lin6"
                  />
                  <input
                    type="text"
                    className="lin7 form-control"
                    value={lin7}
                    onChange={(e) => {
                      setLin7(e.target.value);
                    }}
                    name="lin7"
                  />
                </div>
              </div>

              <div className="collapse" id="collapseExample3">
                <div className="imagenes-flex">
                  
                  <div className="card card-body text-center">
                    <div className="box-photo">
                      <img src={`${url_images}marco-photo.png`} alt="photo" ref={image1Ref} />
                    </div>
                    <label
                      htmlFor="inputFile1"
                      className="archivoCreate form-label"
                    >
                      Seleccionar una Imagén
                      <input
                        id="inputFile1"
                        type="file"
                        className="form-control mt-3"
                        name="imagen1"
                        onChange={(e) => handlerChangeImage(e, 1)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div> 
                  
                  <div className="card card-body text-center">
                    <div className="box-photo">
                      <img src={`${url_images}marco-photo.png`} alt="photo" ref={image2Ref} />
                    </div>
                    <label
                      htmlFor="inputFile2"
                      className="archivoCreate form-label"
                    >
                      Seleccionar una Imagén
                      <input
                        id="inputFile2"
                        type="file"
                        className="form-control mt-3"
                        name="imagen2"
                        onChange={(e) => handlerChangeImage(e, 2)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  
                  <div className="card card-body text-center">
                    <div className="box-photo">
                      <img src={`${url_images}marco-photo.png`} alt="photo" ref={image3Ref} />
                    </div>
                    <label
                      htmlFor="inputFile3"
                      className="archivoCreate form-label"
                    >
                      Seleccionar una Imagén
                      <input
                        id="inputFile3"
                        type="file"
                        className="form-control mt-3"
                        name="imagen3"
                        onChange={(e) => handlerChangeImage(e, 3)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                  
                  <div className="card card-body text-center">
                    <div className="box-photo">
                      <img src={`${url_images}marco-photo.png`} alt="photo" ref={image4Ref} />
                    </div>
                    <label
                      htmlFor="inputFile4"
                      className="archivoCreate form-label"
                    >
                      Seleccionar una Imagén
                      <input
                        id="inputFile4"
                        type="file"
                        className="form-control mt-3"
                        name="imagen4"
                        onChange={(e) => handlerChangeImage(e, 4)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>

                </div>
              </div>

              <div className="collapse" id="collapseExample4">
                <div className="card card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <label className="form-label">Categorías</label>
                      <select
                        onChange={(e) => handlerChangeCategory(e)}
                        className="form-control"
                        name="categoryId"
                      >
                        <option value="0">Seleccione una categoría</option>
                        {categorias.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-sm-6"></div>

                    <div className="col-sm-6 mt-3">
                      <label className="form-label">Grupos</label>
                      <select
                        onChange={(e) => handlerChangeGrupo(e)}
                        className="form-control"
                        name="grupoId"
                      >
                        <option value="0">Seleccione un Grupo</option>
                        {grupos.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-sm-6"></div>

                    <div className="col-sm-6 mt-3">
                      <label className="form-label">Marcas</label>
                      <select
                        onChange={(e) => handlerChangeMarca(e)}
                        className="form-control"
                        name="marcaId"
                      >
                        <option value="0">Seleccione un Marca</option>
                        {marcas.map((item, i) => (
                          <option key={i} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-sm-6"></div>
                  </div>
                </div>
              </div>

              <div className="container mt-3">
                <div className="contenedor__pie">
                  <button
                    onClick={() => handlerCreate()}
                    className="btn btn-outline-success button_agregar"
                  >
                    Agregar
                  </button>
                  <Link
                    to="/products"
                    className="btn btn-outline-secondary button_salir"
                  >
                    Salir
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Create;
