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
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
    const storedToken = localStorage.getItem("token");
    const movies = useSelector((state) => state.movies.movies);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("https://myplix.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
              const moviesFromApi = data.map((doc) => {
                return {
                    id: doc._id,
                    title: doc.Title,
                };
              });

              dispatch(setMovies(moviesFromApi));
            });
        }, []);

    return (
        <BrowserRouter>
        <NavigationBar 
        user={user}
        onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
        }}
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
                                <MovieView />
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
                        {movies.map((movie, movieId) => (
                            <Col className="mb-4" key={movieId} md={3}>
                                <MovieCard movie={movie}
                                />
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