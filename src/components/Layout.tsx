import {FC} from "react";
import {Container} from "react-bootstrap";

export interface LayoutProps {
}

export const Layout: FC<LayoutProps> = (props) => (
    <Container>
        {props.children}
    </Container>
);