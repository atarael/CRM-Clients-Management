import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import ClientModal from "./ClientModal.js"
import Purchases from "./../Purchases/Purchases.js"
import { Button } from 'react-bootstrap';
import Call from "./../Calls/Call.js"
import CallsDocumentation from "./../Calls/CallsDocumentation.js"

import PurchaseCard from "./../Purchases/PurchaseCard.js"

import CallModal from "./../Calls/CallModal.js"
import { Col } from 'react-bootstrap';

import * as clientAPI from './../../api/client.js'
import * as purchaseAPI from './../../api/purchase.js'
import * as callAPI from './../../api/call.js'

export default function ClientDetails(props) {
    const client = useSelector(state =>
        state.clientReducer.client
    );
    const dispatch = useDispatch();

    const [calls, setCalls] = useState([]);
    const [purcheses, setPurcheses] = useState([]);

    const [printState, setPrintState] = useState(false);


    const updateClientDetails = async (clientDetails) => {
        const response = await clientAPI.updateClientDetails(client._id, clientDetails);
        if (response != null) {
            dispatch(actions.setClient(clientDetails));
        }

    }
    const getAllPurchases = async () => {
        const response = await purchaseAPI.getAllPurchases(client._id);
        if (response != null) {
            const purchase = response.map(purchase =>
                <Col xs={6} sm={4} md={4} lg={3} className="p-2 colPurchases ">
                    <PurchaseCard
                        purchase={purchase}
                    />
                </Col>)

            setPurcheses(purchase);

        }


    }

    const addNewCall = async (newCall) => {
        await callAPI.addNewCall(newCall);
        getAllCalls();
        getAllPurchases();

    }

    const getAllCalls = async () => {
        const response = await callAPI.getAllCalls(client._id);
        if (response != null) {
            const callsArray = response.map(call =>
                <Call call={call} />

            );
            console.log(callsArray);
            setCalls(callsArray);
        }
        else {
            alert("fail getAllCalls");
        }

    }

    useEffect(() => {
        if (printState) {
            window.print();
            setPrintState(false);
        }
    }, [printState]);

    useEffect(() => {
        getAllCalls();
        getAllPurchases();
    }, []);



    return (
        <div>

            {!printState ?
                <div className="d-flex justify-content-start">
                    <div className="text-left"><ClientModal handleFunction={updateClientDetails} client={client} addOrUpdate="Update " /></div>
                    <div className="pl-2 text-rigth"> <Button onClick={() => setPrintState(true)}>Print Client Card</Button> </div>
                </div> :
                ''
            }

            <p></p>
            <hr></hr>
            <h3>Client Details:</h3>

            <h3 className="font-weight-bold "> ID: <small>{client.client_id}</small></h3>
            <h3 className="font-weight-bold "> First Name: <small>{client.first_name}</small></h3>
            <h3 className="font-weight-bold "> Last Name: <small>{client.last_name}</small></h3>
            <h3 className="font-weight-bold "> Email: <small>{client.email}</small></h3>
            <h3 className="font-weight-bold "> Gender: <small>{client.gender}</small></h3>
            <h3 className="font-weight-bold "> Mobile: <small>{client.phone_number}</small></h3>
            <h3 className="font-weight-bold "> Year of birth: <small>{client.year_of_birth}</small></h3>
            <h3 className="font-weight-bold "> Start connection date: <small>{client.start_connection_date}</small></h3>

            <hr></hr>
            <h3> Purchases:</h3>
            <Purchases purcheses={purcheses} />
            <hr></hr>
            <h3> Call documentation:</h3>
            <CallsDocumentation calls={calls} />
            <hr></hr>
            <CallModal addNewCall={addNewCall} />


        </div>



    );
}


