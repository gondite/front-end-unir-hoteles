import React, {useContext, useEffect, useState} from 'react';
import '../styles/modal.css';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import {GeoContext} from "../contexts/GeoContext";

export const ModalBooking = ({hotelId, bookingId, startDate, endDate, contact, bookingRooms, bookingAdults, bookingChildren, onClose, update}) => {

    const { usuario } = useContext(GeoContext);
    const [formData, setFormData] = useState({
        contact: contact ? contact : '',
        startDate: startDate ? startDate : '',
        endDate: endDate ? endDate : '',
        rooms: bookingRooms ? bookingRooms : null,
        adults: bookingAdults ? bookingAdults : null,
        children: bookingChildren ? bookingChildren : null
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

    const [adults, setAdults] = useState(formData.adults || 2);
    const [children, setChildren] = useState(formData.children || 0);
    const [rooms, setRooms] = useState(formData.rooms || 1);
    const {setUsuario} = useContext(GeoContext);

    const createErrorMessage = (id, message) => {
        let existingMessage = document.getElementById(id + 'Error');
        if (!existingMessage) {
            let errorMessage = document.createElement('p');
            errorMessage.id = id + 'Error';
            errorMessage.textContent = message;
            errorMessage.classList.add('error');

            // Selecciona el botón de reservar
            const reservarBtn = document.getElementById("reservar-btn");

            if (reservarBtn) {
                // Inserta el mensaje de error antes del botón de reservar
                reservarBtn.insertAdjacentElement('beforebegin', errorMessage);
            }
        }
    };

    const removeErrorMessage = (id) => {
        let existingMessage = document.getElementById(id + 'Error');
        if (existingMessage) {
            existingMessage.remove();
        }
    };

    const validateAdults = () => {
        if (adults < 1) {
            createErrorMessage('group_adults', 'Debe haber al menos un adulto.');
            return false;
        } else {
            removeErrorMessage('group_adults');
            return true;
        }
    };

    const validateChildren = () => {
        if (children < 0) {
            createErrorMessage('group_children', 'El número de niños no puede ser negativo.');
            return false;
        } else {
            removeErrorMessage('group_children');
            return true;
        }
    };

    const validateRooms = () => {
        if (rooms < 1) {
            createErrorMessage('no_rooms', 'Debe haber al menos una habitación.');
            return false;
        } else {
            removeErrorMessage('no_rooms');
            return true;
        }
    };

    const validateDates = () => {
        if (!formData.startDate || !formData.endDate) {
            createErrorMessage('trip-start', 'Las fechas de inicio y fin son obligatorias.');
            createErrorMessage('trip-end', 'Las fechas de inicio y fin son obligatorias.');
            return false;
        } else if (new Date(formData.startDate) >= new Date(formData.endDate)) {
            createErrorMessage('trip-start', 'La fecha de inicio debe ser anterior a la fecha de fin.');
            createErrorMessage('trip-end', 'La fecha de inicio debe ser anterior a la fecha de fin.');
            return false;
        } else {
            removeErrorMessage('trip-start');
            removeErrorMessage('trip-end');
            return true;
        }
    };

    const validateContact = () => {
        if (!formData.contact || !formData.contact.includes('@') || !formData.contact.includes('.')) {
            createErrorMessage('contact', 'Por favor, introduce un email válido.');
            return false;
        } else {
            removeErrorMessage('contact');
            return true;
        }
    };

    const createBooking = () => {
        Swal.fire({
            title: '¿Estás seguro de que deseas realizar la reserva?',
            text: "No podrás revertir esto después.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, reservar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const body = {
                    "targetMethod": "POST",
                    "body": {
                        "rooms": rooms,
                        "adults": adults,
                        "children": children,
                        "contact": formData.contact,
                        "userId": usuario.id,
                        "hotel": hotelId,
                        "startDate": formData.startDate,
                        "endDate": formData.endDate,
                    }
                };

                fetch(process.env.REACT_APP_GW_URL + "/ms-bookings/bookings", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
                    .then((response) => response.json())
                    .then((data) => {

                        if (data && !data.error) {
                            console.log("Post response data:")
                            console.log(data);
                            console.log([...usuario.bookings, data])
                            swal("¡Reserva exitosa!", "¡Gracias por elegirnos!", "success");
                            setUsuario(prevState => ({
                                ...prevState,
                                bookings: [...prevState.bookings, data],
                            }))
                            onClose();
                        }
                    })
                    .catch((error) => console.log(error));
            }
        });
    }

    const updateBooking = () => {
        Swal.fire({
            title: '¿Estás seguro de que deseas modificar la reserva?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, modificar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const body = {
                    "targetMethod": "PUT",
                    "body": {
                        "rooms": rooms,
                        "adults": adults,
                        "children": children,
                        "contact": formData.contact,
                        "userId": usuario.id,
                        "hotel": hotelId,
                        "startDate": formData.startDate,
                        "endDate": formData.endDate,
                    }
                };

                fetch(process.env.REACT_APP_GW_URL + `/ms-bookings/bookings/${bookingId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data && !data.error) {
                            swal("¡Actualización exitosa!", "¡Gracias por elegirnos!", "success");
                            setUsuario(prevState => ({
                                ...prevState,
                                bookings: prevState.bookings.map(booking => {
                                    if (booking.id === bookingId) {
                                        return data;
                                    }
                                    else{
                                        return booking;
                                    }
                                })
                            }))
                            onClose();
                        }
                    })
                    .catch((error) => console.log(error));
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validateAdults() & validateChildren() & validateRooms() & validateDates() & validateContact();

        if (isValid) {
            if (update && bookingId){
                updateBooking();
            }
            else{
                createBooking();
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdultsChange = (value) => {
        setAdults(value);
        setFormData(prevState => ({
            ...prevState,
            adults: value
        }));
    };

    const handleChildrenChange = (value) => {
        setChildren(value);
        setFormData(prevState => ({
            ...prevState,
            children: value
        }));
    };

    const handleRoomsChange = (value) => {
        setRooms(value);
        setFormData(prevState => ({
            ...prevState,
            rooms: value
        }));
    };

    const increment = (field, e) => {
        e.preventDefault();
        switch (field) {
            case 'adults':
                handleAdultsChange(adults + 1);
                break;
            case 'children':
                handleChildrenChange(children + 1);
                break;
            case 'rooms':
                handleRoomsChange(rooms + 1);
                break;
            default:
                break;
        }
    };

    const decrement = (field, e) => {
        e.preventDefault();
        switch (field) {
            case 'adults':
                handleAdultsChange(adults - 1 >= 1 ? adults - 1 : 1);
                break;
            case 'children':
                handleChildrenChange(children - 1 >= 0 ? children - 1 : 0);
                break;
            case 'rooms':
                handleRoomsChange(rooms - 1 >= 1 ? rooms - 1 : 1);
                break;
            default:
                break;
        }
    };

    return (
        <div className={'booking-modal'}>
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Reservar</h2>
                    <hr/>
                    <br/>
                    <form onSubmit={handleSubmit}>
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
                        <br/>
                        <div className="input-field">
                            <input id="contact" type="text" name="contact" required
                                   value={formData.contact}
                                   placeholder={usuario ? usuario.email : " "}
                                   onChange={handleChange}/>
                            <label htmlFor="contact" className="active">Email: </label>
                        </div>

                        <div className="input-field">
                            <label htmlFor="group_adults" className="active">Adultos:</label>
                            <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="text" id="group_adults" name="adults" value={adults} readOnly
                                       style={{ marginRight: '10px' }}/>

                                <button className="btn-floating btn-small waves-effect waves-light teal tooltipped"
                                        data-position="top" data-tooltip="Restar"
                                        onClick={(e) => decrement('adults', e)}>
                                    <i className="material-icons">remove</i>
                                </button>
                                <button className="btn-floating btn-small waves-effect waves-light teal tooltipped"
                                        data-position="top" data-tooltip="Sumar"
                                        onClick={(e) => increment('adults', e)}>
                                    <i className="material-icons">add</i>
                                </button>
                            </div>
                        </div>

                        <div className="input-field">
                            <label htmlFor="group_children" className="active">Niños:</label>
                            <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="text" id="group_children" name="children" value={children} readOnly
                                       style={{ marginRight: '10px' }}/>

                                <button className="btn-floating btn-small waves-effect waves-light teal tooltipped"
                                        data-position="top" data-tooltip="Restar"
                                        onClick={(e) => decrement('children', e)}>
                                    <i className="material-icons">remove</i>
                                </button>

                                <button className="btn-floating btn-small waves-effect waves-light teal tooltipped"
                                        data-position="top" data-tooltip="Sumar"
                                        onClick={(e) => increment('children', e)}>
                                    <i className="material-icons">add</i>
                                </button>
                            </div>
                        </div>

                        <div className="input-field">
                            <label htmlFor="no_rooms" className="active">Habitaciones:</label>
                            <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="text" id="no_rooms" name="rooms" value={rooms} readOnly
                                       style={{ marginRight: '10px' }}/>

                                <button className="btn-floating btn-small waves-effect waves-light teal tooltipped"
                                        data-position="top" data-tooltip="Restar"
                                        onClick={(e) => decrement('rooms', e)}>
                                    <i className="material-icons">remove</i>
                                </button>
                                <button className="btn-floating btn-small waves-effect waves-light teal tooltipped"
                                        data-position="top" data-tooltip="Sumar"
                                        onClick={(e) => increment('rooms', e)}>
                                    <i className="material-icons">add</i>
                                </button>
                            </div>
                        </div>
                        <br/>
                        {update ?
                            <button className="btn waves-light" id="reservar-btn" type="submit">Modificar</button> :
                            <button className="btn waves-light" id="reservar-btn" type="submit">Reservar</button>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
};
export default ModalBooking;
