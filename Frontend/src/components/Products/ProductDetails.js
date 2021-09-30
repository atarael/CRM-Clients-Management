import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { actions } from '../../redux/actions'
// @material-ui/core components 
import { Button, Row, Col, Container, Card } from 'react-bootstrap';
import ProductModal from "./ProductModal";
import CalcPrice from "./../Calculator/CalcPrice";
import * as productAPI from './../../api/product'
import {useRouteMatch} from "react-router-dom";

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



export default connect(mapStateToProps, mapDispatchToProps)(function ProductDetails(props) {

    const match = useRouteMatch();
    const [product, setProduct] = useState({
        name: props.product.name,
        price: props.product.price,
        description: props.product.description,
        date: props.product.date,
        image: props.product.image
    });
    const [printState, setPrintState] = useState(false);

    const updateProduct = async (productJson) => {
        if (productJson.date === undefined) {
            productJson.date = new Date().getTime();
        }
        const response = await productAPI.updateProduct(props.product.insuranceId, productJson);
        if (response != null) {
            getProduct();
            props.setInsuranceName(productJson.insuranceName);
            props.setInsuranceDescription(productJson.insuranceDescription);
            props.setInsurancePrice(productJson.insurancePrice);
            props.setInsurancePicture(productJson.insurancePicture);
        }



    }
    function printCard() {
        setPrintState(true);
    }


    const getProduct = async () => {
        const response = await productAPI.getProduct(match.params.productId);
        if (response != null) {
            const productJson = response[0];
            
            setProduct({
                name: productJson.name,
                price: productJson.price,
                description: productJson.description,
                date: productJson.date,
                image: productJson.image

            })
        }




    }
    useEffect(() => {
        getProduct();

    }, []);

    useEffect(() => {
        if (printState) {
            window.print();
            setPrintState(false);
        }
    }, [printState]);

    return (
        <div
        >

            {!printState ?
                <div className="d-flex justify-content-start">
                    <div className="text-left"> <ProductModal handleFunction={updateProduct} addOrUpdate="Update " ></ProductModal></div>
                    <div className="pl-2 text-rigth"> <Button onClick={() => printCard()}>Print Product</Button> </div>
                </div> :
                ''
            }

            <Container className="themed-container" fluid={true}>
                <Row>
                    {!printState ?
                        <Col className="align-self-end" ><CalcPrice /></Col> : ''}
                    <Col>
                        <Card className="shadow-lg text-center" style={{ "width": '30rem', "height": '40rem' }}>
                            <Card.Img variant="top" src={product.image} style={{ position: 'relative', left: '10rem', top: '1rem', width: '30%', height: '10vh' }} />
                            <Card.Body>
                                <Card.Title ><h3><strong>{product.name}</strong></h3> </Card.Title>

                                <Card.Text>  {product.description}</Card.Text>
                            </Card.Body>
                            <Card.Title > Price: starting from {product.price} ILS per month </Card.Title>

                            <Card.Footer />
                        </Card>
                    </Col>
                </Row>
            </Container>

        </div >



    );
});
