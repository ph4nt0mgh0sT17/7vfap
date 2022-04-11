import React, {Component, FC} from 'react';
import {NavigationBar} from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css"
import {Header} from "./components/Header";
import {FooterPage} from "./components/FooterPage";
import {LayoutRouter} from "./components/LayoutRouter";

interface AppState {

}

interface AppProps {

}

class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header/>
                <LayoutRouter/>
                <FooterPage/>
            </React.Fragment>
        );
    }
}

export default App;
