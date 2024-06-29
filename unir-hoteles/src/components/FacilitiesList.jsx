// FacilitiesList.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faSwimmingPool, faParking, faDumbbell, faHotTub } from '@fortawesome/free-solid-svg-icons';

const FacilityIcon = ({ facility }) => {
    const getFacilityIcon = (facility) => {
        switch (facility) {
            case 'Internet':
                return <FontAwesomeIcon icon={faWifi} />;
            case 'Piscina':
                return <FontAwesomeIcon icon={faSwimmingPool} />;
            case 'Aparcamiento':
                return <FontAwesomeIcon icon={faParking} />;
            case 'Gimnasio':
                return <FontAwesomeIcon icon={faDumbbell} />;
            case 'Jacuzzi':
                return <FontAwesomeIcon icon={faHotTub} />;
            default:
                return null;
        }
    };

    return (
        <div className="facility-icon">
            {getFacilityIcon(facility)}
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
