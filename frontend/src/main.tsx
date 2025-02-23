import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from "react-router";
import ApartmentList from './pages/ApartmentList.tsx';
import CustomMap from "./pages/CustomMap.tsx";
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ApartmentList/>}/>
                <Route path="/map" element={<CustomMap/>}/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
