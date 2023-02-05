import { useState, useEffect } from "react";
import { Button, Col, Card, Link } from "react-bootstrap";
import { ProfileView } from "../profile-view/profile-view";
import { MovieCard } from "../movie-card/movie-card";

export const FavMovies = ({user, movies}) => {
    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");

    const [token] = useState(storedToken ? storedToken : null);

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBirthday] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const [allMovies] = useState(storedMovies ? storedMovies: movies);
    const [filteredMovies, setFilteredMovies] = useState([]);

    const getUser = (token) => {
        fetch(`https://myplix.herokuapp.com/users/:Username`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        }).then(response => response.json())
        .then((response) => {
            console.log("getUser response", response)
            
        })
    }
    console.log("userFavMov", favoriteMovies)

    const favMovies= movies.filter((movie) => favoriteMovies.includes(movie.id));

    console.log("favMovies", favMovies)

    useEffect (() => {
        const newList = allMovies.filter((movie)=> {
            const hasMovieId = favoriteMovies.some((m)=> movie.id === m);
            if (hasMovieId) {
                return movie
            }
        })
        setFavoriteMovies (newList)
        getUser(token);
    }, [])

    return (
        <>
        <h4>Favorite Movies:</h4>
        {favMovies.length === 0 ?
        <span>No movies selected</span> : favMovies.map ((movie) => (
            <Col className="mb-4" key={index} xs={12} md={6} lg={3}>
                <MovieCard movie={movie} />
            </Col>
        ))
        }
        </>
    )
}