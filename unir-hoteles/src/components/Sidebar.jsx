import React, {useContext, useState} from 'react';
import '../styles/sidebar.css';
import {translations} from "../utils/Translations";
import {GeoContext} from "../contexts/GeoContext";

export const Sidebar = ({ onSearch, facets, handleFacetChange, selectedFacets }) => {
    const [showAllFacilities, setShowAllFacilities] = useState(false);
    const [containerHeight, setContainerHeight] = useState('auto'); // Estado para controlar la altura del contenedor
    const {dates} = useContext(GeoContext);

    const toggleShowAllFacilities = () => {
        setShowAllFacilities(!showAllFacilities);
        setContainerHeight(showAllFacilities ? 'auto' : '400px'); // Cambia la altura máxima del contenedor al hacer clic
    };
    const initialFacilities = [
        'Wifi gratis',
        'Piscina',
        'Parking',
        'Gimnasio',
        'Jacuzzi',
        'Mascotas permitidas',
        'Ventilador',
        'Radio',
        'Wc',
        'Prohibido fumar en todo el alojamiento',
        'Tv',
        'Aire acondicionado'
    ];

    const getLegendText = (facetKey) => {
        switch (facetKey) {
            case 'priceValues':
                return 'Rango de precios';
            case 'opinionValues':
                return 'Opinión de usuarios';
            case 'facilities':
                return 'Instalaciones y servicios';
            case 'starsValues':
                return 'Número de estrellas';
            default:
                return 'Filtros';
        }
    };

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
                    <input type="text" id="search-input" name="searchInput" class="autocomplete" value={formData.searchInput}
                           onChange={handleChange} placeholder="Buscar hoteles..." />
                </label>
                <button type="submit" className="btn waves-effect waves-light search-btn">Buscar</button>
            </form>
        </div>*/

        <div className="sidebar">
            {/* Filtros estáticos */}
            <div key={"name"} className="facet-category">
                <h6>Nombre del hotel (Completo)</h6>
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
                <h6>Dirección (Parcial)</h6>
                <div className="facet-options">
                    <input
                        type="text"
                        className="facet-option__text"
                        placeholder="Buscar por dirección..."
                        onInput={(e) => handleFacetChange("address", e.target.value)}
                    />
                </div>
            </div>

            {/* Filtros dinámicos */}
            {/*{Object.keys(facets).length > 0 && <h2>Filtros dinámicos</h2>}*/}

            {Object.keys(facets).map((facetKey) => (
                <div key={facetKey} className="facet-category">
                    <h3>{translations.get(facetKey)}</h3>
                    <fieldset>
                        <legend>{getLegendText(facetKey)}</legend>
                        {facetKey === 'facilities' && (
                            <div className="facet-options" style={{ maxHeight: containerHeight, overflowY: 'auto' }}>
                                {facets[facetKey].map((facetValue, index) => (
                                    (showAllFacilities || initialFacilities.includes(facetValue.key)) && facetValue.count > 0 && (
                                        <label key={facetValue.key} style={{ display: 'block', marginBottom: '10px' }}>
                                            <input
                                                type="checkbox"
                                                name={facetKey}
                                                value={facetValue.key}
                                                checked={selectedFacets[facetKey] && selectedFacets[facetKey].includes(facetValue.key)}
                                                onChange={() => handleFacetChange(facetKey, facetValue.key)}
                                                style={{ marginRight: '5px' }}
                                            />
                                            <span>{translations.get(facetValue.key) ? translations.get(facetValue.key) : facetValue.key} ({facetValue.count})</span>
                                        </label>
                                    )
                                ))}
                                {facets[facetKey].length > initialFacilities.length && (
                                    <div className="show-more" onClick={toggleShowAllFacilities}>
                                        <span>{showAllFacilities ? 'Mostrar menos' : 'Mostrar más'}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {facetKey === 'starsValues' && (
                            <div className="facet-options">
                                {facets[facetKey].map((facetValue) => {
                                    let label = "";
                                    switch (facetValue.key) {
                                        case '-2':
                                            label = "Menor de 2 estrellas";
                                            break;
                                        case '2-4':
                                            label = "Entre 2 y 4 estrellas";
                                            break;
                                        case '4-':
                                            label = "Más de 4 estrellas";
                                            break;
                                        case '5':
                                            label = "5 estrellas";
                                            break;
                                        default:
                                            label = facetValue.key; // En caso de no coincidir con ninguno de los casos anteriores, muestra el valor original
                                            break;
                                    }

                                    return (
                                        facetValue.count > 0 && (
                                            <label key={facetValue.key} style={{display: 'block', marginBottom: '10px'}}>
                                                <input
                                                    type="checkbox"
                                                    name={facetKey}
                                                    value={facetValue.key}
                                                    checked={selectedFacets[facetKey] && selectedFacets[facetKey].includes(facetValue.key)}
                                                    onChange={() => handleFacetChange(facetKey, facetValue.key)}
                                                    style={{marginRight: '5px'}}
                                                />
                                                <span>{label} ({facetValue.count})</span>
                                            </label>
                                        )
                                    );
                                })}
                            </div>
                        )}

                        {facetKey === 'opinionValues' && (
                            <div className="facet-options">
                                {facets[facetKey].map((facetValue) => {
                                    let label = "";
                                    switch (facetValue.key) {
                                        case '-5':
                                            label = "Menos de 5";
                                            break;
                                        case '5-8':
                                            label = "Entre 5 y 8";
                                            break;
                                        case '8-':
                                            label = "Más de 8";
                                            break;
                                        default:
                                            label = facetValue.key; // En caso de no coincidir con ninguno de los casos anteriores, muestra el valor original
                                            break;
                                    }

                                    return (
                                        facetValue.count > 0 && (
                                            <label key={facetValue.key} style={{display: 'block', marginBottom: '10px'}}>
                                                <input
                                                    type="checkbox"
                                                    name={facetKey}
                                                    value={facetValue.key}
                                                    checked={selectedFacets[facetKey] && selectedFacets[facetKey].includes(facetValue.key)}
                                                    onChange={() => handleFacetChange(facetKey, facetValue.key)}
                                                    style={{marginRight: '5px'}}
                                                />
                                                <span>{translations.get(facetValue.key) ? translations.get(facetValue.key) : label} ({facetValue.count})</span>
                                            </label>
                                        )
                                    );
                                })}
                            </div>
                        )}

                        {facetKey === 'priceValues' && (
                            <div className="facet-options">
                                {facets[facetKey].map((facetValue) => {
                                    let label = "";
                                    switch (facetValue.key) {
                                        case '-50':
                                            label = "Menos de €50";
                                            break;
                                        case '50-100':
                                            label = "€50 - €100";
                                            break;
                                        case '100-':
                                            label = "Más de €100";
                                            break;
                                        default:
                                            label = facetValue.key; // En caso de no coincidir con ninguno de los casos anteriores, muestra el valor original
                                            break;
                                    }

                                    return (
                                        facetValue.count > 0 && (
                                            <label key={facetValue.key} style={{display: 'block', marginBottom: '10px'}}>
                                                <input
                                                    type="checkbox"
                                                    name={facetKey}
                                                    value={facetValue.key}
                                                    checked={selectedFacets[facetKey] && selectedFacets[facetKey].includes(facetValue.key)}
                                                    onChange={() => handleFacetChange(facetKey, facetValue.key)}
                                                    style={{marginRight: '5px'}}
                                                />
                                                <span>{translations.get(facetValue.key) ? translations.get(facetValue.key) : label} ({facetValue.count})</span>
                                            </label>
                                        )
                                    );
                                })}
                            </div>
                        )}

                    </fieldset>
                </div>
            ))}
            <fieldset>
                <legend>Fechas:</legend>
                <label htmlFor="trip-start2">Fecha de inicio:</label>
                <input
                    type="date"
                    id="trip-start2"
                    name="startDate2"
                    onInput={(e) => handleFacetChange("startDate", e.target.value)}
                    value={dates.startDate}
                    placeholder="Fecha de inicio"
                />

                <label htmlFor="trip-end2">Fecha de fin:</label>
                <input
                    type="date"
                    id="trip-end2"
                    name="endDate2"
                    onInput={(e) => handleFacetChange("endDate", e.target.value)}
                    value={dates.endDate}
                    placeholder="Fecha de fin"
                />
            </fieldset>
        </div>
    );
};
