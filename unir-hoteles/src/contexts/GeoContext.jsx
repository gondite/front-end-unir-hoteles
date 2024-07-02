import React, {createContext, useState} from 'react';

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
            // console.log('response:', response)

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

    const addFavoriteHotel = async (hotelId, method) => {
        if (!usuario || !usuario.id) {
            return { success: false, message: 'Usuario no autenticado' };
        }

        try {
            let url;
            if (method === "PUT") {
                url = `http://localhost:8762/ms-users/users/${usuario.id}/favorites`;
            } else if (method === "DELETE") {
                url = `http://localhost:8762/ms-users/users/${usuario.id}/favorites/${hotelId}`;
            }

            const requestBody = {
                targetMethod: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    hotelIds: [hotelId]
                }
            };

            const response = await fetch(url, {
                method: "POST", // De acuerdo a la especificación, usar POST para la simulación de PUT o DELETE
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                return { success: true };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al gestionar hotel como favorito');
            }
        } catch (error) {
            console.error('Error al gestionar hotel como favorito:', error);
            return { success: false, message: error.message };
        }
    };

    const getFavHotels = async () => {
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
            if (!response.ok) {
                throw new Error('Error fetching favorites');
            }
            const favoriteIds = await response.text();
            return favoriteIds.split(',').map(id => id.trim());

        } catch (error) {
            console.error('Error fetching favorite hotels:', error);
        }
    }

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
            setHotels,
            addHotel,
            getHotelById,
            addFavoriteHotel,
            getFavHotels
        }}>
            {children}
        </GeoContext.Provider>
    );
};

export {GeoContext, GeoProvider};
