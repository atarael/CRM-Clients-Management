import React from "react";
import { Col } from 'react-bootstrap';

export default function CallsDocumentation(props) {
    return (
        <>

            {props.calls}
            {props.calls.length === 0 ?
                <Col>
                    <p>
                        No calls documentation to show
                    </p>
                </Col>
                : ''}

        </>



    );
}

