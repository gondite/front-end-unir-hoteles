import React, { useContext, useState } from 'react';
import FacilitiesList from './FacilitiesList';
import ModalLogin from './ModalLogin';
import { GeoContext } from "../contexts/GeoContext";
import Rating from "@mui/material/Rating";

export const HotelFavCard = ({ hotel = {}, isFavorite }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { usuario, favoriteHotels, setFavoriteHotels, setFavoriteCount } = useContext(GeoContext);

    // console.log(hotel)
    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? hotel.imageUrls.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === hotel.imageUrls.length - 1 ? 0 : prevIndex + 1));
    };

    const handleReservarClick = () => {
        if (usuario) {
            alert('¡Compra realizada!');
        } else {
            setIsModalOpen(true);
        }
    };

    const handleFavoriteClick = () => {
        if (!isFavorite) {
            setFavoriteHotels([...favoriteHotels, hotel]);
            setFavoriteCount(prevCount => prevCount + 1);
        } else {
            setFavoriteHotels(prevHotels => prevHotels.filter(favHotel => favHotel.title !== hotel.title));
            setFavoriteCount(prevCount => prevCount - 1);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="card-hotel">
            <div className="gallery-container">
                <img src={hotel.imageUrls && hotel.imageUrls[currentImageIndex]} alt="Hotel" className="active" />
                <button className="gallery-button prev" onClick={handlePrevClick}><i className="material-icons">arrow_back</i></button>
                <button className="gallery-button next" onClick={handleNextClick}><i className="material-icons">arrow_forward</i></button>
            </div>
            <div className="info-container">
                <h5>{hotel.title}   {hotel.searchQuery['starRating'] && <Rating name="read-only" value={hotel.searchQuery['starRating']} readOnly/>}</h5>
                <FacilitiesList facilities={hotel.searchQuery['facilities']}/>
                <p>{hotel.description}</p>
                {/*{hotel.searchQuery['starRating'] && hotel.searchQuery['starRating'].join(', ') && <p>Estrellas: {hotel.searchQuery['starRating'].join(', ')}</p>}*/}
                {hotel.searchQuery['userOpinionRating'] && hotel.searchQuery['userOpinionRating'].join(', ') && <p>Opiniones de usuarios: {hotel.searchQuery['userOpinionRating'].join(', ')}</p>}
                {hotel.searchQuery['priceRange'] && <p>Precio: {hotel.searchQuery['priceRange']} €</p>}
            </div>
            <div className="card-footer">
                <button className="btn waves-effect waves-light" onClick={handleReservarClick}>Reservar</button>
                {usuario && (
                    <button className={`btn waves-effect waves-light favorite-button ${isFavorite ? 'favorite-active' : ''}`} onClick={handleFavoriteClick}>
                        <i className="material-icons">favorite</i>
                    </button>
                )}
            </div>
            {isModalOpen && <ModalLogin onClose={handleCloseModal} />}
        </div>
    );
};
