import { useState, useEffect } from "react";

import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myplix.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
              console.log("movies from api", data);
              setMovies(data);
            });
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                <LoginView onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                }}
                />
                or
                <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
                />
                <Button onClick={() => {setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                {movies.map((movie, index) => (
                    <Col className="mb-3" key={index} md={3}>
                    <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                    />
                    </Col>
                ))}
                <Button onClick={() => {
                    setUser(null);
                }}>
                    Logout
                </Button>
                </>
            )}
        </Row>
    );
};