import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import { actions } from '../redux/actions.js'
import { FcLock, FcAddressBook, FcNeutralDecision, FcCheckmark, FcGraduationCap, FcPhone, FcCompactCamera, FcAssistant } from "react-icons/fc";
import { Container, InputGroup, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import { getUserToken, RegisterUser } from './../api/login.js'
import * as employeeAPI from './../api/employee.js'



export default function Login({ setToken }) {
    const [newEmployee, setNewEmployee] = useState({
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        image: '',
        about: '',
        phone_number: ''
    });
    const [loginState, setLoginState] = useState(true);

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async e => {
        e.preventDefault();
        const newToken = await getUserToken({
            username,
            password
        });
        
        if (newToken !== undefined) {
            setToken(newToken);
            const details = await employeeAPI.getEmployeeDetailsByMail(username);
            dispatch(actions.setEmployee(details));
        }

        else {
            alert("TOKEN IS UNDEFINED!\n LOGIN FAIL")
        }
    }
    const putUser = (e) => {
        setUserName(e.target.value);
        setNewEmployee({ ...newEmployee, email: e.target.value });
    }
    const putPassword = (e) => {
        setPassword(e.target.value);
        setNewEmployee({ ...newEmployee, password: e.target.value });
    }
    const handleNewEmployee = async e => {
        e.preventDefault();
        const newToken = await RegisterUser(newEmployee);
        if (newToken !== undefined) {
            setToken(newToken);
            const details = await employeeAPI.getEmployeeDetailsByMail(username);
            dispatch(actions.setEmployee(details));
        }

        else {
            alert("TOKEN IS UNDEFINED!\n REGISTER FAIL")
        }
    }

    const handleChange = input => e => {
        setNewEmployee({ ...newEmployee, [input]: e.target.value });

    };
    // useEffect(() => { props.setIdEmployee("") }, []);
    useEffect(() => { }, [username, password, newEmployee]);
    const style = {
        backgroundImage: "url(https://i.pinimg.com/564x/ae/74/7c/ae747c669ede5a97c191aea61eb675df.jpg)",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        overflow: 'auto',
        backgroundRepeat: 'no-repeat'
    }

    return (
        <div style={style} className="vh-100 align-items-center" >
            <Container className="vh-100 align-items-center"   >

                <Row md="4" className="justify-content-md-center lg">

                    <Col md="4" className="text-center align-items-center" style={{ height: '100%', backgroundColor: 'rgba(238, 238, 238, 0.5) ' }}>
                        <FcCheckmark style={{ width: 200, height: 200 }} />
                        {loginState === true ?
                            <Form onSubmit={handleSubmit}>

                                <Row  >

                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FcAddressBook />
                                        </InputGroup.Text>
                                        <FormControl placeholder="Email Address" onChange={e => setUserName(e.target.value)} />
                                    </InputGroup>
                                </Row>
                                <Row className="mt-3">

                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FcLock />
                                        </InputGroup.Text>
                                        <FormControl placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Label style={{ color: "green", size: '25px' }} onClick={() => setLoginState(false)}>New Employee? confirm here</Form.Label>
                                </Row>
                                <Button className="m-3" type="submit">Submit</Button>

                            </Form>
                            :
                            <Form onSubmit={handleNewEmployee} >
                                <Row>
                                    <InputGroup className="mb-2" >
                                        <InputGroup.Text><FcAssistant /></InputGroup.Text>
                                        <FormControl size="lg" defaultValue='' placeholder="First Name" onChange={e => setNewEmployee({ ...newEmployee, first_name: e.target.value })} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-2" >
                                        <InputGroup.Text><FcAssistant /></InputGroup.Text>
                                        <FormControl size="lg" defaultValue='' placeholder="Last Name" onChange={e => setNewEmployee({ ...newEmployee, last_name: e.target.value })} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text><FcNeutralDecision /></InputGroup.Text>
                                        <FormControl type="number" size="lg" placeholder="ID:" onChange={e => setNewEmployee({ ...newEmployee, employee_id: e.target.value })} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-2" >
                                        <InputGroup.Text><FcAddressBook /></InputGroup.Text>
                                        <FormControl size="lg" placeholder="Email address" onChange={e => { putUser(e) }} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-2" >
                                        <InputGroup.Text><FcLock /></InputGroup.Text>
                                        <FormControl size="lg" placeholder="Password" onChange={e => { putPassword(e) }} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text><FcPhone /></InputGroup.Text>
                                        <FormControl type="number" size="lg" placeholder="Phone number" onChange={e => setNewEmployee({ ...newEmployee, phone_number: e.target.value })} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text><FcGraduationCap /></InputGroup.Text>
                                        <FormControl size="lg" placeholder="About you" onChange={e => setNewEmployee({ ...newEmployee, about: e.target.value })} />
                                    </InputGroup>

                                </Row>
                                <Row>
                                    <InputGroup className="mb-2">
                                        <InputGroup.Text><FcCompactCamera /></InputGroup.Text>
                                        <FormControl size="lg" placeholder="Insert URL for image profile" onChange={e => setNewEmployee({ ...newEmployee, image: e.target.value })} />
                                    </InputGroup>
                                </Row>
                                <Row>
                                    <Form.Group className="mt-5 mb-5" > <Button variant="danger" type="submit" className="login__submit">Confirm</Button></Form.Group>
                                </Row>

                            </Form>
                        }

                    </Col>
                </Row>
            </Container>
        </div >
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};