import {FC} from "react";
import {SearchEntity} from "./search-response";
import React from "react";

export interface MovieListProps {
    movies: SearchEntity[];
    addFavouriteMovie: (movie: SearchEntity) => void;
}

const MovieList: FC<MovieListProps> = (props: MovieListProps) => {

    return (
        <>
            {props.movies.length > 0 &&
                props.movies.map((movie: SearchEntity, index: number) => (
                    <div className="image-container d-flex col" onClick={() => props.addFavouriteMovie(movie)}>
                        <img src={movie.Poster} className="img-thumbnail" alt="movie"/>
                        <div className="overlay d-flex align-items-center justify-content-center">
                            Přidat do oblíbených
                        </div>
                    </div>
                ))
            }

            {props.movies.length === 0 &&
                <div className="alert alert-primary">
                    Žádné nalezené filmy.
                </div>

            }
        </>
    );
}

export default MovieList;