import "./movie-view.scss";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const MovieView = () => {
    const { movieId } = useParams();
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const movie = useSelector((state) => state.movies);
    const [movieExists, setMovieExists] = useState(false);
    const [disableRemove, setDisableRemove] = useState(true);
    const [userFavoriteMovies, setUserFavoriteMovies] = useState(storedUser.FavoriteMovies ? storedUser.FavoriteMovies: FavoriteMovies);

    console.log(username)

    const addFavoriteMovies = async() => {
        const FavoriteMovies = await fetch(`https://myplix.herokuapp.com/users/${username}/movies/${movieId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
            }
        })

        console.log(storedToken)

        const response = await FavoriteMovies.json()
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
        const FavoriteMovie = await fetch (`https://myplix.herokuapp.com/users/${username}/movies/${movieId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json"
            }
        })
        const response = await FavoriteMovie.json()
        if (response) {
            alert("Movie removed from Favorites");
            localStorage.setItem("user", JSON.stringify (response))
            window.location.reload();
        } else {
            alert("Something went wrong");
        }
    };

    const movieAdded = () => {
        const hasMovie = userFavoriteMovies.some((m) => m._id === movieId)
        if (hasMovie) {
            setMovieExists(true)
        }
    };

    const movieRemoved = () => {
        const hasMovie = userFavoriteMovies.some((m) => m._id === movieId)
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
        </Col>
        <Col>
            <Link to={`/`}>
                <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
            </Link>
        </Col>
        <Col>
            <Button
            className="button-add-favorite"
            onClick={addFavoriteMovies}
            disabled={movieExists}
            >
                + Add to Favorites
            </Button>
            <Button
            variant="primary"
            onClick={removeFavoriteMovie}
            >
                - Remove from Favorites
            </Button>
        </Col>
        </Row>
    );
};


