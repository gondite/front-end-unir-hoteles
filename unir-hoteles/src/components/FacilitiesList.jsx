// FacilitiesList.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWifi,
    faSwimmingPool,
    faParking,
    faDumbbell,
    faHotTub,
    faCat,
    faMaskVentilator,
    faRadio,
    faBath,
    faSmokingBan,
    faTelevision,
    faTemperatureHalf,faStreetView
} from '@fortawesome/free-solid-svg-icons';

const FacilityIcon = ({ facility }) => {
    const getFacilityIcon = (facility) => {
        switch (facility) {

            case 'Wifi gratis':
                return <FontAwesomeIcon icon={faWifi} />;
            case 'Piscina':
                return <FontAwesomeIcon icon={faSwimmingPool} />;
            case '2piscinas':
                return <FontAwesomeIcon icon={faSwimmingPool} />;
            case 'Piscina privada' || 'Piscina al aire libre' || 'Piscina privada' || 'Piscina de agua salada' || 'Piscina infantil' || 'Bar en la piscina':
                return <FontAwesomeIcon icon={faSwimmingPool} />;
            case 'Piscina con vistas'|| 'Vistas a la piscina':
                return <FontAwesomeIcon icon={faStreetView} />;
            case 'Bar en la piscina':
                return <FontAwesomeIcon icon={faSwimmingPool} />;
            case 'Parking':
                return <FontAwesomeIcon icon={faParking} />;
            case 'Gimnasio':
                return <FontAwesomeIcon icon={faDumbbell} />;
            case 'Jacuzzi':
                return <FontAwesomeIcon icon={faHotTub} />;
            case 'Bañera de hidromasaje / jacuzzi':
                return <FontAwesomeIcon icon={faHotTub} />;

            case 'Mascotas permitidas':
                return <FontAwesomeIcon icon={faCat} />;
            case 'Ventilador':
                return <FontAwesomeIcon icon={faMaskVentilator} />;
            case 'Radio':
                return <FontAwesomeIcon icon={faRadio} />;
            case 'Wc':
                return <FontAwesomeIcon icon={faBath} />;
            case 'Prohibido fumar en todo el alojamiento':
                return <FontAwesomeIcon icon={faSmokingBan} />;
            case 'Tv':
                return <FontAwesomeIcon icon={faTelevision} />;
            case 'Aire acondicionado':
                return <FontAwesomeIcon icon={faTemperatureHalf} />;
            default:
                // Puedes devolver un icono predeterminado o simplemente el nombre de la facilidad
                // Aquí devuelvo solo el nombre de la facilidad sin ningún icono
                return null;
        }
    };

    const icon = getFacilityIcon(facility);

    if (!icon) {
        // no devuelvo nada
        return null;
    }

    return (
        <div className="facility-icon">
            {icon}
            <span> {facility}</span>
        </div>
    );
};

const FacilitiesList = ({ facilities }) => {
    if (!facilities || !Array.isArray(facilities)) {
        return null;
    }

    return (
        <div className="facilities-list">
            {facilities.map((facility, index) => (
                <FacilityIcon key={index} facility={facility} />
            ))}
        </div>
    );
};

export default FacilitiesList;
