import {FC} from "react";

export interface MovieListHeadingProps {
    heading: string;
    level: number
}

const MovieListHeading: FC<MovieListHeadingProps> = (props: MovieListHeadingProps) => {
    const CustomHeadingTag: keyof JSX.IntrinsicElements = `h${props.level}` as keyof JSX.IntrinsicElements;

    return (
        <div className="col">
            <CustomHeadingTag>{props.heading}</CustomHeadingTag>
        </div>
    )
};

export default MovieListHeading;