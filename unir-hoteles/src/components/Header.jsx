import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router";
import {GeoContext} from '../contexts/GeoContext';
import ModalLogin from "./ModalLogin";
import {ModalSignUp} from "./ModalSignUp";
import LogoImg from "../img/logo.webp";

export const Header = () => {
    const {usuario, setUsuario, favoriteCount} = useContext(GeoContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // Estado para controlar la apertura del modal de registro
    const navigate = useNavigate();

    const handleIniciarClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleCerrarSesionClick = () => {
        setUsuario(null);
    };

    const handleRegistrarClick = () => {
        setIsSignUpModalOpen(true); // Abre el modal de registro al hacer clic en "Registrar"
    };

    const handleCloseSignUpModal = () => {
        setIsSignUpModalOpen(false); // Cierra el modal de registro
    };
    return (
        <div>
            <nav className="header">

                <a onClick={() => navigate('/')} className="brand-logo"> <img  src={LogoImg} alt="logo"
                                                className="logo-img"/> UNIR - HOTELES </a>

                {!usuario && (
                    <ul className="hide-on-med-and-down">
                        <li>
                        <a onClick={handleIniciarClick}><i
                                className="material-icons left">account_circle</i> Iniciar sesión</a>
                        </li>
                        <li>
                            <a onClick={handleRegistrarClick}><i
                                className="material-icons right">person</i>Registrar</a>
                        </li>
                    </ul>
                )}
                {usuario && (
                    <ul className="hide-on-med-and-down">
                        <li>
                            <a onClick={() => navigate('/search')}><i
                                className="material-icons left">account_circle</i> {usuario.nombre} - {usuario.id}</a>
                        </li>
                        <li>
                            <a onClick={() => navigate('/favorites')}>
                                <i className="material-icons left">favorite</i>
                                Favoritos (<span className="favorite-counter">{favoriteCount}</span>)
                            </a>
                        </li>
                        <li>
                            <a onClick={handleCerrarSesionClick}>
                                <i className="material-icons right">exit_to_app</i>
                                Cerrar sesión
                            </a>
                        </li>
                    </ul>
                )}
            </nav>
            {isModalOpen && <ModalLogin onClose={handleCloseModal}/>}
            {isSignUpModalOpen && <ModalSignUp
                onClose={handleCloseSignUpModal}/>}
        </div>
    );
};
