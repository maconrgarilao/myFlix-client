import { useState, useEffect } from "react";

import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [filteredMovieList, setFilteredMovieList] = useState([]);

    function movieSearch(searchString) {
        setFilteredMovieList(
            movies.filter((movie) => movie.Title.toLowerCase().includes(searchString))
        );
    }

    useEffect(() => {
        fetch("https://myplix.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
              console.log("movies from api", data);
              setMovies(data);
              setFilteredMovieList(data);
            });
    }, [token]);

    return (
        <BrowserRouter>
        <NavigationBar 
        user={user}
        onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
        }}
        onSearch={movieSearch}
        />
        <Row className="justify-content-md-center">
            <Routes>
                <Route
                path="/users"
                element={
                    <>
                    {user ? (
                        <Navigate to="/" />
                    ) : (
                        <Col md={5}>
                            <SignupView />
                        </Col>
                    )}
                    </>

                }
                />
                <Route
                path="/login"
                element={
                    <>
                    {user ? (
                        <Navigate to="/" />
                    ) : (
                        <Col md={5}>
                            <LoginView 
                            onLoggedIn={(user) => setUser(user)} />
                        </Col>
                    )}
                    </>
                }
                />

                <Route 
                path="/movies/:movieId"
                element={
                    <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            <Col md={8}>
                                <MovieView 
                                movies={movies} username={user.Username} favoriteMovies={user.favoriteMovies}/>
                            </Col>
                        )}
                    </>
                }
                />

                <Route
                path="/users/:Username"
                element={
                    <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ) : (
                        <Col md={8}>
                            <ProfileView user={user} movies={movies}/>
                        </Col>
                    )}
                    </>
                }
                />

                <Route
                path="/"
                element={
                    <>
                    {!user ? (
                        <Navigate to="/login" replace />
                    ) : movies.length === 0 ? (
                        <Col>The list is empty!</Col>
                    ) : (
                        <>
                        {filteredMovieList.map((movie, movieId) => (
                            <Col className="mb-4" md={3}>
                                <MovieCard 
                                movie={movie}
                                key={movieId} />
                            </Col>
                        ))}
                        </>
                    )}
                    </>
                }
                />
                
            </Routes>
        </Row>
        </BrowserRouter>
    );
};