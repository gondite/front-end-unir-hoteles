import React, {useContext, useEffect, useState} from 'react';
import FacilitiesList from './FacilitiesList';
import ModalLogin from './ModalLogin';
import { GeoContext } from "../contexts/GeoContext";
import Rating from "@mui/material/Rating";
import HotelMap from "./HotelMap";

export const HotelFavCard = ({index,hotel, images, title, address, description, stars, maxOpinion, price, facilities,contactMail,contactNumber,latitude,longitude,id, searchQuery}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {usuario, favoriteHotels, setFavoriteHotels, setFavoriteCount,getFavHotels,addFavoriteHotel } = useContext(GeoContext);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (usuario) {
                try {
                    const favoriteIds = await getFavHotels();
                    if (favoriteIds.map(favId => favId.toString()).includes(id.toString())) {
                        setIsFavorite(true);
                    }
                } catch (error) {
                    console.error('Error checking favorite status:', error);
                }
            }
        };

        checkFavoriteStatus();
    }, [usuario, id, getFavHotels]);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handleReservarClick = () => {
        if (usuario) {
            alert('¡Compra realizada!');
        } else {
            setIsModalOpen(true);
        }
    };

    const handleFavoriteClick = async () => {
        try {
            // Determinar el método a utilizar (PUT o DELETE)
            const method = isFavorite ? "DELETE" : "PUT";
            const result = await addFavoriteHotel(id, method);
            console.log(method)
            console.log(result)
            if (result.success) {
                // Actualizar el estado de favorito y el contador
                setIsFavorite(!isFavorite);
                setFavoriteCount(prevCount => isFavorite ? prevCount - 1 : prevCount + 1);
            } else {
                alert('Error al gestionar hotel como favorito: ' + result.message);
            }
        } catch (error) {
            console.error('Error al gestionar hotel como favorito:', error);
            alert('Error al gestionar hotel como favorito: ' + error.message);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
        <div className="card-hotel">
            <h5>{title} {stars && <Rating name="read-only" value={stars} readOnly/>}</h5>
            <div className="flex-container ">
                <div className="gallery-container">
                    <img src={images[currentImageIndex]} alt="Hotel" className="active"/>
                    <button className="gallery-button prev" onClick={handlePrevClick}><i
                        className="material-icons">arrow_back</i></button>
                    <button className="gallery-button next" onClick={handleNextClick}><i
                        className="material-icons">arrow_forward</i></button>
                </div>
                {latitude && longitude && <HotelMap markers={markers}/>}
            </div>
            <div className="info-container">
                <div className="info-container-1">
                    <FacilitiesList facilities={facilities}/>
                </div>
                <p className="hotel-description"><b>{address}</b> <br/>
                    {description}</p>
                <div className="info-container-2">
                    {/*{maxOpinion.join(', ') && <p>maxOpiniones de usuarios: {maxOpinion.join(', ')}</p>}*/}
                    {maxOpinion &&
                        <p><i className="material-icons">rate_review</i> Opiniones de usuarios: {maxOpinion}</p>}
                    {/*{searchQuery['trip-start'] && searchQuery['trip-end'] && (*/}
                    {/*    <p><i className="material-icons">date_range</i> Fecha de inicio: {searchQuery['trip-start']} -*/}
                    {/*        Fecha de fin: {searchQuery['trip-end']}</p>*/}
                    {/*)}*/}
                    {price !== 0 && <p><i className="material-icons">attach_money</i> Precio: {price} €</p>}
                    {contactMail && (
                        <p>
                            <i className="material-icons">email</i>
                            Email: <a href={`mailto:${contactMail}`}>{contactMail}</a>
                        </p>
                    )}
                    {contactNumber && <p><i className="material-icons">phone</i> Teléfono: {contactNumber}</p>}
                </div>


            </div>
            <div className="card-footer">
                <button className="btn waves-effect waves-light" onClick={handleReservarClick}>Reservar</button>
                {usuario && (
                    <button
                        className={`btn waves-effect waves-light favorite-button ${isFavorite ? 'favorite-active' : ''}`}
                        onClick={handleFavoriteClick}>
                        <i className="material-icons">favorite</i>
                    </button>
                )}
            </div>
            {isModalOpen && <ModalLogin onClose={handleCloseModal}/>}
        </div>
    );
};
