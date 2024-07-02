import React, { useContext, useEffect, useState } from 'react';
import { HotelFavCard } from './HotelFavCard';
import { GeoContext } from '../contexts/GeoContext';

export const HotelFavList = () => {
    const { favoriteHotels, favoriteCount, usuario,setFavoriteCount, setFavoriteHotels } = useContext(GeoContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                setLoading(false);  // Establecer loading a false después de cargar los hoteles

            } catch (error) {
                console.error('Error fetching favorite hotels:', error);
            }
        };

        if (usuario && usuario.id) {
            fetchFavoriteHotels();
        }

    }, [usuario, setFavoriteHotels]);

    return (
        <div className="container">
            <div className="content" id="hotel-cards">
                {loading ? (
                    <p>Cargando hoteles favoritos...</p>
                ) : favoriteHotels.length > 0 ? (
                    <>
                        {favoriteHotels.map((hotel, index) => (
                            <HotelFavCard
                                key={index}
                                hotel={hotel}
                                images={hotel.images}
                                title={hotel.name}
                                address={hotel.address}
                                description={hotel.description}
                                stars={hotel.stars}
                                maxOpinion={hotel.opinion}
                                price={hotel.price}
                                facilities={hotel.facilities}
                                contactMail={hotel.contactMail}
                                contactNumber={hotel.contactNumber}
                                latitude={hotel.latitude}
                                longitude={hotel.longitude}
                                id={hotel.id}
                                searchQuery={hotel.searchQuery}
                            />
                        ))}
                        <p>Total de hoteles marcados como favoritos: {favoriteCount}</p>
                    </>
                ) : (
                    <p>No hay hoteles marcados como favoritos</p>
                )}
            </div>
        </div>
    );
};