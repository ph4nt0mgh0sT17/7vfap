import {MovieListProps} from "../MovieList";
import {SearchEntity} from "../search-response";

const MovieListWalek = (props: any) => {
    return (
        <>
        {
            props.movies.Search?.map((movie: SearchEntity, index: number) => (
                <div className="col-md-4">
                    <img src={movie.Poster} className="img-thumbnail" alt="movie"/>
                </div>
            ))
        }
    </>
    )
}

export default MovieListWalek;