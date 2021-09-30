import React, { useEffect, useState } from "react";
import { Card, ListGroup, Accordion } from 'react-bootstrap';
import { withRouter } from "react-router-dom";
import { format } from "date-fns";

export default withRouter(function Call(props) {
    

    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const formattedDate = new Date(props.call.date);

    const date = format(formattedDate, "MMMM dd, yyyy ");


    useEffect(() => {
        setPurchasedProducts(props.call.purchasedProducts)
    }, []);

    return (
        <>
            <Accordion >
                <Accordion.Header  >
                    <div className="d-flex justify-content-between">
                        <div className="p-2 col-example text-left">  {props.call.subject}</div>
                        <div className="p-2 col-example text-left">  {date}  </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body >
                    <ListGroup.Item className="">
                        <h5 className="font-weight-bold ">Description Call:</h5> "{props.call.description}"
                    </ListGroup.Item>
                    {purchasedProducts.length > 0 ? <>
                        <ListGroup.Item>
                            <h5 className="font-weight-bold ">Purchased products:</h5>
                            {purchasedProducts.map((purchased) =>
                                <li
                                    key={purchased.id}
                                    onClick={() => { props.history.push("/admin/products/" + purchased.id) }}>
                                    {purchased.name}
                                </li>
                            )}

                        </ListGroup.Item>

                    </> : ''}
                </Accordion.Body>


            </Accordion>
            <p></p>

        </>
    );
});