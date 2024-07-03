import React, {useContext, useEffect, useState} from 'react';
import '../styles/modal.css';
import swal from 'sweetalert';
import {GeoContext} from "../contexts/GeoContext";

export const ModalBooking = ({hotelId, onClose}) => {

    const { usuario } = useContext(GeoContext);
    const [formData, setFormData] = useState({
        contact: '',
        startDate: '',
        endDate: '',
        rooms: null,
        adults: null,
        children: null
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleSubmit = () => {
        const body = {
            "targetMethod": "POST",
            "body": {
                "rooms": formData.rooms,
                "adults": 0,
                "children": 0,
                "contact": formData.contact,
                "userId": usuario.id,
                "hotel": hotelId,
                "startDate": formData.startDate,
                "endDate": formData.endDate,
            }
        }

        fetch("http://localhost:8762/ms-bookings/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data && !data.error) {
                console.log(data)
                swal("¡Reserva exitosa!")
                onClose();
            }

        })
        .catch((error) => console.log(error));
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const closeModal = () => {
        onClose();
    };

    return (
        <div className={'booking-modal'}>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => closeModal()}></span>
                    <h2>Reservar</h2>
                    <hr/>
                    <br/>
                    <div>
                        <fieldset>
                            <legend>Fecha de viaje:</legend>
                            <label htmlFor="trip-start">Fechas de viaje:</label>
                            <input type="date" id="trip-start" name="startDate" value={formData.startDate}
                                   onChange={handleChange}
                                   placeholder="Fecha de inicio"/>

                            <label htmlFor="trip-end">Fechas de viaje:</label>
                            <input type="date" id="trip-end" name="endDate" value={formData.endDate}
                                   onChange={handleChange}
                                   placeholder="Fecha de fin"/>
                        </fieldset>
                        <div className="input-field">
                            <input id="contact" type="text" name="contact" required
                                   value={formData.contact}
                                   onChange={handleChange}/>
                            <label htmlFor="contact">Email: </label>
                        </div>
                        <div className="input-field">
                            <input id="rooms" type="number" name="rooms" required
                                   value={formData.rooms}
                                   onChange={handleChange}/>
                            <label htmlFor="rooms">Habitaciones: </label>
                        </div>
                        <button className="btn waves-light" onClick={()=>handleSubmit()}>Reservar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBooking;
