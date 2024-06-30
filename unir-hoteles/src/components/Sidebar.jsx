import React, {useState } from 'react';
import '../styles/sidebar.css';

export const Sidebar = ({ onSearch }) => {
    const [formData, setFormData] = useState({
        sortBy: 'popularity',
        start: [],
        maxOpinion: [],
        priceRange: 0,
        facilities: [],
        searchInput: '',
        startDate: '',
        endDate: ''
    });

    // console.log(formData)
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => {
            if (type === 'checkbox') {
                return {
                    ...prevData,
                    [name]: checked ? [...prevData[name], value] : prevData[name].filter((item) => item !== value)
                };
            } else {
                return {
                    ...prevData,
                    [name]: value
                };
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(formData);
    };

    return (
        <div className="sidebar">
            <h2>Menú</h2>
            <form id="search-form" onSubmit={handleSubmit}>
                <label htmlFor="sort-by">Ordenar por:
                    <select id="sort-by" name="sortBy" value={formData.sortBy} onChange={handleChange}>
                        <option value="popularity">Popularidad</option>
                        <option value="price-low-high">Precio (bajo a alto)</option>
                        <option value="price-high-low">Precio (alto a bajo)</option>
                        <option value="user-rating-high-low">Valoración de los usuarios (alto a bajo)</option>
                    </select>
                </label>
                <br/>
                <hr/>
                <fieldset>
                    <legend className="star-rating">Número de estrellas:</legend>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating}>
                            <input
                                type="radio"
                                name="maxStars"
                                value={rating}
                                checked={formData.maxStars === String(rating)}
                                onChange={handleChange}
                            />
                            <span>{rating} estrella{rating !== 1 ? 's' : ''}</span>
                        </label>
                    ))}
                </fieldset>

                <br/>
                <hr/>
                <fieldset>
                    <legend className="user-maxOpinion-rating">Opinión de usuarios:</legend>
                    {[1, 2, 3, 4, 5].map((rating) => (
                        <label key={rating}>
                            <input type="checkbox" name="maxOpinion" value={rating}
                                   checked={formData.maxOpinion.includes(String(rating))}
                                   onChange={handleChange}/>
                            <span>{rating}+ ({rating <= 1 ? 'Normal' : rating <= 2 ? 'Bien' : rating <= 3 ? 'Muy bien' : rating <= 4 ? 'Excelente' : 'Fantástico'})</span>
                        </label>
                    ))}
                </fieldset>
                <br/>
                <hr/>
                <label htmlFor="price-range">Precio por noche:</label>
                <input type="range" id="price-range" min="0" max="1000" step="1" name="priceRange"
                       value={formData.priceRange} onChange={handleChange}/>
                <label htmlFor="price-range">Valor: <span
                    id="price-range-value">{formData.priceRange}</span> (€)</label>
                <br/>
                <hr/>
                <fieldset>
                    <legend>Instalaciones y servicios:</legend>
                    {['Internet', 'Pool', 'Parking', 'Gym', 'Jacuzzi','Pets',].map((facility) => (
                        <label key={facility}>
                            <input type="checkbox" name="facilities" value={facility}
                                   checked={formData.facilities.includes(facility)} onChange={handleChange}/>
                            <span>{facility}</span>
                        </label>
                    ))}
                </fieldset>
                <br/>
                <hr/>
                <fieldset>
                    <legend>Fecha de viaje:</legend>
                    <label htmlFor="trip-start">Fechas de viaje:</label>
                    <input type="date" id="trip-start" name="startDate" value={formData.startDate}
                           onChange={handleChange}
                           placeholder="Fecha de inicio"/>

                    <label htmlFor="trip-end">Fechas de viaje:</label>
                    <input type="date" id="trip-end" name="endDate" value={formData.endDate} onChange={handleChange}
                           placeholder="Fecha de fin"/>
                </fieldset>
                <br/>
                <label>
                <input type="text" id="search-input" name="searchInput" value={formData.searchInput}
                               onChange={handleChange} placeholder="Buscar hoteles..."/>
                    </label>
                    <button type="submit" className="btn waves-effect waves-light search-btn">Buscar</button>
            </form>
        </div>
    );
};
