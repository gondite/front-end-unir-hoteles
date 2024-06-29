import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../img/404.webp";
import "../styles/not-found.css";

export const NotFound = () => {
    return (
        <div className="contenedor-404">
            <h1>404 Not Found</h1>
            <img src={NotFoundImage} alt="404 Not Found" className="img-404" />
            <p>Lo sentimos, la página que estás buscando no pudo ser encontrada.</p>
            <p>Pero no te preocupes, ¡podemos llevarte de vuelta a casa!</p>
            <Link to="/" className="btn">Ir a la página de inicio</Link>
        </div>
    );
};
