import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const UpdateForm =({ storedToken, storedUser}) => {

    const [token] = useState(storedToken ? storedToken : null);
    const [user, setUser] = useState(storedUser ? storedUser : null);

    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);

    const updateUser = (username) => {
        fetch(`https://myplix.herokuapp.com/users/${username}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        }).then(response => response.json())
        .then((updatedUser) => {
            if (updatedUser) {
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
        };
        fetch(
            `https://myplix.herokuapp.com/users/${storedUser.Username}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        )
        .then((response) => {
            if (response.ok) {
                alert("Changes saved");
                updateUser(username);
            } else {
                alert("Something went wrong");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };


    return (
        <>
        <h4>Update Info</h4>
        <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
            <Form.Group>
                <Form.Label>Username: </Form.Label>
                <Form.Control
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                placeholder="Enter a username" 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                 type="password"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                required
                minLength="8"
                placeholder="Password must be 8 or more characters" 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>E-mail: </Form.Label>
                <Form.Control
                 type="email"
                 value={email}
                 onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your email address" 
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday: </Form.Label>
                <Form.Control
                 type="date"
                 value={birthday}
                 onChange={e => setBirthday(e.target.value)}
                required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
            Save Changes
            </Button>
        </Form>
        </>
    )
}

export default UpdateForm