import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
import { MdSmokingRooms, MdSmokeFree } from "react-icons/md";
// @material-ui/core components 
// import { Router, Route, Switch } from "react-router"
import { Spinner, ButtonGroup, Button, Form, ToggleButton, Col, Row, Container } from 'react-bootstrap';

function mapStateToProps(state) {
    // ;
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



export default connect(mapStateToProps, mapDispatchToProps)(function CalcLife(props) {


    const [score, setScore] = useState({ gender: '', city: '', street: '', numberHouse: '', birthDay: '', firstName: '', lastName: '', id: '', smoke: '' });
    const [price, setPrice] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [showError, setShowError] = useState(false);

    const [clientDetails, setClientDetails] = useState(true);
    const [addrassDetails, setAddrassDetails] = useState(false);
    const [smoke, setSmoke] = useState(false);

    const [nextButtonName, setNextButtonName] = useState(' Next');





    function nextStep() {
        if (clientDetails) {
            if (score.firstName !== "" && score.lastName !== "" && score.id !== "" && score.birthDay !== "") {
                setShowError(false);
                setClientDetails(false);
                setAddrassDetails(true);
                setSmoke(false);
            } else {
                setShowError(true);
            }

        }
        else if (addrassDetails) {
            if (score.city !== "" && score.street !== "" && score.numberHouse !== "") {
                setShowError(false);
                setClientDetails(false);
                setAddrassDetails(false);
                setSmoke(true);

            } else {
                setShowError(true);
            }
        }
        else if (smoke) {
            if (score.smoke !== "") {

                setNextButtonName(' Calculate')
                setTimeout(() => {
                    setShowError(false);
                    setSmoke(false);
                    CalcPrice();
                }, 3000);


            }
            else {
                setShowError(true);
            }

        }


    }
    //  ({ gender: '', city: '', street: '', numberHouse: '', birthDay: '', firstName: '', lastName: '', id: '', smoke: '' });

    function CalcPrice() {
        var sumScore = 0;
        (score.gender === 'Male') ? sumScore += 7 : sumScore += 10;
        (score.smoke === 'Yes') ? sumScore += 10 : sumScore += 0;


        if (parseInt(props.product.insurancePrice) === NaN) {
            setPrice(parseInt(50) + sumScore);
        }
        else {
            setPrice(parseInt(props.product.insurancePrice) + sumScore);
        }

        setShowPrice(true);

    }

    useEffect(() => { }, []);

    return (
        <div>
            <Container className="themed-container" fluid={true}>
                <Form>

                    <hr></hr>
                    {showError ? <Row> <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label></Row> : ''}


                    {clientDetails ?
                        <>
                            <Form.Label>Who is the insurance for?</Form.Label>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Control
                                        placeholder="First name:"
                                        onChange={(e) => setScore({ ...score, firstName: e.target.value })} />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Control
                                        placeholder="Last Name:"
                                        onChange={(e) => setScore({ ...score, lastName: e.target.value })} />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Control
                                        placeholder="ID:"
                                        onChange={(e) => setScore({ ...score, id: e.target.value })} />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Control
                                        as="select"
                                        defaultValue="Choose..."
                                        onChange={(e) => setScore({ ...score, gender: e.target.value })}
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Form.Control>
                                </Form.Group>
                            </Row>



                            <Form.Group controlId="date">
                                <Form.Label>Select Date of birth</Form.Label>
                                <Form.Control type="date" onChange={(event) => setScore({ ...score, birthDay: event.target.value })} />

                            </Form.Group>





                            <hr></hr>
                        </>
                        : ''}

                    {addrassDetails ?
                        <>
                            <Form.Group>
                                <Form.Label>Property address:</Form.Label>
                                <Row>
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            placeholder="City / Locality:"
                                            onChange={(e) => setScore({ ...score, city: e.target.value })} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            placeholder="Street:"
                                            onChange={(e) => setScore({ ...score, street: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group as={Col} >
                                        <Form.Control
                                            placeholder="No. Home:"
                                            onChange={(e) => setScore({ ...score, numberHouse: e.target.value })} />
                                    </Form.Group>
                                </Row>
                            </Form.Group>

                            <hr></hr>
                        </>
                        : ''}

                    {smoke ?
                        <>



                            <Form.Label>Do you smoke?</Form.Label>
                            <Row>
                                <ButtonGroup toggle  >
                                    {[
                                        {
                                            name: <MdSmokingRooms style={{ fontSize: '30' }} />,
                                            value: 'Yes'
                                        },
                                        {
                                            name: <MdSmokeFree style={{ fontSize: '30' }} />,
                                            value: 'No'
                                        }].map((radio, idx) => (
                                            <ToggleButton
                                                style={{ width: '10rem' }}
                                                key={idx}
                                                type="radio"
                                                variant="outline-danger"
                                                name="radio"
                                                value={radio.value}
                                                checked={score.amoke === radio.value}
                                                onChange={(e) => { setScore({ ...score, smoke: e.target.value }) }}
                                            >

                                                {radio.name}
                                            </ToggleButton>
                                        ))}
                                </ButtonGroup>

                            </Row>




                            <hr></hr>
                        </>
                        : ''}



                    <Row>
                        <Form.Group as={Col}  >
                            {!showPrice ?
                                <>

                                    <Button onClick={nextStep} >
                                        {nextButtonName !== " Next" ? <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        /> : ''}
                                        {nextButtonName}
                                    </Button>
                                </> :
                                <div className="text-center">
                                    <h3>
                                        According to a preliminary calculation the price is:
                                    </h3>

                                    <h3 >
                                        <strong>  {price} ISL  </strong>
                                    </h3>

                                    <hr></hr>

                                </div>
                            }



                        </Form.Group>

                    </Row>


                </Form>
            </Container>


        </div >



    );
});
