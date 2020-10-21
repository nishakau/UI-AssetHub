import React, { Component } from 'react';
import './index.css';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import ReactMarkdown from  'react-markdown';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
export class ImageCard extends Component {
    state = {
        AssetDataLive: [],AssetUnderReview: [],PendingRectification:[],AssetRejected: [],AssetManagerApproved:[],AssetManagerRectification:[],

        redirectPage:'', AssetID:'', redirectEditPage:'',classDeploy:'',redirectDeployPage:'',handleViewNote:''
      }
      componentDidMount() {
        // sessionStorage.setItem("user_email",'deepika.r@oracle.com');
        if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
        {
        axios.get(global.Ip + global.Port + '/asset/myAssets', {
            headers: {
                "user_email": sessionStorage.getItem("user_email"),
                

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
                        const AssetDataLive = res.data[i].arr;
                      //  global.AssetCount=AssetData;
                        this.setState({ AssetDataLive });

                    }
                    if(res.data[i].status=="Pending Review"){
                        for(var j=0;j<res.data[i].arr.length;j++){
                            if(res.data[i].arr[j].ASSET_REVIEW_NOTE==null){
                                res.data[i].arr[j].ASSET_REVIEW_NOTE=[];
                           }
                          }
                        const AssetUnderReview = res.data[i].arr;
                      //  global.AssetCount=AssetData;
                        this.setState({ AssetUnderReview });

                    }


                    if(res.data[i].status=="Manager Rectification"){
                        for(var j=0;j<res.data[i].arr.length;j++){
                            if(res.data[i].arr[j].ASSET_REVIEW_NOTE==null){
                                res.data[i].arr[j].ASSET_REVIEW_NOTE=[];
                           }
                          }
                        const AssetManagerRectification = res.data[i].arr;
                        this.setState({ AssetManagerRectification });
                       
      
                      }

                    if(res.data[i].status=="manager_approved"){
                        for(var j=0;j<res.data[i].arr.length;j++){
                            if(res.data[i].arr[j].ASSET_REVIEW_NOTE==null){
                                res.data[i].arr[j].ASSET_REVIEW_NOTE=[];
                           }
                          }
                        const AssetManagerApproved = res.data[i].arr;
                        //console.log(AssetUnderReview);
                      //  global.AssetCount=AssetData;
                        this.setState({ AssetManagerApproved });
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
                        const AssetRejected = res.data[i].arr;
                      //  global.AssetCount=AssetData;
                        this.setState({ AssetRejected });

                    }
              }
            //if(res.data[0].status=="Live"){
            //    const AssetData = res.data[0].arr;
           // console.log(AssetData.arr);
          //  global.AssetCount=AssetData;
           // }
            
          })
        }
      }
      handleView = id => event => {
        this.setState({
            redirectPage: true,
            AssetID:id
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
                global.MessagingTab=undefined;

            }
            else{
            var splitSection=val.split('next');
            //    var SplitName=splitSection
            //    console.log(splitSection);
                for(var i=0;i<splitSection.length-1;i++){
                        splitSection[i].split('Title');
                        //console.log(splitSection[i].split('Title')[1]);
                        if(splitSection[i].split('Title')[1]=="Overview"){
                            global.OverviewTab=splitSection[i].split('Title')[0];
                        }
                        if(splitSection[i].split('Title')[1]=="Architecture"){
                            global.DetailsTab=splitSection[i].split('Title')[0];
                        }
                        if(splitSection[i].split('Title')[1]=="Collateral"){
                            global.CollateralTab=splitSection[i].split('Title')[0];
                        }
                        if(splitSection[i].split('Title')[1]=="Messaging"){
                            global.MessagingTab=splitSection[i].split('Title')[0];
                        }
                        // alert(global.MessagingTab);
                        // console.log(global.DetailsTab);
                       // global.splitSection[i].split('Title')[1]=global.splitSection[i].split('Title')[0];
                     }
            }
         this.setState({
            handleViewNote: true,
               AssetID:id
           }); 

           global.Governance='Viewnote'
     }
  render() {
    if(this.state.redirectPage){
        return <Redirect push to={"/details/?" + this.state.AssetID} />; 
    }
    if(this.state.redirectDeployPage){
        return <Redirect push to={"/deploy/?" + this.state.deployAssetID} />; 
    }
    if(this.state.redirectEditPage){
        // window.location.href="/AssetManagement/?" + this.state.EditAssetID
        return <Redirect push to={"/AssetManagement?" + this.state.EditAssetID} />; 
    }
    if(this.state.handleViewNote){
        return <Redirect push to={"/details/?" + this.state.AssetID +"&MyASSET=Y"}/>; 
    }
      var AssetDataLivenew; 
      var AssetUnderReviewnew;
      var PendingRectificationnew;
      var AssetRejectednew;
    //   if(global.assetData!=undefined){
    //     AssetDatanew=global.assetData;  
    //   }else{
        AssetDataLivenew=this.state.AssetDataLive;
        AssetUnderReviewnew=this.state.AssetUnderReview.concat(this.state.AssetManagerApproved);
        PendingRectificationnew=this.state.PendingRectification.concat(this.state.AssetManagerRectification);
        AssetRejectednew=this.state.AssetRejected;
        var LiveCnt="";
        if(AssetDataLivenew.length>0){
            LiveCnt="Live Assets ("+AssetDataLivenew.length+")";
        }else{
            LiveCnt="Live Assets";
        }
        var UnderReviewCnt;
        if(AssetUnderReviewnew.length>0){
            UnderReviewCnt="Under Review ("+AssetUnderReviewnew.length+")";
        }else{
            UnderReviewCnt="Under Review";
        }
        var PendingRectificationCnt;
        if(PendingRectificationnew.length>0){
            PendingRectificationCnt="Requires Rectification ("+PendingRectificationnew.length+")";
        }else{
            PendingRectificationCnt="Requires Rectification";
        }
        var AssetRejectednewCnt;
        if(AssetRejectednew.length>0){
            AssetRejectednewCnt="Rejected ("+AssetRejectednew.length+")";
        }else{
            AssetRejectednewCnt="Rejected";
        }
        console.log(PendingRectificationnew);
     // }
    //   console.log(AssetRejectednew.length);
    return (
        <Row className="sectionCover myAsset" id="dataAssetShow">
           <Col  className="col-md-12 text-center"> <strong >{global.errorMsg}</strong></Col>
           <Col className="col-md-12">
                        <Tabs defaultActiveKey="UnderReview" id="uncontrolled-tab-example" className="mb-4">
                        <Tab eventKey="UnderReview" title={UnderReviewCnt}>
                                {AssetUnderReviewnew.length>0 && <>

                                {AssetUnderReviewnew.map((AssetUnderReview,index)=> 
                                    <Col md={9} data-id={AssetUnderReview.ASSET_ID} className="mb-4 ">
                                        <div class="clearfix bord-1"><Image src={AssetUnderReview.ASSET_THUMBNAIL} rounded  />
                                            <h5>{AssetUnderReview.ASSET_TITLE}</h5>
                                            <span className="descRightPanel">
                                            <ReactMarkdown source={AssetUnderReview.ASSET_DESCRIPTION} />  
                                            </span>
                                            {/* <p>{AssetUnderReview.ASSET_DESCRIPTION}</p> */}
                                            <span class="status underReview">&#9679; {AssetUnderReview.ASSET_STATUS}</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{AssetUnderReview.ASSET_CREATED_DATE}</Moment></div>
                                            <div className="Notes hide" id="NotesVal">
                                            </div>
                                            <div class="mt-20">

                                            <span className="btn btn-primary" onClick={this.handleView(AssetUnderReview.ASSET_ID)}>VIEW</span>
                                            &nbsp;&nbsp;<a className="btn btn-primary" href="javscript:void(0);" onClick={this.handleEdit(AssetUnderReview.ASSET_ID)}>EDIT</a>
                                            </div>
                                        </div>
                                        
                                    </Col>
                                )}
                                </>}
                                {AssetUnderReviewnew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                                </Tab>
                                <Tab eventKey="Live" title={LiveCnt}>
                                {AssetDataLivenew.length>0 && <>
                                {AssetDataLivenew.map((AssetDataLive,index)=> 
                                    <Col md={9} data-id={AssetDataLive.ASSET_ID} className="mb-4 ">
                                        <div class="clearfix bord-1"><Image src={AssetDataLive.ASSET_THUMBNAIL} rounded  />
                                            <h5>{AssetDataLive.ASSET_TITLE}</h5>
                                            <span className="descRightPanel">  <ReactMarkdown source={AssetDataLive.ASSET_DESCRIPTION} />  </span>

                                            {/* <p>{AssetDataLive.ASSET_DESCRIPTION}</p> */}
                                            <span class="status underReview">&#9679; APPROVED</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{AssetDataLive.ASSET_CREATED_DATE}</Moment></div>
                                             {/* <input type="text" id={AssetDataLive.ASSET_ID+'statusObj'} value={AssetDataLive.ASSET_REVIEW_NOTE}/> */}
                                             {/* <p id={AssetDataLive.ASSET_ID+'section0'}>{AssetDataLive.ASSET_REVIEW_NOTE[0].section}</p> */}
                                             {/* {AssetDataLive.ASSET_REVIEW_NOTE !=null && */}
                                             <>
                                             <div className="Notes hide" id={"NotesVal"+AssetDataLive.ASSET_ID}> {AssetDataLive.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>{ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}</>
                                            )}
                                            </div>

                                            <div class="mt-20">
                                                <span className="btn btn-primary" onClick={this.handleViewNote(AssetDataLive.ASSET_ID)}>VIEW</span>
                                                &nbsp;&nbsp;<span className="btn btn-primary" onClick={this.handleEdit(AssetDataLive.ASSET_ID)}>EDIT</span>
                                            </div>
                                            </>
                                            {/* } */}
                                        </div>
                                        
                                    </Col>
                                )}
                                </>}
                                {AssetDataLivenew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                               </Tab>
                                
                                
                                <Tab eventKey={PendingRectificationCnt} title={PendingRectificationCnt}>
                                {PendingRectificationnew.length>0 && <>
                                {PendingRectificationnew.map((PendingRectification,index)=> 
                                    <Col md={9} data-id={PendingRectification.ASSET_ID} className="mb-4 ">
                                        <div class="clearfix bord-1"><Image src={PendingRectification.ASSET_THUMBNAIL} rounded  />
                                           
                                            <h5>{PendingRectification.ASSET_TITLE}</h5>
                                            {/* <div dangerouslySetInnerHTML={{ __html: this.state.ASSET_THUMBNAIL }}></div> */}
                                            <span className="descRightPanel"> <ReactMarkdown source={PendingRectification.ASSET_DESCRIPTION} />  </span>
                                            {/* <div dangerouslySetInnerHTML={{ __html: PendingRectification.ASSET_DESCRIPTION }}></div> */}
                                            <span class="status underReview">&#9679; {PendingRectification.ASSET_STATUS}</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{PendingRectification.ASSET_CREATED_DATE}</Moment></div>
                                            {/* {PendingRectification.ASSET_REVIEW_NOTE !=null && */}
                                            <>
                                            <div className="Notes hide " id={"NotesVal"+PendingRectification.ASSET_ID}> {PendingRectification.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>{ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}</>
                                            )}
                                            </div>
                                            
                                            <div class="mt-20">
                                            
                                            <span className="btn btn-primary" onClick={this.handleViewNote(PendingRectification.ASSET_ID)}>VIEW</span>
                                            &nbsp;&nbsp;<span className="btn btn-primary" onClick={this.handleEdit(PendingRectification.ASSET_ID)}>EDIT</span>
                                            </div>
                                            </>
                                            {/* } */}
                                        </div>
                                        
                                    </Col>
                                )}
                                  </>}
                                  {PendingRectificationnew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                                <br/>
                                </Tab>
                                <Tab eventKey={AssetRejectednewCnt} title={AssetRejectednewCnt}>
                                {AssetRejectednew.length>0 && <>
                                {AssetRejectednew.map((AssetRejected,index)=> 
                                    <Col md={9} data-id={AssetRejected.ASSET_ID} className="mb-4 ">
                                        <div class="clearfix bord-1"><Image src={AssetRejected.ASSET_THUMBNAIL} rounded  />
                                            <h5>{AssetRejected.ASSET_TITLE}</h5>
                                            <span className="descRightPanel"> <ReactMarkdown source={AssetRejected.ASSET_DESCRIPTION} />  </span>

                                            {/* <p>{AssetRejected.ASSET_DESCRIPTION}</p> */}
                                            <span class="status underReview">&#9679; {AssetRejected.ASSET_STATUS}</span>
                                            <div className="small mt-20"><Moment format="DD MMMM YYYY">{AssetRejected.ASSET_CREATED_DATE}</Moment></div>
                                            {/* {AssetRejected.ASSET_REVIEW_NOTE !=null && */}
                                            <>
                                            <div className="Notes hide" id={"NotesVal"+AssetRejected.ASSET_ID}> {AssetRejected.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>{ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}</>
                                            )}
                                            </div>
                                           
                                            <div classname="mt-20"><span className="btn btn-primary" onClick={this.handleViewNote(AssetRejected.ASSET_ID)}>VIEW</span>
                                            {/* &nbsp;&nbsp;<a className="btn btn-primary" href="javscript:void(0);" onClick={this.handleEdit(AssetRejected.ASSET_ID)}>EDIT</a> */}
                                            </div>
                                            </>
                                            {/* } */}
                                        </div>
                                        
                                    </Col>
                                )}
                                 </>}
                                 {AssetRejectednew.length<=0 && <p class="text-center">
                                     No Records Yet.
                                </p>}
                                </Tab>
                                <Tab eventKey="Retired" title="Retired">
                                   <p class="text-center"> Coming soon. </p>
                                    <br/>
                                </Tab>
                        </Tabs>
                </Col>  
            
             
        </Row>
    )
  }
}


export default ImageCard;
