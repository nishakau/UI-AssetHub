import React, { Component } from 'react';
import { Header } from './Header';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ParentSSO from './ParentSSO';
import Container from 'react-bootstrap/Container';
import Form  from 'react-bootstrap/Form';
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
    //     global.statusTab="details";
    //     var url = window.location.href;   
    //     var ID=url.split('?');
    //     global.IDAsset=ID[1];   
    // }
    }
   
    render() {
        // function FuncRedirect(event) {
        //     // alert('1');
        //     // global.selectedCategory="ASSET";
        //     window.history.go(-1);
        // }
           return (
            <div className="App">
                {/* <Header /> */}
                    <div className="BodyContainer mt-4">
                        <Container fluid={false}> 
                            <Row>
                            {/* <div class="Pull-right col-md-12"><a onClick={FuncRedirect} href="javascript:void(0);">&#x2190; &nbsp;Back to Previous Screen</a></div> */}

                                <Col md={12}><img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fmiro.medium.com%2Fmax%2F2920%2F1*bLr8CbffO85_8NYAvIIJsw.png&imgrefurl=https%3A%2F%2Fmedium.com%2Fdesigner-recipes%2Fhow-to-make-a-custom-404-error-page-for-your-website-1af37a8b20d1&docid=q9nfnyxiM1BqdM&tbnid=B57pzS6_G4vaZM%3A&vet=10ahUKEwjDvsbG2u7kAhXK73MBHbJVCskQMwhnKAIwAg..i&w=1460&h=1116&bih=610&biw=1280&q=error%20page%20image&ved=0ahUKEwjDvsbG2u7kAhXK73MBHbJVCskQMwhnKAIwAg&iact=mrc&uact=8"/></Col>
                                 {/* <ParentSSO/> */}
                            </Row>
                        </Container>
                <Footer />
                </div>
               
            </div>
        );
    }
  }
  
  export default WinAssetDetails;