import React, { Component } from 'react'
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import axios from 'axios';
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
    redirectPage: '', AssetID: '', redirectEditPage: '', classDeploy: '', redirectDeployPage: '', redirectWinPage: '', winID: ''
  }
  componentDidMount() {
    if ((sessionStorage.getItem('user_email') != "") && (sessionStorage.getItem('user_email') != null) && (sessionStorage.getItem('user_email') != undefined)) {
      global.assetData = undefined;
      axios.get(global.Ip + global.Port + '/asset/favourites', {
        headers: {

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
      axios.get(global.Ip + global.Port + '/winstory/winfavourites', {
        headers: {
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
          console.log('Added View');
        }
      })
    this.setState({
      redirectPage: true,
      AssetID: id,
      TabStatus: 'Details'
    });
    global.TabStatus = 'Details'
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
          console.log('Added View');
        }
      })
    this.setState({
      redirectWinPage: true,
      winID: id,
      TabStatus: 'Details'
    });
    global.TabStatus = 'Details'
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
      return <Redirect push to={"/details/?" + this.state.AssetID} />;
    }
    if (this.state.redirectDeployPage) {
      return <Redirect push to={"/deploy/?" + this.state.deployAssetID} />;
    }
    if (this.state.redirectEditPage) {
      window.location.href = "/AssetManagement/?" + this.state.EditAssetID;
      ///return <Redirect push to={"/AssetManagement/?" + this.state.EditAssetID} />; 
    }
    if (this.state.redirectWinPage) {
      return <Redirect push to={"/WSdetails/?" + this.state.winID} />;

    }
    var AssetDatanew;
    var WinDatanew;
    console.log(global.assetData);
    if (global.assetData != undefined) {
      AssetDatanew = global.assetData;
    } else {
      AssetDatanew = this.state.AssetData;
    }
    //alert(global.winData);
    if (global.winData != undefined) {

      WinDatanew = global.winData;
    } else {
      WinDatanew = this.state.winData;
    }
    var AsstCnt = AssetDatanew.length;
    var WinCnt = WinDatanew.length;
    console.log(AsstCnt);
    setTimeout(function () {
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
    }, 500);



    // alert(global.selectedCategory);
    //   console.log("test");
    //   console.log(WinDatanew);

    return (
      <Row className="sectionCover mt-30" >


        {/* <Col md={12} className="mb-12 text-center"> <strong >{global.errorMsg}</strong></Col> */}
        <h5 class="col-md-12">My Favourite Asset ( {AsstCnt} )</h5>
        <div id="dataAssetShow" class="col-md-12">
          {AsstCnt != 0 ? (
            <Col className="Scroll" >
              {AssetDatanew.map((AssetData, index) =>
                <Col md={3} data-id={AssetData.ASSET_ID} className="mb-4 itemCard cards" onClick={this.handleView(AssetData.ASSET_ID)}>
                  {/* <div class="extta"> */}
                  {AssetData.PROMOTE == true &&
                    <div class="promoted" >Promoted</div>}
                  <div class="dfd">

                    <div class="imagePanel">
                      <Image src={AssetData.ASSET_THUMBNAIL} className="roundedCard" />
                    </div>
                    <div class="viewEdit text-center home">
                      <a href="javascript:void(0);" onClick={this.handleView(AssetData.ASSET_ID)} class="view"> View </a>
                    </div>
                    <div className="cardInfor">
                      <div className="cardTitle" title={AssetData.ASSET_TITLE}>

                        {AssetData.ASSET_TITLE}
                        <div className="small"><Moment format="DD MMMM YYYY">{AssetData.ASSET_CREATED_DATE}</Moment></div>
                      </div>
                      <div className="cardLikes" name={AssetData.LIKES.LIKES_COUNT}>
                        {AssetData.LIKES.LIKE_COUNT > 0 &&
                          <div class="flex" >


                            <img src="../img/Icon_Like.png" /><span>{AssetData.LIKES.LIKE_COUNT}</span>
                          </div>
                        }
                      </div>
                      <div className="cardView" name={AssetData.VIEWS.VIEW_COUNT}>
                        {AssetData.VIEWS.VIEW_COUNT > 0 &&
                          <div class="flex">
                            <img src="../img/Icon_view.png" />
                            <span>{AssetData.VIEWS.VIEW_COUNT}</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </Col>
              )}

            </Col>) : (
              <Row className="errorMSG">
                <Col md={12} className="mb-12 p-20 text-center"> <strong >No  Matched Assets are there</strong></Col>
              </Row>
            )}


        </div>



        {/* {global.selectedCategory != "WIN" ? ( <> */}

        {/* </> ):(
              <> */}
        <>
          <h5 class="col-md-12 mt-20 sectionCover">My Favourite Wins ( {WinCnt} )</h5>
          <hr />
          <div id="dataWinShow" class="dataWindow col-md-12">
            {WinCnt != 0 ? (<Col className="Scroll" >


              {WinDatanew.map((winData, index) =>
                <Col md={3} data-id={winData.WINSTORY_ID} className="mb-4 itemCard cards" onClick={this.handleViewWin(winData.WINSTORY_ID)}>
                  {/* <div class="extta"> */}

                  {winData.PROMOTE == true &&
                    <div class="promoted" >Promoted</div>}
                  <div class="dfd">
                    <Image src={winData.WINSTORY_LOGO} className="roundedCard" />
                    <div class="viewEdit text-center home">
                      <a href="javascript:void(0);" onClick={this.handleViewWin(winData.WINSTORY_ID)} class="view"> View </a>
                    </div>
                    <div className="cardInfor">
                      <div className="cardTitle" title={winData.WINSTORY_NAME}>

                        {winData.WINSTORY_NAME}
                        <div className="small"><Moment format="DD MMMM YYYY">{winData.WINSTORY_CREATED_ON}</Moment></div>
                      </div>
                      <div className="cardLikes" name={winData.LIKES.LIKES_COUNT}>
                        {winData.LIKES.LIKE_COUNT > 0 &&
                          <div class="flex" >


                            <img src="../img/Icon_Like.png" /><span>{winData.LIKES.LIKE_COUNT}</span>
                          </div>
                        }
                      </div>
                      <div className="cardView" name={winData.VIEWS.VIEW_COUNT}>
                        {winData.VIEWS.VIEW_COUNT > 0 &&
                          <div class="flex">
                            <img src="../img/Icon_view.png" />
                            <span>{winData.VIEWS.VIEW_COUNT}</span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </Col>
              )}
            </Col>) : (<Row className="errorMSG">
              <Col md={12} className="mb-12 p-20 text-center"> <strong >No  Matched Wins are there</strong></Col>
            </Row>)}
          </div>
        </>
        {/* </>  */}
        {/* // )} */}

      </Row>
    )
  }
}

export default ImageCard
