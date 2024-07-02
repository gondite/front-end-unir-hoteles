import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Sidebar} from "../components/Sidebar";
import {Loader} from "../components/Loader";
import {HotelList} from "../components/HotelList";
import React, {useState} from "react";
import useFetch from "../hooks/useFetch";
import {HotelFavList} from "../components/HotelFavList";
import {WelcomeView} from "../components/WelcomeView";
import {Comentarios} from "../components/Comentarios";
import {NotFound} from "../components/NotFound";

export const GeometricRouter = () => {
    const [searchQuery, setSearchQuery] = useState('');


    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const {hotels, loading, error} = useFetch(searchQuery);
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<WelcomeView/>}/>
                <Route
                    path="/search"
                    element={
                        <div className="container">
                            <Sidebar onSearch={handleSearch}/>
                            {loading ? <Loader/> : <HotelList hotels={hotels} searchQuery={searchQuery}/>}
                            {error && <p>Error: {error}</p>}
                        </div>
                    }
                />
                <Route path="/favorites" element={<HotelFavList/>}/>
                <Route path="/hoteles/:id/comentarios" element={<Comentarios/>}/>
                <Route path="*" element={
                    <NotFound/>
                }/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}