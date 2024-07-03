import React, { useContext, useEffect } from 'react';
import { HotelCard } from './HotelCard';
import '../styles/hotel-card.css';
import { GeoContext } from "../contexts/GeoContext";
import Map from "./Map";

export const HotelList = ({ hotels, searchQuery, loadMore }) => {
    const { setHotels } = useContext(GeoContext);
    // Nos quedamos con hotels, sin aggregations
    const hotelsOnly = hotels || [];

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
                    <button className="btn waves-effect waves-light pulse load-more" onClick={loadMore}>Cargar más</button>
                </div>
            )}
        </div>
    );
};
