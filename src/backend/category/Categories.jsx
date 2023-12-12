import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import "./category.css";

function Categories() {
  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin

  const [categories, setCategories] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const [pageActual, setPageActual] = useState(1);
  const [pages, setPages] = useState(0);
  const [inicio, setInicio] = useState(0);
  const [filas, setFilas] = useState(10);

  const [iden, setIden] = useState(0);

  const [nombre, setNombre] = useState("");
  const [slug, setSlug] = useState("");

  const [nombreU, setNombreU] = useState("");
  const [slugU, setSlugU] = useState("");
  const [imgU, setImgU] = useState("");

  const [nombreD, setNombreD] = useState("");
  const [imgD, setImgD] = useState("");

  const [status, setStatus] = useState(true);

  /**
   * useRef, definidas para el show y hidden de los
   * modal, para las funciones de CREATE, UPDATE
   * and DELETE
   */
  const showBackgoundRef = useRef();
  const showFilterRef = useRef();
  const showAgregarRef = useRef();
  const showEditarRef = useRef();
  const showBorrarRef = useRef();
  // fin

  const imageRef = useRef();

  /**
   * Leer todas las categorías
   */
  const allCategories = async (start, rows) => {
    try {
      const response = await axios.get(
        endpoint + "/categories/" + start + "/" + rows
      );
      setCategories(response.data.rows);
      setPages(response.data.paginas);
      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    allCategories(inicio, filas);
  }, []);

  /*
   * Leer una categoría
   */
  const getCategory = async (id) => {
    try {
      const response = await axios.get(endpoint + "/category/" + id);

      setNombreU(response.data.name);
      setSlugU(response.data.slug);
      setImgU(response.data.image);

      setNombreD(response.data.name);
      setImgD(response.data.image);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  /*
   * Show and Hiden Modal filter
   */
  const handlerModalFilter = () => {
    if (!modalShow) {
      showBackgoundRef.current.className =
        "main_modal_container main_modal_container-show";
      showFilterRef.current.className = "modal_container modal_show";
      setModalShow(true);
    } else {
      showBackgoundRef.current.className = "main_modal_container";
      showFilterRef.current.className = "modal_container";
      setModalShow(false);
    }
  };

  /*
   * Show and Hiden Modal Create
   */
  const handlerModalAgregar = () => {
    if (!modalShow) {
      showBackgoundRef.current.className =
        "main_modal_container main_modal_container-show";
      showAgregarRef.current.className = "modal_container modal_show";
      setModalShow(true);
    } else {
      showBackgoundRef.current.className = "main_modal_container";
      showAgregarRef.current.className = "modal_container";
      setModalShow(false);

      setNombre("");
      setSlug("");
    }
  };

  /*
   * Show and Hiden Modal Edit
   */
  const handlerModalEditar = () => {
    if (!modalShow) {
      showBackgoundRef.current.className =
        "main_modal_container main_modal_container-show";
      showEditarRef.current.className = "modal_container modal_show";
      setModalShow(true);
    } else {
      showBackgoundRef.current.className = "main_modal_container";
      showEditarRef.current.className = "modal_container";
      setModalShow(false);

      setNombreU("");
      setSlugU("");
      setImgU("");
    }
  };

  /*
   * Show and Hiden Modal Delete
   */
  const handlerModalBorrar = () => {
    if (!modalShow) {
      showBackgoundRef.current.className =
        "main_modal_container main_modal_container-show";
      showBorrarRef.current.className = "modal_container modal_show";
      setModalShow(true);
    } else {
      showBackgoundRef.current.className = "main_modal_container";
      showBorrarRef.current.className = "modal_container";
      setModalShow(false);

      setNombreD("");
      setImgD("");
    }
  };

  /*
   * OnChange Images
   */
  const handlerChangeImage = (e) => {
    if (e.target.files[0]) {
      imageRef.current.src = URL.createObjectURL(e.target.files[0]);
    } else {
      imageRef.current.src = url_images + "marco-photo.png";
    }
  };

  /*
   * Message of Error (Swal)
   */
  const handlerError = async (text) => {
    Swal.fire({
      icon: "error",
      text: text,
    });
  };

  /*
   * Crear una Categoría
   */
  const handlerCreate = async () => {
    const form = document.getElementById("form-agregar");
    const formData = new FormData(form);

    let error = 0;

    if (formData.get("name") > "") {
    } else {
      handlerError("Debe informar el nombre de la categoría");
      error = 1;
    }

    if ((error = 0)) {
      if (formData.get("image") > "") {
      } else {
        handlerError("Debe informar una imagen para la categoría");
        error = 1;
      }
    }

    if (error === 0) {
      try {
        await axios.post(
          endpoint + "/category",
          {
            name: formData.get("name"),
            slug: formData.get("slug"),
            image: formData.get("image"),
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } catch (errors) {
        console.log(errors);
      }

      handlerModalAgregar();

      allCategories(inicio, filas);
    }
  };

  /*
   * Manejo de la edición de la categoría
   */
  const handlerEdit = async (id) => {
    await getCategory(id);

    setIden(id);

    handlerModalEditar();
  };

  /*
   * Actualizamos la categoría
   */
  const handlerUpdate = async () => {
    const form = document.getElementById("form-editar");
    const formData = new FormData(form);

    try {
      await axios.put(
        endpoint + "/category/" + iden,
        {
          name: formData.get("name"),
          slug: formData.get("slug"),
          image: formData.get("image"),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (errors) {
      console.log(errors);
    }

    handlerModalEditar();

    allCategories(inicio, filas);
  };

  /*
   * Manejo de la eliminación de la categoría
   */
  const handlerBorrar = async (id) => {
    await getCategory(id);

    setIden(id);

    handlerModalBorrar();
  };

  /*
   * Eliminamos la categoría
   */
  const handlerDelete = async () => {
    try {
      const response = await axios.delete(endpoint + "/category/" + iden);
    } catch (errors) {
      console.log(errors);
    }

    handlerModalBorrar();

    allCategories(inicio, filas);
  };

  const handlerList = (e) => {
    setStatus(true);
  };

  const handlerGrid = (e) => {
    setStatus(false);
  };

  /*
   * Navegacion
   */
  const navPrevious = async (pagina) => {
    if (pagina > 1) {
      let p = pagina - 1;
      let ini = p * filas - filas + 1;
      if (p === 1) {
        ini = ini - 1;
      }

      setPageActual(p);
      setInicio(ini);

      allCategories(ini, filas);
    }
  };

  const navNext = async (pagina) => {
    if (pagina < pages) {
      let p = pagina + 1;
      let ini = p * filas - filas + 1;
      if (p === 1) {
        ini = ini - 1;
      }

      setPageActual(p);
      setInicio(ini);

      allCategories(ini, filas);
    }
  };

  const navChangeRow = async (row) => {
    let ini = pageActual * row - row + 1;
    setFilas(row);

    allCategories(ini, row);
  };

  const navChangePage = async (page) => {
    let ini = page * filas - filas + 1;
    if (page === 1) {
      ini = ini - 1;
    }

    setPageActual(page);
    setInicio(ini);

    allCategories(ini, filas);
  };

  /* Generar el slug */
  function slugify(texto) {
    return texto
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  return (
    <>
      <main>
        <div className="backend container-fluid mt-32">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <h3 className="title">categorías</h3>
            </div>
          </div>
          <div className="comandos">
            <div className="comandos-izq">
              <div className="dropdown">
                <button
                  className="btn btn-outline-dark dropdown-toggle button_filas"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filas
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link
                      to="/categories"
                      onClick={() => navChangeRow(10)}
                      className="dropdown-item"
                    >
                      10
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      onClick={() => navChangeRow(20)}
                      className="dropdown-item"
                    >
                      20
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      onClick={() => navChangeRow(30)}
                      className="dropdown-item"
                    >
                      30
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      onClick={() => navChangeRow(40)}
                      className="dropdown-item"
                    >
                      40
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      onClick={() => navChangeRow(50)}
                      className="dropdown-item"
                    >
                      50
                    </Link>
                  </li>
                </ul>
              </div>
              <input
                type="text"
                className="form-control"
                value={filas}
                style={{ width: "50px" }}
                readOnly
              />
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <Link
                      onClick={() => navPrevious(pageActual)}
                      className="page-link"
                      href="/categories"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </Link>
                  </li>
                  {pages === 1 ? (
                    <>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(1)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                    </>
                  ) : pages === 2 ? (
                    <>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(1)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                    </>
                  ) : pages === 3 ? (
                    <>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(1)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                    </>
                  ) : pages === 4 ? (
                    <>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(1)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(4)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          4
                        </Link>
                      </li>
                    </>
                  ) : pages === 5 ? (
                    <>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(1)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(4)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          4
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(5)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          5
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(1)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(4)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          4
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(5)}
                          to="/categories"
                          className="page-link"
                          href="#"
                        >
                          5
                        </Link>
                      </li>
                    </>
                  )}
                  <li className="page-item">
                    <Link
                      onClick={() => navNext(pageActual)}
                      className="page-link"
                      href="/categories"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <Link
                to="/categories"
                onClick={handlerList}
                className="list_table"
              >
                <img src="public/images/list-task.svg" alt="list-task" />
              </Link>
              <Link
                to="/categories"
                onClick={handlerGrid}
                className="grid_table"
              >
                <img src="public/images/grid.svg" alt="grid" />
              </Link>
            </div>
            <div className="comandos-der">
              <Link
                to="/categories"
                onClick={() => handlerModalAgregar()}
                className="btn btn-outline-primary button_agregar"
              >
                Agregar
              </Link>
            </div>
          </div>
          <div className="contenido">
            {status ? (
              <div className="row">
                <div className="col-sm-12">
                  <table className="table table-responsive table-bordered table-hover table-dark">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((item, i) => (
                        <tr key={i}>
                          <th scope="row">{item.id}</th>
                          <td>
                            <img
                              src={`${url_images}${item.image}`}
                              width="50"
                              alt=""
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>
                            <Link
                              to="/categories"
                              onClick={() => handlerEdit(item.id)}
                              className="btn btn-sm btn-outline-success button_editar mb-1"
                              style={{ width: "100px" }}
                            >
                              Editar
                            </Link>

                            <button
                              onClick={() => handlerBorrar(item.id)}
                              className="btn btn-sm btn-outline-danger button_borrar mb-1"
                              style={{ width: "100px" }}
                            >
                              Borrar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="row">
                {categories.map((item, i) => (
                  <div key={i} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                    <div className="card card-grid mt-3">
                      <div className="img-grid-container">
                        <img
                          src={`${url_images}${item.image}`}
                          width="150"
                          alt=""
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">{item.name}</h5>
                        <div className="grid-buttons">
                          <button
                            onClick={() => handlerEdit(item.id)}
                            className="btn btn-outline-success button_editar mt-2"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handlerBorrar(item.id)}
                            className="btn btn-outline-danger button_borrar mt-2"
                          >
                            Borrar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="main_modal_container" ref={showBackgoundRef}></div>

      <div className="modal_container" ref={showFilterRef}>
        <div className="card">
          <div className="card-header">FILTROS</div>
          <div className="card-body">
            <h5 className="card-title"></h5>
          </div>

          <div className="card-footer text-right text-muted">
            <Link
              to="/categories"
              onClick={() => handlerModalFilter()}
              className="btn btn-secondary"
            >
              Salir
            </Link>
          </div>
        </div>
      </div>
      <div className="modal_container" ref={showAgregarRef}>
        <div className="card">
          <div className="card-header">AGREGAR CATEGORÍA</div>
          <div className="card-body text-center p-2">
            <h5 className="card-title"></h5>
            <form
              id="form-agregar"
              action=""
              method="POST"
              encType="multipart/form-data"
            >
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => {
                    setSlug(slugify(e.target.value));
                    setNombre(e.target.value);
                  }}
                  name="name"
                />
                <input
                  type="hidden"
                  className="form-control mt-3"
                  value={slug}
                  name="slug"
                  readOnly
                />
                <div className="box-photo">
                  <img
                    src={`${url_images}marco-photo.png`}
                    alt="photo"
                    ref={imageRef}
                  />
                </div>
                <label htmlFor="inputFile" className="archivoCreate form-label">
                  Seleccionar una Imagén
                  <input
                    id="inputFile"
                    type="file"
                    className="form-control mt-3"
                    name="image"
                    onChange={(e) => handlerChangeImage(e)}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <button
                onClick={() => handlerCreate()}
                type="button"
                className="btn btn-outline-success button_agregar"
              >
                Agregar
              </button>
              <button
                onClick={() => handlerModalAgregar()}
                type="button"
                className="btn btn-outline-secondary button_salir"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="modal_container" ref={showEditarRef}>
        <div className="card">
          <div className="card-header">EDITAR CATEGORÍA</div>
          <div className="card-body">
            <div className="img-container">
              {imgU ? (
                <img src={`${url_images}${imgU}`} width="150" alt="" />
              ) : null}
            </div>
            <h5 className="card-title"></h5>
            <form
              id="form-editar"
              action=""
              method="POST"
              encType="multipart/form-data"
            >
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombreU}
                  onChange={(e) => {
                    setSlugU(slugify(e.target.value));
                    setNombreU(e.target.value);
                  }}
                  name="name"
                />
                <input
                  type="hidden"
                  className="form-control mt-3"
                  value={slugU}
                  name="slug"
                  readOnly
                />
                <label htmlFor="inputFile" className="archivoCreate form-label">
                  Seleccionar una Imagén
                  <input
                    id="inputFile"
                    type="file"
                    className="form-control mt-3"
                    name="image"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <button
                onClick={() => handlerUpdate()}
                type="button"
                className="btn btn-outline-success button_editar"
              >
                Actualizar
              </button>
              <button
                onClick={() => handlerModalEditar()}
                type="button"
                className="btn btn-outline-secondary button_salir"
              >
                Salir
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="modal_container" ref={showBorrarRef}>
        <div className="card">
          <div className="card-header">BORRAR CATEGORÍA</div>
          <div className="card-body">
            <div className="img-container">
              {imgD ? (
                <img src={`${url_images}${imgD}`} width="150" alt="" />
              ) : null}
            </div>
            <h5 className="card-title"></h5>
            <form>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  value={nombreD}
                  className="form-control"
                  readOnly
                />
              </div>
            </form>
          </div>

          <div className="card-footer text-right text-muted">
            <Link
              to="/categories"
              onClick={() => handlerDelete()}
              className="btn btn-outline-success button_borrar mr-3"
            >
              Eliminar
            </Link>
            <Link
              to="/categories"
              onClick={() => handlerModalBorrar()}
              className="btn btn-outline-secondary button_salir"
            >
              Salir
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
