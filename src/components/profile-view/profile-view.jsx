import React from "react";
import { UpdateForm } from "./update-form";
import { FavMovies } from "./fav-movies";
import { UserInfo } from "./user-info";

export const ProfileView = ({ movies }) => {
    const storedToken = localStorage.getItem("token");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    return (
        <>
        <UserInfo user={storedUser} />
        <UpdateForm storedToken={storedToken} storedUser={storedUser} />
        <FavMovies movies={movies} storedUser={storedUser} />
        </>
    );
};