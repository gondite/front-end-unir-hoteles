import React, {useContext, useState} from 'react';
import FacilitiesList from './FacilitiesList';
import ModalLogin from './ModalLogin';
import {useNavigate} from "react-router";
import {GeoContext} from "../contexts/GeoContext";
import Rating from '@mui/material/Rating';
import HotelMap from './HotelMap';
import swal from "sweetalert";

export const HotelCard = ({index, images, title, description, stars, maxOpinion, price, facilities,contactMail,contactNumber,latitude,longitude,id, searchQuery}) => {
    // console.log(index)
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {usuario, favoriteHotels, setFavoriteHotels, setFavoriteCount} = useContext(GeoContext);

    // const {maxStars, maxOpinion, priceRange} = searchQuery;

    // const [price] = useState(getRandomPrice());

    const { setHotelData } = useContext(GeoContext);



    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleReservarClick = () => {
        if (usuario) {
            window.open("https://buy.stripe.com/test_14k3dMaQX9dM4249AE", "_blank");
        } else {
            setIsModalOpen(true);
        }
    };

    const handleFavoriteClick = () => {
        const isAlreadyFavorite = favoriteHotels.some(hotel => hotel.title === title);
        if (!isAlreadyFavorite) {
            setFavoriteHotels(prevHotels => [...prevHotels, {images,title,description,stars,maxOpinion,price,facilities,contactMail,contactNumber,latitude,longitude,searchQuery}]);
            setFavoriteCount(prevCount => prevCount + 1);
        } else {
            setFavoriteHotels(prevHotels => prevHotels.filter(hotel => hotel.title !== title));
            setFavoriteCount(prevCount => prevCount - 1);
        }
    };
    const { addFavoriteHotel } = useContext(GeoContext);
    const handleAddFavorite = async () => {
        const result = await addFavoriteHotel(id);
        console.log(result)
        if (result.success) {
            swal("Hotel añadido a favoritos", {
                title: "Hotel añadido a favoritos",
                text: "Se ha añadido el hotel a tu lista de favoritos",
                icon: "success",
                timer: 1500
            });
            handleFavoriteClick();
        } else {
            alert('Error al añadir hotel a favoritos: ' + result.message);
        }
    };
    const handleChatClick = (hotelId) => {
        setHotelData({images, title, description, stars, price, facilities, searchQuery});
        navigate(`/hoteles/${hotelId}/comentarios`);
    };

    const facilitiesArray = facilities.split(',').map(facility => {
        facility = facility.trim();
        return facility.charAt(0).toUpperCase() + facility.slice(1).toLowerCase().trim();
    });

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // function getRandomPrice() {
    //     const minPrice = 0;
    //     const maxPrice = Number(priceRange);
    //     return Math.floor(Math.random() * (maxPrice - minPrice + 1));
    // }
    const markers = [
        {
            latitude: latitude,
            longitude: longitude,
            hotelName: title,
            price: price,
            stars: stars,
            maxOpinion: maxOpinion,
            // facilities: facilitiesArray,
            contactMail: contactMail,
            contactNumber: contactNumber
        }

    ];

    return (
        <div className="card-hotel z-depth-2">
            <h5>{title} {stars && <Rating name="read-only" value={stars} readOnly/>}</h5>
            <div className="flex-container ">
                <div className="gallery-container">
                    <img src={images[currentImageIndex]} alt="Hotel" className="active"/>
                    <button className="gallery-button prev" onClick={handlePrevClick}><i
                        className="material-icons">arrow_back</i></button>
                    <button className="gallery-button next" onClick={handleNextClick}><i
                        className="material-icons">arrow_forward</i></button>
                </div>
                {latitude && longitude && <HotelMap markers={markers} />}
            </div>

            <div className="info-container">
                <div className="info-container-1">
                    <FacilitiesList facilities={facilitiesArray}/>
                </div>
                <p className="hotel-description">{description}</p>
                <div className="info-container-2">
                    {/*{maxOpinion.join(', ') && <p>maxOpiniones de usuarios: {maxOpinion.join(', ')}</p>}*/}
                    {maxOpinion &&
                        <p><i className="material-icons">rate_review</i> Opiniones de usuarios: {maxOpinion}</p>}
                    {searchQuery['trip-start'] && searchQuery['trip-end'] && (
                        <p><i className="material-icons">date_range</i> Fecha de inicio: {searchQuery['trip-start']} -
                            Fecha de fin: {searchQuery['trip-end']}</p>
                    )}
                    {price !== 0 && <p><i className="material-icons">attach_money</i> Precio: {price} €</p>}
                    {contactMail && (
                        <p>
                            <i className="material-icons">email</i>
                            Email: <a href={`mailto:${contactMail}`} >{contactMail}</a>
                        </p>
                    )}
                    {contactNumber && <p><i className="material-icons">phone</i> Teléfono: {contactNumber}</p>}
                </div>


            </div>

            <div className="card-footer">
                <button className="btn waves-effect waves-light" onClick={handleReservarClick}>Reservar</button>
                {usuario && (
                    <button
                        className={"btn waves-effect waves-light"}
                        onClick={() => handleChatClick(index)}>
                        <i className="material-icons">chat</i>
                    </button>
                )}
                {usuario && (
                    <button
                        className={`btn waves-effect waves-light favorite-button ${favoriteHotels.some(hotel => hotel.title === title) ? 'favorite-active' : ''}`}
                        onClick={handleAddFavorite}>
                        <i className="material-icons">favorite</i>
                    </button>
                )}
            </div>
            {isModalOpen && <ModalLogin onClose={handleCloseModal}/>}
        </div>
    );
};

