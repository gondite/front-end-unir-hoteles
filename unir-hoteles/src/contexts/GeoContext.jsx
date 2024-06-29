import React, { createContext, useState } from 'react';

const GeoContext = createContext();

const GeoProvider = ({ children }) => {
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [usuario, setUsuario] = useState(null);
    const [newUser, registerUsuario] = useState(null);
    const [favoriteHotels, setFavoriteHotels] = useState([]);
    const [hotelData, setHotelData] = useState(null);
    const [hotels, setHotels] = useState([]);

    const addHotel = (hotel) => {
        setHotels((prevHotels) => [...prevHotels, hotel]);
    };

    const getHotelById = (hotelId) => {
        return  hotels[hotelId];
    };

    return (
        <GeoContext.Provider value={{
            favoriteCount,
            setFavoriteCount,
            usuario,
            setUsuario,
            newUser,
            registerUsuario,
            favoriteHotels,
            setFavoriteHotels,
            hotelData,
            setHotelData,
            hotels,
            setHotels, // Añadimos setHotels al contexto
            addHotel,
            getHotelById
        }}>
            {children}
        </GeoContext.Provider>
    );
};

export { GeoContext, GeoProvider };
