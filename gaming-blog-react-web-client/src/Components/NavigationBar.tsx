import {Container, Nav, Navbar} from "react-bootstrap";
import {FC} from "react";
import {Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export const NavigationBar: FC = () => {

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="">Herní blog</Navbar.Brand>
                <Nav className="me-auto">
                    <Link to='/reviews' className="nav-link">Recenze</Link>
                    <Link to="/articles" className="nav-link">Články</Link>
                    <Link to="/first-feelings" className="nav-link">První dojmy</Link>
                </Nav>
            </Container>
        </Navbar>
    );
};