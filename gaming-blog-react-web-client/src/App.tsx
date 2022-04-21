import React, {FC, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {NavigationBar} from "./Components/NavigationBar";
import {LayoutRouter} from "./Components/LayoutRouter";

export const App: FC = () => {

    return (
        <React.Fragment>
            <LayoutRouter />
        </React.Fragment>
    );
};
