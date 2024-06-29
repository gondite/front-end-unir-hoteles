import React, { useContext, useEffect } from 'react';
import { HotelCard } from './HotelCard';
import '../styles/hotel-card.css';
import { GeoContext } from "../contexts/GeoContext";
import Map from "./Map";

export const HotelList = ({ hotels, searchQuery }) => {
    const { setHotels } = useContext(GeoContext);

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
                        title={hotel.title}
                        description={hotel.description}
                        facilities={hotel.facilities} // Usar facilities del hotel
                        searchQuery={searchQuery}
                        index={index}
                    />
                ))
            ) : (
                <Map />
            )}
        </div>
    );
};