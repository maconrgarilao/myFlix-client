import React from "react";
import { Row, Col } from "react-bootstrap";


export const UserInfo = ({user}) => {

    return (
        <>
        <h4>Your Profile</h4>
        <Row className="d-flex flex-column flex-lg-row ms-2 text-lg-center mt-lg-3 mt-3">
            <Col>
            <span>Username: </span>
            <span className="fw-bolder">{user.Username}</span>
            </Col>
            <Col>
            <span>Email: </span>
            <span className="fw-bolder">{user.Email}</span>
            </Col>
            <Col>
            <span>Birthday: </span>
            <span className="fw-bolder">{new Date(user.Birthday).toLocaleDateString("en-US")}</span>
            </Col>
        </Row>
        </>
    );
}