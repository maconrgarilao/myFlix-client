import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

export const FavMovies = ({ movies, storedUser }) => {
    const [user, setUser] = useState(storedUser ? storedUser : null);
    let favoriteMovieList = movies.filter((m) => 
        user.FavoriteMovies.includes(m._id)
    );

    return (
       <Row>
        {favoriteMovieList.length === 0 ? (
            <Col>Favorite Movies</Col>
        ) : (
            <>
            <div className="text-start h4 mb-4">List of favorite movies</div>
            {favoriteMovieList.map((movie) => (
                <Col className="mb-5" key={movie._id} xs={12} sm={6} md={4} lg={3}>
                    <MovieCard
                    movie={movie}
                    user={user}
                    updateUserOnFav={(user) => {
                        console.log("Update User called", user);
                        setUser(user);
                        localStorage.setItem("user", JSON.stringify(user));
                    }}
                    />
                </Col>
            ))}
            </>
        )}
       </Row>
    );
};
