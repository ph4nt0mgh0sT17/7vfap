import {FC} from "react";

export interface FooterProps {
    heading: string;
}

const Footer: FC<FooterProps> = (props) => {
    return (
        <div className="col">
            <footer>{props.heading}</footer>
        </div>
    )
}

export default Footer;