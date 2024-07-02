import React, { useContext, useEffect } from 'react';
import { HotelCard } from './HotelCard';
import '../styles/hotel-card.css';
import { GeoContext } from "../contexts/GeoContext";
import Map from "./Map";

export const HotelList = ({ hotels, searchQuery }) => {
    const { setHotels } = useContext(GeoContext);
    // Nos quedamos con hotels, sin aggregations
    const hotelsOnly = hotels.hotels || [];

    useEffect(() => {
        // Agregar la searchQuery a cada hotel antes de establecerlos en el contexto
        const hotelsWithSearchQuery = hotelsOnly.map((hotel) => ({
            ...hotel,
            searchQuery: searchQuery
        }));

        // Verificar si los datos a establecer son diferentes antes de actualizar
        if (!arraysAreEqual(hotelsWithSearchQuery, hotels)) {
            setHotels(hotelsWithSearchQuery);
        }
    }, [hotelsOnly, searchQuery, setHotels]);

    // Función para comparar dos arrays de hoteles para evitar bucle infinito
    const arraysAreEqual = (arr1, arr2) => {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i].id !== arr2[i].id) return false;
        }
        return true;
    };

    return (
        <div className="content search-hotels-container" id="hotel-cards">
            {hotelsOnly.length > 0 ? (
                hotelsOnly.map((hotel, index) => (
                    <HotelCard
                        key={index}
                        images={hotel.images}
                        title={hotel.name}
                        address={hotel.address}
                        description={hotel.description}
                        stars={hotel.stars}
                        maxOpinion={hotel.opinion}
                        price={hotel.price}
                        facilities={hotel.facilities} // Usar facilities del hotel
                        contactMail={hotel.contactMail}
                        contactNumber={hotel.contactNumber}
                        latitude={hotel.latitude}
                        longitude={hotel.longitude}
                        id={hotel.id}
                        searchQuery={searchQuery}
                        index={index}
                    />
                ))
            ) : (
                <Map />
            )}
            {hotelsOnly.length > 0 && (
                <div className="load-more-container center">
                    <button className="btn waves-effect waves-light pulse load-more">Cargar más</button>
                </div>
            )}
        </div>
    );
};
