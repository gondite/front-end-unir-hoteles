import React from 'react';
import { createRoot } from 'react-dom';

import {GeometricRouter} from "../router/GeometricRouter";
import '../styles/header-footer.css';
import {GeoProvider} from "../contexts/GeoContext";

export const Overview = () => {

    return (
        <>
            <GeoProvider>
                <GeometricRouter>
                </GeometricRouter>
            </GeoProvider>
        </>
    );
};

document.addEventListener('DOMContentLoaded', function () {
    createRoot(document.getElementById('root')).render(<Overview />);
});
