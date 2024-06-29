// WelcomeView.jsx
import React, { useState } from 'react';
import { CountdownTimer } from "./CountdownTimer";
import {HotelModal} from "./HotelModal";

import '../styles/welcome.css';
import { useNavigate } from "react-router";

export const WelcomeView = () => {
    const [hoursRemaining] = useState(24);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const navigate = useNavigate();

    const handleOpenModal = (hotel) => {
        setSelectedHotel(hotel);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const hotels = [
        {
            id: 1,
            title: "Hotel de Playa",
            description: "Disfruta del sol, la arena y el mar en nuestro hotel de playa. ¡Reserva ahora!",
            imageUrl: "https://images.unsplash.com/photo-1537639622086-73570d45a9ec?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8YmVhY2gtaG90ZWx8fHx8fHwxNzE1NDUwOTgz&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
        },
        {
            id: 2,
            title: "Hotel de Montaña",
            description: "Descubre la belleza natural de las montañas desde nuestro hotel de montaña.",
            imageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8bW91bnRhaW4taG90ZWx8fHx8fHwxNzE1NDUwOTM3&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
        },
        {
            id: 3,
            title: "Hotel de degustación culinaria",
            description: "Prueba las delicias culinarias locales en nuestro hotel de degustación culinaria.",
            imageUrl: "https://images.unsplash.com/photo-1580682196728-88aeee0a86bf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8Y3VsaW5hcnl8fHx8fHwxNzE1NDUwOTAy&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
        },
        {
            id: 4,
            title: "Hotel de Lujo",
            description: "Vive la experiencia de lujo en nuestro hotel de 5 estrellas.",
            imageUrl: "https://images.unsplash.com/photo-1498503403619-e39e4ff390fe?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=450&ixid=MnwxfDB8MXxyYW5kb218MHx8bHV4dXJ5LWhvdGVsfHx8fHx8MTcxNTQ1MDg1NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=500"
        }

    ];

    return (
        <div className="container">
            <div className="welcome-view">
                <div className="center-align">
                    <h2 className="welcome-header">¡Bienvenido a nuestra aplicación de búsqueda de hoteles!</h2>
                    <p className="welcome-message">Encuentra el hotel perfecto para tu próxima escapada.</p>
                    <button onClick={() => navigate('/search')} className="btn waves-effect waves-light pulse">Empieza a
                        buscar tu hotel ahora
                    </button>
                    <div className="timer">
                        <CountdownTimer hoursRemaining={hoursRemaining}/>
                    </div>
                </div>
                <br/>

                <div className="row">
                    {hotels.map(hotel => (
                        <div key={hotel.id} className="col s12 m3">
                            <div className="card" onClick={() => handleOpenModal(hotel)} >
                                <div className="card-image ">
                                    <img src={hotel.imageUrl} alt={hotel.title} />
                                    <span className="card-title">{hotel.title}</span>
                                </div>
                                <div className="card-content">
                                    <p>{hotel.description}</p>
                                </div>
                                <div className="card-action">
                                    <a onClick={() => handleOpenModal(hotel)} >Más información</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <HotelModal
                    id={selectedHotel.id}
                    title={selectedHotel.title}
                    description={selectedHotel.description}
                    imageUrl={selectedHotel.imageUrl}
                    onClose={handleCloseModal}
                />
            )}

        </div>

    );
};
