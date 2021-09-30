import React, { useState, useEffect } from "react";
import { Card } from 'react-bootstrap';
import { format } from "date-fns";
import * as productAPI from '../../api/product.js'
export default function PurchaseCard(props) {
    const [productDetails, setProductDetails] = useState({

    });
    const formattedDate = new Date(props.purchase.date);
    const date = format(formattedDate, "MMMM dd, yyyy ");


    const getProduct = async () => {
        const response = await productAPI.getProduct(props.purchase.productId);
        const productJson = response[0];
        setProductDetails({ ...productDetails, name: productJson.name, price: productJson.price })

    }

    useEffect(getProduct, []);

    return (
        <>
            <Card border="danger" style={{ width: "100%" }}>
                <Card.Header>{date}</Card.Header>
                <Card.Body >
                    <Card.Title>{productDetails.name}</Card.Title>
                    <Card.Text > {productDetails.price} ILS</Card.Text>
                </Card.Body>
            </Card>

        </>



    );
}