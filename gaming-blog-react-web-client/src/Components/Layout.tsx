import React, {FC} from "react";
import {Container} from "react-bootstrap";

export interface LayoutProps {
    children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => (
    <Container className="mt-2">
        {props.children}
    </Container>
);