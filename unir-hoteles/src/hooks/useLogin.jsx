import { useState, useContext } from 'react';
import { GeoContext } from '../contexts/GeoContext'; // Importar GeoContext

const useLogin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {setUsuario} = useContext(GeoContext);
    const {newUser} = useContext(GeoContext);
// console.log(newUser)
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
            // Validar si el usuario existe en el contexto
            let existingUser=""
            if(newUser!==null)
                existingUser = newUser.username === formData.username;

            if (existingUser) {
                // Validar la contraseña si el usuario existe
                if (newUser.password === formData.password) {
                    setError(null);
                    setIsLoggedIn(true);
                    setUsuario({ nombre: formData.username });
                } else {
                    setError("Contraseña incorrecta");
                }
            }
            else {
                // Si el usuario no existe en el contexto, realizar la llamada a dummyjson para validar el usuario y contraseña
                const response = await fetch('https://dummyjson.com/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                        expiresInMins: 30
                    })
                });
                const data = await response.json();
                if (data.message) {
                    setError(data.message);
                }
                else {
                    setError(null);
                    setIsLoggedIn(true);
                    setUsuario({ nombre: formData.username }); // Almacenar el nombre de usuario en el contexto
                }
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const resetLogin = () => {
        setIsLoggedIn(false);
    };

    return { formData, handleChange, handleSubmit, error, isLoggedIn, resetLogin };
};

export default useLogin;
