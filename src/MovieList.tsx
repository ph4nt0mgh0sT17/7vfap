import {FC} from "react";
import {MoviesResponse} from "./movies-response";
import {SearchEntity} from "./search-response";
import React from "react";

export interface MovieListProps {
    movies: SearchEntity[];
}

const MovieList: FC<MovieListProps> = (props: MovieListProps) => {
    return (
        <>
            {
                props.movies.map((movie: SearchEntity, index: number) => (
                    <div className="col-4">
                        <img src={movie.Poster} className="img-thumbnail" alt="movie"/>

                    </div>
                ))
            }
        </>
    );
}

export default MovieList;