import React from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import '../styles/map.css';

const HotelMap = ({markers}) => {
    return (
        <div className="map-container hotel-map">
            <MapContainer center={[markers[0].latitude, markers[0].longitude]} zoom={15}
                          style={{height: '400px', width: '100%'}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.latitude, marker.longitude]}>
                        <Popup>
                            <h4>{marker.hotelName}</h4>
                            {/*<p><b>Ubicación del hotel:</b></p> <p>Latitud {marker.latitude}, Longitud {marker.longitude}</p>*/}
                            <p><b>Precio:</b> {marker.price}€</p>
                            <p><b>Estrellas:</b> {marker.stars}</p>
                            <p><b>Opiniones:</b> {marker.maxOpinion}</p>
                            {/*<p>Facilidades: {marker.facilities.join(', ')}</p>*/}
                            {marker.contactMail &&
                                <p><b>Email:</b> <a href={`mailto:${marker.contactMail}`}>{marker.contactMail}</a></p>}
                            {marker.contactNumber &&
                                <p><b>Teléfono:</b> <a href={`tel:${marker.contactNumber}`}>{marker.contactNumber}</a>
                                </p>}

                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default HotelMap;
