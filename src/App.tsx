import React, {FC, useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieListHeading from "./MovieListHeading";
import SearchBox from "./SearchBox";
import {SearchEntity} from "./search-response";
import MovieList from "./MovieList";
import Footer from "./Footer";

const App: FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [movies, setMovies] = useState<SearchEntity[]>([]);

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


    return (
        <div className="container-fluid movie-app">
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Seznam filmů" level={1}/>
                <SearchBox value={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className="row">
                <MovieList movies={movies} />
            </div>
            <div className="row d-flex align-items-center mt-4 mb-4">
                <MovieListHeading heading="Oblíbené filmy" level={5} />
            </div>
            <div className="row d-flex align-items-center mt-4 mb-4">
                <Footer heading="Footer" />
            </div>
        </div>

    );
}

export default App;
