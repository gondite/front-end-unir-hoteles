import React, {useState } from 'react';
import '../styles/sidebar.css';
import {translations} from "../utils/Translations";

export const Sidebar = ({ onSearch, facets, handleFacetChange, selectedFacets }) => {
    /*const [formData, setFormData] = useState({
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
    };*/

    return (
        /*<div className="sidebar">
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
                    {['Wifi gratis', 'Piscina', 'Parking', 'Gimnasio', 'Jacuzzi', 'Mascotas permitidas', 'Ventilador', 'Radio', 'Wc', 'Prohibido fumar en todo el alojamiento', 'Tv', 'Aire acondicionado'].map((facility) => (
                        <label key={facility} style={{display: 'block', marginBottom: '10px'}}>
                            <input
                                type="checkbox"
                                name="facilities"
                                value={facility}
                                checked={formData.facilities.includes(facility)}
                                onChange={handleChange}
                                style={{marginRight: '5px'}}
                            />
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
        </div>*/
        <div className="sidebar">
            <h1>Filtros estáticos</h1>
            <div key={"name"} className="facet-category">
                <h3>Nombre de pila (Completo)</h3>
                <div className="facet-options">
                    <input
                        type="text"
                        className="facet-option__text"
                        placeholder="Buscar por nombre..."
                        onInput={(e) => handleFacetChange("name", e.target.value)}
                    />
                </div>
            </div>
            <div key={"address"} className="facet-category">
                <h3>Dirección (Parcial)</h3>
                <div className="facet-options">
                    <input
                        type="text"
                        className="facet-option__text"
                        placeholder="Buscar por dirección..."
                        onInput={(e) => handleFacetChange("address", e.target.value)}
                    />
                </div>
            </div>

            {
                Object.keys(facets).length > 0 && <h1>Filtros dinámicos</h1>
            }

            {Object.keys(facets).map((facetKey) => (
                <div key={facetKey} className="facet-category">
                    <h3>{translations.get(facetKey)}</h3>
                    <div className="facet-options">
                        {facets[facetKey].map((facetValue) => (

                            //Aseguramos mediante renderizado condicional que solo se muestren las opciones con un número de empleados mayor que 0
                            facetValue.count > 0 &&
                            <div
                                key={facetValue.key}
                                className={`facet-option ${selectedFacets[facetKey] && selectedFacets[facetKey].includes(facetValue.key) ? 'selected' : ''}`}
                                onClick={() => handleFacetChange(facetKey, facetValue.key)}
                            >
                                {translations.get(facetValue.key) ? translations.get(facetValue.key) : facetValue.key} ({facetValue.count})
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
