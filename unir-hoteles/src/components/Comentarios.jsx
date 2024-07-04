import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GeoContext } from '../contexts/GeoContext';
import '../styles/comentarios.css';
import FacilitiesList from "./FacilitiesList";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router";

export const Comentarios = () => {
    const navigate = useNavigate();
    const { hotels, usuario } = useContext(GeoContext);
    const { id } = useParams();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [hotel, setHotel] = useState(null); // Estado para almacenar la información del hotel
    const [commentText, setCommentText] = useState(''); // Estado para el texto del comentario
    const [comments, setComments] = useState([]); // Estado para almacenar los comentarios

    useEffect(() => {
        if (!usuario) {
            navigate('/');
        }
        // Función asincrónica para obtener la información del hotel por su ID
        const fetchHotelInfo = async () => {
            try {
                const requestBody = {
                    targetMethod: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                };

                // Hacer la solicitud para obtener la información del hotel por su ID
                const response = await fetch(`http://localhost:8762/ms-hotels/hotels/${id}`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error('Error fetching hotel information');
                }

                const hotelInfo = await response.json();
                setHotel(hotelInfo);

            } catch (error) {
                console.error('Error fetching hotel information:', error);
                // Maneja el error según sea necesario (por ejemplo, muestra un mensaje de error)
            }
        };

        // Función asincrónica para obtener los comentarios del hotel por su ID
        const fetchChat = async () => {
            try {
                const requestBody = {
                    targetMethod: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                };

                // Hacer la solicitud para obtener los comentarios del hotel por su ID
                const response = await fetch(`http://localhost:8762/ms-users/hotels/${id}/comments`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                    throw new Error('Error fetching chat');
                }

                const chat = await response.json();
                setComments(chat);

            } catch (error) {
                console.error('Error fetching chat:', error);
                // Maneja el error según sea necesario (por ejemplo, muestra un mensaje de error)
            }
        };

        // Llama a las funciones para obtener la información del hotel y los comentarios cuando el ID cambie
        if (id) {
            fetchHotelInfo();
            fetchChat();
        }
    }, [id]);

    // Función para manejar el clic en enviar comentario
    const handleSendClick = async () => {
        try {
            if (!usuario || !usuario.nombre) {
                console.error('Usuario no definido o nombre de usuario no disponible');
                return;
            }

            if (commentText.trim() === '') {
                console.error('El comentario está vacío');
                return;
            }

            const requestBody = {
                targetMethod: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    hotelId: id,
                    comment: commentText
                }
            };

            // const response = await fetch(`http://localhost:8762/ms-users/users/${usuario.id}/comments`, {
            const response = await fetch(`http://localhost:8762/ms-users/users/${usuario.id}/comments`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
console.log(response)
            if (!response.ok) {
                throw new Error('Error adding comment');
            }

            // Obtener la respuesta y actualizar los comentarios
            const newComment = `${usuario.nombre}: ${commentText}`;
            setComments([...comments, newComment]);
            setCommentText('');

        } catch (error) {
            console.error('Error adding comment:', error);
            // Maneja el error según sea necesario (por ejemplo, muestra un mensaje de error)
        }
    };




    // Función para manejar la tecla Enter en el textarea
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendClick();
        }
    };

    // Función para manejar el cambio de imagen anterior
    const handlePrevClick = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === 0 ? hotel.images.length - 1 : prevIndex - 1));
    };

    // Función para manejar el cambio de imagen siguiente
    const handleNextClick = () => {
        setCurrentImageIndex(prevIndex => (prevIndex === hotel.images.length - 1 ? 0 : prevIndex + 1));
    };

    // Renderiza el contenido del componente si el hotel y los comentarios están disponibles
    return (
        <div className="container">
            {hotel && (
                <div className="row">
                    {/* Sección del hotel */}
                    <div key={hotel.id} className="col s12 m3">
                        <div className="card">
                            <div className="card-image ">
                                <div className="gallery-container">
                                    <img src={hotel.images[currentImageIndex]} alt="Hotel" className="active"/>
                                    <button className="gallery-button prev" onClick={handlePrevClick}><i
                                        className="material-icons">arrow_back</i></button>
                                    <button className="gallery-button next" onClick={handleNextClick}><i
                                        className="material-icons">arrow_forward</i></button>
                                </div>
                                <span className="card-title">{hotel.name} {hotel.stars &&
                                    <Rating name="read-only" value={hotel.stars} readOnly/>}</span>
                            </div>
                            <hr/>
                            <div className="card-content">
                                <ul>
                                    <li><b><p>{hotel.address}</p></b></li>
                                    <li><p>{hotel.description}</p></li>
                                    <li><p><FacilitiesList facilities={hotel.facilities}/></p></li>
                                    <hr/>
                                    <li><p><i className="material-icons">attach_money</i> Precio: {hotel.price} €</p></li>
                                    <li><p><i className="material-icons">email</i> Email: <a
                                        href={`mailto:${hotel.contactMail}`}>{hotel.contactMail}</a></p></li>
                                    <li><p><i className="material-icons">phone</i> Teléfono: {hotel.contactNumber}</p></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sección de comentarios */}
                    <div className="chat-card col s12 m9">
                        <div className="chat-card-content">
                            <span className="chat-card-title">{hotel.name}</span>
                            <p>Comentarios sobre el hotel:</p>
                        </div>
                        <div className="chat-divider"></div>
                        <div className="chat-card-content">
                            <div className="chat-wrapper">
                                {/* Renderiza los comentarios almacenados en el estado */}
                                {comments.map((comment, index) => {
                                    const [nombre, mensaje] = comment.split(':'); // Separar nombre y comentario
                                    const esUsuarioActual = usuario && usuario.nombre === nombre.trim(); // Verificar si es el usuario actual
                                    return (
                                        <div key={index}
                                             className={`chat-message ${esUsuarioActual ? 'chat-right' : ''}`}>
                                            <img className="chat-avatar"
                                                 src={esUsuarioActual
                                                     ? 'https://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-Darth-Vader.png'
                                                     : `https://randomuser.me/api/portraits/men/${index}.jpg`}
                                                 alt="avatar"/>
                                            <div
                                                className={`chat-text ${esUsuarioActual ? 'chat-text-right' : ''}`}>
                                                <b>{nombre.trim()}:</b> {mensaje.trim()}
                                            </div>
                                        </div>
                                    );
                                })}
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
