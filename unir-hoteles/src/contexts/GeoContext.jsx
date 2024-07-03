import React, {createContext, useState, useEffect} from 'react';

const GeoContext = createContext();

const GeoProvider = ({children}) => {
    const url = "http://localhost:8762/ms-hotels/hotels?"
    const [favoriteCount, setFavoriteCount] = useState(0);
    const [usuario, setUsuario] = useState(null);
    // const [newUser, registerUsuario] = useState(null);
    const [favoriteHotels, setFavoriteHotels] = useState([]);
    const [hotelData, setHotelData] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [facets, setFacets] = useState({});
    const [selectedFacets, setSelectedFacets] = useState({});
    const [facetsUrl, setFacetsUrl] = useState(url);
    const [facetsQueryParams] = useState(new URLSearchParams());
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const buildQueryParams = (query) => {
        const params = {};
    
        for (const key in query) {
            if (key !== 'sortBy' && query[key] !== "" && query[key] !== null && query[key] !== undefined) {
                if (Array.isArray(query[key])) {
                    params[key] = query[key];
                } else {
                    // Verifica si es el campo 'maxOpinion' y conviértelo en un array
                    if (key === 'maxOpinion') {
                        params[key] = [query[key].toString()]; // Convierte a string si no lo está
                    } else {
                        params[key] = [query[key]];
                    }
                }
            }
        }
    
        return params;
    };

    const useFetch = async () => {

    
        useEffect(() => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    // Construye el objeto de parámetros de consulta a partir del objeto query excluyendo 'sortBy'
                    //const queryParams = buildQueryParams(query);
                    //console.log(queryParams)
                    const requestBody = {
                        targetMethod: "GET"
                    };
    
                    const response = await fetch(`${facetsUrl}&page=${page}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(requestBody), // Ajuste del cuerpo de la solicitud
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
    
                    const data = await response.json();
                    console.log("Response Data:", data); // Imprime la respuesta en la consola
                    setFacets(data.aggregations)
                    setHotels(prevData => [...prevData, ...data.hotels]);
                    setError(null);
                } catch (error) {
                    console.error("Error:", error); // Imprime el error en la consola
                    setError(error.message);
                    setHotels([]);
                } finally {
                    setLoading(false);
                }
            };
    
            
            fetchData().then(() => console.log('Data fetched!'));
            
        }, [facetsUrl, page]);
    
        console.log(hotels)
        return { hotels, loading, error };
    };

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

    const handleFacetChange = (facetKey, facetValue) => {

        //Se actualizan las facetas seleccionadas
        setSelectedFacets(prevState => {
            const newState = {...prevState};

            if (newState[facetKey] && newState[facetKey].includes(facetValue)) {
                newState[facetKey] = newState[facetKey].filter(value => value !== facetValue);
            } else {
                newState[facetKey] = newState[facetKey] ? [...newState[facetKey], facetValue] : [facetValue];
            }
            return newState;
        });

        //Si la faceta es de nombre o dirección, se añade directamente a la URL y se reemplaza si ya existía
        if (facetKey === "name" || facetKey === "address") {
            facetsQueryParams.set(facetKey, facetValue);
        }

        //Si actualmente ya se ha seleccionado la faceta, se valora si se quita todo el parametro o una parte, o se incluye
        else {
            if (facetsQueryParams.has(facetKey)) {
                const selectedFacetValues = facetsQueryParams.get(facetKey).split(',');
                let newSelectedFacetValues = [];

                //Se comprueba si el valor seleccionado ya estaba en la lista de valores seleccionados
                if (selectedFacetValues.includes(facetValue)) {
                    if (selectedFacetValues.length === 1) {
                        facetsQueryParams.delete(facetKey);
                    } else {
                        newSelectedFacetValues = selectedFacetValues.filter(value => value !== facetValue);
                    }
                } else {
                    //Se añade el valor seleccionado a la lista de valores seleccionados
                    selectedFacetValues.push(facetValue);
                    newSelectedFacetValues = selectedFacetValues;
                }

                //Si hubiese mas de un valor seleccionado para una faceta, se juntan en un solo string separado por comas
                if (newSelectedFacetValues.length > 0) {
                    facetsQueryParams.set(facetKey, newSelectedFacetValues.join(','));
                }
            } else {

                //Si no se ha seleccionado la faceta previamente, se añade a la lista de parametros
                facetsQueryParams.set(facetKey, facetValue);
            }
        }

        //Se actualizan variables de estado y se resetea el numero de pagina actual y la lista actual de empleados
        setFacetsUrl(url + decodeURIComponent(facetsQueryParams.toString()));
        setPage(0); // Reset page to 0 when facets change
        setHotels([]); // Clear current employees when facets change
    };

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
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
            setHotels,
            addHotel,
            getHotelById,
            addFavoriteHotel,
            getFavHotels,
            useFetch,
            facetsUrl,
            facets,
            handleFacetChange,
            selectedFacets,
            loadMore,
            loading,
            error
        }}>
            {children}
        </GeoContext.Provider>
    );
};

export {GeoContext, GeoProvider};
