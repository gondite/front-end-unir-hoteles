import { useState, useContext } from 'react';
import { GeoContext } from '../contexts/GeoContext';

const useLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {usuario, setUsuario, favoriteCount,setFavoriteCount,setFavoriteHotels} = useContext(GeoContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestBody = {
                targetMethod: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    username: formData.username,
                    password: formData.password
                }
            };

            const response = await fetch('http://localhost:8762/ms-users/users/session', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            console.log(response)
            if (response.ok) {
                const data = await response.json();
                console.log('Login exitoso:', data);
                setError(null);
                setIsLoggedIn(true);
                setUsuario({ nombre: formData.username ,id : data.id,favorites: data.favorites, coments: data.coments});
                setFavoriteCount(data.favorites.split(',').length);
            }
            else if(response.status === 401) {
                setError('Usuario o contraseña incorrectos');
            }

            else {
                console.log(response)
                const errorData = await response.json();
                setError(errorData.message || 'Error al iniciar sesión');
                alert("Error: " + (errorData.message || 'Error al iniciar sesión')); // Mostrar mensaje de error
            }
        } catch (error) {
            setError(error.message);
            alert("Error: " + error.message); // Mostrar mensaje de error
        }
    };

    const resetLogin = () => {
        setIsLoggedIn(false);
    };

    return { formData, handleChange, handleSubmit, error, isLoggedIn, resetLogin };
};

export default useLogin;
