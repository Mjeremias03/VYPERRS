import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

function Cupons() {
  /**
   * OJO, variables de entorno que todas las funciones
   * lo deben tener apenas empiezan
   */
  const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
  const url_images = import.meta.env.VITE_IMAGE;
  // fin

  const [categories, setCupons] = useState([]);

  const [modalShow, setModalShow] = useState(false);

  const [pageActual, setPageActual] = useState(1);
  const [pages, setPages] = useState(0);
  const [inicio, setInicio] = useState(0);
  const [filas, setFilas] = useState(10);

  const [iden, setIden] = useState(0);

  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [anoVenc, setAnoVenc] = useState("");
  const [mesVenc, setMesVenc] = useState("");
  const [diaVenc, setDiaVenc] = useState("");
  const [importe, setImporte] = useState(0);
  const [pje, setPje] = useState(0);
  const [veces, setVeces] = useState(0);

  const [codigoU, setCodigoU] = useState("");
  const [nombreU, setNombreU] = useState("");
  const [anoVencU, setAnoVencU] = useState("");
  const [mesVencU, setMesVencU] = useState("");
  const [diaVencU, setDiaVencU] = useState("");
  const [importeU, setImporteU] = useState(0);
  const [pjeU, setPjeU] = useState(0);
  const [vecesU, setVecesU] = useState(0);

  const [codigoD, setCodigoD] = useState("");
  const [nombreD, setNombreD] = useState("");
  const [anoVencD, setAnoVencD] = useState("");
  const [mesVencD, setMesVencD] = useState("");
  const [diaVencD, setDiaVencD] = useState("");
  const [importeD, setImporteD] = useState(0);
  const [pjeD, setPjeD] = useState(0);
  const [vecesD, setVecesD] = useState(0);

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

  /*
   * Leer todas las cupones
   */
  const allCupons = async (start, rows) => {
    try {
      const response = await axios.get(
        endpoint + "/cupons/" + start + "/" + rows
      );

      setCupons(response.data.rows);
      setPages(response.data.paginas);

      return true;
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    allCupons(inicio, filas);
  }, []);

  /*
   * Leer una cupon
   */
  const getCupon = async (id) => {
    try {
      const response = await axios.get(endpoint + "/cupon/" + id);

      const mes = 100 + parseInt(response.data.mesVenc);
      const txtmes = mes.toString();

      const dia = 100 + parseInt(response.data.diaVenc);
      const txtdia = dia.toString();

      setCodigoU(response.data.codigo);
      setNombreU(response.data.nombre);
      setAnoVencU(response.data.anoVenc);
      setMesVencU(response.data.mesVenc);
      setDiaVencU(response.data.diaVenc);
      setImporteU(response.data.importe);
      setPjeU(response.data.pje);
      setVecesU(response.data.veces);

      setCodigoD(response.data.codigo);
      setNombreD(response.data.nombre);
      setAnoVencD(response.data.anoVenc);
      setMesVencD(txtmes.substr(1, 2));
      setDiaVencD(txtdia.substr(1, 2));
      setImporteD(response.data.importe);
      setPjeD(response.data.pje);
      setVecesD(response.data.veces);

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

      setCodigo("");
      setNombre("");
      setAnoVenc("");
      setMesVenc("");
      setDiaVenc("");
      setImporte(0);
      setPje(0);
      setVeces(0);
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

      setCodigoU("");
      setNombreU("");
      setAnoVencU("");
      setMesVencU("");
      setDiaVencU("");
      setImporteU(0);
      setPjeU(0);
      setVecesU(0);
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

      setCodigoD("");
      setNombreD("");
      setAnoVencD("");
      setMesVencD("");
      setDiaVencD("");
      setImporteD(0);
      setPjeD(0);
      setVecesD(0);
    }
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

  /*
   * Crear una Cupon
   */
  const handlerCreate = async () => {
    const form = document.getElementById("form-agregar");
    const formData = new FormData(form);

    let error = 0;

    if (formData.get("codigo") === "") {
      handlerError("Debe informar el código del cupón");
      error = 1;
    }

    if (formData.get("nombre") === "") {
      handlerError("Debe informar el nombre del cupón");
      error = 1;
    }

    if (formData.get("anoVenc") === "") {
      handlerError("Debe el año del vencimiento");
      error = 1;
    }

    if (formData.get("mesVenc") === "") {
      handlerError("Debe el mes del vencimiento");
      error = 1;
    }

    if (formData.get("diaVenc") === "") {
      handlerError("Debe el dia del vencimiento");
      error = 1;
    }

    if (formData.get("importe") > 0 || formData.get("pje") > 0) {
    } else {
      handlerError("Debe informar el importe o el porcentaje del cupón");
      error = 1;
    }

    if (formData.get("veces") > 0) {
    } else {
      handlerError(
        "Debe informar las veces que el cupón puede ser utilizado, por el comprador"
      );
      error = 1;
    }

    if (error === 0) {
      const mes = 100 + parseInt(formData.get("mesVenc"));
      const txtmes = mes.toString();

      const dia = 100 + parseInt(formData.get("diaVenc"));
      const txtdia = dia.toString();

      try {
        const response = await axios.post(endpoint + "/cupon", {
          codigo: formData.get("codigo"),
          nombre: formData.get("nombre"),
          anoVenc: formData.get("anoVenc"),
          mesVenc: txtmes.substr(1, 2),
          diaVenc: txtdia.substr(1, 2),
          importe: formData.get("importe"),
          pje: formData.get("pje"),
          veces: formData.get("veces"),
        });
      } catch (errors) {
        console.log(errors);
      }

      handlerModalAgregar();

      allCupons(inicio, filas);
    }
  };

  const handlerEdit = async (id) => {
    await getCupon(id);

    setIden(id);

    handlerModalEditar();
  };

  const handlerUpdate = async () => {
    const form = document.getElementById("form-editar");
    const formData = new FormData(form);

    let error = 0;

    if (formData.get("codigoU") === "") {
      handlerError("Debe informar el código del cupón");
      error = 1;
    }

    if (formData.get("nombreU") === "") {
      handlerError("Debe informar el nombre del cupón");
      error = 1;
    }

    if (formData.get("anoVencU") === "") {
      handlerError("Debe el año del vencimiento");
      error = 1;
    }

    if (formData.get("mesVencU") === "") {
      handlerError("Debe el mes del vencimiento");
      error = 1;
    }

    if (formData.get("diaVencU") === "") {
      handlerError("Debe el dia del vencimiento");
      error = 1;
    }

    if (formData.get("importeU") > 0 || formData.get("pjeU") > 0) {
    } else {
      handlerError("Debe informar el importe o el porcentaje del cupón");
      error = 1;
    }

    if (formData.get("vecesU") > 0) {
    } else {
      handlerError(
        "Debe informar las veces que el cupón puede ser utilizado, por el comprador"
      );
      error = 1;
    }

    if (error === 0) {
      const mes = 100 + parseInt(formData.get("mesVencU"));
      const txtmes = mes.toString();

      const dia = 100 + parseInt(formData.get("diaVencU"));
      const txtdia = dia.toString();

      try {
        const response = await axios.put(endpoint + "/cupon/" + iden, {
          codigo: formData.get("codigoU"),
          nombre: formData.get("nombreU"),
          anoVenc: formData.get("anoVencU"),
          mesVenc: txtmes.substr(1, 2),
          diaVenc: txtdia.substr(1, 2),
          importe: formData.get("importeU"),
          pje: formData.get("pjeU"),
          veces: formData.get("vecesU"),
        });
      } catch (errors) {
        console.log(errors);
      }

      handlerModalEditar();

      allCupons(inicio, filas);
    }
  };

  const handlerBorrar = async (id) => {
    await getCupon(id);

    setIden(id);

    handlerModalBorrar();
  };

  const handlerDelete = async () => {
    try {
      const response = await axios.delete(endpoint + "/cupon/" + iden);
    } catch (errors) {
      console.log(errors);
    }

    handlerModalBorrar();

    allCupons(inicio, filas);
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

      allCupons(ini, filas);
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

      allCupons(ini, filas);
    }
  };

  const navChangeRow = async (row) => {
    let ini = pageActual * row - row + 1;
    setFilas(row);

    allCupons(ini, row);
  };

  const navChangePage = async (page) => {
    let ini = page * filas - filas + 1;
    if (page === 1) {
      ini = ini - 1;
    }

    setPageActual(page);
    setInicio(ini);

    allCupons(ini, filas);
  };

  return (
    <>
      <main>
        <div className="backend container-fluid mt-32">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
              <h3 className="title">cupones</h3>
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
                      to="/cupons"
                      onClick={() => navChangeRow(10)}
                      className="dropdown-item"
                    >
                      10
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cupons"
                      onClick={() => navChangeRow(20)}
                      className="dropdown-item"
                    >
                      20
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cupons"
                      onClick={() => navChangeRow(30)}
                      className="dropdown-item"
                    >
                      30
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cupons"
                      onClick={() => navChangeRow(40)}
                      className="dropdown-item"
                    >
                      40
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cupons"
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
                      to="/cupons"
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
                          to="/cupons"
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
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/cupons"
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
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/cupons"
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
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(4)}
                          to="/cupons"
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
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(4)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          4
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(5)}
                          to="/cupons"
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
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          1
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(2)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(3)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(4)}
                          to="/cupons"
                          className="page-link"
                          href="#"
                        >
                          4
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          onClick={() => navChangePage(5)}
                          to="/cupons"
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
                      to="/cupons"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </Link>
                  </li>
                </ul>
              </nav>
              <Link to="/cupons" onClick={handlerList} className="list_table">
                <img src="public/images/list-task.svg" alt="list-task" />
              </Link>
              <Link to="/cupons" onClick={handlerGrid} className="grid_table">
                <img src="public/images/grid.svg" alt="grid" />
              </Link>
            </div>
            <div className="comandos-der">
              <Link
                to="/cupons"
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
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Vencimiento</th>
                        <th>Importe</th>
                        <th>Pje</th>
                        <th>Veces</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((item, i) => (
                        <tr key={i}>
                          <th scope="row">{item.id}</th>
                          <td>{item.codigo}</td>
                          <td>{item.nombre}</td>
                          <td>
                            {item.diaVenc +
                              "-" +
                              item.mesVenc +
                              "-" +
                              item.anoVenc}
                          </td>
                          <td>{item.importe}</td>
                          <td>{item.pje}</td>
                          <td>{item.veces}</td>
                          <td>
                            <button
                              onClick={() => handlerEdit(item.id)}
                              className="btn btn-sm btn-outline-success button_editar mb-1"
                              style={{width: "100px"}}
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => handlerBorrar(item.id)}
                              className="btn btn-sm btn-outline-danger button_borrar mb-1"
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
                    <div className="cupon card card-grid mt-3">
                      <div className="card-body">
                        <p>
                          Código: <span>{item.codigo}</span>
                        </p>
                        <p>
                          Nombre: <span>{item.nombre}</span>
                        </p>
                        <p>
                          Vencimiento:{" "}
                          <span>
                            {item.diaVenc +
                              "-" +
                              item.mesVenc +
                              "-" +
                              item.anoVenc}
                          </span>
                        </p>
                        <p>
                          Importe: <span>{item.importe}</span>
                        </p>
                        <p>
                          Pje: <span>{item.pje}</span>
                        </p>
                        <p>
                          Veces: <span>{item.veces}</span>
                        </p>

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
              to="/cupons"
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
          <div className="card-header">AGREGAR CUPÓN</div>
          <div className="card-body">
            <form id="form-agregar" action="" method="POST">
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Código</label>
                  <input
                    type="text"
                    className="form-control"
                    value={codigo}
                    onChange={(e) => {
                      setCodigo(e.target.value);
                    }}
                    name="codigo"
                  />

                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                    name="nombre"
                  />

                  <label className="form-label">Vencimiento</label>
                  <div className="container-vencimiento">
                    <input
                      type="text"
                      className="dia-venc form-control"
                      value={diaVenc}
                      onChange={(e) => {
                        setDiaVenc(e.target.value);
                      }}
                      name="diaVenc"
                    />
                    <input
                      type="text"
                      className="mes-venc form-control"
                      value={mesVenc}
                      onChange={(e) => {
                        setMesVenc(e.target.value);
                      }}
                      name="mesVenc"
                    />
                    <input
                      type="text"
                      className="ano-venc form-control"
                      value={anoVenc}
                      onChange={(e) => {
                        setAnoVenc(e.target.value);
                      }}
                      name="anoVenc"
                    />
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Importe</label>
                  <input
                    type="number"
                    className="form-control"
                    value={importe}
                    onChange={(e) => {
                      setImporte(e.target.value);
                    }}
                    name="importe"
                  />
                  <label className="form-label">Porcentaje</label>
                  <input
                    type="number"
                    className="form-control"
                    value={pje}
                    onChange={(e) => {
                      setPje(e.target.value);
                    }}
                    name="pje"
                  />
                  <label className="form-label">Veces a Utilizar</label>
                  <input
                    type="number"
                    className="form-control"
                    value={veces}
                    onChange={(e) => {
                      setVeces(e.target.value);
                    }}
                    name="veces"
                  />
                </div>
              </div>
              <button
                onClick={() => handlerCreate()}
                type="button"
                className="btn btn-outline-success button_editar"
                style={{width: "100px"}}
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
          <div className="card-header">EDITAR CUPÓN</div>
          <div className="card-body">
            <form id="form-editar" action="" method="POST">
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Código</label>
                  <input
                    type="text"
                    className="form-control"
                    value={codigoU}
                    onChange={(e) => {
                      setCodigoU(e.target.value);
                    }}
                    name="codigoU"
                  />

                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreU}
                    onChange={(e) => {
                      setNombreU(e.target.value);
                    }}
                    name="nombreU"
                  />

                  <label className="form-label">Vencimiento</label>
                  <div className="container-vencimiento">
                    <input
                      type="text"
                      className="dia-venc form-control"
                      value={diaVencU}
                      onChange={(e) => {
                        setDiaVencU(e.target.value);
                      }}
                      name="diaVencU"
                    />
                    <input
                      type="text"
                      className="mes-venc form-control"
                      value={mesVencU}
                      onChange={(e) => {
                        setMesVencU(e.target.value);
                      }}
                      name="mesVencU"
                    />
                    <input
                      type="text"
                      className="ano-venc form-control"
                      value={anoVencU}
                      onChange={(e) => {
                        setAnoVencU(e.target.value);
                      }}
                      name="anoVencU"
                    />
                  </div>
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Importe</label>
                  <input
                    type="number"
                    className="form-control"
                    value={importeU}
                    onChange={(e) => {
                      setImporteU(e.target.value);
                    }}
                    name="importeU"
                  />

                  <label className="form-label">Porcentaje</label>
                  <input
                    type="number"
                    className="form-control"
                    value={pjeU}
                    onChange={(e) => {
                      setPjeU(e.target.value);
                    }}
                    name="pjeU"
                  />

                  <label className="form-label">Veces a Utilizar</label>
                  <input
                    type="number"
                    className="form-control"
                    value={vecesU}
                    onChange={(e) => {
                      setVecesU(e.target.value);
                    }}
                    name="vecesU"
                  />
                </div>
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
          <div className="card-header">BORRAR CUPÓN</div>
          <div className="card-body">
            <form>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Código</label>
                  <input
                    type="text"
                    className="form-control"
                    value={codigoD}
                    name="codigo"
                    readOnly
                  />

                  <label className="form-label">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombreD}
                    name="nombre"
                    readOnly
                  />

                  <label className="form-label">Vencimiento</label>
                  <input
                    type="text"
                    className="form-control"
                    value={diaVencD + "-" + mesVencD + "-" + anoVencD}
                    name="vencimiento"
                    readOnly
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Importe</label>
                  <input
                    type="number"
                    className="form-control"
                    value={importeD}
                    name="importe"
                    readOnly
                  />

                  <label className="form-label">Porcentaje</label>
                  <input
                    type="number"
                    className="form-control"
                    value={pjeD}
                    name="pje"
                    readOnly
                  />

                  <label className="form-label">Veces a Utilizar</label>
                  <input
                    type="number"
                    className="form-control"
                    value={vecesD}
                    name="veces"
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="card-footer text-right text-muted">
            <Link
              to="/cupons"
              onClick={() => handlerDelete()}
              className="btn btn-outline-success mr-3 button_borrar"
            >
              Eliminar
            </Link>
            <Link
              to="/cupons"
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

export default Cupons;
