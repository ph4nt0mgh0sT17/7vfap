import {FC} from "react";
import {Container} from "react-bootstrap";

export const FooterPage: FC = () => {
    return (
        <footer className="bg-primary pt-4 pb-3">
            <Container fluid>
                <p className="text-white text-center">
                    &copy; React VFAP 2022/2023
                </p>
            </Container>
        </footer>
    )
}