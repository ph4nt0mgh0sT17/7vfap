import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import React, {FC, useState} from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {LoginDialog} from "./Dialogs/LoginDialog";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/reducers";
import {bindActionCreators} from "redux";
import { actionCreators } from "../state";
import {LoginResponse} from "../Models/Responses/LoginResponse";
import {UserRole} from "../Models/UserRole";
import {RegistrationDialog} from "./Dialogs/RegistrationDialog";

export const NavigationBar: FC = () => {

    const [loginDialogOpened, setLoginDialogOpened] = useState(false);
    const [registrationDialogOpened, setRegistrationDialogOpened] = useState(false);

    const state: LoginResponse | null = useSelector((state: RootState) => state.application);
    const dispatch = useDispatch();

    const { login, logout } = bindActionCreators(actionCreators, dispatch)

    const getUserInformation = () => {
        let userRole = '';

        if (state?.userRole === UserRole.ROLE_USER)
            userRole = 'Uživatel';

        else if (state?.userRole === UserRole.ROLE_ADMIN)
            userRole = 'Administrátor';

        return `${state?.username} - ${userRole}`;
    }

    const openLoginDialog = () => {
        setLoginDialogOpened(true);
    }

    const openRegistrationDialog = () => {
        setRegistrationDialogOpened(true);
    }

    return (
        <React.Fragment>
            <Navbar bg="light" variant="light" expand="lg" className="p-3" collapseOnSelect>
                <Navbar.Brand href="">Herní blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link to='/reviews' className="nav-link">Recenze</Link>
                        <Link to="/articles" className="nav-link">Články</Link>
                        <Link to="/first-feelings" className="nav-link">První dojmy</Link>
                    </Nav>
                    <Nav>
                        {state != null &&
                            <NavDropdown title={getUserInformation()}>
                                <NavDropdown.Item onClick={logout}>Odhlásit se</NavDropdown.Item>
                            </NavDropdown>
                        }

                        {state == null &&
                            <NavDropdown title="Nepřihlášený uživatel">
                                <NavDropdown.Item onClick={openLoginDialog}>Přihlásit se</NavDropdown.Item>
                                <NavDropdown.Item onClick={openRegistrationDialog}>Registrovat se</NavDropdown.Item>
                            </NavDropdown>
                        }

                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <LoginDialog open={loginDialogOpened} onClose={() => {
                setLoginDialogOpened(false);
            }}/>

            <RegistrationDialog open={registrationDialogOpened} onClose={() => {
                setRegistrationDialogOpened(false);
            }} />
        </React.Fragment>
    );
};