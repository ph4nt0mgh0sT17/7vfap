import React, {useEffect, useState} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBoxWalek from "./SearchBoxWalek";
import MovieListHeadingWalek from "./MovieListHeadingWalek";
import MovieListWalek from "./MovieListWalek";
import FooterWalek from "./FooterWalek";

const AppWalek = () => {
    const [searchValue, setSearchValue] = useState([]);
    const [movies, setMovies] = useState([]);

    const getMovieRequest = async (searchValue: any) => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aeb2b829`;
        const response = await fetch(url);
        const responseJson = await response.json();

        if (responseJson.Search) {
            setMovies(responseJson.Search);
        }
    }

    useEffect(() => {
        getMovieRequest(searchValue).then(() => {});
    }, [searchValue]);

    return (
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeadingWalek heading="Seznam filmů" level="1" />
                <SearchBoxWalek searchValue={searchValue} setSearchValue={setSearchValue} />
            </div>
            <div className="row">
                <MovieListWalek movies={movies} />
            </div>
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeadingWalek heading="Oblíbené filmy" level="5" />
            </div>
            <div className="row d-flex align-items-center mt-4 mb-4">
                <FooterWalek heading="Footer" />
            </div>
        </div>
    );

};

export default AppWalek;
