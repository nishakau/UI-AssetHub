import React, { Component } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Profile from "./profileDropdown";

import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AssetCount: '',
            HubCount: '',
            username: '',
            name: '',
            TabStatus: ''
        };
    }


    componentDidMount() {

        // global.statusTab="";
        // sessionStorage.setItem("user_email",'deepika.r@oracle.com');
        if ((sessionStorage.getItem('user_email') != "") && (sessionStorage.getItem('user_email') != null) && (sessionStorage.getItem('user_email') != undefined)) {
            var name = sessionStorage.getItem('user_name');
            if (name != undefined) {
                var firsttwoletter = name.substring(0, 1);
                this.setState({
                    username: firsttwoletter,
                    name: name
                });
            }


            axios.get(global.Ip + global.Port + '/asset/banner', {
                "user_email": sessionStorage.getItem("user_email")
            }, {
                "user_email": sessionStorage.getItem("user_email")

            }).then(res => {
                this.setState({ AssetCount: res.data.asset_Count, HubCount: res.data.hubs_Count });
            })

        }
    }
    //   componentDidUpdate(){

    //   }
    handleTab = (value) => {
        //  console.log(value);
        global.statusTab = value;
        // this.setState({ TabStatus: value});
        // alert(this.state.TabStatus +'test');
    }

    render() {
        if (global.loginStatus == undefined) {

            return <Redirect push to="/" />;
        }
        //   alert(window.location.href);
        var getPage = window.location.href.split('/');
        //   console.log(getPage); 
        if (getPage[3] == 'home') {
            global.statusTab = "";
        } else if (getPage[3] == 'MyAssets') {
            global.statusTab = "MYAssets";

        } else if (getPage[3] == 'Governance') {
            global.statusTab = "Governance";

        } else if (getPage[3] == 'MyWinStories') {
            global.statusTab = "MyWinStories";

        }
        else if (getPage[3] == 'WSdetails') {
            global.statusTab = "WSdetails";

        } else {
            global.statusTab = "Details";
        }

        return (
            <div>
                <Navbar variant="light">
                    <Navbar.Brand href="/">
                        <img
                            className="d-block clearfix"
                            src="../img/Logo.png"
                            alt="First slide"
                        />
                    </Navbar.Brand>
                    <Nav className="ml-auto">

                        <Link to="/home" className={global.statusTab == '' || global.statusTab == undefined ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('')} >HUB ASSETS</Link>
                        <Link to="/MyAssets" className={global.statusTab == 'MYAssets' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MYAssets')} >My ASSETS</Link>
                        {/* <Link to ="/Governance"  className={global.statusTab=='Governance' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Governance')} >Governance</Link> */}
                        {/* <Link to ="/MyWinStories"  className={global.statusTab=='MyWinStories' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MyWinStories')} >My Wins</Link> */}
                        {sessionStorage.getItem('role') == "winloader" && <Link to="/MyWinStories" className={global.statusTab == 'MyWinStories' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MyWinStories')} >My Wins</Link>}
                        {sessionStorage.getItem('role') == "admin" && <Link to="/MyWinStories" className={global.statusTab == 'MyWinStories' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MyWinStories')} >My Wins</Link>}
                        {sessionStorage.getItem('role') == "reviewer" && <Link to="/Governance" className={global.statusTab == 'Governance' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Governance')} >Governance</Link>}
                        {sessionStorage.getItem('role') == "admin" && <Link to="/Governance" className={global.statusTab == 'Governance' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Governance')} >Governance</Link>}
                        {sessionStorage.getItem('leader') == "true" && <Link to="/Reports" className={global.statusTab == 'Reports' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Reports')} >Reports</Link>}

                    </Nav>
                    <Profile />
                </Navbar>

                <div className="carouselCover">

                    {global.statusTab == '' &&
                        <Carousel controls={false} indicators={false}>
                            <Carousel.Item>
                                <img
                                    className="d-block "
                                    src="../img/Banner.png"
                                    alt="First slide"
                                />
                                <Carousel.Caption className="text-left d-none d-sm-block">
                                    <Row>
                                        <Col sm={4} >
                                            {/* <label>To Install the Mobile App from </label> */}
                                            <p>Get a holistic overview of NATD’s assets and seamless access to Sales & SE teams</p>
                                        </Col>
                                        <Col sm={3} className="ml-auto">
                                            <br /><h6><span className="mr-2"> <span className="countStyl">{this.state.HubCount}</span> Hubs</span> | <span className="ml-2"><span className="countStyl colY">{this.state.AssetCount}</span>  Assets</span></h6>
                                            <p>All assets in one place</p>
                                        </Col>
                                    </Row>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    }
                    {global.statusTab != '' && global.statusTab != undefined &&
                        <Carousel controls={false} indicators={false}>
                            <Carousel.Item>
                                <img
                                    className="d-block detailImg"
                                    src="../img/Banner_Small.png"
                                    alt="First slide"
                                />
                                {/* <Carousel.Caption className="text-left d-none d-sm-block">
                    <Row>
                        <Col sm={8} >
                            </Col>
                        <Col sm={3} className="ml-auto">
                           
                        </Col>
                    </Row>
                    </Carousel.Caption> */}
                            </Carousel.Item>
                        </Carousel>
                    }
                </div>
            </div>

        )
    }
}

export default Header
