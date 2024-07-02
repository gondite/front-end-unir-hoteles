import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router";
import {GeoContext} from '../contexts/GeoContext';
import ModalLogin from "./ModalLogin";
import {ModalSignUp} from "./ModalSignUp";
import LogoImg from "../img/logo.webp";

export const Header = () => {
    const {usuario, setUsuario, favoriteCount,setFavoriteCount,setFavoriteHotels} = useContext(GeoContext);
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
        navigate('/');
        setUsuario(null);
        setFavoriteCount(0);
        setFavoriteHotels([]);
    };

    const handleRegistrarClick = () => {
        setIsSignUpModalOpen(true); // Abre el modal de registro al hacer clic en "Registrar"
    };

    const handleCloseSignUpModal = () => {
        setIsSignUpModalOpen(false); // Cierra el modal de registro
    };

    const fetchFavoriteHotels = async () => {
        try {
            const requestBody = {
                targetMethod: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const response = await fetch(`http://localhost:8762/ms-users/users/${usuario.id}/favorites`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            })
            console.log(response);
            if (!response.ok) {
                throw new Error('Error fetching favorites');
            }
            const favoriteIds = await response.text();
            const favoriteIdsArray = favoriteIds.split(',').map(id => id.trim());


            // const hotelPromises = favoriteIdsArray.map(id =>
            //
            //     fetch(`http://localhost:8762/ms-hotels/hotels/${id}`).then(res => res.json())
            // );

            const hotelPromises = favoriteIdsArray.map(id =>
                fetch(`http://localhost:8762/ms-hotels/hotels/${id}`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                }).then(res => res.json())
            );
            const favoriteHotels = await Promise.all(hotelPromises);
            console.log(favoriteHotels);
            setFavoriteHotels(favoriteHotels);
            setFavoriteCount(favoriteHotels.length);
        } catch (error) {
            console.error('Error fetching favorite hotels:', error);
        }
    };

    const handleFavoritesClick = async () => {
        await fetchFavoriteHotels();
        navigate('/favorites');
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
                            <a onClick={handleFavoritesClick}>
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
