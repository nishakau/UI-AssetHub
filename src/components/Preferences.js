import React, { Component } from 'react';
import { Header } from './Header';
import Tabs from './tabs/tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import ParentSSO from './ParentSSO';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Loader from './loader/loader';
import Footer from './Footer/Footer';
import Button from 'react-bootstrap/Button';
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
        HelpData: [],
        dataExist: false
    }
    componentDidMount() {
        document.getElementById('Loader').classList.remove('hide');
        axios.get(global.Ip + global.Port + '/asset/allFilters', {
            headers: {
                "user_email": sessionStorage.getItem("user_email")
            }
        }).then(helpSupport => {
            if (helpSupport.data.allFilters) {
                document.getElementById('Loader').classList.add('hide');
                const HelpData = helpSupport.data.allFilters;
                // console.log(HelpData);
                var count = (helpSupport.data.userPreferences).length;
                // alert
                if (count > 0) {
                    setTimeout(function () {
                        for (var i = 0; i < count; i++) {
                            // console.log(helpSupport.data.userPreferences[i]);
                            this.setState({ dataExist: true });
                            console.log(document.getElementById(helpSupport.data.userPreferences[i]).classList.add("activePrefrence"));
                            document.getElementById('Loader').classList.add('hide');
                        }
                    }.bind(this), 2000);
                    // window.setTimeout(function() {
                    //     for(var i=0;i<count;i++){
                    //         // console.log(helpSupport.data.userPreferences[i]);
                    //        var dataExist=true;
                    //         console.log(document.getElementById(helpSupport.data.userPreferences[i]).classList.add("activePrefrence"));

                    //     }
                    // }, 3000);
                }
                this.setState({ HelpData });
            }
        })

        // }
    }
    deletePrefrences = (e) => {
        axios.delete(global.Ip + global.Port + '/asset/deleteMySearchHistory', {
            headers: { "user_email": sessionStorage.getItem("user_email") }
        }).then(resPref => {
            if (resPref.data) {
                alert("Search history deleted successfully");
                return false;
            }
        })
    }
    SelectPrefrence = (e) => {
        // console.log(e.target.innerHTML);
        //console.log(e.target.getAttribute("class"));
        if (e.target.getAttribute("class") != "col-sm-2 mb20 userPrefrencesCat") {
            e.target.classList.remove("activePrefrence");

        } else {
            e.target.classList.add("activePrefrence");

        }
    }
    SetPrefrence = (e) => {
        document.getElementById('Loader').classList.remove('hide');

        var x = document.getElementsByClassName("activePrefrence");
        // alert(x.length);
        if (x.length > 0) {
            var arr = [];
            for (var i = 0; i <= x.length - 1; i++) {
                arr.push(x[i].getAttribute("value"));
            }
            axios.post(global.Ip + global.Port + '/asset/setPreferences', {
                "user_name": sessionStorage.getItem("user_name"),
                "user_email": sessionStorage.getItem("user_email"),
                "filters": arr
            }).then(response => {
                document.getElementById('Loader').classList.add('hide');

                alert(response.data.status);

            });
        } else {
            var arr = [];

            axios.post(global.Ip + global.Port + '/asset/setPreferences', {
                "user_name": sessionStorage.getItem("user_name"),
                "user_email": sessionStorage.getItem("user_email"),
                "filters": arr
            }).then(response => {
                document.getElementById('Loader').classList.add('hide');

                alert(response.data.status);

            });
        }

        // else{
        //     alert('nothing is selected yet');
        //     return false;
        // }
        // e.preventDefault();
        // var data = new FormData()
        //    console.log(e.target.innerHTML);



    }
    render() {
        var helpSupportnew = this.state.HelpData;
        //  console.log(helpSupportnew);

        return (
            <div className="App">
                <Header />
                <div className="BodyContainer mt-4">
                    <Container fluid={false}>
                        <Row>
                            <div class="row">
                                <div class="Pull-right mb10 col-md-10 cursorHand"><a href="javascript:window.history.back(-1)">&#x2190; &nbsp;Back to Previous Screen</a></div>
                                <p class="col-md-12 text-center hide" id="loaderMsg"><div class="text-center loaderMsg"></div>Loading...</p>
                                {/* {this.state.dataExist==true && */}
                                <>
                                    {helpSupportnew.map((HelpData, index) =>
                                        <>
                                            {HelpData.Type != "Assets Type" &&
                                                <> <h5 class="col-md-12 sectionCover" id="assetContent" style={{ fontWeight: 600, fontSize: "16px", marginBottom: "-10px" }}>{HelpData.Type}</h5>

                                                    {HelpData.filters.map((filters, index) => <>
                                                        {/* {(filters.ASSET_COUNT + filters.WINSTORY_COUNT)!=0 && */}
                                                        {filters.FILTER_NAME.trim() != "Others" &&
                                                            <div class="col-sm-2 mb20 userPrefrencesCat" id={filters.FILTER_ID} value={filters.FILTER_ID} onClick={e => this.SelectPrefrence(e)}> {filters.FILTER_NAME}</div>
                                                        }
                                                    </>
                                                        // <span class="col-md-4 mb40 userPrefrencesCat" id={filters.FILTER_ID} value={filters.FILTER_ID} onClick={e => this.SelectPrefrence(e)}>{filters.FILTER_NAME}</span>
                                                    )}
                                                </>}


                                        </>
                                    )}
                                    <hr />

                                    <div class="mb40 col-md-12">
                                        <a variant="primary" className="text-center mt-30  CreateAsset" onClick={(e) => this.SetPrefrence(e)} type="submit">
                                            SET PREFERENCES
                                </a><br />
                                        <small>Click on SET PREFERENCES button to set your preferences<br /></small>
                                    </div>

                                </>
                                {/* //  } */}
                            </div>

                        </Row>
                    </Container>
                    <Footer />
                </div>

            </div>
        );
    }
}

export default AssetDetails;