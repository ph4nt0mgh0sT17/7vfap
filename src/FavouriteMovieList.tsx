import React, {FC} from "react";
import {SearchEntity} from "./search-response";
import {MovieListProps} from "./MovieList";

export interface FavouriteMovieListProps {
    favouriteMovies: SearchEntity[];
    removeFavouriteMovie: (movie: SearchEntity) => void;
}

const FavouriteMovieList: FC<FavouriteMovieListProps> = (props: FavouriteMovieListProps) => {
    return (
        <>
            {props.favouriteMovies.length > 0 &&
                props.favouriteMovies.map((movie: SearchEntity, index: number) => (
                    <div className="image-container d-flex col" onClick={() => props.removeFavouriteMovie(movie)}>
                        <img src={movie.Poster} alt="movie"/>
                        <div className="overlay d-flex align-items-center justify-content-center">
                            Odebrat z oblíbených
                        </div>
                    </div>
                ))
            }

            {props.favouriteMovies.length === 0 &&
                <div className="alert alert-primary">
                    Žádné nalezené oblíbené filmy.
                </div>

            }
        </>
    );
}

export default FavouriteMovieList;