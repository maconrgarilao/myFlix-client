import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";

export const UpdateForm = ({ user }) => {

    const storedToken = localStorage.getItem("token");
    const storedMovies = JSON.parse(localStorage.getItem("movies"))
    const storedUser = localStorage.getItem("user");
    const [token] = useState(storedToken ? storedToken : null);

    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = async(event) => {
        event.preventDefault();

        const data = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };
        console.log(data)

        const updateUser = await fetch(`https://myplix.herokuapp.com/users/:Username`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })

        const response = await updateUser.json()
        console.log(response)
        if (response) {
            alert("Account successfully updated! Please log in again");
            localStorage.clear();
            window.location.reload();
        } else {
            alert("Something went wrong");
        }

        const handleDeregister = () => {
            fetch(`https://myplix.herokuapp.com/users/:Username`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.ok) {
                    alert("Account successfully deleted");
                    localStorage.clear();
                    window.location.reload();
                } else {
                    alert("Something went wrong");
                }
            });
        };

        return (
            <>
            <h4>Update Profile Information</h4>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                    type="username"
                    value={Username}
                    onChange={e => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                    type="password"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                    type="text"
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Birthday </Form.Label>
                    <Form.Control
                    type="date"
                    value={Birthday}
                    onChange={e => setBirthday(e.target.value)}
                    />
                </Form.Group>
            </Form>
            <Button onClick={() => handleDeregister(user._id)} className="button-delete mt-3" type="submit" variant="danger" >Delete Account</Button>
            </>
        )
    }
}