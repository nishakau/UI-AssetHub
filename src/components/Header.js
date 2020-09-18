import React, { Component } from 'react';
import {connect} from 'react-redux';

import Carousel from 'react-bootstrap/Carousel';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profile from "./profileDropdown";
import axios from 'axios';

import {userRoleChange} from '../actions';
import { BrowserRouter as Router, Route, Redirect, Link } from "react-router-dom";
class Headerr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AssetCount: '',
      HubCount: '',
      username: '',
      name: '',
      TabStatus: '',
      WinsCount: '',
      statusTab: ''
    };
    if(this.props.loginReducer.lob != undefined && this.props.loginReducer.role != undefined && this.props.loginReducer.leader != undefined){
    sessionStorage.setItem('LOB', this.props.loginReducer.lob);
    sessionStorage.setItem('role', this.props.loginReducer.role);
    sessionStorage.setItem('leader', this.props.loginReducer.leader);
    }
  }


  componentDidMount() {
    // sessionStorage.setItem('user_email', 'deepika.r@oracle.com');
    // sessionStorage.setItem('user_name', 'Deepika R');
    // sessionStorage.setItem('LOB', "Others");
    // sessionStorage.setItem('role', "admin");
    // sessionStorage.setItem('leader', true);
    setTimeout(function(){ document.getElementById('header-container').scrollIntoView();}, 1000);

    //if ((sessionStorage.getItem('user_email') != "") && (sessionStorage.getItem('user_email') != null) && (sessionStorage.getItem('user_email') != undefined)) {
    // sessionStorage.setItem('user_email','deepika.r@oracle.com');
    // sessionStorage.setItem('user_name','deepika R');

    var name = sessionStorage.getItem('user_name');
    if (name !== undefined) {
      var firsttwoletter = name.substring(0, 1);
      this.setState({
        username: firsttwoletter,
        name: name
      });
      global.username = firsttwoletter;
      global.name = name;
    }

    axios.get(global.Ip + global.Port + '/asset/banner', {
      headers: {
        "user_email": sessionStorage.getItem('user_email')

      }
    })
      .then(res => {
        global.totalUniqueVisitors = (res.data.visit[0].COUNT) + (res.data.visit[1].COUNT);
        this.setState({ AssetCount: res.data.asset_Count, HubCount: res.data.hubs_Count, WinsCount: res.data.winstory_Count });
      })

    //}


  }

  handleTab = (value) => {
    global.statusTab = value;

    this.setState({
      statusTab: global.statusTab
    })

  }
  assetClick = (value) => {
    var elmnt = document.getElementById("assetContent");
    elmnt.scrollIntoView();
  }
  comingSoon = () =>{
    alert('Under Construction. We are putting our best effort to bring you the FY21 Sales Play portal. Alternatively you can filter for FY21 Sales Play Workshops under Asset Type in this page.');
    return false;
  }
  winClick = (value) => {
    var elmnt = document.getElementById("winContent");
    elmnt.scrollIntoView();
  }
  linkOpen(url) {
    if (url == "") {
      alert('Coming Soon!');
    }
    else
      window.open(url, "_blank");
  }
  render() {

    //  console.log(this.state.statusTab);
    global.redirectUrl = window.location.href;
    if (global.selectedCategory == undefined) {
      global.selectedCategory = "ASSET";
    }
    //   if(global.selectedCategory=="ASSET"){
    //     var Title="Assets";
    //     // var TotalCount=this.state.AssetCount;
    //   }else{
    //     var Title="Wins";
    //     // var TotalCount=this.state.WinsCount;
    //   }
    var TotalWinCount = this.state.WinsCount;
    var TotalAssetCount = this.state.AssetCount;

    if (global.loginStatus == undefined) {
    // return <Redirect push to="/" />;
        window.location.href="/"
    }
    var getPage = window.location.href.split('/');
    if (getPage[3] === 'home') {
      global.statusTab = "";
    } else if (getPage[3] === 'MyAssets') {
      global.statusTab = "MYAssets";

    } else if (getPage[3] === 'Governance') {
      global.statusTab = "Governance";

    } else if (getPage[3] === 'MyWinStories') {
      global.statusTab = "MyWinStories";

    }
    else if (getPage[3] === 'Reports') {
      global.statusTab = "Reports";

    }
    else if (getPage[3] == 'WSdetails') {
      global.statusTab = "WSdetails";

    }
    else {
      global.statusTab = "Details";
    }


    return (
      <div >
         <Navbar variant="light">
          <Navbar.Brand href="/">
            <img
              className="d-block clearfix logoImage"
              src="../img/logoNat.png"
              alt="First slide"
              id="logoPanel"
            />

          </Navbar.Brand>
          <Nav className="ml-auto">
           <input type="text" id="header-container" />
            <Link to="/home" className={global.statusTab == '' || global.statusTab == undefined ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('')} >HOME</Link>
            <Link to="/MyAssets" className={global.statusTab == 'MYAssets' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MYAssets')} >My ASSETS</Link>
            {/* <Link to ="/Governance"  className={global.statusTab=='Governance' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Governance')} >Governance</Link> */}
            {/* <Link to ="/MyWinStories"  className={global.statusTab=='MyWinStories' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MyWinStories')} >My Wins</Link> */}
            {sessionStorage.getItem('role').indexOf('winloader') !=-1 && <Link to="/MyWinStories" className={global.statusTab == 'MyWinStories' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MyWinStories')} >My Wins</Link>}
            {/* {sessionStorage.getItem('role').indexOf('admin') !=-1 && <Link to="/MyWinStories" className={global.statusTab == 'MyWinStories' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('MyWinStories')} >My Wins</Link>} */}
            {sessionStorage.getItem('role').indexOf('reviewer') !=-1  && <Link to="/Governance" className={global.statusTab == 'Governance' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Governance')} >Governance</Link>}
            {sessionStorage.getItem('role').indexOf('admin') !=-1  && <Link to="/Governance" className={global.statusTab == 'Governance' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Governance')} >Governance</Link>}
            {sessionStorage.getItem('leader') == "true" && <Link to="/Reports" className={global.statusTab == 'Reports' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('Reports')} >Reports</Link>}
            <Link to="/helpSupport" className={global.statusTab == 'helpSupport' ? "nav-link active" : "nav-link"} onClick={() => this.handleTab('helpSupport')} >Help & Support</Link>

          </Nav>
          <Profile />
        </Navbar>

        <div className="carouselCover" >
          {/* { global.selectedCategory */}

          {((global.statusTab == '') || (global.statusTab == undefined)) ? (
            <Carousel controls={false} indicators={false}>
              <Carousel.Item>
                <img
                  className="d-block imgHomeBanner w-100"
                  src="../img/Banner.png"
                  alt="Banner Image" />
                <Carousel.Caption className="text-left d-none d-sm-block">

                  {/*<div style={{ width: "100%", display: "flex" }}>
                    <div style={{ width: "70%", display: "block", marginTop: "15px" }}>
                      <div>
                        <label style={{ fontFamily: "Georgia Bold !important", fontSize: "30px" }}>To Install the Mobile App from EMM</label>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "10%" }}> <label style={{ color: "#F2A006", fontSize: "15px" }}>Step 1: </label></div>
                        <div style={{ width: "25%" }}>
                          <label style={{ color: "#c2c2c2", fontSize: "15px" }}>Scan QR Code </label>
                          <p style={{ marginTop: "-12px", color: "#c2c2c2" }}>https://getwsone.com/</p>
                        </div>
                        <div style={{ width: "33%" }}>
                          <img
                            src="../img/qrcode.png"
                            alt="qrcoe"
                            className="qrcode"
                          />
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "10%" }}> <label style={{ color: "#F2A006", fontSize: "15px" }}>Step 2: </label></div>
                        <div style={{ width: "25%" }}>
                          <label style={{ color: "#c2c2c2", fontSize: "15px" }}>Enroll Your Device </label>
                        </div>
                        <div style={{ width: "33%" }}>
                        </div>
                      </div>
                      <div style={{ display: "flex" }}>
                        <div style={{ width: "10%" }}> <label style={{ color: "#F2A006", fontSize: "15px" }}>Step 3: </label></div>
                        <div style={{ width: "27%" }}>
                          <label style={{ color: "#c2c2c2", fontSize: "15px" }}>Download & Install </label>
                        </div>
                        <div style={{ width: "33%" }}>
                          <img
                            src="../img/appicon.png"
                            alt="qrcoe"
                            className="mobileappIcon"
                          />
                        </div>
                      </div>

                    </div>
                    <div class="bRightContainer" style={{ }}>

                      <div class="vRightContP" style={{}}>
                      <div class="flex">
                        <img src="../img/salesPlayWS.png" alt="qrcoe" class="bannerstoryIcon"/>
                        <div class="innerSec" style={{}}>
                            <span>
                            North America Sales Play Workshops</span>
                            <div class="small mb-1 subsec" style={{}}>Video's / Workshops / Technical Proofs to penetrate<br/> 9000 non-cloud accounts and drive consumption.</div>
                            <span onClick={this.comingSoon}  style={{'font-size':'12px','border-radius':"12px", 'margin-top': '6px','background': '#F3921F'}} title="coming soon" class="btn btn-primary btn-sm">Click Here</span>
                        </div>
                    </div>





                        {/* <div style={{ marginLeft: "10px", width: "34%", display: "block", textAlign: 'center' }}>
                          <div>
                            <img src="../img/salesPlayWS.png" alt="qrcoe" className="bannerstoryIcon" />
                            <div style={{ margin: "10px" }}>
                              <span style={{ fontSize: "15px" }}>Everything in one place</span>
                          </div>
                          </div> astrk/}
                          
                           {/* <div>
                            <p>
                              Explore all the Assets/Wins and its collaterals in one place
                          </p>
                          </div>  astrk/}
                        </div>
                        {/* <div style={{ marginLeft: "10px", width: "30%", display: "block", textAlign: 'center' }}>
                          <div>
                            <img src="../img/homeicon2.png" alt="qrcoe" className="bannerstoryIcon" />
                          </div>
                          <div style={{ margin: "10px" }}>
                            <span style={{ fontSize: "15px" }}>Request for a demo</span>
                          </div>
                         
                        </div> astrk/}
                        {/* <div style={{ marginLeft: "10px", width: "30%", display: "block", textAlign: 'center' }}>
                          <div>
                            <img src="../img/homeicon3.png" alt="qrcoe" className="bannerstoryIcon" />
                          </div>
                          <div style={{ margin: "10px" }}>
                            <span style={{ fontSize: "15px" }}>Personalised Home</span>
                          </div>
                         
                        </div> astrk/}
                      {/* </div> astrk/}
                      <div>

                      </div>
                    </div>
                  </div>*/}
                  <div style={{ width: "85%", display: "flex", marginBottom: "25px", marginTop: "25px" }}>
                    <div style={{ display: "flex", marginBottom: "10px" }}>
                      <div className="bannerCard">
                        <img src="../img/Top_consuming_customers.png" alt="qrcoe" className="bannerstoryIconSmall" />
                        <span style={{ color: "#000", lineHeight: "1.2" }}>Top Consuming Customers</span>
                      </div>
                      <div className="bannerCard">
                        <img src="../img/Top_consuming_customers.png" alt="qrcoe" className="bannerstoryIconSmall" />
                        <span style={{ color: "#000", lineHeight: "1.2" }}>Top Booking Customers</span>
                      </div>
                      <div className="bannerCard">
                        <img src="../img/Win_Slides.png" alt="qrcoe" className="bannerstoryIconSmall" />
                        <span style={{ color: "#000", lineHeight: "1.2" }}>NATech Consulting Wins & Go-Lives</span>
                      </div>
                      <div className="bannerCard">
                        <img src="../img/Win_Slides.png" alt="qrcoe" className="bannerstoryIconSmall" />
                        <span style={{ color: "#000", lineHeight: "1.2" }}>Customer Ready Slides</span>
                      </div>
                      <br/>

                      <div className="bannerCard">
                        <img src="../img/ReferenceAssets.png" alt="qrcoe" className="bannerstoryIconSmall" />
                        <span style={{ color: "#000", lineHeight: "1.2" }}>Reference Assets</span>
                      </div>
                      <div className="bannerCard">
                        <img src="../img/ResourceAssets.png" alt="qrcoe" className="bannerstoryIconSmall" />
                        <span style={{ color: "#000", lineHeight: "1.2" }}>Resource Assets</span>
                      </div>

                    </div>
                    <div>

                    </div>
                  </div>


                  {/* <Row>
                    <Col sm={4} >
                      <h5>Assets</h5>
                      <p>Get a holistic overview of NAC’s assets and seamless access to Sales & SE teams</p>
                    </Col>
                    <Col sm={3} className="ml-auto">
                     <br /><h6><span className="ml-2 spanClickable"  onClick={this.winClick}><span className="countStyl colY ">{this.state.WinsCount}</span>  Wins</span> | <span className="mr-2 spanClickable" onClick={this.assetClick}> <span className="countStyl "  >{this.state.AssetCount}</span> Assets</span> </h6>
                      <p>All wins and assets are in one place</p>
                    </Col>
                  </Row> */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

          ) : (
              <Carousel controls={false} indicators={false}>
                <Carousel.Item>
                  <div style={{ height: "100px" }}>
                    <img
                      className="d-block detailImg"
                      src="../img/Banner_Small.png"
                      alt="First slide"
                    />
                  </div>
                </Carousel.Item>
              </Carousel>)}

        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) =>{
  return state;
}

export const Header = connect(mapStateToProps,{userRoleChange})(Headerr);
