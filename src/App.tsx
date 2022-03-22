import React, {FC, useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";
import {SearchEntity} from "./search-response";
import MovieList from "./MovieList";
import Footer from "./Footer";
import Swal from 'sweetalert2';
import FavouriteMovieList from "./FavouriteMovieList";

const App: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [movies, setMovies] = useState<SearchEntity[]>([]);
    const [favouriteMovies, setFavouriteMovies] = useState<SearchEntity[]>([]);

    const getMovieRequest = async (searchValue: any) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aeb2b829`;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    }

    useEffect(() => {
        getMovieRequest(searchValue).then(() => {
        });
    }, [searchValue]);

    const saveToLocalStorage = (movies: SearchEntity[]): void => {
        localStorage.setItem('react-favourite-movies', JSON.stringify(movies));
    };

    const addFavouriteMovie = (movie: SearchEntity): void => {
        if (favouriteMovies.find(x => x.Title === movie.Title)) {
            Swal.fire({
                title: 'Nemůžeš přidat tento film znovu.',
                icon: "error"
            });
        } else {
            const newFavouriteMovieList: SearchEntity[] = [...favouriteMovies, movie];
            setFavouriteMovies(newFavouriteMovieList);
            saveToLocalStorage(newFavouriteMovieList);
        }
    };

    const removeFavouriteMovie = (favouriteMovie: SearchEntity): void => {
        const newFavouriteMovieList: SearchEntity[] = favouriteMovies.filter(x => x.Title !== favouriteMovie.Title);
        setFavouriteMovies(newFavouriteMovieList);
        saveToLocalStorage(newFavouriteMovieList);
    };

    return (
        <div className="container movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Seznam filmů" level={1}/>
                <SearchBox value={searchValue} setSearchValue={setSearchValue}/>
            </div>

            <div className="row">
                <MovieList movies={movies} addFavouriteMovie={addFavouriteMovie}/>
            </div>

            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Oblíbené filmy" level={2}/>
            </div>

            <div className="row">
                <FavouriteMovieList favouriteMovies={favouriteMovies}
                                    removeFavouriteMovie={removeFavouriteMovie}/>
            </div>

            <div className="row d-flex align-items-center mt-4 mb-4">
                <Footer/>
            </div>
        </div>

    );
}

export default App;
