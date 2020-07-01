import React, { Component } from 'react';
import { Header } from './Header';
import WinTabs from './tabs/winTabs';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ParentSSOWinstory from './ParentSSOWinStory';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Loader from './loader/loader';
import Footer from './Footer/Footer';
import Button from 'react-bootstrap/Button'

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
    componentDidMount() {
        global.statusTab = "details";
        var url = window.location.href;
        var ID = url.split('?');
        global.IDAsset = ID[1];
    }

    render() {

        return (
            <div className="App">
                {/* <Header /> */}
                <div className="BodyContainer mt-4">
                    <Container fluid={false}>
                        <Row>
                            <div class="Pull-right col-md-12"><a href="javascript:history.back(-1)">&#x2190; &nbsp;Back to Previous Screen</a></div>

                            <Col md={8}><WinTabs /> </Col>
                            <ParentSSOWinstory />
                        </Row>
                    </Container>
                    <Footer />
                </div>

            </div>
        );
    }
}

export default AssetDetails;