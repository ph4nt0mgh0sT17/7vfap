import React, {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout} from "./Layout";
import {Home} from "./Home";
import {About} from "./About";
import {References} from "./References";
import {Contact} from "./Contact";

export const LayoutRouter: FC = () => (
    <BrowserRouter>
        <Layout>
            <Routes>
                <Route element={<Home/>} path="/"></Route>
                <Route element={<About/>} path="/about"></Route>
                <Route element={<References/>} path="/references"></Route>
                <Route element={<Contact/>} path="/contact"></Route>
            </Routes>
        </Layout>
    </BrowserRouter>
);