import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import * as employeeAPI from './../../api/employee.js'
import { getUserDetails } from './../../api/login.js'
// import { Card, Image, ListGroupItem, Form, Row, Col, Button } from 'react-bootstrap';
import GridItem from "./../../components/Grid/GridItem.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import Card from "./../../components/Card/Card.js";
import CardAvatar from "./../../components/Card/CardAvatar.js";
import CardBody from "./../../components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const [propfile, setProfile] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    image: '',
    about: ''
  });
  const classes = useStyles();

  const getEmployeeDetails = async () => {
    // get token from local storage
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    // get username and password by token 
    if (userToken != null) {
      const data = await getUserDetails(userToken.token);


      // get all details 
      if (data != null) {
        const details = await employeeAPI.getEmployeeDetailsByMail(data.username);
        setProfile(details)
      }
    }



  }
  useEffect(() => { getEmployeeDetails() }, []);


  return (
    <div >
      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={propfile.image} alt="..." />
              </a>
            </CardAvatar>
            <CardBody >
              <h3 className={classes.cardCategory}>{propfile.about}</h3>
              <h3 className={classes.cardTitle}>{propfile.first_name + " " + propfile.last_name}</h3>
              <h3 className={classes.cardTitle}>{propfile.email}</h3>
              <h3 className={classes.cardTitle}>{propfile.phone_number}</h3>


            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>




      {/*        
      <Card style={{ width: '30rem', alignItems: 'center', background: 'none', border: 'none' }}>
        <Card.Img src={propfile.image} roundedCircle style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
        <Card.Body  >
          <Card.Title><h1>{propfile.first_name + " " + propfile.last_name} </h1></Card.Title>
          <Card.Text>
            <h2>{propfile.about}</h2>
            <h2>{propfile.email}</h2>
            <h2>{propfile.phone_number}</h2>
          </Card.Text>
        </Card.Body> 


      </Card>*/}
    </div>
  );
};
