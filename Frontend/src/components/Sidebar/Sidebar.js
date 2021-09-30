
import React from 'react';
import classNames from "classnames";
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import ProductsIcon from "@material-ui/icons/Apps";
import ContactsIcon from '@material-ui/icons/Contacts';
import { makeStyles } from '@material-ui/core/styles';
import Icon from "@material-ui/core/Icon";
import UserProfile from './../../views/UserProfile/UserProfile.js'
import Dashboard from './../../views/Dashboard/Dashboard.js'
import Products from './../../views/Products/Products.js'
import ProductDetails from './../Products/ProductDetails.js'
import Clients from './../../views/Clients/Clients.js'
import ClientDetails from './../Clients/ClientDetails.js'
import image from './../../assets/img/sidebar-2.jpg'
import logo from './../../assets/img/reactlogo.png'
import HeaderLine from '../HeaderLine/HeaderLine.js'

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
} from "react-router-dom";
import styles from "./sidebarStyle.js";


const useStyles = makeStyles(styles);


const Sidebar = (props) => {

    const match = useRouteMatch();
    const classes = useStyles();
     
    const routes = [
        {
            path: 'employeeProfile',
            name: 'Employee Profile',
            icon: Person,
        },
        {
            path: 'dashboard',
            name: 'Dashboard',
            icon: DashboardIcon,
        },
        {
            path: 'products',
            name: 'Products',
            icon: ProductsIcon,
        },
        {
            path: 'clients',
            name: 'Clients',
            icon: ContactsIcon,
        }
    ]

    var drawer = (
        <List className={classes.list}>
            {routes.map((prop, key) => {
                var activePro = " ";
                var listItemClasses;

                listItemClasses = classNames({
                    [" " + classes.green]: activeRoute(prop.path)
                });

                const whiteFontClasses = classNames({
                    [" " + classes.whiteFont]: activeRoute(prop.path)
                });
                return (
                    <Link key={key} className={activePro + classes.item} activeClassName="active"
                        to={`${match.url}/${prop.path}`}
                    >
                        <ListItem className={classes.itemLink + listItemClasses} button key="EmployeeProfile"  >
                            <ListItemIcon>
                                {typeof prop.icon === "string" ? (
                                    <Icon
                                        className={classNames(classes.itemIcon, whiteFontClasses)}
                                    >
                                        {prop.icon}
                                    </Icon>
                                )
                                    : (
                                        <prop.icon
                                            className={classNames(classes.itemIcon, whiteFontClasses)}
                                        />
                                    )}</ListItemIcon>
                            <ListItemText primary={prop.name} />
                        </ListItem>
                    </Link>


                );
            })}
        </List>
    );
    var brand = (
        <div className={classes.logo}>
            <a
                className={classNames(classes.logoLink)}
                target="_blank"
            >
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                CRM
            </a>
        </div>
    );


    function activeRoute(routeName) {
        return document.location.href.indexOf(routeName) > -1 ? true : false;
    }
    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <HeaderLine />
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden mdUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={"right"}
                        open={props.open}
                        classes={{
                            paper: classNames(classes.drawerPaper)
                        }}
                        onClose={props.handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true // Better open performance on mobile.
                        }}
                    >

                        {brand}
                        <div className={classes.sidebarWrapper}>
                            {drawer}
                        </div>
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                style={{ backgroundImage: "url(" + image + ")" }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        anchor={"left"}
                        variant="permanent"
                        open
                        classes={{
                            paper: classNames(classes.drawerPaper)
                        }}
                    >

                        {brand}
                        <div className={classes.sidebarWrapper}>

                            {drawer}
                        </div>
                        {image !== undefined ? (
                            <div
                                className={classes.background}
                                style={{ backgroundImage: "url(" + image + ")" }}
                            />
                        ) : null}
                    </Drawer>
                </Hidden>

            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path={`${match.path}/employeeProfile`}>
                        <UserProfile />
                    </Route>
                    <Route path={`${match.path}/dashboard`}>
                        <Dashboard />
                    </Route>
                    <Route path={`${match.path}/products/:productId`}>
                        <ProductDetails />
                    </Route>
                    <Route path={`${match.path}/products`}>
                        <Products />
                    </Route>
                    <Route path={`${match.path}/clients/:clientId`}>
                        <ClientDetails />
                    </Route>
                    <Route path={`${match.path}/clients`}>
                        <Clients />
                    </Route>
                    <Route path={`${match.path}`}   >
                        <UserProfile />
                    </Route>
                </Switch>
            </main>
        </div>
    );
}

export default Sidebar;
