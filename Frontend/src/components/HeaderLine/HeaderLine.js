import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./headerLinksStyle.js";
import { actions } from './../../redux/actions'
import { Dropdown } from 'react-bootstrap'
const useStyles = makeStyles(styles);

export default withRouter(function HeaderLine(props) {
  const classes = useStyles();
  const [employeeName, setEmployeeName] = useState();

  const employee = useSelector(state =>
    state.employeeReducer.employee
  );
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('token');
    props.history.push("/admin");
    window.location.reload();
    dispatch(actions.setEmployee({}));
    setEmployeeName('');
  };

  const showEmployeeProfile = () => {
    props.history.push("/admin/employeeProfile");
  }

  useEffect(() => {
    if (employee.first_name !== '') {
      setEmployeeName(employee.first_name);
    }

  }, [employeeName]);

  return (
    <div>

      <div className={classes.manager}>

        <Dropdown>
          <Dropdown.Toggle variant="light" >
            Hi, {employee.first_name} {employee.last_name}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={showEmployeeProfile}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>


      </div>
    </div>
  );
});
