import { useState } from "react";
import {Link} from "react-router-dom";
import Footfixed from "../../components/footfixed/Footfixed";
import storage from "../../Storage/storage";
import {useNavigate} from "react-router-dom";
import axios from "axios";

import './login.css';

export const Login = () => {
    /**
     * OJO, variables de entorno que todas las funciones
     * lo deben tener apenas empiezan
     */
    const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
    const url_images = import.meta.env.VITE_IMAGE;
    // fin

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const postLogin = async () => {
        try {
        const response = await axios.post(endpoint + "/auth/signin", {
            email: email,
            password: password,
        });
        if(response.data.auth){
            storage.set("authToken", response.data.token);
            storage.set("authUser", response.data.user);
            storage.set("authUserId", response.data.id);
            storage.set("auth", response.data.auth);
        } else {
            storage.set("authToken", null);
            storage.set("authUser", null);
            storage.set("authUserId", 0);
            storage.set("auth", response.data.auth);
        }
        return true;
        } catch (errores) {
            console.log(errores);
        }
    };

    /* 
    * Recupera el número del carro de compras, siempre y cuando el carro no haya sido
    * comprado(estado = 0), para aquellos usuarios que estan logeados.
    */
    const hayCarroPendiente = async () => {
        try {
          const response = await axios.post(endpoint + "/carroheader/totales", 
            {
              accion: "USU", 
              user_id: storage.get("authUserId"),
            }
          );
    
          if(response.data.status === true){
            storage.set("carroNumber", parseInt(response.data.numero));
         }
    
          return true;
        } catch (errors) {
          console.log(errors);
        }
    };
    
    const handlerLogin = async (e) => {

        e.preventDefault();
        
        await postLogin();

        await hayCarroPendiente();

        navigate("/");
    };

    return( 
        <>
            <div className="row justify-content-center mt-40">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">Iniciar Sesión</div>

                        <div className="card-body">
                            <form>

                                <div className="form-group row">
                                    <label className="col-md-4 col-form-label text-md-right">Correo Electrónico</label>

                                    <div className="col-md-6">
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row mt-3">
                                    <label className="col-md-4 col-form-label text-md-right">Contraseña</label>

                                    <div className="col-md-6">
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className="line-flex" 
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center"
                                            }}>
                                            <a className="btn btn-link" 
                                                href="#" 
                                                style={{
                                                    fontSize: "12px",
                                                    color: "#FFF"
                                                }}>
                                                ¿Olvidaste tu contraseña?
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-8 offset-md-4">
                                        <a href="/" onClick={handlerLogin} className="btn btn-outline-dark --button" style={{width: "275px"}}> Login
                                        </a>
                                    </div>
                                </div>

                                <div className="form-group row mt-3 mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <Link className="btn btn-link" to="/register" style={{color: "#FFF"}}><span>¿ No tienes cuenta ?</span> Regístrate</Link>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="areaMenuDesktop"></div>

            </div>

            <Footfixed />
        </>
    )
}
