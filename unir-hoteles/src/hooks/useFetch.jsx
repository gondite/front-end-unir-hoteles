import { useState, useEffect } from 'react';

const hotelNames = [
    "Hotel Acuario",
    "Hotel Sol",
    "Hotel Luna",
    "Hotel Estrella",
    "Hotel Montaña",
    "Hotel Mar",
    "Hotel Playa",
    "Hotel Montaña",
    "Hotel Paraiso",
    "Hotel Cielo",
    "Hotel Aventura",
    "Hotel Serenidad",
    "Hotel Oasis",
    "Hotel Vista",
    "Hotel Tierra",
    "Hotel Encanto",
    "Hotel Jardín",
    "Hotel Bosque",
    "Hotel Terraza",
    "Hotel Río"
];

const hotelDescriptions = [
    "Un lugar increíble para relajarse y disfrutar de la naturaleza.",
    "Con impresionantes vistas al mar, este hotel te ofrece una estancia inolvidable.",
    "Experimenta el lujo y la comodidad en el corazón de la ciudad.",
    "Descubre un oasis de tranquilidad en este encantador hotel boutique.",
    "Disfruta de una escapada perfecta en nuestro hotel familiar.",
    "Descubre el paraíso en este maravilloso hotel junto a la playa.",
    "Sumérgete en la belleza natural de este hotel enclavado en las montañas.",
    "Encuentra la paz y la serenidad en este hotel de ensueño.",
    "Experimenta la aventura y la emoción en este hotel único.",
    "Disfruta de un retiro celestial en nuestro hotel en las alturas.",
    "Embárcate en una experiencia inolvidable en este hotel de lujo.",
    "Relájate y rejuvenece en este encantador hotel con vistas panorámicas.",
    "Descubre la magia y el encanto de este hotel boutique exclusivo.",
    "Contempla la belleza de la naturaleza desde nuestro hotel con vistas espectaculares.",
    "Vive una experiencia única en este hotel rodeado de exuberantes jardines.",
    "Sumérgete en la tranquilidad de la naturaleza en este hotel junto al bosque.",
    "Descubre un mundo de aventuras en este hotel con actividades para toda la familia.",
    "Déjate llevar por la belleza natural de este hotel con terrazas panorámicas.",
    "Disfruta de la serenidad junto al río en este encantador hotel.",
    "Explora la vida salvaje y la naturaleza en este hotel ecológico."
];


const getRandomElements = (array, numElements) => {
    const shuffledArray = array.sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, numElements);
};

const useFetch = (query) => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            console.log('Fetching data...')
            console.log(query)
            const hotelDataPromises = [];

            // Obtener 5 elementos aleatorios de los arrays de nombres y descripciones
            const randomHotelNames = getRandomElements(hotelNames, 5);
            const randomDescriptions = getRandomElements(hotelDescriptions, 5);

            for (let i = 0; i < 5; i++) {
                const galleryUrls = [
                    `https://source.unsplash.com/random/300x250/?hotel`,
                    `https://source.unsplash.com/random/300x250/?buffet`,
                    `https://source.unsplash.com/random/300x250/?spa`,
                    `https://source.unsplash.com/random/300x250/?swimmingpool`,
                    `https://source.unsplash.com/random/300x250/?room`,
                ];

                const imageUrls = await Promise.all(galleryUrls.map(async (url) => {
                    const response = await fetch(url);
                    return response.url;
                }));

                hotelDataPromises.push({
                    title: randomHotelNames[i],
                    description: randomDescriptions[i],
                    imageUrls,
                });
            }

            const hotelData = await Promise.all(hotelDataPromises);
            setHotels(hotelData);
            setError(null);
        } catch (error) {
            setError(error.message);
            setHotels([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (query) {
            // Si hay una consulta, se realiza la búsqueda
            fetchData().then(r => console.log('Data fetched!'));
        }
    }, [query]); //para cada cambio en query, se ejecuta el efecto, si es igual a la consulta anterior, no lo ejecuto

    return { hotels, loading, error };
};

export default useFetch;
