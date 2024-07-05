import React, {useContext, useEffect, useState} from 'react';
import FacilitiesList from './FacilitiesList';
import {GeoContext} from "../contexts/GeoContext";
import Rating from '@mui/material/Rating';
import HotelMap from './HotelMap';
import {useNavigate} from "react-router";
import '../styles/hotel-card.css';
import '../styles/booking-card.css';
import ModalBooking from "./ModalBooking";
import Swal from "sweetalert2";
import swal from "sweetalert";


export const BookingCard = ({index, booking, hotel}) => {

    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        usuario,
        setUsuario,
        addFavoriteHotel,
        getFavHotels,
        setFavoriteCount,
        setHotelData
    } = useContext(GeoContext);

    // Check if the current hotel is in the user's favorites
    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (usuario) {
                try {
                    const favoriteIds = await getFavHotels();
                    if (favoriteIds.map(favId => favId.toString()).includes(hotel.id.toString())) {
                        setIsFavorite(true);
                    }
                } catch (error) {
                    console.error('Error checking favorite status:', error);
                }
            }
        };

        checkFavoriteStatus();
    }, [usuario, hotel.id, getFavHotels]);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleFavoriteClick = async () => {
        try {
            // Determinar el método a utilizar (PUT o DELETE)
            const method = isFavorite ? "DELETE" : "PUT";
            const result = await addFavoriteHotel(hotel.id, method);

            if (result.success) {
                // Actualizar el estado de favorito y el contador
                setIsFavorite(!isFavorite);
                setFavoriteCount(prevCount => isFavorite ? prevCount - 1 : prevCount + 1);
            } else {
                alert('Error al gestionar hotel como favorito: ' + result.message);
            }
        } catch (error) {
            console.error('Error al gestionar hotel como favorito:', error);
            alert('Error al gestionar hotel como favorito: ' + error.message);
        }
    };

    const handleChatClick = (hotelId) => {
        setHotelData(hotel);
        navigate(`/hoteles/${hotelId}/comentarios`);
    };

    const markers = [
        {
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            hotelName: hotel.title,
            price: hotel.price,
            stars: hotel.stars,
            maxOpinion: hotel.opinion,
            contactMail: hotel.contactMail,
            contactNumber: hotel.contactNumber
        }
    ];

    const handleModify = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        Swal.fire({
            title: '¿Estás seguro de que deseas cancelar la reserva?',
            text: "Esta a acción es irreversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                const body = {
                    "targetMethod": "DELETE"
                };

                fetch(process.env.REACT_APP_GW_URL + `/ms-bookings/bookings/${booking.id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
                    .then((response) => {
                        if (response.ok) {
                            swal("¡Cancelación exitosa!", "¡Gracias por elegirnos!", "success");
                            setUsuario(prevState => ({
                                ...prevState,
                                bookings: prevState.bookings.filter(b => b.id !== booking.id),
                            }))
                        }
                    })
                    .catch((error) => console.log(error));
            }
        });
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        navigate("/bookings")
    };

    const HotelInfo = () => {
        return (
            <>

            </>
        )
    }

    return (
        <div className="card-hotel z-depth-2">
            <div className="booking-container">
                <div className="container-hotel-info">
                    <h5>{hotel.name} {hotel.stars && <Rating name="read-only" value={hotel.stars} readOnly/>}</h5>
                    <div className="flex-container">
                        <div className="gallery-container">
                            <img src={hotel.images[currentImageIndex]} alt="Hotel" className="active"/>
                            <button className="gallery-button prev" onClick={handlePrevClick}><i
                                className="material-icons">arrow_back</i></button>
                            <button className="gallery-button next" onClick={handleNextClick}><i
                                className="material-icons">arrow_forward</i></button>
                        </div>
                        <div className="map-container-bookings">
                            {hotel.latitude && hotel.longitude && <HotelMap markers={markers}/>}
                        </div>
                        <div className="container-booking-info">
                            <h5>Información de la reserva</h5>
                            <div className="booking-info">
                                <p><b>Fecha Inicio:</b> <span>{booking.startDate}</span></p>
                                <p><b>Fecha Fin:</b> <span>{booking.endDate}</span></p>
                                <p><b>Contacto:</b> <span>{booking.contact}</span></p>
                                <p><b>Habitaciones:</b> <span>{booking.rooms}</span></p>
                                <p><b>Adultos:</b> <span>{booking.adults}</span></p>
                                <p><b>Niños:</b> <span>{booking.children}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="info-container">
                        <div className="info-container-1">
                            <FacilitiesList facilities={hotel.facilities}/>
                        </div>
                        <p className="hotel-description"><b>{hotel.address}</b> <br/>
                            {hotel.description}</p>
                        <div className="info-container-2">
                            {hotel.opinion &&
                                <p><i className="material-icons">rate_review</i> Opiniones de usuarios: {hotel.opinion}
                                </p>}
                            {hotel.price !== 0 &&
                                <p><i className="material-icons">attach_money</i> Precio: {hotel.price} €</p>}
                            {hotel.contactMail && (
                                <p>
                                    <i className="material-icons">email</i>
                                    Email: <a href={`mailto:${hotel.contactMail}`}>{hotel.contactMail}</a>
                                </p>
                            )}
                            {hotel.contactNumber &&
                                <p><i className="material-icons">phone</i> Teléfono: {hotel.contactNumber}</p>}

                        </div>

                    </div>

                    <div className="card-footer">
                        {usuario && (
                            <button
                                className="btn waves-effect waves-light"
                                // onClick={() => handleChatClick(index)}>
                                onClick={() => handleChatClick(hotel.id)}>
                                <i className="material-icons">chat</i>
                            </button>
                        )}
                        {usuario && (
                            <button
                                className={`btn waves-effect waves-light favorite-button ${isFavorite ? 'favorite-active' : ''}`}
                                onClick={handleFavoriteClick}>
                                <i className="material-icons">favorite</i>
                            </button>
                        )}
                        {usuario && (
                            <button
                                className="btn waves-effect waves-light"
                                // onClick={() => handleChatClick(index)}>
                                onClick={handleModify}>
                                Modificar
                            </button>
                        )}
                        {usuario && (
                            <button
                                className="btn waves-effect waves-light red"
                                onClick={handleCancel}>
                                Cancelar
                            </button>
                        )}
                    </div>

                </div>

            </div>
            {
                isModalOpen && <ModalBooking
                    hotelId={hotel.id}
                    startDate={booking.startDate ? booking.startDate : ''}
                    endDate={booking.endDate ? booking.endDate : ''}
                    contact={booking.contact}
                    bookingRooms={booking.rooms}
                    bookingAdults={booking.adults}
                    bookingChildren={booking.children}
                    onClose={handleCloseModal}
                    update={true}
                    bookingId={booking.id}
                ></ModalBooking>}
        </div>

    );
};
