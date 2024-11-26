import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from "../TODOLIST/header";
import Todolist from "../Component/todolist";
// import Todo from "../TODOLIST/todo";
export default function RouterApp() {

    return (
        <>
            <Router>
                {/* <Header /> */}
                <Routes>
                {/* <Route path="/" element={<Todo />} /> */}
                <Route path="/" element={<Todolist />} />


                </Routes>
                {/* <Footer/> */}
            </Router>

        </>
    )
}