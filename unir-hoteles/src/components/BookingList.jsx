import React, { useContext, useEffect, useState } from 'react';
import { GeoContext } from '../contexts/GeoContext';
import {BookingCard} from "./BookingCard";

export const BookingList = () => {
    const { usuario, setUsuario } = useContext(GeoContext);
    const [loading, setLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const requestBody = {
                    "targetMethod": "GET",
                    "queryParams": {
                        "userId": [usuario.id]
                    }
                };
                const response = await fetch(`http://localhost:8762/ms-bookings/bookings`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                })
                console.log(response);
                if (!response.ok) {
                    throw new Error('Error fetching bookings');
                }
                const bookings = await response.json();
                const hotelIds = Array.from(new Set(bookings.map((booking) => booking.hotel)));
                const hotelPromises = hotelIds.map(id =>
                    fetch(`http://localhost:8762/ms-hotels/hotels/${id}`, {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(requestBody)
                    }).then(res => res.json())
                );
                const hotels = await Promise.all(hotelPromises);
                console.log(bookings)
                console.log(hotels)
                setBookings(bookings);
                setHotels(hotels);
                setLoading(false);  // Establecer loading a false después de cargar los hoteles

            } catch (error) {
                console.error('Error fetching favorite hotels:', error);
            }
        };

        if (usuario && usuario.id) {
            fetchUserBookings();
        }

    }, [usuario]);

    return (
        <div className="container">
            <div className="content" id="booking-cards">
                {loading ? (
                    <p>Cargando hoteles favoritos...</p>
                ) : bookings.length > 0 ? (
                    <>
                        {bookings.map((booking, index) => (
                            <BookingCard
                                index={index}
                                booking={booking}
                                hotel={hotels.find(hotel => hotel.id === booking.hotel)}
                            ></BookingCard>
                        ))}
                    </>
                ) : (
                    <p>No hay reservas</p>
                )}
            </div>
        </div>
    );
};