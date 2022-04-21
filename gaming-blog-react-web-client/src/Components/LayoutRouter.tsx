import React, {FC} from "react";
import {
    BrowserRouter,
    Navigate,
    Route, Routes
} from "react-router-dom";
import {Layout} from "./Layout";
import {Reviews} from "./Reviews";
import {Articles} from "./Articles";
import {NavigationBar} from "./NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {FirstFeelings} from "./FirstFeelings";

export const LayoutRouter: FC = () => (
    <BrowserRouter>
        <NavigationBar/>
        <Layout>
            <Routes>
                <Route path="/*">
                    <Route element={<Reviews/>} path="reviews"/>
                    <Route element={<Articles/>} path="articles"/>
                    <Route element={<FirstFeelings/>} path="first-feelings"/>
                    <Route path="*" element={<Navigate to={"reviews"} />} />
                </Route>
            </Routes>
        </Layout>
    </BrowserRouter>
);