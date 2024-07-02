import React, {createContext, useState} from 'react';
import swal from 'sweetalert';

const GeoContext = createContext();

const GeoProvider = ({children}) => {
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [usuario, setUsuario] = useState(null);
    // const [newUser, registerUsuario] = useState(null);
    const [favoriteHotels, setFavoriteHotels] = useState([]);
    const [hotelData, setHotelData] = useState(null);
    const [hotels, setHotels] = useState([]);

    const addHotel = (hotel) => {
        setHotels((prevHotels) => [...prevHotels, hotel]);
    };

    const getHotelById = (hotelId) => {
        return hotels[hotelId];
    };

    const registerUsuario = async (newUser) => {
        try {
            // Extraer solo las propiedades necesarias
            const {username, password, email} = newUser;

            // Crear el cuerpo de la solicitud
            const requestBody = {
                targetMethod: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    username: username,
                    password: password,
                    email: email
                }
            };

            // Hacer la llamada fetch a la API
            const response = await fetch('http://localhost:8762/ms-users/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody) // Convertir el cuerpo a JSON
            });
            console.log('response:', response)
            // Manejar la respuesta
            if (response.ok) {
                const data = await response.json();
                console.log('Registro exitoso:', data);
                setUsuario({nombre: username, id: data.id});
                console.log('Usuario:', newUser);
                return {success: true, message: 'Registro exitoso'};
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar usuario');
            }
        } catch (error) {
            console.error('Error en el registro:', error);
            return {success: false, message: error.message};
        }
    };

    const addFavoriteHotel = async (hotelId) => {
        if (!usuario || !usuario.id) {
            return {success: false, message: 'Usuario no autenticado'};
        }

        try {

            const requestBody = {
                targetMethod: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    hotelIds: [hotelId]
                }
            };

            const response = await fetch(`http://localhost:8762/ms-users/users/${usuario.id}/favorites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });
            console.log('response:', response)
            if (response.ok) {
                return { success: true };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al añadir hotel a favoritos');
            }
        } catch (error) {
            console.error('Error al añadir hotel a favoritos:', error);
            return {success: false, message: error.message};
        }
    };
    return (
        <GeoContext.Provider value={{
            favoriteCount,
            setFavoriteCount,
            usuario,
            setUsuario,
            // newUser,
            registerUsuario,
            favoriteHotels,
            setFavoriteHotels,
            hotelData,
            setHotelData,
            hotels,
            setHotels, // Añadimos setHotels al contexto
            addHotel,
            getHotelById,
            addFavoriteHotel
        }}>
            {children}
        </GeoContext.Provider>
    );
};

export {GeoContext, GeoProvider};
