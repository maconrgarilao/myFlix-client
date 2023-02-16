import { useEffect } from "react";

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
import { setUser } from "../../redux/reducers/user";
import { setToken } from "../../redux/reducers/token";

export const MainView = () => {
    const movies = useSelector((state) => state.movies.movies);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token || localStorage.getItem("token"));
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            return;
        }
        getUser();
        getMovies();
    }, [token]);

    const getUser = () => {
        const username = JSON.parse(localStorage.getItem("user")).Username;
        fetch(`https://myplix.herokuapp.com/users/${username}`, {
            headers: { 
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",  
        },
        })
        .then((response) => response.json())
        .then((user) => {
            dispatch(setUser(user));
        })
        .catch((error) => {
            console.log('Error happened here!', error);
        })
    };

    const getMovies = () => {
        fetch(`https://myplix.herokuapp.com/movies`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((doc) => {
                return {
                    id: doc._id,
                    title: doc.Title,
                    description: doc.Description,
                    genre: {
                        name: doc.Genre.Name,
                        description: doc.Genre.Definition,
                    },
                    director: {
                        name: doc.Director.Name,
                        bio: doc.Director.Bio,
                    },
                    image: doc.ImagePath,
                };
            });
            dispatch(setMovies(moviesFromApi));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    return (
        <BrowserRouter>
        <NavigationBar />
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
                            <LoginView />
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
                            <ProfileView />
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