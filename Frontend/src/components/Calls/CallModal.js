import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { Button, Form, Modal, Dropdown, DropdownButton, Toast, Row } from 'react-bootstrap';
import CalcPrice from '../Calculator/CalcPrice.js'
import { FormGroup } from "@material-ui/core";
import * as productAPI from './../../api/product.js'
import * as purchaseAPI from './../../api/purchase.js'

export default function CallModal(props) {
    const client = useSelector(state =>
        state.clientReducer.client
    );
    const employee = useSelector(state =>
        state.employeeReducer.employee
    );

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const [products, setProducts] = useState();

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [call, setCall] = useState({ clientId: client._id, date: '', subject: "Select cause of call", description: "", purchasedProducts: [] });
    const [showCalc, setShowCalc] = useState(false);
    const [price, setPrice] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = async () => {
        setShow(true);
        const response = await productAPI.getProductList();
        if (response !== null) {
            var arr = [];
            Object.values(response).map(product => arr.push({ 'name': product.name, 'id': product._id }))
            setProducts(arr);

        }

        setError(false);
    }
    const handleCalcPrice = () => {

        setShowCalc(!showCalc);
    }

    useEffect(() => {
        setCall({ ...call, purchasedProducts: selectedProducts })
    }, [selectedProducts, price]);

    useEffect(() => {

    }, [handleCalcPrice]);

    function SubmitCall() {
        ;
        if (Object.values(call).indexOf("") !== -1 || call.subject === "Select cause of call") {
            setError(true);
        }
        else {
            if (call.purchasedProducts !== []) {
               
                var arr = [];
                Object.values(call.purchasedProducts).map(product => arr.push({ productId: product.id, clientId: client._id, date: call.date, totalPrice: product.totalPrice, employeeId: employee._id }))
               
                arr.forEach((purchase) => {
                    addNewPurchase(purchase);
                })
            }
            props.addNewCall(call);
            handleClose();
        }
        setCall({ ...call, subject: "Select cause of call" });
        setPrice(0);

    }
    const addNewPurchase = async (newPurchase) => {
     await purchaseAPI.addNewPurchase(newPurchase);
       

    }

    function onSelectProduct(product) {
        if (price === 0) {
            setShowA(true);
        }
        else {
            
            setSelectedProducts([...selectedProducts, { name: product.name, id: product.id, totalPrice: price }])
            setShowA(false);
            
        }


    }


    return (
        <>

            <Button variant="warning" color="primary" onClick={handleShow}>Add Call</Button>{' '}
            <p></p>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body>
                    <Toast show={showA} onClose={toggleShowA}>
                        <Toast.Header>

                            <strong className="mr-auto">Insurece not purchesed</strong>
                        </Toast.Header>
                        <Toast.Body>Please insert total price</Toast.Body>
                    </Toast>
                    <Form.Group controlId="date">
                        {error ? <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''}
                        <DropdownButton
                            alignRight
                            title={call.subject}
                            id="dropdown-menu-align-right"
                            onSelect={(eventKey) => setCall({ ...call, subject: eventKey })}
                        >
                            <Dropdown.Item eventKey="complaint">complaint</Dropdown.Item>
                            <Dropdown.Item eventKey="Product purchase">Product purchase</Dropdown.Item>
                            <Dropdown.Item eventKey="Post-purchase questions">Post-purchase questions</Dropdown.Item>
                            <Dropdown.Item eventKey="Clarification of a transaction">Clarification of a transaction</Dropdown.Item>
                            <Dropdown.Item eventKey="information">information</Dropdown.Item>
                        </DropdownButton>



                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" onChange={(event) => setCall({ ...call, date: event.target.value })} />

                    </Form.Group>

                    <Form.Group controlId="CallDescription">
                        <Form.Label>Call Description:</Form.Label>
                        <Form.Control as="textarea" rows={6} onChange={(event) => setCall({ ...call, description: event.target.value })} />

                    </Form.Group>

                    {call.subject === "Product purchase" ?

                        products.map((prod) =>
                            <Form.Group>
                                <Row>
                                    <Form.Label >{prod.name}</Form.Label>
                                    <Form.Control type="number" onChange={(event) => { setPrice(event.target.value) }} />
                                    <Button variant="secondary" onClick={() => onSelectProduct(prod)}>Insert Price</Button>
                                </Row>
                            </Form.Group>

                        )



                        : ''}

                    {call.subject === "Product purchase" ?
                        <FormGroup className="text-center">
                            <CalcPrice />
                        </FormGroup>
                        : ''}

                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={SubmitCall}>Add call documentition</Button>
                </Modal.Footer>



            </Modal>


            {/* <h1> date from call state is : {callDate.date} sare</h1> */}
        </>
    );
}

