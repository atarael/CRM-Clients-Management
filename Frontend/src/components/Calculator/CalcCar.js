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



export default connect(mapStateToProps, mapDispatchToProps)(function CalcCar(props) {
    const ownCar = ["Company ownership", "Private ownership", "Private leasing"];
    const carManufacturers = ["Abarth", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Donkervoort", "DS", "Ferrari", "Fiat", "Fisker", "Ford", "Honda", "Hummer", "Hyundai", "Infiniti", "Iveco", "Jaguar", "Jeep", "Kia", "KTM", "Lada", "Lamborghini", "Lancia", "Land Rover", "Landwind", "Lexus", "Lotus", "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Morgan", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Rover", "Saab", "Seat", "Skoda", "Smart", "SsangYong", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"];
    const years = [1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2019, 2020, 2021];
    const safetys = [{ name: 'Alert system for not keeping distance', value: '1' }, { name: 'Lane departure warning system', value: '2' }];

    // const [safetyValue, setSafetyValue] = useState('');
    const [score, setScore] = useState({ licenseYearNum: 0, age: '', gendr: 'Male', year: 0, safety: '', own: 'Company ownership' });
    const [price, setPrice] = useState(0);
    const [showPrice, setShowPrice] = useState(false);
    const [showError, setShowError] = useState(false);

    const [driverDetails, setDriverDetails] = useState(true);
    const [carDetails1, setCarDetails1] = useState(false);
    const [carDetails2, setCarDetails2] = useState(false);
    const [nextButtonName, setNextButtonName] = useState(' Next');





    function nextStep() {
        if (driverDetails) {
            if (score.age !== 0 && score.licenseYearNum !== 0) {
                setShowError(false);
                setDriverDetails(false)
                setCarDetails1(true);
                setCarDetails2(false);
            }
            else {
                setShowError(true);
            }

        }
        else if (carDetails1) {
            if (score.year !== 0) {
                setShowError(false);
                setDriverDetails(false)
                setCarDetails1(false);
                setCarDetails2(true);

            } else {
                setShowError(true);
            }
        }
        else if (carDetails2) {
            
            if (score.safety !== "") {
                setNextButtonName(' Calculate')
                setTimeout(() => {
                    setShowError(false);
                    setCarDetails2(false);
                    CalcPrice();
                }, 3000);


            }
            else {
                setShowError(true);
            }

        }


    }

    function CalcPrice() {
        var sumScore = 0;
        (score.year > 2000) ? sumScore += 2 : sumScore += 4;
        (score.age < 24) ? sumScore += 4 : sumScore += 2;
        (score.licenseYearNum < 2) ? sumScore += 4 : sumScore += 2;
        (score.gender === 'Male') ? sumScore += 2 : sumScore += 4;
        (score.safety === '1') ? sumScore += 2 : sumScore += 4;
        (score.own === 'Company ownership') ? sumScore += 2 : sumScore += 4;

        if (parseInt(props.product.insurancePrice) === NaN) {
            setPrice(parseInt(50) + sumScore);
        }
        else {
            setPrice(parseInt(props.product.insurancePrice) + sumScore);
        }
 

        setShowPrice(true);

    }



    useEffect(() => {

    }, []);




    return (
        <div>
            <Container ClassName="themed-container" fluid={true}>
                <Form>

                    <hr></hr>
                    {showError ? <Form.Label style={{ color: "red" }}>Please fill all fiels.</Form.Label> : ''}

                    {driverDetails ?
                        <>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Control
                                        placeholder="Age:"
                                        min="21" type="number"
                                        onChange={(e) => setScore({ ...score, age: e.target.value })} />
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
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Control
                                        placeholder="How many years do you have a license?"
                                        type="number"
                                        onChange={(e) => setScore({ ...score, licenseYearNum: e.target.value })} />
                                </Form.Group>
                            </Row>
                            <hr></hr>
                        </>
                        : ''}

                    {carDetails1 ?
                        <>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label>Select car manufacturer:</Form.Label>
                                    <Form.Control as="select" >
                                        {carManufacturers.map(car => { return <option>{car}</option> })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>Year of Production:</Form.Label>
                                    <Form.Control as="select" onChange={(e) => setScore({ ...score, year: e.target.value })}>
                                        {years.map(year => { return <option   >{year}</option> })}
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label> Car number</Form.Label>
                                    <Form.Control />
                                </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label> Car model:</Form.Label>
                                    <Form.Control />
                                </Form.Group>

                            </Row>
                            <hr></hr>
                        </>
                        : ''}

                    {carDetails2 ?
                        <>
                            <Form.Group as={Col} >
                                <Form.Label>What safety systems are in the vehicle? </Form.Label>

                                {safetys.map((safety) =>
                                    <Row>
                                        <Form.Check
                                            inline
                                            label={safety.name}
                                            type="checkbox"
                                            value={safety.value}
                                            checked={score.safety === safety.value}
                                            onChange={(e) => { setScore({ ...score, safety: e.target.value }) }}
                                        /> </Row>
                                )}


                            </Form.Group>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label> Who owns the vehicle on the day the insurance begins?</Form.Label>
                                    <Form.Control as="select" onChange={(e) => setScore({ ...score, own: e.target.value })}>
                                        {ownCar.map(own => { return <option>{own}</option> })}
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label> Is the vehicle in business use?</Form.Label>
                                    <Form.Control as="select" >
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group as={Col} >
                                    <Form.Label> Is the vehicle enslaved?</Form.Label>
                                    <Form.Control as="select" >
                                        <option>Yes</option>
                                        <option>No</option>
                                    </Form.Control>
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
