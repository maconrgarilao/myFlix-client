import "./movie-view.scss";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";

export const MovieView = ({ movies, username, token }) => {
    const { index } = useParams();

    const movie = movies.find((m) => m.id === index);

    const addFavoriteMovie = async() => {
        const favoriteMovie = await fetch(`https://myplix.herokuapp.com/users/${username}/movies/${movieId}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })

        const response = await favoriteMovie.json()
        console.log(response)
        if (response.ok) {
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify (response))
        }
    }

    const removeFavorite = async() => {
        const removeFavorite = await fetch (`https://myplix.herokuapp.com/users/${username}/movies/${movieId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        const response = await removeFavorite.json()
        console.log(response)
        if (response.ok) {
            localStorage.removeItem("user")
            localStorage.setItem("user", JSON.stringify (response))
        }
    };

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
            >
                + Add to Favorites
            </Button>
            <Button
            variant="danger"
            onClick={removeFavorite}
            >
                - Remove from Favorites
            </Button>
        </Col>
        </Row>
    );
};


