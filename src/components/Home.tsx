import {FC} from "react";
import {Accordion, Button, Container} from "react-bootstrap";
import {About} from "./About";
import {References} from "./References";
import {Contact} from "./Contact";

export const Home: FC = () => (
    <div>
        <h2>Vítejte na našem webu</h2>
        <p>Úvodní text úvodní stránky</p>

        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>O nás</Accordion.Header>
                <Accordion.Body>
                    <About />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Reference</Accordion.Header>
                <Accordion.Body>
                    <References />
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
                <Accordion.Header>Kontakt</Accordion.Header>
                <Accordion.Body>
                    <Contact />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    </div>
);