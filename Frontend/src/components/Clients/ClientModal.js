import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux' 
import { ToggleButton, ButtonGroup, Button, Form, Modal, Row, Col } from 'react-bootstrap';
 

export default(function ClientModal(props) {
    const client = useSelector(state =>  
        state.clientReducer.client
    ); 

    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const genders = [{ name: 'Male', value: 'Male' }, { name: 'Female', value: 'Female' }];
    const [clientDetails, setClientDetails] = useState({ "first_name": "", "last_name": "", "client_id": "", "phone_number": "", "email": "", "year_of_birth": "", "gender": "", "start_connection_date": new Date().getTime() });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    function Submit() {
        console.log(clientDetails);
        

        if (Object.values(clientDetails).indexOf("") !== -1) {
            setError(true);
        }
        else {
            props.handleFunction(clientDetails);            
            setError(false);
            handleClose();
        }

    }


    useEffect(() => { 
        setClientDetails({ "first_name": "", "last_name": "", "client_id": "", "phone_number": "", "email": "", "year_of_birth": "", "gender": "", "start_connection_date": new Date().getTime() })
        if (props.addOrUpdate === "Update ") {         
           setClientDetails(client)
        }
        
    }, [show])
    
     
    return (
        <>
            <Button variant="success" color="primary" onClick={handleShow}>{props.addOrUpdate} Client</Button>{' '}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="m-2 p-5"
            >
                <Modal.Header closeButton>

                    <Modal.Title>Fill details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {error ? <Form.Label column sm="3" style={{ color: "red" }}>Please fill all fields.</Form.Label> : ''}
                        <Form.Group as={Row} controlId="first_name">
                            <Form.Label column sm="3">First name:</Form.Label>
                            <Col sm="9">
                                <Form.Control defaultValue={clientDetails.first_name} onChange={(e) => {setClientDetails({ ...clientDetails, first_name: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="last_name">
                            <Form.Label column sm="3">Last name:</Form.Label>
                            <Col sm="9">
                                <Form.Control defaultValue={clientDetails.last_name} onChange={(e) => {setClientDetails({ ...clientDetails, last_name: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="client_id">
                            <Form.Label column sm="3">ID: </Form.Label>
                            <Col sm="9">
                                {(props.addOrUpdate === "Update ") ?
                                    <Form.Control readOnly value={ clientDetails.client_id} type="number" />
                                    :
                                    <Form.Control type="number" onChange={(e) => {setClientDetails({ ...clientDetails, client_id: e.target.value }) }} />
                                }

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="phone_number">
                            <Form.Label column sm="4">Mobile phone:</Form.Label>
                            <Col sm="8">
                                <Form.Control defaultValue={clientDetails.phone_number} onChange={(e) => {setClientDetails({ ...clientDetails, phone_number: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="Email">
                            <Form.Label column sm="4">Email address:</Form.Label>
                            <Col sm="8">
                                <Form.Control type="email" defaultValue={clientDetails.email} onChange={(e) => {setClientDetails({ ...clientDetails, email: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="year_of_birth">
                            <Form.Label column sm="2">Year birth:</Form.Label>
                            <Col sm="3">
                                <Form.Control defaultValue={clientDetails.year_of_birth} type="number" onChange={(e) => {setClientDetails({ ...clientDetails, year_of_birth: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            {/* <Form.Check inline label="Male" />
                            <Form.Check inline label="Female"/> */}

                            <ButtonGroup toggle className="pl-5 ">
                                {genders.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        type="radio"
                                        variant="outline-info"
                                        name="radio"
                                        value={radio.value}
                                        checked={clientDetails.gender === radio.value}
                                        onClick={(e) => {  setClientDetails({ ...clientDetails, gender: radio.name }) }}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={Submit}>Submit</Button>
                </Modal.Footer>
            </Modal>

        </>



    );
}
);
