import React, {useContext} from 'react';
import {HotelFavCard} from './HotelFavCard';
import {GeoContext} from "../contexts/GeoContext";

export const HotelFavList = () => {
    const {favoriteHotels, favoriteCount} = useContext(GeoContext);
console.log(favoriteHotels)
    return (
        <div className="container">
            <div className="content" id="hotel-cards">
                {favoriteHotels.length > 0 ? (
                    <>
                        {favoriteHotels.map((hotel, index) => (
                            <HotelFavCard
                                key={index}
                                hotel={hotel}
                                images={hotel.images}
                                title={hotel.title}
                                description={hotel.description}
                                stars={hotel.stars}
                                maxOpinion={hotel.opinion}
                                price={hotel.price}
                                facilities={hotel.facilities}
                                contactMail={hotel.contactMail}
                                contactNumber={hotel.contactNumber}
                                latitude={hotel.latitude}
                                longitude={hotel.longitude}
                                searchQuery={hotel.searchQuery}
                                isFavorite={true} // Pasa el estado isFavorite como prop
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
