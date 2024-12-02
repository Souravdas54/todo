import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../Header/header";

import Todo from "../Component/Muitodotable";
import Todolists from "../Component/Agtodolist";

export default function RouterApp() {

    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Todo />} />
                    <Route path="/Agtodolist" element={<Todolists />} />



                </Routes>
               
            </Router>

        </>
    )
}