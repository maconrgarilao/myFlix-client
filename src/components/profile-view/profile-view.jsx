import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { UpdateForm } from "./update-form";
import { FavMovies } from "./fav-movies";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";

export const ProfileView = ({ user, movies }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");
    const [token] = useState(storedToken ? storedToken : null);

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
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

    useEffect(()=> {
        getUser(token);
    },[])

    return (
        <Container>
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <div>
                                <h4>User Details</h4>
                                <p>Username: {Username}</p>
                                <p>Birthday: {Birthday}</p>
                                <p>Email: {Email}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <UpdateForm user={user}/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <FavMovies user={user} movies={movies}/>
            </Row>
        </Container>
    )
};
