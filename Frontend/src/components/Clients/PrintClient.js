import React, { useState } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// @material-ui/core components 
import { BrowserRouter, Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
// import { Router, Route, Switch } from "react-router"
// import Button from "@material-ui/core/Button"
function mapStateToProps(state) {
    return {
        client: state.clientReducer.client
    };
}

const mapDispatchToProps = (dispatch) => ({

    setFirstName: (company_name) => dispatch(actions.setFirstName(company_name))

})

export default connect(mapStateToProps, mapDispatchToProps)(function PrintClient(props) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function UdpateDetailsInServer() {
        // setFirstName();
        // action to update details
        handleClose();
    }
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });


    return (
        <>
            {/* <label >hello {props.client.firstName}</label> */}
            <Button variant="success" color="primary" onClick={handleShow}>Print Client Card</Button>{' '}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Body>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.section}>
                                <h3>Client Details:</h3>
                                <h4>ID: {props.client.id}</h4>
                                <h4>First Name: {props.client.firstName}</h4>
                                <h4>Last Name: {props.client.lastName}</h4>
                                <h4>Email: {props.client.email}</h4>
                                <h4>Mobile: {props.client.mobile}</h4>
                                <hr></hr>
                                <h3> Call documentation:</h3>
                            </View>

                        </Page>
                    </Document>

                    <Button onClick={() => window.print()}>PRINT</Button>

                </Modal.Body>
            </Modal>
        </>



    );
}
);
