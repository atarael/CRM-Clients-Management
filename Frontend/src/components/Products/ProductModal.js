import React, { useEffect, useState } from "react";
import * as productAPI from './../../api/product'

import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';

// import { Router, Route, Switch } from "react-router"
// import Button from "@material-ui/core/Button"
function mapStateToProps(state) {
    // ;
    return {
        product: state.productReducer.product
    };
}

const mapDispatchToProps = (dispatch) => ({
    setInsuranceId: (insurance_Id) => dispatch(actions.setInsuranceId(insurance_Id)),
    setInsuranceName: (insurance_Name) => dispatch(actions.setInsuranceName(insurance_Name)),
    setInsuranceDescription: (Insurance_Description) => dispatch(actions.setInsuranceDescription(Insurance_Description)),
    setInsurancePrice: (insurance_Price) => dispatch(actions.setInsurancePrice(insurance_Price)),
    setInsurancePicture: (insurance_Picture) => dispatch(actions.setInsurancePicture(insurance_Picture))

})



export default connect(mapStateToProps, mapDispatchToProps)(function ProductModal(props) {
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState({ name: "", description: "", price: 0, date: new Date().getTime(), image: '' });
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [error, setError] = useState(false);

    function UdpateDetails() {
        // setFirstName();
        if (product.name === "" || product.description === "" || product.price === 0 || product.image === "")
            setError(true);
        else {
            
            props.handleFunction(product);
            setProduct({ ...product, name: "", description: "", price: 0, image: "" })
            // action to update details
            handleClose();
        }
    }
    const getProduct = async () => {
        const response =await productAPI.getProduct(props.product.insuranceId);
        
        if (response != null) {
            const productJson = response[0];
            if (productJson.date === undefined) {
                productJson.date = new Date().getTime();
            }
            setProduct({

                name: productJson.name,
                price: productJson.price,
                description: productJson.description,
                date: productJson.date,
                image: productJson.image

            })
        }


    }
    useEffect(() => {
        if (props.addOrUpdate === "Update ") {
            getProduct();
        }
    }, [])


    return (
        <>
            {/* <label >hello {props.client.firstName}</label> */}
            <Button variant="success" color="primary" onClick={handleShow}>{props.addOrUpdate}</Button>{' '}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Fill details:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error ? <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''}

                    <Form>
                        <Form.Group as={Row} controlId="NameInsurance">
                            <Form.Label column sm="3">Name of Insurance:</Form.Label>
                            <Col sm="9">
                                <Form.Control defaultValue={product.name} onChange={(e) => { setProduct({ ...product, name: e.target.value }) }} />

                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="description">
                            <Form.Label column sm="3">Description of insurance:</Form.Label>
                            <Col sm="9">
                                <Form.Control defaultValue={product.description} maxLength="250" placeholder="enter until 250 characters" onChange={(e) => { setProduct({ ...product, description: e.target.value }) }} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="price">
                            <Form.Label column sm="4">Price of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control defaultValue={product.price} type="number" onChange={(e) => { setProduct({ ...product, price: e.target.value }) }} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="picture">
                            <Form.Label column sm="5">Picture of insurance:</Form.Label>
                            <Col sm="8">
                                <Form.Control defaultValue={product.image} onChange={(e) => { setProduct({ ...product, image: e.target.value }) }} />
                            </Col>
                        </Form.Group>


                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="primary" onClick={UdpateDetails}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </>



    );
});
