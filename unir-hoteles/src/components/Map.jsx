import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/map.css';
import hotelData from '../hotelData/export_madrid.json';

const Map = () => {
    const hotels = hotelData.elements.filter((element) => element.type === 'node');

    return (
        <div className="map-container">
            <MapContainer center={[40.416775, -3.70379]} zoom={13}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hotels.map((hotel, index) => (
                    <Marker key={index} position={[hotel.lat, hotel.lon]}>
                        <Popup>
                            <h4>{hotel.tags.name}</h4>
                            {Object.entries(hotel.tags).map(([key, value]) => (
                                // Omitir ciertos campos
                                key !== 'website' && key !== 'url' && key !== 'wikidata' &&
                                <p key={key}>
                                    <b>{key}:</b> {value}
                                </p>
                            ))}

                            {hotel.tags.url && <p><b>Url:</b> <a href={hotel.tags.url} target={"_blank"} rel="noreferrer">{hotel.tags.url}</a></p>}
                            {hotel.tags.website && <p><b>Website:</b> <a href={hotel.tags.website} target={"_blank"} rel="noreferrer">{hotel.tags.website}</a></p>}
                            {hotel.tags.wikidata && <p><b>Wikidata:</b> <a href={`https://www.wikidata.org/wiki/${hotel.tags.wikidata}`} target={"_blank"} rel="noreferrer">{hotel.tags.wikidata}</a></p>}
                            <p><a href={`https://www.openstreetmap.org/node/${hotel.id}`} target={"_blank"} rel="noreferrer">Ver en OpenStreetMap</a></p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
