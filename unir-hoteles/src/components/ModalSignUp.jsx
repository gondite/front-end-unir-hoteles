import React, {useContext, useEffect, useState} from 'react';
import '../styles/modal.css';
import {GeoContext} from "../contexts/GeoContext";
import swal from "sweetalert";

export const ModalSignUp = ({ onClose }) => {
    const { registerUsuario } = useContext(GeoContext);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');

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

    const createErrorMessage = (id, message) => {
        let existingMessage = document.getElementById(id + 'Error');
        if (!existingMessage) {
            let errorMessage = document.createElement('p');
            errorMessage.id = id + 'Error';
            errorMessage.textContent = message;
            errorMessage.classList.add('error');
            document.getElementById(id).insertAdjacentElement('afterend', errorMessage);
        }
    };

    const removeErrorMessage = (id) => {
        let existingMessage = document.getElementById(id + 'Error');
        if (existingMessage) {
            existingMessage.remove();
        }
    };

    const validateFullName = () => {
        if (fullName.trim() === '') {
            createErrorMessage('fullName', 'El nombre y apellidos son obligatorios.');
        } else {
            removeErrorMessage('fullName');
        }
    };

    const validateUsername = () => {
        if (username.trim() === '') {
            createErrorMessage('username', 'El nombre de usuario es obligatorio.');
        } else {
            removeErrorMessage('username');
        }
    };

    const validatePassword = () => {
        let passwordRegex = /^[A-Za-z0-9]{8,}$/;
        if (!passwordRegex.test(password)) {
            createErrorMessage('password', 'La contraseña debe tener mínimo 8 caracteres y contener números y letras.');
        } else {
            removeErrorMessage('password');
        }
    };

    const validateConfirmPassword = () => {
        if (password !== confirmPassword) {
            createErrorMessage('confirmPassword', 'Las contraseñas no coinciden.');
        } else {
            removeErrorMessage('confirmPassword');
        }
    };

    const validateEmail = () => {
        if (!email.includes('@') || !email.includes('.')) {
            createErrorMessage('email', 'Por favor, introduce un email válido.');
        } else {
            removeErrorMessage('email');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        validateFullName();
        validateUsername();
        validatePassword();
        validateConfirmPassword();
        validateEmail();

        let errorMessages = document.querySelectorAll('form p');
        if (errorMessages.length === 0) {
            console.log('Formulario válido. Agregar usuario al contexto:', { fullName, username, password, email });
            const newUser = { fullName, username, password, email };
            registerUsuario(newUser);
            onClose();

                swal("¡Registro exitoso!", `Bienvenido, ${username}.`, "success")

        } else {
            // Hay errores, se informa al usuario
            alert('Por favor, corrija los errores antes de enviar el formulario.');
        }
    };

    return (
        <div className={'signup-modal'}>
            <div className={'modal'}>
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2>Registro de Usuario</h2>
                    <hr />
                    <br />
                    <form onSubmit={handleSubmit} id="userForm">
                        <div className="input-field">
                            <input id="fullName" type="text" name="fullName" className="validate" required onChange={(e) => setFullName(e.target.value)} />
                            <label htmlFor="fullName">Nombre y apellidos</label>
                        </div>

                        <div className="input-field">
                            <input id="username" type="text" name="username" className="validate" required onChange={(e) => setUsername(e.target.value)} />
                            <label htmlFor="username">Nombre de usuario</label>
                        </div>

                        <div className="input-field">
                            <input id="password" type="password" name="password" className="validate" required onChange={(e) => setPassword(e.target.value)} />
                            <label htmlFor="password">Contraseña</label>
                        </div>

                        <div className="input-field">
                            <input id="confirmPassword" type="password" name="confirmPassword" className="validate" required onChange={(e) => setConfirmPassword(e.target.value)} />
                            <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        </div>

                        <div className="input-field">
                            <input id="email" type="email" name="email" className="validate" required onChange={(e) => setEmail(e.target.value)} />
                            <label htmlFor="email">Email</label>
                        </div>

                        <button type="submit" className="btn waves-effect waves-light">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
