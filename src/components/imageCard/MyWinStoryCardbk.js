import React, { Component } from 'react'
import './index.css';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
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
        WinStoryDataLive: [],WinStoryUnderReview: [],PendingRectification:[],WinStoryRejected: [],

        redirectPage:'', WinstoryID:'', redirectEditPage:'',classDeploy:'',redirectDeployPage:'',handleViewNote:''
      }
      componentDidMount() {
        //  sessionStorage.setItem("user_email",'deepika.r@oracle.com');

        axios.get(global.Ip + global.Port + '/winstory/mywinstory', {
            headers: {
                user_email: sessionStorage.getItem("user_email")

            }
          })
          .then(res => {
            //   console.log(res.data.length);
              for(var i=0;i<res.data.length;i++){
                    //console.log((res.data[i].status));
                //     if(res.data[i].ASSET_REVIEW_NOTE==null){
                //         res.data[i].ASSET_REVIEW_NOTE=[];
                //    }
                    if(res.data[i].status=="Live"){
                        for(var j=0;j<res.data[i].arr.length;j++){
                            if(res.data[i].arr[j].ASSET_REVIEW_NOTE==null){
                                res.data[i].arr[j].ASSET_REVIEW_NOTE=[];
                           }
                          }
                        const WinStoryDataLive = res.data[i].arr;
                      //  global.AssetCount=AssetData;
                        this.setState({ WinStoryDataLive });

                    }
                    if(res.data[i].status=="Pending Review"){
                        for(var j=0;j<res.data[i].arr.length;j++){
                            if(res.data[i].arr[j].ASSET_REVIEW_NOTE==null){
                                res.data[i].arr[j].ASSET_REVIEW_NOTE=[];
                           }
                          }
                        const WinStoryUnderReview = res.data[i].arr;
                      //  global.AssetCount=AssetData;
                        this.setState({ WinStoryUnderReview });

                    }
                    if(res.data[i].status=="Pending Rectification"){
                        for(var j=0;j<res.data[i].arr.length;j++){
                            if(res.data[i].arr[j].ASSET_REVIEW_NOTE==null){
                                res.data[i].arr[j].ASSET_REVIEW_NOTE=[];
                           }
                          }
                        const PendingRectification = res.data[i].arr;
                      //  global.AssetCount=AssetData;
                        this.setState({ PendingRectification });

                    }
                    if(res.data[i].status=="Reject"){
                        for(var j=0;j<res.data[i].arr.length;j++){
                            if(res.data[i].arr[j].ASSET_REVIEW_NOTE==null){
                                res.data[i].arr[j].ASSET_REVIEW_NOTE=[];
                           }
                          }
                        const WinStoryRejected = res.data[i].arr;
                      //  global.AssetCount=AssetData;
                        this.setState({ WinStoryRejected });

                    }
              }
            //if(res.data[0].status=="Live"){
            //    const AssetData = res.data[0].arr;
           // console.log(AssetData.arr);
          //  global.AssetCount=AssetData;
           // }
            
          })
      }
      handleView = id => event => {
        this.setState({
            redirectPage: true,
            WinstoryID:id
        }); 
      }
      handleEdit = id => event =>{
        this.setState({
            redirectEditPage: true,
            EditAssetID:id
        }); 
      }
      handledeploy = id => event =>{

        this.setState({
            redirectDeployPage: true,
            deployAssetID:id
        }); 

      }
      handleViewNote = id => event => {
      // console.log( document.getElementById('NotesVal').innerHTML);
       var val= document.getElementById('NotesVal'+id).innerHTML;
       if(val==" " || val==""){
                global.OverviewTab=undefined;
                global.DetailsTab=undefined;
                global.CollateralTab=undefined;
            }
            else{
            var splitSection=val.split('next');
            //    var SplitName=splitSection
            //    console.log(splitSection);
                for(var i=0;i<splitSection.length-1;i++){
                        splitSection[i].split('Title');
                        console.log(splitSection[i].split('Title')[1]);
                        if(splitSection[i].split('Title')[1]=="Overview"){
                            global.OverviewTab=splitSection[i].split('Title')[0];
                        }
                        if(splitSection[i].split('Title')[1]=="Architecture"){
                            global.DetailsTab=splitSection[i].split('Title')[0];
                        }
                        if(splitSection[i].split('Title')[1]=="Collateral"){
                            global.CollateralTab=splitSection[i].split('Title')[0];
                        }
                        // alert(global.Overview);
                        // console.log(global.DetailsTab);
                    //  global.splitSection[i].split('Title')[1]=global.splitSection[i].split('Title')[0];
                }
            }
         this.setState({
            handleViewNote: true,
               WinstoryID:id
           }); 

           global.Governance='Viewnote'
     }
  render() {
    if(this.state.redirectPage){
        return <Redirect push to={"/WSdetails/?" + this.state.WinstoryID} />; 
    }
    if(this.state.redirectDeployPage){
        return <Redirect push to={"/deploy/?" + this.state.deployAssetID} />; 
    }
    if(this.state.redirectEditPage){
        // window.location.href="/AssetManagement/?" + this.state.EditAssetID
        return <Redirect push to={"/WinManagement?" + this.state.EditAssetID} />; 
    }
    if(this.state.handleViewNote){
        return <Redirect push to={"/WSdetails/?" + this.state.WinstoryID +"&MyASSET=Y"}/>; 
    }
      var WinStoryDataLivenew; 
      var WinStoryUnderReviewnew;
      var PendingRectificationnew;
      var WinStoryRejectednew;
    //   if(global.assetData!=undefined){
    //     AssetDatanew=global.assetData;  
    //   }else{
        WinStoryDataLivenew=this.state.WinStoryDataLive;
        WinStoryUnderReviewnew=this.state.WinStoryUnderReview;
        PendingRectificationnew=this.state.PendingRectification;
        WinStoryRejectednew=this.state.WinStoryRejected;
        var LiveCnt="";
        if(WinStoryDataLivenew.length>0){
            LiveCnt="Live Assets ("+WinStoryDataLivenew.length+")";
        }else{
            LiveCnt="Live Assets";
        }
        var UnderReviewCnt;
        if(WinStoryUnderReviewnew.length>0){
            UnderReviewCnt="Under Review ("+WinStoryUnderReviewnew.length+")";
        }else{
            UnderReviewCnt="Under Review";
        }
        var PendingRectificationCnt;
        if(PendingRectificationnew.length>0){
            PendingRectificationCnt="Requires Rectification ("+PendingRectificationnew.length+")";
        }else{
            PendingRectificationCnt="Requires Rectification";
        }
        var WinStoryRejectednewCnt;
        if(WinStoryRejectednew.length>0){
            WinStoryRejectednewCnt="Rejected ("+WinStoryRejectednew.length+")";
        }else{
            WinStoryRejectednewCnt="Rejected";
        }
        console.log(PendingRectificationnew);
     // }
    //   console.log(WinStoryRejectednew.length);
    return (
        <Row className="sectionCover myAsset" id="dataAssetShow">
           <Col  className="col-md-12 text-center"> <strong >{global.errorMsg}</strong></Col>
           <Col className="col-md-12">
                        <Tabs defaultActiveKey="Live" id="uncontrolled-tab-example" className="mb-4">
                        {/* <Tab eventKey="UnderReview" title={UnderReviewCnt}>
                                {WinStoryUnderReviewnew.length>0 && <>

                                {WinStoryUnderReviewnew.map((WinStoryUnderReview,index)=> 
                                    <Col md={9} data-id={WinStoryUnderReview.WINSTORY_ID} className="mb-4 itemCard">
                                        <div class="clearfix bord-1"><Image src={WinStoryUnderReview.WINSTORY_THUMBNAIL} rounded  />
                                            <h5>{WinStoryUnderReview.WINSTORY_NAME}</h5>
                                            <span class="status underReview">&#9679; {WinStoryUnderReview.WINSTORY_STATUS}</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{WinStoryUnderReview.WINSTORY_CREATED_ON}</Moment></div>
                                            <div className="Notes hide" id="NotesVal">
                                            </div>
                                            <div class="mt-20">

                                            <span className="btn btn-primary" onClick={this.handleView(WinStoryUnderReview.WINSTORY_ID)}>VIEW</span>
                                            </div>
                                        </div>
                                        
                                    </Col>
                                )}
                                </>}
                                {WinStoryUnderReviewnew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                                </Tab> */}
                                <Tab eventKey="Live" title={LiveCnt}>
                                {WinStoryDataLivenew.length>0 && <>
                                {WinStoryDataLivenew.map((WinStoryDataLive,index)=> 
                                    <Col md={9} data-id={WinStoryDataLive.WINSTORY_ID} className="mb-4 itemCard">
                                        <div class="clearfix bord-1"><Image src={WinStoryDataLive.WINSTORY_THUMBNAIL} rounded  />
                                            <h5>{WinStoryDataLive.WINSTORY_NAME}</h5>
                                            <p>{WinStoryDataLive.ASSET_DESCRIPTION}</p>
                                            <span class="status underReview">&#9679; APPROVED</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{WinStoryDataLive.WINSTORY_CREATED_ON}</Moment></div>
                                             {/* <input type="text" id={WinStoryDataLive.WINSTORY_ID+'statusObj'} value={WinStoryDataLive.ASSET_REVIEW_NOTE}/> */}
                                             {/* <p id={WinStoryDataLive.WINSTORY_ID+'section0'}>{WinStoryDataLive.ASSET_REVIEW_NOTE[0].section}</p> */}
                                             {/* {WinStoryDataLive.ASSET_REVIEW_NOTE !=null && */}
                                             <>
                                             <div className="Notes hide" id={"NotesVal"+WinStoryDataLive.WINSTORY_ID}> {WinStoryDataLive.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>{ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}</>
                                            )}
                                            </div>

                                            <div class="mt-20">
                                                <span className="btn btn-primary" onClick={this.handleViewNote(WinStoryDataLive.WINSTORY_ID)}>VIEW</span>
                                                &nbsp;&nbsp;<span className="btn btn-primary" onClick={this.handleEdit(WinStoryDataLive.WINSTORY_ID)}>EDIT</span>
                                            </div>
                                            </>
                                            {/* } */}
                                        </div>
                                        
                                    </Col>
                                )}
                                </>}
                                {WinStoryDataLivenew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                               </Tab>
                                
                            
                                {/* <Tab eventKey={PendingRectificationCnt} title={PendingRectificationCnt}>
                                {PendingRectificationnew.length>0 && <>
                                {PendingRectificationnew.map((PendingRectification,index)=> 
                                    <Col md={9} data-id={PendingRectification.WINSTORY_ID} className="mb-4 itemCard">
                                        <div class="clearfix bord-1"><Image src={PendingRectification.WINSTORY_THUMBNAIL} rounded  />
                                            <h5>{PendingRectification.WINSTORY_NAME}</h5>
                                            <p>{PendingRectification.ASSET_DESCRIPTION}</p>
                                            <span class="status underReview">&#9679; {PendingRectification.WINSTORY_STATUS}</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{PendingRectification.WINSTORY_CREATED_ON}</Moment></div>
                                            <>
                                            <div className="Notes hide" id={"NotesVal"+PendingRectification.WINSTORY_ID}> {PendingRectification.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>{ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}</>
                                            )}
                                            </div>
                                            
                                            <div class="mt-20">
                                            
                                            <span className="btn btn-primary" onClick={this.handleViewNote(PendingRectification.WINSTORY_ID)}>VIEW</span>
                                            &nbsp;&nbsp;<span className="btn btn-primary" onClick={this.handleEdit(PendingRectification.WINSTORY_ID)}>EDIT</span>
                                            </div>
                                            </>
                                           
                                        </div>
                                        
                                    </Col>
                                )}
                                  </>}
                                  {PendingRectificationnew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                                <br/>
                                </Tab>
                                <Tab eventKey={WinStoryRejectednewCnt} title={WinStoryRejectednewCnt}>
                                {WinStoryRejectednew.length>0 && <>
                                {WinStoryRejectednew.map((WinStoryRejected,index)=> 
                                    <Col md={9} data-id={WinStoryRejected.WINSTORY_ID} className="mb-4 itemCard">
                                        <div class="clearfix bord-1"><Image src={WinStoryRejected.WINSTORY_THUMBNAIL} rounded  />
                                            <h5>{WinStoryRejected.WINSTORY_NAME}</h5>
                                            <p>{WinStoryRejected.ASSET_DESCRIPTION}</p>
                                            <span class="status underReview">&#9679; {WinStoryRejected.WINSTORY_STATUS}</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{WinStoryRejected.WINSTORY_CREATED_ON}</Moment></div>
                                            <>
                                            <div className="Notes hide" id={"NotesVal"+WinStoryRejected.WINSTORY_ID}> {WinStoryRejected.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>{ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}</>
                                            )}
                                            </div>
                                           
                                            <div classname="mt-20"><span className="btn btn-primary" onClick={this.handleViewNote(WinStoryRejected.WINSTORY_ID)}>VIEW</span>
                                            </div>
                                            </>
                                           
                                        </div>
                                        
                                    </Col>
                                )}
                                 </>}
                                 {WinStoryRejectednew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                                </Tab>
                                <Tab eventKey="Retired" title="Retired">
                                   <p class="text-center"> Coming soon. </p>
                                    <br/>
                                </Tab> */}
                        </Tabs>
                </Col>  
            
             
        </Row>
    )
  }
}

export default ImageCard
