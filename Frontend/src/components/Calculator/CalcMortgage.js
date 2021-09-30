import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'

// @material-ui/core components 
// import { Router, Route, Switch } from "react-router"
import { Spinner, Button, Form, Col, Row, Container } from 'react-bootstrap';

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



export default connect(mapStateToProps, mapDispatchToProps)(function CalcApr(props) {

    const propertyType = ["Apartment in a building", "Private house", "A two-family house"];

    const [score, setScore] = useState({ property: 'Apartment in a building', city: '', street: '', numberHouse: '', yearsOld: 0, area: 0, mortgageSum: 0, firstName: '', lastName: '', id: '' });
    const [price, setPrice] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [showError, setShowError] = useState(false);

    const [propertyTypes, setPropertyTypes] = useState(true);
    const [addrassDetails, setAddrassDetails] = useState(false);
    const [ageAndArea, setAgeAndArea] = useState(false);
    const [moreHomeDetails, setMoreHomeDetails] = useState(false);
    const [clientDetails, setClientDetails] = useState(false);


    const [nextButtonName, setNextButtonName] = useState(' Next');





    function nextStep() {
        if (propertyTypes) {
            setShowError(false);
            setPropertyTypes(false)
            setAddrassDetails(true);
            setAgeAndArea(false);
            setMoreHomeDetails(false);
            setClientDetails(false);
        }
        else if (addrassDetails) {
            if (score.city !=="" && score.street !=="" && score.numberHouse !=="") {
                setShowError(false);
                setPropertyTypes(false)
                setAddrassDetails(false);
                setAgeAndArea(true);
                setMoreHomeDetails(false);
                setClientDetails(false);

            } else {
                setShowError(true);
            }
        }
        else if (ageAndArea) {
            if (score.yearsOld !==0 && score.area !==0) {
                setShowError(false);
                setPropertyTypes(false)
                setAddrassDetails(false);
                setAgeAndArea(false);
                setMoreHomeDetails(true);
                setClientDetails(false);

            } else {
                setShowError(true);
            }
        }
        else if (moreHomeDetails) {
            if (score.mortgageSum !==0) {
                setShowError(false);
                setPropertyTypes(false)
                setAddrassDetails(false);
                setAgeAndArea(false);
                setMoreHomeDetails(false);
                setClientDetails(true);

            } else {
                setShowError(true);
            }
        }

        else if (clientDetails) {
            
            if (score.firstName !=="" && score.lastName !=="" && score.id !=="") {
                setNextButtonName(' Calculate')
                setTimeout(() => {
                    setShowError(false);
                    setClientDetails(false);
                    CalcPrice();
                }, 3000);


            }
            else {
                setShowError(true);
            }

        }


    }
    // property: 'Apartment in a building',city:'',street:'', numberHouse:'', yearsOld:0, area:0, mortgageSum:0, firstName:'', lastName:'',id:'' });

    function CalcPrice() {
        var sumScore = 0;
        (score.property !=="Apartment in a building") ? sumScore += 10 : sumScore += 4;
        (score.yearsOld < 10) ? sumScore += 4 : sumScore += 14;
        (score.area < 100) ? sumScore += 4 : sumScore += 10;
        (score.mortgageSum < 5) ? sumScore += 10 : sumScore += 4;

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
                    {showError ? <Row><Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label></Row> : ''}

                    {propertyTypes ?
                        <>

                            <Form.Group as={Col} >
                                <Form.Label>Select Property Type:</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => setScore({ ...score, property: e.target.value })}
                                >
                                    {propertyType.map(property => { return <option>{property}</option> })}
                                </Form.Control>
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

                    {ageAndArea ?
                        <>

                            <Form.Group as={Col} >
                                <Form.Label>How old is the house?</Form.Label>
                                <Form.Control
                                    min="0" type="number"
                                    onChange={(e) => setScore({ ...score, yearsOld: e.target.value })} />
                            </Form.Group>


                            <Form.Group as={Col} >
                                <Form.Label>What is the area of the house?</Form.Label>
                                <Form.Control
                                    min="0" type="number"
                                    onChange={(e) => setScore({ ...score, area: e.target.value })} />
                            </Form.Group>

                            <hr></hr>
                        </>
                        : ''}


                    {moreHomeDetails ?
                        <>

                            <Form.Label>Add sum of Mortgage </Form.Label>
                            <Form.Group as={Col} >
                                <Form.Control
                                    min="0" type="number"
                                    onChange={(e) => setScore({ ...score, mortgageSum: e.target.value })} />
                            </Form.Group>


                            <Form.Label>The amount of the mortgage paid so far</Form.Label>
                            <Form.Group as={Col} >
                                <Form.Control
                                    min="0" type="number"
                                />
                            </Form.Group>

                            <Form.Label>Monthly payment</Form.Label>
                            <Form.Group as={Col} >
                                <Form.Control
                                    min="0" type="number" />
                            </Form.Group>



                            <hr></hr>
                        </>
                        : ''}

                    {clientDetails ?
                        <>
                            <Form.Label>Who is the insurance for?</Form.Label>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Control
                                        placeholder="ID:"
                                        onChange={(e) => setScore({ ...score, id: e.target.value })} />
                                </Form.Group>
                            </Row>
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



                            <hr></hr>
                        </>
                        : ''}



                    <Row>
                        <Form.Group as={Col}  >
                            {!showPrice ?
                                <>

                                    <Button onClick={nextStep} >
                                        {nextButtonName !==" Next" ? <Spinner
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
