import React, { Component } from 'react'
import './index.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import axios from 'axios';

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
export class ImageCard extends Component {
    state = {
        AssetData: [],
        winData: [],
        redirectPage: '', AssetID: '', redirectEditPage: '', classDeploy: '', redirectDeployPage: '', redirectWinPage: '', winID: '',
        assetMsg: 'No matched record are available for your search yet',
        // WinMsg:'No matched record are available for your search yet'
    }
    componentDidMount() {
        document.getElementById('Loaderbk').classList.remove('hide');
        // alert('1');
        if ((sessionStorage.getItem('user_email') != "") && (sessionStorage.getItem('user_email') != null) && (sessionStorage.getItem('user_email') != undefined)) {
            global.assetData = undefined;
            axios.get(global.Ip + global.Port + '/asset/allAssetsFilters', {
                headers: {
                    filters: "",
                    "offset": 0,
                    "limit": -1,
                    sortBy: "createdDate",
                    order: "desc",
                    "user_email": sessionStorage.getItem("user_email")

                }
            })
                .then(res => {
                    //   console.log(res.data);
                    const AssetData = res.data.ASSETS;
                    global.AssetCount = res.data.TOTALCOUNT;

                    this.setState({ AssetData });
                })
            global.winData = undefined;

            //   var mainUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
            //   var header= {
            //           "offset":0,
            //           "limit":-1,
            //           "searchString":Searchdata,
            //           "filters":SplitCat[0]
            //       }
            axios.get(global.Ip + global.Port + '/winstory/getAllWinStoryByFilters', {
                headers: {
                    filters: "",
                    limit: -1,
                    offset: 0,
                    sortBy: "createdDate",
                    order: "desc",
                    "user_email": sessionStorage.getItem("user_email")

                }
            })
                .then(res => {
                    //    console.log(res.data);
                    //    alert('1');
                    const winData = res.data.WINSTORIES;
                    global.WinCount = res.data.TOTALCOUNT;
                    this.setState({ winData });
                })

        }
        document.getElementById('Loaderbk').classList.add('hide');

    }
    handleView = id => event => {
        // alert(sessionStorage.getItem('user_email'));
        var resparam = {
            "assetId": id,
            "viewed_on": "Web",
            "viewedBy": sessionStorage.getItem('user_email'),
            'viewed_by_username': sessionStorage.getItem('user_name'),
            "user_email": sessionStorage.getItem("user_email")

        }
        axios.post(global.Ip + global.Port + '/asset/views', resparam, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        })
            .then(res => {
                if (res.data.status == "view added") {
                    // console.log('Added View');
                }
            })
        this.setState({
            redirectPage: true,
            AssetID: id,
            statusTab: 'Details'
        });
        global.statusTab = 'Details'
    }
    handleViewWin = id => event => {
        //   alert('test');
        // alert(sessionStorage.getItem('user_email'));
        var resparam = {
            "winstoryId": id,
            "viewed_on": "w",
            "viewed_by_email": sessionStorage.getItem('user_email'),
            'viewed_by_username': sessionStorage.getItem('user_name'),
            "user_email": sessionStorage.getItem("user_email")

        }
        axios.post(global.Ip + global.Port + '/winstory/view', resparam, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        })
            .then(res => {
                if (res.data.status == "view added") {
                    // console.log('Added View');
                }
            })
        this.setState({
            redirectWinPage: true,
            winID: id,
            statusTab: 'Details'
        });
        global.statusTab = 'Details'
    }

    handleEdit = id => event => {
        this.setState({
            redirectEditPage: true,
            EditAssetID: id
        });
    }
    handledeploy = id => event => {

        this.setState({
            redirectDeployPage: true,
            deployAssetID: id
        });

    }
    render() {
        var msg;
        if (this.state.redirectPage) {
            // window.open("/details/?" + this.state.AssetID, '_blank');
            global.statusTab = "DETAILS";
            return <Redirect push to={"/details/?" + this.state.AssetID} />;
        }
        if (this.state.redirectDeployPage) {
            // window.open("/deploy/?" + this.state.deployAssetID, '_blank');

            return <Redirect push to={"/deploy/?" + this.state.deployAssetID} />;
        }
        if (this.state.redirectEditPage) {
            // window.location.href="/AssetManagement/?" + this.state.EditAssetID;
            // window.open("/AssetManagement/?" + this.state.EditAssetID, '_blank');

            return <Redirect push to={"/AssetManagement/?" + this.state.EditAssetID} />;
        }
        if (this.state.redirectWinPage) {
            // window.open("/WSdetails/?" + this.state.winID, '_blank');
            global.statusTab = "DETAILS";

            return <Redirect push to={"/WSdetails/?" + this.state.winID} />;

        }
        var AssetDatanew; var onlyWorkshopData; var onlyWhitePaper;
        var WinDatanew;
        var onlyWinData; var onlyConsultingWin;
        //   console.log(global.assetData);
        if (global.LobMsg == "LOB") {
            var norecordMsg = "No recommendations available for your LOB yet";

        } else {
            var norecordMsg = this.state.assetMsg;
        }

        if (global.assetData != undefined) {
            // AssetDatanew = global.assetData;
            AssetDatanew = global.assetData.filter(function (el) {
                return el.GROUP_TYPE[0].FILTER_ID === "170k5dr4xvz";
            });
            onlyWorkshopData = global.assetData.filter(function (el) {
                return el.GROUP_TYPE[0].FILTER_ID === "dq7k9lprfox";
            });
            onlyWhitePaper = global.assetData.filter(function (el) {
                return el.GROUP_TYPE[0].FILTER_ID === "dq7k9sdgroc"
            });
            // console.log(global.assetData.length + ' AssetDatanew' + AssetDatanew.length + 'onlyWorkshopData' + onlyWorkshopData.length)
        } else {
            //AssetDatanew = this.state.AssetData;
            AssetDatanew = this.state.AssetData.filter(function (el) {
                return el.GROUP_TYPE[0].FILTER_ID === "170k5dr4xvz";
            });
            onlyWorkshopData = this.state.AssetData.filter(function (el) {
                return el.GROUP_TYPE[0].FILTER_ID === "dq7k9lprfox";
            });
            onlyWhitePaper = this.state.AssetData.filter(function (el) {
                return el.GROUP_TYPE[0].FILTER_ID === "dq7k9sdgroc"
            });
            // console.log(this.state.AssetData.length + ' this.state.AssetData' + AssetDatanew.length + 'onlyWorkshopData' + onlyWorkshopData.length)

        }
        //alert(global.winData);

        if (global.winData != undefined) {

            WinDatanew = global.winData;
            // onlyWinData = global.winData.filter(function (el) {
            //     return el.GROUP_TYPE[0].FILTER_NAME == "Wins"
            // });
            // onlyConsultingWin = global.winData.filter(function (el) {
            //     return el.GROUP_TYPE[0].FILTER_NAME === "Consulting Wins"
            // });
            onlyWinData = global.winData;
        } else {
            WinDatanew = this.state.winData;

            // onlyWinData = this.state.winData.filter(function (el) {
            //     return el.GROUP_TYPE[0].FILTER_NAME === "Wins"
            // });
            // onlyConsultingWin = this.state.winData.filter(function (el) {
            //     return el.GROUP_TYPE[0].FILTER_NAME === "Consulting Wins"
            // });
            onlyWinData = WinDatanew;
        }
        var AsstCnt = AssetDatanew.length;
        var WinCnt = WinDatanew.length;
        var winHeader = "Wins";
        // (" + onlyWinData.length + ")";
        var winindustry

        var consultingwinHeader = "Consulting Wins"
        //  (" + onlyConsultingWin.length + ")";
        // console.log(AsstCnt);
       // setTimeout(function () {
            if (AsstCnt > 0) {
                msg = '';
                // document.getElementById('dataAssetShow').classList.remove('hide');



            } else {

                msg = 'No Record found.';
                // document.getElementById('dataAssetShow').classList.add('hide');    // global.

            }
            if (WinCnt > 0) {
                msg = '';
                // document.getElementById('dataAssetShow').classList.remove('hide');
                // document.getElementById('dataWinShow').classList.remove('hide');


            } else {
                msg = 'No Record found.';
                // document.getElementById('dataAssetShow').classList.add('hide');
                // document.getElementById('dataWinShow').classList.add('hide');    


            }

     //   }, 1);



        // alert(global.selectedCategory);
        //   console.log("test");
        //   console.log(WinDatanew);

        return (
            <Row className="sectionCover mt-30" >
                {/* <h5 id="winContent" class="col-md-12 mt-20 " style={{ fontWeight: 600, marginBottom: "20px", marginTop: "0px" }}>Wins */}
                {/* ( {WinCnt} ) */}
                {/* </h5> */}

                <hr />
                {/* <Navbar  variant="light">              
                <Nav className="ml-auto">

                    <Link className="nav-link" onClick={() => this.handleTab('')} >Wins</Link>
                    <Link className="nav-link" onClick={() => this.handleTab('MYAssets')} >Consulting Wins</Link>
                   
               </Nav> 
            </Navbar> */}





                <div id="dataWinShow" class="dataWindow homepage col-md-12">
                {/* {onlyWinData.length}bbb{AsstCnt}aa{onlyWorkshopData.length}aa{onlyWhitePaper.length} */}
                {/* <>{( WinCnt!=0) ? "Wins" : (AsstCnt!=0) ? "SolutionAssets" :(onlyWorkshopData.length != 0)? "Workshops" : (onlyWhitePaper.length!=0)? "WhitePapers" : "SolutionAssets"}</> */}

                {((WinCnt != 0) || (AsstCnt != 0) || (onlyWorkshopData.length != 0) || (onlyWhitePaper.length != 0))? (
                    <Tabs              defaultActiveKey=   {( WinCnt!=0) ? "Wins" : (AsstCnt!=0) ? "SolutionAssets" :(onlyWorkshopData.length != 0)? "Workshops" : (onlyWhitePaper.length!=0)? "WhitePapers" : "SolutionAssets"}
                    defaultActiveKey1={( WinCnt!=0) ? "Wins" : (AsstCnt!=0) ? "SolutionAssets" :(onlyWorkshopData.length != 0)? "Workshops" : (onlyWhitePaper.length!=0)? "WhitePapers" : "SolutionAssets"} id="uncontrolled-tab-example" className="mb-4">
                        {WinCnt != 0 ? (

                        <Tab eventKey="Wins" title="Wins">

                            {WinCnt != 0 ? (
                                <div id="dataWinShow" class="dataWindow col-md-12 ">
                                    <div className="Scroll" >
                                        {onlyWinData.map((winData, index) =>
                                            <Col md={4} data-id={winData.WINSTORY_ID} style={{ border: "thin solid #e0e0e0", borderRadius: "12px", backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: "url(" + winData.WINSTORY_LOGO + ")" }} className="mb-4 itemCardHomePage cards" >
                                                {/* <div class="extta"> */}
                                                {winData.PROMOTE == true &&
                                                    <div class="promoted" >Promoted</div>}
                                                <div class="dfd">
                                                    {/* <Image src={winData.WINSTORY_LOGO} className="roundedCard" onClick={this.handleViewWin(winData.WINSTORY_ID)} /> */}
                                                    <div class="viewEdit text-center home">
                                                        <a href="javascript:void(0);" onClick={this.handleViewWin(winData.WINSTORY_ID)} class="view"> View </a>
                                                    </div>
                                                    <div className="cardInforHomePage">
                                                        <div class="tooltipDiv">
                                                            <img class="infoIcon" src="../img/info.png" />
                                                        </div>
                                                        <div className="tooltipCustom">
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Industries : </span>
                                                                {winData.INDUSTRY.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {winData.INDUSTRY.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Solution Area : </span>
                                                                {winData.SOLUTION_AREAS.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {winData.SOLUTION_AREAS.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Competitor(s) : </span>
                                                                <span>{winData.WINSTORY_COMPETIION}</span>
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Partner : </span>
                                                                <span>{winData.WINSTORY_PARTNER}</span>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex" }}>
                                                            <div className="cardTitleImagecard" title={winData.WINSTORY_NAME}>
                                                                {winData.WINSTORY_NAME}
                                                            </div>

                                                        </div>
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ width: '60%' }}>
                                                                <div className="small" style={{ paddingTop: "4px" }}><Moment format="DD MMMM YYYY">{winData.WINSTORY_CREATED_ON}</Moment></div>
                                                            </div>
                                                            <div style={{ display: "flex", width: '40%' }}>
                                                                <div className="cardLikes" name={winData.LIKES.LIKES_COUNT}>
                                                                    {winData.LIKES.LIKE_COUNT > 0 &&
                                                                        <div class="flex" >
                                                                            <img src="../img/Icon_Like.png" /><span>{winData.LIKES.LIKE_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="cardView" style={{ padding: '2px' }} name={winData.VIEWS.VIEW_COUNT}>
                                                                    {winData.VIEWS.VIEW_COUNT > 0 &&
                                                                        <div class="flex">
                                                                            <img src="../img/Icon_view.png" />
                                                                            <span>{winData.VIEWS.VIEW_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                                {/* </div> */}
                                            </Col>
                                        )}
                                    </div>
                                </div>) : (<Row className="errorMSG">
                                    <Col md={12} className="mb-12 pd40 text-center"> <strong >{norecordMsg}</strong></Col>
                                </Row>)}
                        </Tab>): (<></>)}
                        {AsstCnt != 0 ? (

                        <Tab eventKey="SolutionAssets" title="Solution Assets">
                            {AsstCnt != 0 ? (
                                <div id="dataAssetShow" class="col-md-12">

                                    <div className="Scroll" >
                                        {AssetDatanew.map((AssetData, index) =>
                                            <Col md={4} data-id={AssetData.ASSET_ID} style={{ borderRadius: "12px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center",  backgroundImage: "url(" + AssetData.ASSET_THUMBNAIL + ")" }} className="mb-4 itemCardHomePage cards" >
                                                {/* <div class="extta"> */}
                                                {AssetData.PROMOTE == true &&
                                                    <div class="promoted" >Promoted</div>}
                                                <div class="dfd ">

                                                    {/* <div class="imagePanel">
                                                <Image src={AssetData.ASSET_THUMBNAIL} className="roundedCard" />
                                            </div> */}
                                                    <div class="viewEdit text-center home col-md-6">
                                                        <a href="javascript:void(0);" onClick={this.handleView(AssetData.ASSET_ID)} class="view"> View </a>
                                                    </div>
                                                    {/* <div class="viewPromote text-center home col-md-6">
                 <a href="javascript:void(0);"  onClick={this.handleView(AssetData.ASSET_ID)} class="view"> Promote </a>
        </div> */}

                                                    <div className="cardInforHomePage">
                                                        <div class="tooltipDiv">
                                                            <img class="infoIcon" src="../img/info.png" />
                                                        </div>
                                                        <div className="tooltipCustom">

                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Industries : </span>
                                                                {AssetData.INDUSTRY.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.INDUSTRY.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Solution Area : </span>
                                                                {AssetData.SOLUTION_AREAS.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.SOLUTION_AREAS.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Sales Initiatives : </span>
                                                                {AssetData.SALES_PLAY.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.SALES_PLAY.length == 0 && <span> NA  </span>}
                                                            </div>

                                                        </div>
                                                        <div class="kckgBd"><div class="Cktv6e"></div></div>


                                                        <div style={{ display: "flex" }}>
                                                            <div className="cardTitleImagecard" title={AssetData.ASSET_TITLE}>
                                                                {AssetData.ASSET_TITLE}
                                                            </div>

                                                        </div>
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ width: '60%' }}>
                                                                <div className="small" style={{ paddingTop: "4px" }}><Moment format="DD MMMM YYYY">{AssetData.ASSET_CREATED_DATE}</Moment></div>
                                                            </div>
                                                            <div style={{ display: "flex", width: '40%' }}>
                                                                <div className="cardLikes" name={AssetData.LIKES.LIKES_COUNT}>
                                                                    {AssetData.LIKES.LIKE_COUNT > 0 &&
                                                                        <div class="flex" >
                                                                            <img src="../img/Icon_Like.png" /><span>{AssetData.LIKES.LIKE_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="cardView" style={{ padding: '2px' }} name={AssetData.VIEWS.VIEW_COUNT}>
                                                                    {AssetData.VIEWS.VIEW_COUNT > 0 &&
                                                                        <div class="flex">
                                                                            <img src="../img/Icon_view.png" />
                                                                            <span>{AssetData.VIEWS.VIEW_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                {/* </div> */}
                                            </Col>
                                        )}

                                    </div>


                                </div>
                            ) : (
                                    <div>
                                        <Row className="errorMSG">
                                            <Col md={12} className="mb-12 pd40 text-center"> <strong >{norecordMsg}</strong></Col>
                                        </Row>
                                    </div>
                                )}
                        </Tab> ):(<></>)}
                        {onlyWorkshopData.length != 0 ? (
                        <Tab eventKey="Workshops" title="Workshops">
                            {onlyWorkshopData.length != 0 ? (
                                <div id="dataAssetShow" class="col-md-12">

                                    <div className="Scroll" >
                                        {onlyWorkshopData.map((AssetData, index) =>
                                            <Col md={4} data-id={AssetData.ASSET_ID} style={{ borderRadius: "12px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: "url(" + AssetData.ASSET_THUMBNAIL + ")" }} className="mb-4 itemCardHomePage cards" >
                                                {/* <div class="extta"> */}
                                                {AssetData.PROMOTE == true &&
                                                    <div class="promoted" >Promoted</div>}
                                                <div class="dfd ">

                                                    {/* <div class="imagePanel">
                                          <Image src={AssetData.ASSET_THUMBNAIL} className="roundedCard" />
                                      </div> */}
                                                    <div class="viewEdit text-center home col-md-6">
                                                        <a href="javascript:void(0);" onClick={this.handleView(AssetData.ASSET_ID)} class="view"> View </a>
                                                    </div>
                                                    {/* <div class="viewPromote text-center home col-md-6">
           <a href="javascript:void(0);"  onClick={this.handleView(AssetData.ASSET_ID)} class="view"> Promote </a>
  </div> */}

                                                    <div className="cardInforHomePage">
                                                        <div class="tooltipDiv">
                                                            <img class="infoIcon" src="../img/info.png" />
                                                        </div>
                                                        <div className="tooltipCustom">

                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Industries : </span>
                                                                {AssetData.INDUSTRY.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.INDUSTRY.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Solution Area : </span>
                                                                {AssetData.SOLUTION_AREAS.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.SOLUTION_AREAS.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Sales Initiatives : </span>
                                                                {AssetData.SALES_PLAY.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.SALES_PLAY.length == 0 && <span> NA  </span>}
                                                            </div>

                                                        </div>
                                                        <div class="kckgBd"><div class="Cktv6e"></div></div>


                                                        <div style={{ display: "flex" }}>
                                                            <div className="cardTitleImagecard" title={AssetData.ASSET_TITLE}>
                                                                {AssetData.ASSET_TITLE}
                                                            </div>

                                                        </div>
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ width: '60%' }}>
                                                                <div className="small" style={{ paddingTop: "4px" }}><Moment format="DD MMMM YYYY">{AssetData.ASSET_CREATED_DATE}</Moment></div>
                                                            </div>
                                                            <div style={{ display: "flex", width: '40%' }}>
                                                                <div className="cardLikes" name={AssetData.LIKES.LIKES_COUNT}>
                                                                    {AssetData.LIKES.LIKE_COUNT > 0 &&
                                                                        <div class="flex" >
                                                                            <img src="../img/Icon_Like.png" /><span>{AssetData.LIKES.LIKE_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="cardView" style={{ padding: '2px' }} name={AssetData.VIEWS.VIEW_COUNT}>
                                                                    {AssetData.VIEWS.VIEW_COUNT > 0 &&
                                                                        <div class="flex">
                                                                            <img src="../img/Icon_view.png" />
                                                                            <span>{AssetData.VIEWS.VIEW_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                {/* </div> */}
                                            </Col>
                                        )}

                                    </div>


                                </div>
                            ) : (
                                    <div>
                                        <Row className="errorMSG">
                                            <Col md={12} className="mb-12 pd40 text-center"> <strong >{norecordMsg}</strong></Col>
                                        </Row>
                                    </div>
                                )}

                        </Tab> ):(<></>)}
                        {onlyWhitePaper.length != 0 ? (

                        <Tab eventKey="WhitePapers" title="White Papers">
                            {onlyWhitePaper.length != 0 ? (
                                <div id="dataAssetShow" class="col-md-12">

                                    <div className="Scroll" >
                                        {onlyWhitePaper.map((AssetData, index) =>
                                            <Col md={4} data-id={AssetData.ASSET_ID} style={{ borderRadius: "12px", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center", backgroundImage: "url(" + AssetData.ASSET_THUMBNAIL + ")" }} className="mb-4 itemCardHomePage cards" >
                                                {/* <div class="extta"> */}
                                                {AssetData.PROMOTE == true &&
                                                    <div class="promoted" >Promoted</div>}
                                                <div class="dfd ">

                                                    {/* <div class="imagePanel">
                                          <Image src={AssetData.ASSET_THUMBNAIL} className="roundedCard" />
                                      </div> */}
                                                    <div class="viewEdit text-center home col-md-6">
                                                        <a href="javascript:void(0);" onClick={this.handleView(AssetData.ASSET_ID)} class="view"> View </a>
                                                    </div>
                                                    {/* <div class="viewPromote text-center home col-md-6">
           <a href="javascript:void(0);"  onClick={this.handleView(AssetData.ASSET_ID)} class="view"> Promote </a>
  </div> */}

                                                    <div className="cardInforHomePage">
                                                        <div class="tooltipDiv">
                                                            <img class="infoIcon" src="../img/info.png" />
                                                        </div>
                                                        <div className="tooltipCustom">

                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Industries : </span>
                                                                {AssetData.INDUSTRY.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.INDUSTRY.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Solution Area : </span>
                                                                {AssetData.SOLUTION_AREAS.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.SOLUTION_AREAS.length == 0 && <span> NA  </span>}
                                                            </div>
                                                            <div style={{ width: "100%" }}>
                                                                <span style={{ color: '#F2A006', fontWeight: 600 }}>Sales Initiatives : </span>
                                                                {AssetData.SALES_PLAY.map((indus, index) =>
                                                                    <span> {indus.FILTER_NAME}  </span>
                                                                )}
                                                                {AssetData.SALES_PLAY.length == 0 && <span> NA  </span>}
                                                            </div>

                                                        </div>
                                                        <div class="kckgBd"><div class="Cktv6e"></div></div>


                                                        <div style={{ display: "flex" }}>
                                                            <div className="cardTitleImagecard" title={AssetData.ASSET_TITLE}>
                                                                {AssetData.ASSET_TITLE}
                                                            </div>

                                                        </div>
                                                        <div style={{ display: "flex" }}>
                                                            <div style={{ width: '60%' }}>
                                                                <div className="small" style={{ paddingTop: "4px" }}><Moment format="DD MMMM YYYY">{AssetData.ASSET_CREATED_DATE}</Moment></div>
                                                            </div>
                                                            <div style={{ display: "flex", width: '40%' }}>
                                                                <div className="cardLikes" name={AssetData.LIKES.LIKES_COUNT}>
                                                                    {AssetData.LIKES.LIKE_COUNT > 0 &&
                                                                        <div class="flex" >
                                                                            <img src="../img/Icon_Like.png" /><span>{AssetData.LIKES.LIKE_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                                <div className="cardView" style={{ padding: '2px' }} name={AssetData.VIEWS.VIEW_COUNT}>
                                                                    {AssetData.VIEWS.VIEW_COUNT > 0 &&
                                                                        <div class="flex">
                                                                            <img src="../img/Icon_view.png" />
                                                                            <span>{AssetData.VIEWS.VIEW_COUNT}</span>
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                                {/* </div> */}
                                            </Col>
                                        )}

                                    </div>


                                </div>
                            ) : (
                                    <div>
                                        <Row className="errorMSG">
                                            <Col md={12} className="mb-12 pd40 text-center"> <strong >{norecordMsg}</strong></Col>
                                        </Row>
                                    </div>
                                )}


                        </Tab>):(<></>)}
                    </Tabs>
                    ):(<p id="noItem">No Records.....</p>)} 

                </div>
                <h5 class="col-md-12 sectionCover" id="assetContent"></h5>
                {/* </>  */}
                {/* // )} */}

            </Row>
        )
    }
}

export default ImageCard
