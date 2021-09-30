import React, { useState, useEffect } from "react";  
import { makeStyles } from "@material-ui/core/styles"; 
import GridItem from "./../../components/Grid/GridItem.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import Table from "./../../components/Clients/Table.js";
import Card from "./../../components/Card/Card.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardBody from "./../../components/Card/CardBody.js";
import Search from "./../../components/Clients/Search";
import ClientModal from "./../../components/Clients/ClientModal.js";
import { withRouter } from "react-router-dom";
import * as clientAPI from './../../api/client.js'

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};

const useStyles = makeStyles(styles);

export default withRouter(function Clients(props) {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        getClientsList();
        listenURL();
    }, []);

    function listenURL() {
        props.history.listen((location, action) => {
            if (location.pathname === "/admin/table") {
                getClientsList();
            }
        })
    }

    function updateClientsTable(clientJson) {
        var arr = [];
        Object.values(clientJson).map(client => arr.push([client.client_id, client.first_name, client.last_name, client.email, client.gender]))
        setClients(clientJson);
    }

    const getClientsList = async () => {
        const response = await clientAPI.getClientsList();
        if (response !== null) {
            updateClientsTable(response);
        }


    }

    const addNewClient = async (newClient) => {
        const response = await clientAPI.addNewClient(newClient);
        if (response !== null) {
            getClientsList();
        }



    }

    const searchClient = async (clientName) => { 
        const response = await clientAPI.searchClient(clientName);
        if (response !== null) {
            updateClientsTable(response);
        }
        
    }

    const classes = useStyles();

    return (

        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <div className="d-flex justify-content-between">
                    <div className="p-2 col-example text-left"><ClientModal handleFunction={addNewClient} addOrUpdate="Add " /></div>
                    <div className="p-2 col-example text-left"><Search searchClient={searchClient} /> </div>
                </div>

                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Clients Table</h4>
                        <p></p>
                    </CardHeader>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["id", "First Name", "Last Name", "Email"]}
                            tableData={clients}
                        />
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer >

    );
});
