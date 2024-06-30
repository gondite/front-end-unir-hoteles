import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {GeoContext} from '../contexts/GeoContext';
import '../styles/comentarios.css';
import FacilitiesList from "./FacilitiesList";
import Rating from "@mui/material/Rating";

export const Comentarios = () => {
    const {getHotelById, hotels} = useContext(GeoContext);
    const {id} = useParams();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hotel, setHotel] = useState(0);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const hotelInfo = getHotelById(id);
        setHotel(hotelInfo);
    }, [getHotelById, id, hotels]);


    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? hotel.imageUrls.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === hotel.imageUrls.length - 1 ? 0 : prevIndex + 1));
    };

    const handleSendClick = () => {
        if (commentText.trim() !== '') {
            const newComment = {
                text: commentText
            };
            setComments([...comments, newComment]);
            setCommentText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendClick();
        }
    };

    return (
        <div className="container">
            {hotel && (
                <div className="row">
                    {/*HOTEL*/}
                    <div key={hotel.id} className="col s12 m3">
                        <div className="card">
                            <div className="card-image ">
                                <div className="gallery-container">
                                    {/*<img src={hotel.imageUrls[currentImageIndex]} alt="Hotel Image"*/}
                                    {/*     className="active"/>*/}
                                    <button className="gallery-button prev" onClick={handlePrevClick}><i
                                        className="material-icons">arrow_back</i></button>
                                    <button className="gallery-button next" onClick={handleNextClick}><i
                                        className="material-icons">arrow_forward</i></button>
                                </div>
                                <span className="card-title">{hotel.title} {hotel.searchQuery['maxStars'] && <Rating name="read-only" value={hotel.searchQuery['maxStars']} readOnly/>}</span>
                            </div>
                            <hr/>
                            <div className="card-content">
                                <ul>
                                    <li><p>{hotel.description}</p></li>
                                    <li><p><FacilitiesList facilities={hotel.searchQuery['facilities']}/></p></li>
                                    <li>{hotel.searchQuery['maxOpinion'] && hotel.searchQuery['maxOpinion'].length > 0 &&
                                        <p>maxOpiniones de usuarios: {hotel.searchQuery['maxOpinion'].join(', ')}</p>}</li>
                                    <li>{hotel.searchQuery && hotel.searchQuery['trip-start'] && hotel.searchQuery['trip-end'] && (
                                        <p>
                                            Fecha de inicio: {hotel.searchQuery['trip-start']}
                                            <br/>
                                            Fecha de fin: {hotel.searchQuery['trip-end']}
                                        </p>

                                    )}</li>
                                    <li>{hotel.searchQuery['priceRange'] !== 0 &&
                                        <p>Precio: {hotel.searchQuery['priceRange']} €</p>}</li>
                                </ul>
                            </div>
                            {/*<div className="card-action">*/}
                            {/*    <a >Más información</a>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    {/*CHAT*/}
                    <div className="chat-card col s12 m9">
                        <div className="chat-card-content">
                            <span className="chat-card-title">{hotel.title}</span>
                            <p>Comentarios sobre el hotel:</p>
                        </div>
                        <div className="chat-divider"></div>
                        <div className="chat-card-content">
                            <div className="chat-wrapper">
                                <div className="chat-message">
                                    <img className="chat-avatar"
                                         src="https://cdn.icon-icons.com/icons2/2126/PNG/512/darth_maul_star_wars_icon_131347.png"
                                         alt="avatar"/>
                                    <div className="chat-text">
                                        El hotel es muy bonito. Disfruté mucho mi estancia. Espero volver pronto.
                                    </div>
                                </div>

                                <div className="chat-message">
                                    <img className="chat-avatar"
                                         src="https://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-Chewbacca.png"
                                         alt="avatar"/>
                                    <div className="chat-text">
                                        Lo único que no me gustó fue el desayuno. No había muchas opciones. Por lo demás genial 10/10 🌝
                                    </div>
                                </div>

                                <div className="chat-message">
                                    <img className="chat-avatar"
                                         src="https://cdn3.iconfinder.com/data/icons/halloween-avatar-01/348/halloween_avatar-22-512.png"
                                         alt="avatar"/>
                                    <div className="chat-text">
                                        Cierto, el desayuno no era muy bueno. Pero el resto del hotel es genial. Lo recomiendo.
                                    </div>
                                </div>
                                {comments.map((comment, index) => (
                                    <div key={index}
                                         className={`chat-message chat-right coalesce`}>
                                        <img className="chat-avatar"
                                             src="https://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-Darth-Vader.png"
                                             alt="avatar"/>
                                        <div className="chat-text-right">
                                            {comment.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="chat-input">
                            <div className="chat-input-bar">
                                <textarea
                                    id="chat-textarea"
                                    className="materialize-textarea"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                ></textarea>
                                <button type="button" onClick={handleSendClick}>
                                    <i className="material-icons">send</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
