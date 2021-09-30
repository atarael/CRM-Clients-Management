import React, { useState } from "react";
// @material-ui/core components

// import Button from "../CustomButtons/Button.js";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from 'react-bootstrap';


export default function Search({ searchClient }) {
    const [clientName, setClientName] = useState("");


    function changeClientName(e) {

        setClientName(e.target.value);

    }
    function search() {

        searchClient(clientName);

    }


    return (
        <>
            <div>
                <input
                    style={{ width: "10rem", outline: 0, border: 0, borderBottom: "0.5px solid gray", background: "none" }}
                    // class="form-control border-0"
                    // type="text"
                    placeholder={"Search Client"}
                    onChange={(e) => changeClientName(e)}
                />
                <Button onClick={search} color="white" aria-label="edit" justIcon round >
                    <SearchIcon />
                </Button>
            </div>


        </>
    );


}