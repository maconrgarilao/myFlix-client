import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([

        {   id: 1,
            Title: "Notting Hill",
            Description: "The story is of a romance between a London bookseller (Grant) and a famous American actress (Roberts) who happens to walk into his shop.",
            Image: "https://m.media-amazon.com/images/M/MV5BMTE5OTkwYzYtNDhlNC00MzljLTk1YTktY2IxZjliZmNjMjUzL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
            Director: "Roger Michell" 
        },
        {
            id: 2,
            Title: "300",
            Description: "The plot revolves around King Leonidas, who leads 300 Spartans into battle against Persian god-king Xerxes and his big and good army of more than 300,000 soldiers.",
            Image: "https://upload.wikimedia.org/wikipedia/en/5/5c/300poster.jpg",
            Director: "Zack Snyder"
        },
        {
            id: 3,
            Title: "Titanic",
            Description: "Incorporating both historical and fictionalized aspects, it is based on accounts of the sinking of the RMS Titanic and stars Leonardo DiCaprio and Kate Winslet as members of different social classes who fall in love aboard the ship during its ill-fated maiden voyage.",
            Image: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png",
            Director: "James Cameron"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <>
            <button onClick={() => {setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            </>
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    } else {
        return (
            <div>
                <button onClick={() => {
                    setUser(null);
                }}>
                    Logout
                </button>
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }} />
                ))}
            </div>
        );
    }
};
