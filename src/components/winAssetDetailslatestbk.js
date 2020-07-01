import React, { Component } from 'react';
import { Header } from './Header';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ParentSSO from './ParentSSO';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Loader from './loader/loader';
import Footer from './Footer/Footer';
import Button from 'react-bootstrap/Button'
import WSTABS from './tabs/winTabs';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
class WinAssetDetails extends Component {
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
        function FuncRedirect(event) {
            // alert('1');
            global.selectedCategory = "ASSET";
            window.history.go(-1);
        }
        return (
            <div className="App">
                {/* <Header /> */}
                <div className="BodyContainer mt-4">
                    <Container fluid={false}>
                        <Row>
                            <div class="Pull-right col-md-12"><a onClick={FuncRedirect} href="javascript:void(0);">Back to Previous Screen</a></div>

                            <Col md={8}><WSTABS /> </Col>
                            <ParentSSO />
                        </Row>
                    </Container>
                    <Footer />
                </div>

            </div>
        );
    }
}

export default WinAssetDetails;