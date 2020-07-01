import React, { Component } from 'react';
import axios from 'axios';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Form  from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class AssetDetails extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        invalidUrl:'',
        Location:'',
        Pillar:'',
        LocationDropVal:'',
        PillarDropVal:''
      }
      componentDidMount() {
        if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
        {
        axios.get(global.Ip + global.Port + '/asset/allLocations',{
            headers: {
                "user_email":sessionStorage.getItem('user_email')     
    
            }
         })
          .then(res => {
            var pillarsDrop="";
            var LocationDrop="";
            // console.log(res.data.locations.length);
            // LocationDrop+="<option value=''>Select Team Location</option>";             

            for(var j=0;j<res.data.locations.length;j++){
                LocationDrop+="<option value='"+res.data.locations[j].HUB_NAME+"'>"+res.data.locations[j].HUB_NAME+"</option>";             
            }
            for(var i=0;i<res.data.pillars.length;i++){
                pillarsDrop+="<option value='"+res.data.pillars[i].PILLAR_NAME+"'>"+res.data.pillars[i].PILLAR_NAME+"</option>";             
            }
            this.setState({
                pillarsDropVal: pillarsDrop,
                LocationDropVal:LocationDrop
            })   
            // console.log(LocationDrop);
          });
            
        }
      }
      handleChange = (e) => {
       
        this.setState({
            [e.target.name]: e.target.value
        })   
    }

    onCreateClick = (e) => {
        // alert(this.state.Location +'-----'+this.state.Pillar);
            if(this.state.Location==""){
                alert('Please Fill Location');
                return false;
            }else if(this.state.Pillar==""){
                alert('Please Fill Pillar');
                return false;
            }else{
                var reqParms = {
                    "name": sessionStorage.getItem("user_name"),
                    "email":sessionStorage.getItem("user_email"),
                    "location":this.state.Location,
                    "pillar":this.state.Pillar  ,
                    "lob":'',
                    "phone":'',
                    "user_email":sessionStorage.getItem("user_email")
                   
                }
                axios.post(global.Ip + global.Port + '/user/save',reqParms,{ headers: {
                    "user_email": sessionStorage.getItem("user_email")             
        
                }})
                .then(res => {
                    // console.log(res.data);
                    if(res.data.role!=""){
                        alert(res.data.msg);
                        sessionStorage.setItem("role",res.data.role);
                        document.getElementById("firstTimeLogin").style.display = 'none';
                        window.location.href="";
                    }
                });
            }
         
    }

    //   handleClick(val,e) {
    //     var sortOnChange = this.props.onClick;

    // //    alert(val);
    //    global.selectedSortOption= val;

    //    sortOnChange(global.selectedSortOption);

	// }
  render() {
    //   alert(sessionStorage.getItem("role"));
     // console.log(this.state.LocationDropVal);
    // function  handleSort(val){
    //         // global.selectedcheckbox= "";
    //         alert(val);
    //         //console.log('test');
    //         // ListOnChange(global.selectedcheckbox);
    //         // var items=document.getElementsByName('filterData');
    //         //     for(var i=0; i<items.length; i++){
    //         //         if(items[i].type=='checkbox')
    //         //             items[i].checked=false;
    //         //     }
    //         sortOnChange(global.selectedcheckbox);

    //     }

        return (
            <>
                 <div id="firstTimeLogin" class="modal" role="dialog">
                <div class="modal-dialog" id="firstTimePop">
                    <div class="modal-content">
                        <div class="modal-header">                
                                <Row>
                                    <h5 class="col-md-12">Please Provide some details</h5>
                                    <Form.Group as={Col} md={12} >
                                       <Form.Label>Please Enter Location</Form.Label>
                                        
                                        <Form.Control as="select" multiple id="Location" name='Location' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.LocationDropVal }}> 
                                         </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col}  md={12} >
                                        <Form.Label>Please Enter Your Assiociated Pillar
                    </Form.Label>
                                        <Form.Control as="select" multiple id="Pillar" name='Pillar' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.pillarsDropVal }}> 
                                         </Form.Control>
                                    </Form.Group>
                                    {/* <Form.Group as={Col}  md={12} >
                                        <Form.Label>Upload Thumbnail</Form.Label>
                                            
                                            <input type="file"  encType="multipart/form-data" name="file" id="upload-cover-photo" onChange={e => this.UploadMediaFile(e)} /> 
                                    </Form.Group> */}
                                    <a variant="primary" className="btn text-center mb20 CreateAsset" onClick={(e) => this.onCreateClick(e)} type="submit">
                                        Submit
                                    </a>
                                  
                                </Row>
                                             
                        </div>
                    
                    </div>

                </div>
            </div>
            </>
               
        );
    }
  }
  
  export default AssetDetails;