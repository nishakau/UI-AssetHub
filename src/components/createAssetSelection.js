import React, {
    Component
} from 'react';
// import {
//     Header
// } from './detailsHeader'; 
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Footer from './Footer/Footer';
import Button from 'react-bootstrap/Button'

import Dropdown from 'react-bootstrap/Dropdown';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
class AssetDetails extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        invalidUrl: ''
    }
    componentDidMount() { }



    render() {
        return (
            <>
                <Dropdown>
                    <Dropdown.Toggle   id="dropdown-basic">
                        Dropdown Button
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </>

        );
    }
}

export default AssetDetails;