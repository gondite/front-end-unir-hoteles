import { useState, useEffect } from 'react';

// Función para construir el objeto de parámetros de consulta excluyendo 'sortBy'
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


const useFetch = (query) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Construye el objeto de parámetros de consulta a partir del objeto query excluyendo 'sortBy'
                const queryParams = buildQueryParams(query);
                console.log(queryParams)
                const requestBody = {
                    targetMethod: "GET",
                    queryParams
                };

                const response = await fetch('http://localhost:8762/ms-hotels/hotels', {
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
                setHotels(data);
                setError(null);
            } catch (error) {
                console.error("Error:", error); // Imprime el error en la consola
                setError(error.message);
                setHotels([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchData().then(() => console.log('Data fetched!'));
        }
    }, [query]);

    console.log(hotels)
    return { hotels, loading, error };
};

export default useFetch;
