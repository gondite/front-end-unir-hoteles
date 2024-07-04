import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Sidebar} from "../components/Sidebar";
import {Loader} from "../components/Loader";
import {HotelList} from "../components/HotelList";
import React, {useContext, useState} from "react";
import useFetch from "../hooks/useFetch";
import {HotelFavList} from "../components/HotelFavList";
import {WelcomeView} from "../components/WelcomeView";
import {Comentarios} from "../components/Comentarios";
import {NotFound} from "../components/NotFound";
import { GeoContext } from "../contexts/GeoContext";
import {BookingList} from "../components/BookingList";

export const GeometricRouter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { useFetch, loadMore, facets, handleFacetChange, selectedFacets, hotels, loading, error } = useContext(GeoContext);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    useFetch();
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<WelcomeView/>}/>
                <Route
                    path="/search"
                    element={
                        <div className="container">
                            <Sidebar onSearch={handleSearch} facets={facets} handleFacetChange={handleFacetChange} selectedFacets={selectedFacets}/>
                            {loading ? <Loader/> : <HotelList hotels={hotels} searchQuery={searchQuery} loadMore={loadMore}/>}
                            {error && <p>Error: {error}</p>}
                        </div>
                    }
                />
                <Route path="/favorites" element={<HotelFavList/>}/>
                <Route path="/bookings" element={<BookingList/>}/>
                <Route path="/hoteles/:id/comentarios" element={<Comentarios/>}/>
                <Route path="*" element={
                    <NotFound/>
                }/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}