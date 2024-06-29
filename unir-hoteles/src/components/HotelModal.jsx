import React from 'react';
import '../styles/hotel-modal.css';

export const HotelModal = ({id, onClose, title, description, imageUrl}) => {
    let hotelDescription;

    switch (id) {
        case 1:
            hotelDescription = (
                <>
                    <p>Descripción del hotel de playa:</p>
                    <p>
                        Disfruta de unas vacaciones inolvidables frente al mar en nuestro exclusivo hotel de playa.
                        Sumérgete en aguas cristalinas, relájate bajo el sol y déjate consentir por nuestro equipo de
                        profesionales. Descubre una experiencia única que combina comodidad, diversión y tranquilidad en
                        un entorno paradisíaco.
                        ¡Reserva ahora!
                    </p>
                </>
            );
            break;
        case 2:
            hotelDescription = (
                <>
                    <p>Descripción del hotel de montaña:</p>
                    <p>
                        Adéntrate en la majestuosidad de la naturaleza y encuentra la paz y la serenidad en nuestro
                        encantador hotel de montaña. Rodeado de imponentes picos y exuberantes bosques, nuestro
                        alojamiento te ofrece la oportunidad de desconectar del bullicio de la ciudad y conectarte con
                        la belleza natural que nos rodea. Déjate seducir por la calidez de nuestra hospitalidad y
                        disfruta de una estancia inolvidable en medio de un entorno espectacular.
                    </p>
                </>
            );
            break;
        case 3:
            hotelDescription = (
                <>
                    <p>Descripción del hotel de Degustación Culinaria:</p>
                    <p>
                        Embárcate en un viaje gastronómico único en nuestro exclusivo hotel de degustación culinaria.
                        Descubre los sabores y aromas más auténticos de la región mientras disfrutas de una experiencia
                        gastronómica de primer nivel. Desde exquisitos platos locales hasta innovadoras creaciones de la
                        cocina internacional, nuestro equipo de chefs expertos te llevará en un viaje culinario que
                        despertará todos tus sentidos.
                    </p>
                </>
            );
            break;
        case 4:
            hotelDescription = (
                <>
                    <p>Descripción del hotel de lujo:</p>
                    <p>
                        Sumérgete en el lujo y la elegancia en nuestro prestigioso hotel de 5 estrellas. Desde el
                        momento en que cruzas nuestras puertas, serás recibido con un servicio impecable y unas
                        instalaciones de primer nivel que te harán sentir como la realeza. Disfruta de habitaciones
                        lujosas, restaurantes gourmet, spa de clase mundial y todas las comodidades que necesitas para
                        una estancia inolvidable. Déjate consentir y vive una experiencia de lujo incomparable.
                    </p>
                </>
            );
            break;
        default:
            hotelDescription = (
                <p>Descripción del hotel no disponible.</p>
            );
    }

    return (
        <>
            <div className="modal fade" id={`modal${id}`} tabIndex="-1" role="dialog"
                 aria-labelledby={`modal${id}Label`} aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content center-align">
                        <div className="modal-header ">
                            <h5 className="modal-title">{title}</h5>
                            <span className="close" onClick={onClose}>&times;</span>
                        </div>
                        <hr/>
                        <div className="modal-body">
                            <img src={imageUrl} alt={title} className="img-fluid "/>
                            <hr/>
                            <p>{hotelDescription}</p>
                        </div>
                        <hr/>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light-primary font-weight-bold"
                                    data-dismiss="modal" onClick={onClose}>Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
