import {FC} from "react";
import styled from "styled-components";
// @ts-ignore
import boatImage from "../assets/boatImage.jpg";
import {Container} from "react-bootstrap";

const Styles = styled.div`
  .main {
    background: url(${boatImage}) no-repeat fixed bottom;
    background-size: cover;
    color: #fff;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
`;

export const Header: FC = () => {
    return (
        <Styles>
            <Container fluid className="main">
                <div className="overlay"></div>
                <Container>
                    <h1>Vítejte</h1>
                </Container>
            </Container>
        </Styles>
    );
}