import React from "react";
import { Container, Row } from 'react-bootstrap';
import "./Purchase.css"

export default (function Purchases(props) {

    return (
        <>
            <Container fluid >
                <Row className="row overflow-auto">
                    {props.purcheses}
                </Row>
                <Row>
                    {props.purcheses === 0 ? 'No purcheses to show' : ''}
                </Row>
            </Container>

        </>
    );
});