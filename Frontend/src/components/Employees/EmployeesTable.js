import React, { useState, useEffect } from "react"; 
import { withRouter } from "react-router-dom"; 
import { Table } from 'react-bootstrap';
import * as employeeAPI from './../../api/employee'
 

export default withRouter(function EmployeesTable(props) {


    const getEmployeesList = async () => {
        const response = await employeeAPI.getEmployeesList();
        if (response != null) {
            setEmployees(response);
        }


    }
    const [employees, setEmployees] = useState([])
    useEffect(() => {
        getEmployeesList();
    }, [])

    return (

        <div  >

            <Table  >
                <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>

                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee, key) => {
                        return (
                            <tr key={key}  >
                                {
                                    [employee.first_name, employee.last_name, employee.email, employee.phone_number].map((prop, key) => {
                                        return (
                                            <td key={key}>
                                                {prop}
                                            </td>
                                        );
                                    })}
                            </tr>
                        );
                    })}



                </tbody>
            </Table>

        </div>
    );



}) ;