import "./movie-view.scss";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

export const MovieView = ({ movies, username, favoriteMovies }) => {
    const { id } = useParams();
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const movie = movies.find((m) => m._id === id);
    const [movieExists, setMovieExists] = useState(false);
    const [disableRemove, setDisableRemove] = useState(true);
    const [userFavoriteMovies, setFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: favoriteMovies);

    console.log(username)

    const addFavoriteMovie = async() => {
        const favoriteMovie = await fetch(`https://myplix.herokuapp.com/users/:Username/movies/:MovieID`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        console.log(storedToken)

        const response = await favoriteMovie.json()
        console.log(response)
        setUserFavoriteMovies(response.FavoriteMovies)
        if (response) {
            alert("Movie added to Favorites!");
            localStorage.setItem("user", JSON.stringify (response))
            window.location.reload();
        } else {
            alert("Something went wrong");
        }
    }

    const removeFavoriteMovie = async() => {
        const favoriteMovie = await fetch (`https://myplix.herokuapp.com/users/:Username/movies/:MovieID`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const response = await favoriteMovie.json()
        console.log(response)
        if (response) {
            alert("Movie removed from Favorites");
            localStorage.setItem("user", JSON.stringify (response))
            window.location.reload();
        } else {
            alert("Something went wrong");
        }
    };

    const movieAdded = () => {
        const hasMovie = userFavoriteMovies.some((m) => m === movieId)
        console.log("userFavMov", userFavoriteMovies)
        console.log("index", id)
        if (hasMovie) {
            setMovieExists(true)
        }
    };

    const movieRemoved = () => {
        const hasMovie = userFavoriteMovies.some((m) => m === movieId)
        if (hasMovie) {
            setDisableRemove(false)
        }
    };

    console.log("movieExists", movieExists)

    useEffect (() => {
        movieAdded()
        movieRemoved()
    },[])

    return (
        <Row className="movie-view">
        <Col md={6} className="movie-poster" >
            <img className="movie-img" crossOrigin="anonymous" src={movie.ImagePath} />
        </Col>
        <Col md={6}>
            <div className="movie-title">
                <span className="value"><h2>{movie.Title}</h2></span>
            </div>
            <div className="movie-description">
                <span className="label"><h5>Description: </h5></span>
                <span className="value">{movie.Description}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
            </Link>
            <Button
            className="button-add-favorite"
            onClick={addFavoriteMovie}
            disabled={movieExists}
            >
                + Add to Favorites
            </Button>
            <Button
            variant="danger"
            onClick={removeFavoriteMovie}
            disabled={disableRemove}
            >
                - Remove from Favorites
            </Button>
        </Col>
        </Row>
    );
};


