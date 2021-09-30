import React, { useEffect, useState } from "react";
// @material-ui/core components 
import ProductCard from "./../../components/Products/ProductCard"
import ProductModal from "./../../components/Products/ProductModal";
import { Container, Row, Col } from 'react-bootstrap';
import * as productAPI from './../../api/product'

export default function Products() {
    
    const [products, setProducts] = useState([]);
    function displayProducts(jsonString) {

        const items = jsonString.map((item) =>
            <Col md="4" >
                <ProductCard
                    IdProduct={item._id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    picture={item.image}
                />
            </Col>
        )

        try {
            setProducts(items);
        }
        catch (err) {

        }


    }

    const getProductList = async () => {
        const response = await productAPI.getProductList();
        if (response != null) {
            displayProducts(response);
        }
    }

    const addProduct = async (newProduct) => {
        const response = await productAPI.addProduct(newProduct);
        if (response != null) {
            getProductList();
        }
    }


    useEffect(() => {
        getProductList();
    }, []);


    return (
        <>


            <ProductModal handleFunction={addProduct} addOrUpdate="add product" ></ProductModal>

            <Container lassName="themed-container" fluid={true}>
                <Row>
                    {products}

                </Row>
            </Container>

        </>
    );
}

