import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'  
import { Alert, Button, Form, Card, Row, Col, Container } from 'react-bootstrap';
import { FcLike, FcHome, FcAutomotive, FcCurrencyExchange, FcDebt } from "react-icons/fc";
import CalcCar from "./CalcCar"
import CalcApar from "./CalcApar"
import CalcLife from "./CalcLife"
import CalcMortgage from "./CalcMortgage"
function mapStateToProps(state) {
   
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



export default connect(mapStateToProps, mapDispatchToProps)(function CalcPrice(props) {


    const [insurenceTypeValue, setInsurenceTypeValue] = useState(0);
    const [show, setShow] = useState(false);

    function closeCalaulator() {
        setShow(false);
        setInsurenceTypeValue();
    }

    function openCalculator() {
        setShow(true);
        setInsurenceTypeValue(0);
    }

    useEffect(() => {
         

    }, [insurenceTypeValue]);

    return (
        <div>

            <Alert className="bottom-left" show={show} style={{ width: '25rem' }}>

                <Container className="themed-container" fluid={true}>
                    <Row md={{ span: 6, offset: 6 }} >
                        
                        <Form>
                            {(insurenceTypeValue === 0) ?
                                <Form.Group as={Col}>

                                    < Row>
                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(1)}>
                                            <Card.Body>
                                                <Card.Text> <FcHome style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Apartment and property insurance</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(2)}>
                                            <Card.Body>
                                                <Card.Text> <FcLike style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Life and Health insurance</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(3)}>

                                            <Card.Body>
                                                <Card.Text> <FcAutomotive style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Car insurance</Card.Title>
                                            </Card.Body>
                                        </Card>
                                        <Card
                                            className="text-center"
                                            style={{ width: '10rem' }}
                                            onClick={() => setInsurenceTypeValue(4)}>
                                            <Card.Body>
                                                <Card.Text> <FcDebt style={{ fontSize: '50' }} />  </Card.Text>
                                                <Card.Title>Mortgage insurance</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Row>

                                </Form.Group> : ''}

                            {(insurenceTypeValue === 1) ?
                                <CalcApar /> : ''}

                            {(insurenceTypeValue === 2) ?
                                <CalcLife /> : ''}

                            {(insurenceTypeValue === 3) ?
                                <CalcCar /> : ''}

                            {(insurenceTypeValue === 4) ?
                                <CalcMortgage /> : ''}

                        </Form>
                        {/* </Col> */}
                    </Row>
                </Container>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => closeCalaulator()} variant="outline-success">Close</Button>
                </div>
            </Alert>

            {!show && <Button
                variant="light"
                className="shadow-lg"
                style={{ width: '15rem', height: '15rem', fontSize: '14px', borderRadius: 100, }}
                onClick={() => openCalculator()}>
                <FcCurrencyExchange style={{ width: '10rem', fontSize: '120' }} />
                <strong style={{ color: 'green', fontSize: '24px' }} >Open insurence calculetor</strong>
            </Button>}

        </div >



    );
});
