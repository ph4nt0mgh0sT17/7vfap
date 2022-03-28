import React, {Component, FC} from 'react';
import {NavigationBar} from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css"
import {Header} from "./components/Header";
import {FooterPage} from "./components/FooterPage";

interface AppState {

}

class App extends Component<any, AppState> {
    constructor(props: any) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <Header />
                <FooterPage />
            </React.Fragment>
        );
    }
}

export default App;
