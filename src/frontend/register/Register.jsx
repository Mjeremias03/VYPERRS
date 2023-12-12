import { useState } from "react";
import storage from "../../Storage/storage";
import Footfixed from "../../components/footfixed/Footfixed";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";

export const Register = () => {
    /**
     * OJO, variables de entorno que todas las funciones
     * lo deben tener apenas empiezan
     */
    const endpoint = import.meta.env.VITE_URL + import.meta.env.VITE_CLIENT;
    const url_images = import.meta.env.VITE_IMAGE;
    // fin
  
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    const postRegister = async () => {

        try {
          const response = await axios.post(endpoint + "/auth/signup", {
            name: userName,
            email: email,
            password: password,
          });
    
          storage.set("authToken", response.data.token);
          storage.set("authUser", response.data.user);
          storage.set("authUserId", response.data.id);
          storage.set("auth", response.data.auth);
    
          return true;

        } catch (errors) {

            console.log(errors);

        }
      };
    
      const handleRegister = async (e) => {
        
        e.preventDefault();

        await postRegister();
        
        navigate("/");

      };
    

    return( 
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header text-center">Registrarse</div>

                        <div className="card-body">
                            <form>

                                <div className="form-group row">
                                    <label className="col-md-4 col-form-label text-md-right">Nombre de Usuario</label>

                                    <div className="col-md-6">
                                        <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row mt-3">
                                    <label className="col-md-4 col-form-label text-md-right">Correo Electrónico</label>

                                    <div className="col-md-6">
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row mt-3">
                                    <label className="col-md-4 col-form-label text-md-right">Contraseña</label>

                                    <div className="col-md-6">
                                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>

                                <div className="form-group row mt-3 mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button onClick={handleRegister} className="btn btn-outline-secondary --button" style={{width: "275px"}}>
                                            Registrarse
                                        </button>
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
