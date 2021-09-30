
import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { makeStyles } from "@material-ui/core/styles";
import { FcDataProtection, FcBusinessman } from "react-icons/fc";
import DateRange from "@material-ui/icons/DateRange";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import PolicyIcon from '@material-ui/icons/Policy';
import GridItem from "./../../components/Grid/GridItem.js";
import GridContainer from "./../../components/Grid/GridContainer.js";
import Card from "./../../components/Card/Card.js";
import CardHeader from "./../../components/Card/CardHeader.js";
import CardIcon from "./../../components/Card/CardIcon.js";
import CardBody from "./../../components/Card/CardBody.js";
import CardFooter from "./../../components/Card/CardFooter.js";
import ListItem from "@material-ui/core/ListItem";
import Tasks from "./../../components/Tasks/Tasks.js";
import EmployeesTable from "./../../components/Employees/EmployeesTable.js"
import { Button } from 'react-bootstrap';

import * as clientAPI from './../../api/client'
import * as purchaseAPI from './../../api/purchase'
import * as productAPI from './../../api/product'

import {
  weeklySalesGraph,
  weeklyClientsGraph
} from "./../../variables/charts.js";
import styles from "./dashboardStyle.js";



const useStyles = makeStyles(styles);

export default function Dashboard() {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [productAmount, setProductAmount] = useState();
  const [newProducts, setNewProducts] = useState([]);
  const [newClients, setNewClients] = useState([]);
  const [lastPurchasesNum, setLastPurchasesNum] = useState([]);
  const [printState, setPrintState] = useState(false);

  const [weeklySales, setWeeklySales] = useState(
    {
      labels: [],
      series: []
    })

  const [weeklyClients, setWeeklyClients] = useState(
    {
      labels: [],
      series: [[]]
    })
  const classes = useStyles();

  const getWeeklyPurchases = async () => {
    const monthlyPurchases = await purchaseAPI.getWeeklyPurchases();
    if (monthlyPurchases != null) {
      
      const days = Object.keys(monthlyPurchases);
      const values = Object.values(monthlyPurchases);
      const dateString = new Date().toDateString();
      const date = dateString.split(" ")[0];


      let fl = 0;
      let labels = [];
      for (let value of weekDays ) {
        if (fl === 1) {
          labels.push(value);
        }
        if (value === date) {
          fl = 1;
        }

      }
      for (let value of weekDays) {
        if (value === date) {
          labels.push(value);
          break;

        }
        else {
          labels.push(value);
        }
      }
      let series = [0, 0, 0, 0, 0, 0, 0]
      for (const [index, value] of labels.entries()) {
        if (days.includes(value)) {
          // 
          series[index] = values[days.indexOf(value)]

        }

      }
      setWeeklySales({ labels: labels, series: [series] })
      console.log(weeklySales)
    }
    else {
      console.log("error in monthlyPurchases");
    }
  }

  const getWeeklyClients = async () => {
    const response = await clientAPI.getClientsDataDistributionByMonth();
    if (response != null) {
      const days = Object.keys(response);
      const values = Object.values(response);
      const date1 = new Date().toDateString();
      const date = date1.split(" ")[1];


      let fl = 0;
      let labels = [];
      for (let value of months) {
        if (fl === 1) {
          labels.push(value);
        }
        if (value === date) {
          fl = 1;
        }

      }

      for (let value of months) {
        if (value === date) {
          labels.push(value);
          break;

        }
        else {
          labels.push(value);
        }
      }

      let series = [0, 0, 0, 0, 0, 0, 0]
      for (const [index, value] of labels.entries()) {
        if (days.includes(value)) {
          // 
          series[index] = values[days.indexOf(value)]

        }

      }
      setWeeklyClients({ labels: labels, series: [series] })
    }
    else {
      console.log("error in getWeeklyClients");
    }
  }

  const getLastWeekNewPurchases = async () => {
    const response = await purchaseAPI.getLastWeekNewPurchases();
    if (response != null)
      setLastPurchasesNum(response);
    else setLastPurchasesNum("No lsst Purcheses");

  }

  const getNewPolicy = async () => {
    const response = await productAPI.getLastWeekNewProducts();
    if (response != null) {
      if (response.length === 0) {
        setNewProducts(0);
        return;

      }

      const items = response.map((item, i) =>
        <ListItem key={i} >
          <div className={classes.cardCategory} ><FcDataProtection /> </div>
          <div className={classes.cardCategory} >{item.name} </div>
        </ListItem>
      )

      setNewProducts(items)
    }
    else {
      console.log("error in getNewPolicy");

    }
  }


  const getNewclients = async () => {
    const response = await clientAPI.getLastWeekNewClients();
    if (response != null) {
      if (response.length === 0) {
        setNewClients(0);
        return;
      }

      const items = response.map((client, i) => (
        <ListItem button key={i}  >
          <div className={classes.cardCategory} ><FcBusinessman /> </div>
          <div className={classes.cardCategory} >{client.first_name + " " + client.last_name} </div>
        </ListItem>
      ))
      setNewClients([items])
    }
    else {
      console.log("error in getNewclients");
    }
  }

  const getProductList = async () => {
    const response = await productAPI.getProductList();
    if (response != null)
      setProductAmount(response.length);
    else {
      setProductAmount(0);
    }
  }



  // useEffect(() => {

  // }, [weeklyClients, weeklySales]);

  useEffect(() => {
    if (printState) {
      window.print();
      setPrintState(false);
    }
  }, [printState]);


  useEffect(() => {
    getLastWeekNewPurchases();
    getWeeklyPurchases(); // server not return response as need!
    getWeeklyClients();
    getNewPolicy();
    getNewclients();
    getProductList();

  }, []);



  return (
    <div >

      <div className="printButton" style={{ textAlign: 'end' }}>
        <Button onClick={() => setPrintState(true)}>Print Reports
        </Button>
      </div>

      <hr />
      {/* Amount of recent purchases & Amount of all Products */}
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <ShoppingBasketIcon>info_outline</ShoppingBasketIcon>
              </CardIcon>
              <p className={classes.cardCategory}>Amount of recent purchases:</p>
              <h3 className={classes.cardTitle}>
                {lastPurchasesNum}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Purchases from the last week
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <PolicyIcon />
              </CardIcon>
              <p className={classes.cardCategory}>The amount of all existing policies:</p>
              <h3 className={classes.cardTitle}>
                {productAmount}</h3>

            </CardHeader>


            <CardFooter stats>
              <div className={classes.stats}><Update />Update rigth now </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      {/* New client list and all products amount */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>New Client:</p>
            </CardHeader>
            <CardBody scroll>
              {newClients}
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}><Update />New clients from the last two weeks </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card scroll>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <PolicyIcon />
              </CardIcon>
              <h1 className={classes.cardCategory} > New policy:</h1>

            </CardHeader>
            <CardBody scroll>
              <h1 className={classes.cardTitle} > {newProducts} </h1>
            </CardBody>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                New insurences from the last two weeks
              </div>
            </CardFooter>
          </Card>

        </GridItem>
      </GridContainer>

      {/* Weekly sales and New customers this Year */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={weeklySales}
                type="Line"
                options={weeklySalesGraph.options}
                listener={weeklySalesGraph.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Weekly Sales:</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={weeklyClients}
                type="Bar"
                options={weeklyClientsGraph.options}
                responsiveOptions={weeklyClientsGraph.responsiveOptions}
                listener={weeklyClientsGraph.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>New customers this Year:</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> data about last week
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Task chart */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Tasks</h4>
            </CardHeader>
            <CardBody>
              <Tasks />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {/* Employees table */}
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                Employees List
              </p>
            </CardHeader>
            <CardBody>
              <EmployeesTable />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    </div>
  );
}