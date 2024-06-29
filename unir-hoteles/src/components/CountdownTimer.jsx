import React, {useState, useEffect} from 'react';

export const CountdownTimer = ({hoursRemaining}) => {
    const [timeRemaining, setTimeRemaining] = useState(hoursRemaining * 3600);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    return (
        <div className="countdown-timer">
            <p>Oferta temporal: ¡Solo quedan {hours} horas, {minutes} minutos y {seconds} segundos!
            </p>
        </div>
    );
};
