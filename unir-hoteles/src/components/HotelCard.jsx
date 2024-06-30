import React, {useContext, useState} from 'react';
import FacilitiesList from './FacilitiesList';
import ModalLogin from './ModalLogin';
import {useNavigate} from "react-router";
import {GeoContext} from "../contexts/GeoContext";
import Rating from '@mui/material/Rating';

export const HotelCard = ({index, imageUrls, title, description, stars, maxOpinion, price, facilities,contactMail,contactNumber, searchQuery}) => {
    // console.log(index)
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {usuario, favoriteHotels, setFavoriteHotels, setFavoriteCount} = useContext(GeoContext);

    // const {maxStars, maxOpinion, priceRange} = searchQuery;

    // const [price] = useState(getRandomPrice());

    const { setHotelData } = useContext(GeoContext);



    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
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
            setFavoriteHotels(prevHotels => [...prevHotels, {imageUrls, title, description, stars, price, facilities, searchQuery}]);
            setFavoriteCount(prevCount => prevCount + 1);
        } else {
            setFavoriteHotels(prevHotels => prevHotels.filter(hotel => hotel.title !== title));
            setFavoriteCount(prevCount => prevCount - 1);
        }
    };

    const handleChatClick = (hotelId) => {
        setHotelData({imageUrls, title, description, stars, price, facilities, searchQuery});
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
    return (
        <div className="card-hotel z-depth-2">
            <div className="gallery-container">
                {/*<img src={imageUrls[currentImageIndex]} alt="Hotel" className="active"/>*/}
                <button className="gallery-button prev" onClick={handlePrevClick}><i
                    className="material-icons">arrow_back</i></button>
                <button className="gallery-button next" onClick={handleNextClick}><i
                    className="material-icons">arrow_forward</i></button>
            </div>
            <div className="info-container">
                <h5>{title}  {stars && <Rating name="read-only" value={stars} readOnly />}</h5>
                <FacilitiesList facilities={facilitiesArray}/>
                <p>{description}</p>
                {/*{maxStars && <p>Estrellas: {maxStars}</p>}*/}

                {/*{maxOpinion.join(', ') && <p>maxOpiniones de usuarios: {maxOpinion.join(', ')}</p>}*/}
                {maxOpinion && <p>Opiniones de usuarios: {maxOpinion}</p>}
                {searchQuery['trip-start'] && searchQuery['trip-end'] && (
                    <p>
                        Fecha de inicio: {searchQuery['trip-start']} - Fecha de fin: {searchQuery['trip-end']}
                    </p>
                )}
                {price !== 0 && <p>Precio: {price} €</p>}
                {contactMail && <p>Email: {contactMail}</p>}
                {contactNumber && <p>Teléfono: {contactNumber}</p>}
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
                        onClick={handleFavoriteClick}>
                        <i className="material-icons">favorite</i>
                    </button>
                )}
            </div>
            {isModalOpen && <ModalLogin onClose={handleCloseModal}/>}
        </div>
    );
};

