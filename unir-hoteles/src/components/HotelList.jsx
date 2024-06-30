import React, { useContext, useEffect } from 'react';
import { HotelCard } from './HotelCard';
import '../styles/hotel-card.css';
import { GeoContext } from "../contexts/GeoContext";
import Map from "./Map";

export const HotelList = ({ hotels, searchQuery }) => {
    const { setHotels } = useContext(GeoContext);
console.log(searchQuery)
console.log(hotels)
    useEffect(() => {
        // Agregar la searchQuery a cada hotel antes de establecerlos en el contexto
        const hotelsWithSearchQuery = hotels.map((hotel) => ({
            ...hotel,
            searchQuery: searchQuery
        }));
        setHotels(hotelsWithSearchQuery);
    }, [hotels, searchQuery, setHotels]);
    return (
        <div className="content search-hotels-container" id="hotel-cards">
            {hotels.length > 0 ? (
                hotels.map((hotel, index) => (

                    <HotelCard
                        key={index}
                        imageUrls={hotel.imageUrls}
                        title={hotel.name}
                        description={hotel.description}
                        stars={hotel.stars}
                        maxOpinion={hotel.opinion}
                        price={hotel.price}
                        facilities={hotel.facilities} // Usar facilities del hotel
                        contactMail={hotel.contactMail}
                        contactNumber={hotel.contactNumber}
                        searchQuery={searchQuery}
                        // contactMail={hotel.contactMail}
                        // contactNumber={hotel.contactNumber}
                        index={index}
                    />
                ))
            ) : (
                <Map />
            )}
        </div>
    );
};