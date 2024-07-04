import React, {useContext, useEffect} from 'react';
import useLogin from '../hooks/useLogin';
import '../styles/modal.css';
import swal from 'sweetalert';
import {useNavigate} from "react-router";
import {GeoContext} from "../contexts/GeoContext";

export const ModalLogin = ({onClose}) => {
    const {formData, handleChange, handleSubmit, error, isLoggedIn, resetLogin} = useLogin();
    const { setHotels } = useContext(GeoContext);
    const navigate = useNavigate();
    useEffect(() => {
        let timer;
        if (isLoggedIn) {
            timer = setTimeout(() => {
                onClose(); // Cierra automáticamente la ventana modal después de 5.5 segundos
            }, 5500);
        }

        return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
    }, [isLoggedIn, onClose]);

    const closeModal = () => {
        resetLogin();
        onClose();
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (isLoggedIn) {
        swal("¡Inicio de sesión exitoso!", `Bienvenido, ${formData.username}.`, "success")
            .then(() => {
                setHotels([]);
                closeModal();
                //navigate('/search');
            });
    }

    return (
        <div className={'login-modal'}>
            <div className={`modal ${isLoggedIn ? 'success' : ''}`}>
                <div className="modal-content">
                    {isLoggedIn ? (
                        <></>
                    ) : (
                        <> <span className="close" onClick={isLoggedIn ? closeModal : onClose}>&times;</span>
                            <h2>Iniciar sesión</h2>
                            <hr/>
                            <br/>
                            <form onSubmit={handleSubmit}>
                                <div className="input-field">
                                    <input id="username" type="text" name="username" required
                                           value={formData.username}
                                           onChange={handleChange}/>
                                    <label htmlFor="fullName">Usuario: (lboddamc)</label>
                                </div>
                                <br/>
                                <div className="input-field">
                                    <input id="password" type="password" name="password" required
                                           value={formData.password}
                                           onChange={handleChange}/>
                                    <label htmlFor="fullName">Contraseña: (1237)</label>
                                </div>
                                {error && <p className="error-message">Error: {error}</p>}
                                <button className="btn waves-effect waves-light" type="submit">Iniciar sesión</button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;
