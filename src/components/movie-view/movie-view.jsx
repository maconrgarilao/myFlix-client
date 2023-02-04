import "./movie-view.scss";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { index } = useParams();

    const movie = movies.find((m) => m.id === index);

    return (
        <div className="movie-view">
            <div className="movie-poster">
                <img className="w-100" src={movie.ImagePath} />
            </div>
            <div className="movie-title">
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div className="movie-director">
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button" style={{ cursor: "pointer" }}>Back</button>
            </Link>
        </div>
    );
};

