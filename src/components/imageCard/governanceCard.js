import React, { Component } from 'react'
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
        AssetDataLive: [],AssetUnderReview: [],PendingRectification:[],AssetRejected: [],AssetLive:[],

        redirectPage:'', AssetID:'', redirectEditPage:'',classDeploy:'',redirectDeployPage:'',redirectDetailPage:''
      }
      componentDidMount() {
        //   sessionStorage.setItem("user_email",'deepika.r@oracle.com');
        axios.get(global.Ip + global.Port + '/governance/assets/'+sessionStorage.getItem("user_email"), {
            "user_email":sessionStorage.getItem("user_email")
        },{ headers: {
            "user_email": sessionStorage.getItem("user_email")             

        }}).then(res => {

            for(var i=0;i<res.data.length;i++){
                // console.log((res.data[i].status));
             
                if(res.data[i].status=="Pending Review"){
                  //  global.AssetCount=AssetData;
                  for(var j=0;j<res.data[i].list.length;j++){
                    if(res.data[i].list[j].ASSET_REVIEW_NOTE==null){
                        res.data[i].list[j].ASSET_REVIEW_NOTE=[];
                   }
                  }
                    const AssetUnderReview = res.data[i].list;

                    this.setState({ AssetUnderReview });

                }
                if(res.data[i].status=="Pending Rectification"){

                    for(var j=0;j<res.data[i].list.length;j++){
                        if(res.data[i].list[j].ASSET_REVIEW_NOTE==null){
                            res.data[i].list[j].ASSET_REVIEW_NOTE=[];
                       }
                      }
                    const PendingRectification = res.data[i].list;
                  //  global.AssetCount=AssetData;
                    this.setState({ PendingRectification });

                }
                if(res.data[i].status=="Reject"){
                    for(var j=0;j<res.data[i].list.length;j++){
                        if(res.data[i].list[j].ASSET_REVIEW_NOTE==null){
                            res.data[i].list[j].ASSET_REVIEW_NOTE=[];
                       }
                      }
                    const AssetRejected = res.data[i].list;
                  //  global.AssetCount=AssetData;
                    this.setState({ AssetRejected });

                }
                if(res.data[i].status=="Live"){
                    for(var j=0;j<res.data[i].list.length;j++){
                        if(res.data[i].list[j].ASSET_REVIEW_NOTE==null){
                            res.data[i].list[j].ASSET_REVIEW_NOTE=[];
                       }
                      }
                    const AssetLive = res.data[i].list;
                  //  global.AssetCount=AssetData;
                    this.setState({ AssetLive });

                }
          }




            //   console.log(res.data);
            //   for(var i=0;i<res.data.length;i++){
            //     const AssetUnderReview = res.data;
            //     this.setState({ AssetUnderReview });                      
            // }
            
          })
      }
      handleViewNote = id => event => {
        // console.log( document.getElementById('NotesVal').innerHTML);
         var val= document.getElementById('NotesVal'+id).innerHTML;
        // console.log(val +'aaaa');
      //    var SplitName=splitSection
       
    if(val==" " || val==""){
        global.OverviewTab=undefined;
        global.DetailsTab=undefined;
        global.CollateralTab=undefined;
    }
    else{
        var splitSection=val.split('next');

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
                 AssetID:id
             }); 
  
             global.Governance='Viewnote'
       }
      handleDetails = id => event => {
        this.setState({
            redirectDetailPage: true,
            AssetID:id
        }); 
      }
      handleView = id => event => {
        //   alert('1');
        var val1= document.getElementById('NotesVal'+id).innerHTML;
        // alert(val1);

        if(val1==" " || val1==""){
            global.OverviewTab=undefined;
            global.DetailsTab=undefined;
            global.CollateralTab=undefined;
        }
        else{
            // alert('3');
            var splitSection=val1.split('next');
            //    var SplitName=splitSection
              //  console.log(splitSection);
               for(var i=0;i<splitSection.length-1;i++){
                     splitSection[i].split('Title');
                     console.log(splitSection[i].split('Title')[1]);
                     if(splitSection[i].split('Title')[1]=="Overview"){
                         global.OverviewTab=splitSection[i].split('Title')[0];
                      //    alert(global.OverviewTab);
                     }
                     if(splitSection[i].split('Title')[1]=="Architecture"){
                        global.DetailsTab=splitSection[i].split('Title')[0];
                      //   alert(global.DetailsTab);
      
                    }
                    if(splitSection[i].split('Title')[1]=="Collateral"){
                        global.CollateralTab=splitSection[i].split('Title')[0];
                      //   alert(global.DetailsTab);
      
                    }
        }
        // alert(val1);
        
              //alert(global.Overview);
              // console.log(global.DetailsTab);
             //  global.splitSection[i].split('Title')[1]=global.splitSection[i].split('Title')[0];
         }
        //    this.setState({
        //       handleViewNote: true,
        //          AssetID:id
        //      }); 
  
             global.Governance='Viewnote'



        // alert(sessionStorage.getItem('user_email'));
    //    var resparam=  {
    //        "assetId":id,
    //        "viewed_on":"Web",
    //        "viewedBy":sessionStorage.getItem('user_email'),
    //        'viewed_by_username':sessionStorage.getItem('user_name')
    //    }
    //    axios.post(global.Ip + global.Port + '/asset/views', resparam)
    //      .then(res => {
    //            if(res.data.status=="view added"){
    //               console.log('Added View'); 
    //            }  
    //      })
         this.setState({
             redirectPage: true,
               AssetID:id,
               TabStatus:'Details'
           }); 
        //    global.Governance='Edit'
     }
    render() {
    if(this.state.handleViewNote){
        return <Redirect push to={"/details/?" + this.state.AssetID +"&MyASSET=Y"}/>; 
    }
    if(this.state.redirectPage){
        return <Redirect push to={"/details/?" + this.state.AssetID +"&Governance=Y"}/>; 
    }
    if(this.state.redirectDetailPage){
        return <Redirect push to={"/details/?" + this.state.AssetID +"&MyASSET=Y"}/>; 
    }
    var AssetUnderReviewnew;
    var PendingRectificationnew;
    var AssetRejectednew;
    var AssetLivenew;

    AssetUnderReviewnew=this.state.AssetUnderReview;
    PendingRectificationnew=this.state.PendingRectification;
    AssetRejectednew=this.state.AssetRejected;
    AssetLivenew=this.state.AssetLive;

    var UnderReviewCnt;
    if(AssetUnderReviewnew.length>0){
        UnderReviewCnt="Pending Review ("+AssetUnderReviewnew.length+")";
    }else{
        UnderReviewCnt="Pending Review";
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

    var AssetLivenewCnt;
    if(AssetLivenew.length>0){
        AssetLivenewCnt="Live ("+AssetLivenew.length+")";
    }else{
        AssetLivenewCnt="Live";
    }





    return (
        <Row className="sectionCover" id="dataAssetShow">
           <Col  className="col-md-12 text-center"> <strong >{global.errorMsg}</strong></Col>
           <Col className="col-md-12">
                        <Tabs defaultActiveKey="UnderReview" id="uncontrolled-tab-example" className="mb-4">
                        
                                <Tab eventKey="UnderReview" title={UnderReviewCnt}>
                                {AssetUnderReviewnew.length>0 && <>
                                <table class="table table-bordered governance">
                                <thead>
                                          <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Asset ID</th>
                                            {/* <th style={{width:100}}>Scrm ID</th> */}
                                            <th>Asset CreatedBy</th>
                                            <th>Asset Owner</th>
                                            {/* <th>Asset Description</th> */}
                                            <th>Action</th>

                                          </tr>
                                        </thead>
                               

                                    {AssetUnderReviewnew.map((AssetUnderReview,index)=> 
                                        
                                        
                                        <tbody>
                                          <tr>
                                            <td><Image src={AssetUnderReview.ASSET_THUMBNAIL}   /></td>
                                            <td>{AssetUnderReview.ASSET_TITLE}</td>
                                            <td>{AssetUnderReview.ASSET_ID}</td>
                                            {/* <td>{AssetUnderReview.ASSET_SCRM_ID}</td> */}
                                            <td>{AssetUnderReview.ASSET_CREATEDBY}</td>
                                            <td style={{width:40}}>  {AssetUnderReview.ASSET_OWNER.split('\n').map((item, key) => {
                                                      return <span key={key}>{item}<br/></span>
                                                })}
                                            </td>
                                            {/* <td>{AssetUnderReview.ASSET_OWNER}</td> */}
                                          
                                            {/* <td>  <ReactMarkdown source={AssetUnderReview.ASSET_DESCRIPTION} /> </td> */}
                                            
                                            
                                            <>
                                            <td className="Notes hide " id={"NotesVal"+AssetUnderReview.ASSET_ID}> {AssetUnderReview.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>

                                             {ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}
                                             </>
                                            )}
                                            </td>
                                            
                                            <td class="review_tab"  onClick={this.handleView(AssetUnderReview.ASSET_ID)}>REVIEW</td>
                                            </>






                                            {/* <td class="review_tab" onClick={this.handleView(AssetUnderReview.ASSET_ID)}>REVIEW</td> */}

                                            

                                          </tr>
                                         
                                        </tbody>
                                        // <Col md={12} data-id={AssetUnderReview.ASSET_ID} className="mb-4 itemCard">
                                        //     <div class="clearfix bord-1"><Image src={AssetUnderReview.ASSET_THUMBNAIL} rounded  />
                                        //         <h5>{AssetUnderReview.ASSET_TITLE}</h5>
                                        //         <p>{AssetUnderReview.ASSET_DESCRIPTION}</p>
                                        //         <span class="status underReview">&#9679; {AssetUnderReview.ASSET_STATUS}</span>
                                        //         <div className="small mt-20"><Moment format="DD MMMM YYYY">{AssetUnderReview.ASSET_CREATED_DATE}</Moment></div>
                                        //     </div>
                                            
                                        // </Col>
                                    )}
                                  
                                    
                                    </table>  </>}{AssetUnderReviewnew.length<=0 && <p class="text-center">
                                        No Records Yet.
                                    </p>}

                               </Tab>   

                                <Tab eventKey="PendingRectification" title={PendingRectificationCnt}>
                                {PendingRectificationnew.length>0 && <>
                                <table class="table table-bordered governance">
                                <thead>
                                          <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Asset ID</th>
                                            {/* <th style={{width:100}}>Scrm ID</th> */}
                                            <th>Asset CreatedBy</th>
                                            <th>Asset Owner</th>
                                            {/* <th>Asset Description</th> */}
                                            <th>Action</th>

                                          </tr>
                                        </thead>
                               

                                    {PendingRectificationnew.map((PendingRectification,index)=> 
                                        
                                        
                                        <tbody>
                                          <tr>
                                            <td class=""><Image src={PendingRectification.ASSET_THUMBNAIL}   /></td>
                                            <td>{PendingRectification.ASSET_TITLE}</td>
                                            <td>{PendingRectification.ASSET_ID}</td>
                                            {/* <td>{PendingRectification.ASSET_SCRM_ID}</td> */}
                                            <td>{PendingRectification.ASSET_CREATEDBY}</td>
                                            <td>  {PendingRectification.ASSET_OWNER.split('\n').map((item, key) => {
                                                      return <span key={key}>{item}<br/></span>
                                                })}
                                            </td>
                                            {/* <td>{PendingRectification.ASSET_OWNER}</td> */}
                                            {/* <td><ReactMarkdown source={PendingRectification.ASSET_DESCRIPTION} /></td> */}
                                            {/* <td>{PendingRectification.ASSET_REVIEW_NOTE}</td> */}
                                            <>
                                            <td className="Notes hide" id={"NotesVal"+PendingRectification.ASSET_ID}> {PendingRectification.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>
                                                                                        {/* {ASSET_REVIEW_NOTE.length} */}

                                             {ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}
                                             </>
                                            )}
                                            </td>
                                            
                                            <td class="review_tab"  onClick={this.handleView(PendingRectification.ASSET_ID)}>REVIEW</td>
                                            </>
                                            
                                           

                                            

                                          </tr>
                                         
                                        </tbody>
                                        // <Col md={12} data-id={AssetUnderReview.ASSET_ID} className="mb-4 itemCard">
                                        //     <div class="clearfix bord-1"><Image src={AssetUnderReview.ASSET_THUMBNAIL} rounded  />
                                        //         <h5>{AssetUnderReview.ASSET_TITLE}</h5>
                                        //         <p>{AssetUnderReview.ASSET_DESCRIPTION}</p>
                                        //         <span class="status underReview">&#9679; {AssetUnderReview.ASSET_STATUS}</span>
                                        //         <div className="small mt-20"><Moment format="DD MMMM YYYY">{AssetUnderReview.ASSET_CREATED_DATE}</Moment></div>
                                        //     </div>
                                            
                                        // </Col>
                                    )}
                                  
                                    
                                    </table>  </>}{PendingRectificationnew.length<=0 && <p class="text-center">
                                        No Records Yet.
                                    </p>}

                               </Tab>   

                                <Tab eventKey="Live Assets" title={AssetLivenewCnt}>
                                {AssetLivenew.length>0 && <>
                                <table class="table table-bordered governance">
                                <thead>
                                          <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Asset ID</th>
                                            {/* <th style={{width:100}}>Scrm ID</th> */}
                                            <th>Asset CreatedBy</th>
                                            <th>Asset Owner</th>
                                            {/* <th>Asset Description</th> */}
                                            <th>Action</th>

                                          </tr>
                                        </thead>
                               

                                    {AssetLivenew.map((AssetLive,index)=> 
                                        
                                        
                                        <tbody>
                                          <tr>
                                            <td class=""><Image src={AssetLive.ASSET_THUMBNAIL}   /></td>
                                            <td>{AssetLive.ASSET_TITLE}</td>
                                            <td>{AssetLive.ASSET_ID}</td>
                                            {/* <td>{AssetLive.ASSET_SCRM_ID}</td> */}
                                            <td>{AssetLive.ASSET_CREATEDBY}</td>
                                            <td>  {AssetLive.ASSET_OWNER.split('\n').map((item, key) => {
                                                      return <span key={key}>{item}<br/></span>
                                                })}
                                            </td>
                                            {/* <td>{PendingRectification.ASSET_OWNER}</td> */}
                                            {/* <td><ReactMarkdown source={AssetLive.ASSET_DESCRIPTION} /></td> */}
                                            {/* <td>{PendingRectification.ASSET_REVIEW_NOTE}</td> */}
                                            <>
                                            <td className="Notes hide" id={"NotesVal"+AssetLive.ASSET_ID}> {AssetLive.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>
                                                                                        {/* {ASSET_REVIEW_NOTE.length} */}

                                             {ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}
                                             </>
                                            )}
                                            </td>
                                            <td class="review_tab"  onClick={this.handleView(AssetLive.ASSET_ID)}>REVIEW</td>
                                            {/* <td class="review_tab"  onClick={this.handleViewNote(AssetLive.ASSET_ID)}>VIEW</td> */}
                                            </>
                                            
                                           

                                            

                                          </tr>
                                         
                                        </tbody>
                                        // <Col md={12} data-id={AssetUnderReview.ASSET_ID} className="mb-4 itemCard">
                                        //     <div class="clearfix bord-1"><Image src={AssetUnderReview.ASSET_THUMBNAIL} rounded  />
                                        //         <h5>{AssetUnderReview.ASSET_TITLE}</h5>
                                        //         <p>{AssetUnderReview.ASSET_DESCRIPTION}</p>
                                        //         <span class="status underReview">&#9679; {AssetUnderReview.ASSET_STATUS}</span>
                                        //         <div className="small mt-20"><Moment format="DD MMMM YYYY">{AssetUnderReview.ASSET_CREATED_DATE}</Moment></div>
                                        //     </div>
                                            
                                        // </Col>
                                    )}
                                  
                                    
                                    </table>  </>}{PendingRectificationnew.length<=0 && <p class="text-center">
                                        No Records Yet.
                                    </p>}

                               </Tab>  
                               <Tab eventKey="Reject" title={AssetRejectednewCnt}>
                                {AssetRejectednew.length>0 && <>
                                <table class="table table-bordered governance">
                                <thead>
                                          <tr>
                                            <th></th>
                                            <th>Title</th>
                                            <th>Asset ID</th>
                                            {/* <th style={{width:100}}>Scrm ID</th> */}
                                            <th>Asset CreatedBy</th>
                                            <th>Asset Owner</th>
                                            {/* <th>Asset Description</th> */}
                                            <th>Action</th>

                                          </tr>
                                        </thead>
                               

                                    {AssetRejectednew.map((AssetRejected,index)=> 
                                        
                                        
                                        <tbody>
                                          <tr>
                                            <td class=""><Image src={AssetRejected.ASSET_THUMBNAIL}   /></td>
                                            <td>{AssetRejected.ASSET_TITLE}</td>
                                            <td>{AssetRejected.ASSET_ID}</td>
                                            {/* <td>{AssetRejected.ASSET_SCRM_ID}</td> */}
                                            <td>{AssetRejected.ASSET_CREATEDBY}</td>
                                            <td>  {AssetRejected.ASSET_OWNER.split('\n').map((item, key) => {
                                                      return <span key={key}>{item}<br/></span>
                                                })}
                                            </td>
                                            {/* <td>{AssetRejected.ASSET_OWNER}</td> */}
                                            {/* <td><ReactMarkdown source={AssetRejected.ASSET_DESCRIPTION} /></td> */}
                                            <>
                                            <td className="Notes hide" id={"NotesVal"+AssetRejected.ASSET_ID}> {AssetRejected.ASSET_REVIEW_NOTE.map(ASSET_REVIEW_NOTE => 
                                            <>
                                            {/* {ASSET_REVIEW_NOTE.length} */}
                                            {ASSET_REVIEW_NOTE.note +'Title' + ASSET_REVIEW_NOTE.section+'next'}
                                            </>
                                            )}
                                            </td>
                                            
                                            <td class="review_tab"  onClick={this.handleViewNote(AssetRejected.ASSET_ID)}>VIEW</td>
                                            </>
                                            
                                            {/* <td class="review_tab" onClick={this.handleDetails(AssetRejected.ASSET_ID)}>VIEW</td> */}

                                            

                                          </tr>
                                         
                                        </tbody>
                                        // <Col md={12} data-id={AssetUnderReview.ASSET_ID} className="mb-4 itemCard">
                                        //     <div class="clearfix bord-1"><Image src={AssetUnderReview.ASSET_THUMBNAIL} rounded  />
                                        //         <h5>{AssetUnderReview.ASSET_TITLE}</h5>
                                        //         <p>{AssetUnderReview.ASSET_DESCRIPTION}</p>
                                        //         <span class="status underReview">&#9679; {AssetUnderReview.ASSET_STATUS}</span>
                                        //         <div className="small mt-20"><Moment format="DD MMMM YYYY">{AssetUnderReview.ASSET_CREATED_DATE}</Moment></div>
                                        //     </div>
                                            
                                        // </Col>
                                    )}
                                  
                                    
                                    </table>  </>}{PendingRectificationnew.length<=0 && <p class="text-center">
                                        No Records Yet.
                                    </p>}

                               </Tab>  
                                                          
                              
                        </Tabs>
                </Col>              
             
        </Row>
    )
  }
}

export default ImageCard
