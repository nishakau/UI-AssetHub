import React, { Component } from 'react'
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Moment from 'react-moment';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReactMarkdown from  'react-markdown';


import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
export class TabsPanel extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);

    }

    state = {
        Details: [],
        use_case:'',
        invalidUrl: '',
        ASSET_THUMBNAIL: '',
        index: 0,
        direction: null,
        Architechure: '',
        ArchitechureImg:'',
        hasArchitecture: false,
        Collateral: '',
        hasCollatrals: false,
        Asset_desc: '',
        getResponseId: '',
        DropdownTenancy: '',
        DropdownRegion: '',
        Compartmentdrop: '',
        Vcndrop: '',
        subnetdrop: '',
        subnetAddrop: '',
        shapeNamedrop: '',
        deploymentStatus: 'In Process',
        ReviewNoteOverviewVal: '',
        ReviewNoteArchitechureVal: '',
        ReviewNoteCollateralVal: '',
        class: 'hide',
        RedirectBack: '',
        Myclass: 'hide',
        AssetOwner: '',
        classArch: '',
        setSalesPlay: '',
        setSolutionArea: '',
        setIndustry: '',
        setAssetType: '',
        promoteStatus: "",
        opportunity: "",
        assettype: '',
        requestTitle: 'Request for Demo'

    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
    }

    componentDidMount() {
        // if(global.loginStatus==undefined){

        //     return <Redirect push to="/login" />; 
        // }
        // sessionStorage.setItem('user_email','deepika.r@oracle.com');
        var url = window.location.href;

        var ID = url.split('?');
        var idVal = ID[1].split('&');
        if (idVal[1] != "") {
            global.ID = idVal[0];

        }
        //   alert('1');
        axios.get(global.Ip + global.Port + '/asset/' + global.ID, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        })
            .then(res => {
                const Details = res.data;
                //  console.log(res.data.ASSET_ARCHITECTURE_DESCRIPTION);
                global.Details = Details;
                global.PromoteStatus = global.Details.PROMOTE;
                // console.log(global.Details);
                var type;
                for (var valuesol = 0; valuesol <= global.Details.FILTERMAP.length - 1; valuesol++) {
                    if (global.Details.FILTERMAP[valuesol].TYPE == 'Asset  Type') {
                        for (var p = 0; p <= global.Details.FILTERMAP[valuesol].arr.length - 1; p++) {
                            if (global.Details.FILTERMAP[valuesol].arr[p].FILTER_TYPE == "Asset  Type" && (global.Details.FILTERMAP[valuesol].arr[p].FILTER_ID == '170k5dr4xvz' || global.Details.FILTERMAP[valuesol].arr[p].FILTER_ID == 'dq7k9lprfox' || global.Details.FILTERMAP[valuesol].arr[p].FILTER_ID == 'dq7k9sdgroc')) {
                                // console.log(global.Details.FILTERMAP[valuesol].arr[p].FILTER_NAME);
                                this.setState({
                                    //assettypeId: global.Details.FILTERMAP[valuesol].arr[p].FILTER_ID,
                                    assettype: global.Details.FILTERMAP[valuesol].arr[p].FILTER_NAME,
                                    requestTitle: (global.Details.FILTERMAP[valuesol].arr[p].FILTER_ID == '170k5dr4xvz' ? 'Request for Demo' : 'SE Assistance')
                                })
                            }
                        }

                    }
                }
                // alert(global.PromoteStatus);
                var salesPlay = "";
                //  var indus="";
                var prop = 'Sales Initiatives';

                if (global.Details.hasOwnProperty(prop)) {
                    // console.log("SALES_PLAY: " + global.Details.SALES_PLAY.length);
                    // console.log(global.Details.SALES_PLAY);
                    if (global.Details.SALES_PLAY.length > 0) {
                        for (var s = 0; s <= global.Details.SALES_PLAY.length - 1; s++) {
                            salesPlay += global.Details.SALES_PLAY[s].FILTER_NAME;
                            if(global.Details.SALES_PLAY[s].SEC_FILTER_NAME!=undefined && global.Details.SALES_PLAY[s].SEC_FILTER_NAME!=null){
                                salesPlay += " - "+global.Details.SALES_PLAY[s].SEC_FILTER_NAME; 
                            }
                            salesPlay+="<br/>";
                        }
                        this.setState({
                            setSalesPlay: salesPlay
                        });
                    } else {
                        this.setState({
                            setSalesPlay: "NA"
                        });
                    }
                } else {
                    this.setState({
                        setSalesPlay: "NA"
                    });
                }
                var solArea = "";
                var prop = 'SOLUTION_AREAS';

                if (global.Details.hasOwnProperty(prop)) {
                    if (global.Details.SOLUTION_AREAS.length > 0) {
                        for (var s = 0; s <= global.Details.SOLUTION_AREAS.length - 1; s++) {
                            solArea += global.Details.SOLUTION_AREAS[s].FILTER_NAME;
                            if(global.Details.SOLUTION_AREAS[s].SEC_FILTER_NAME != undefined && global.Details.SOLUTION_AREAS[s].SEC_FILTER_NAME != null){
                                solArea+=" - "+global.Details.SOLUTION_AREAS[s].SEC_FILTER_NAME;
                            }
                            solArea+="<br/>";
                        }
                        this.setState({
                            setSolutionArea: solArea
                        });
                    } else {
                        this.setState({
                            setSolutionArea: "NA"
                        });
                    }
                } else {
                    this.setState({
                        setSolutionArea: "NA"
                    });
                }

                // this.setState({
                //     promoteStatus:"NA"
                // });  
                var indus = "";
                var prop = 'INDUSTRY';

                if (global.Details.hasOwnProperty(prop)) {
                    if (global.Details.INDUSTRY.length > 0) {
                        for (var s = 0; s <= global.Details.INDUSTRY.length - 1; s++) {
                            indus += global.Details.INDUSTRY[s].FILTER_NAME;
                            if(global.Details.INDUSTRY[s].SEC_FILTER_NAME !=undefined && global.Details.INDUSTRY[s].SEC_FILTER_NAME != null){
                                indus +=" - "+ global.Details.INDUSTRY[s].SEC_FILTER_NAME;
                            }
                            indus+="<br/>";
                        }
                        this.setState({
                            setIndustry: indus
                        });
                    } else {
                        this.setState({
                            setIndustry: "NA"
                        });
                    }
                } else {
                    this.setState({
                        setIndustry: "NA"
                    });

                }

                var aType = "";
                var prop = 'GROUP_TYPE';

                if (global.Details.hasOwnProperty(prop)) {
                    if (global.Details.GROUP_TYPE.length > 0) {
                        for (var s = 0; s <= global.Details.GROUP_TYPE.length - 1; s++) {
                            aType += global.Details.GROUP_TYPE[s].FILTER_NAME;
                            if(global.Details.GROUP_TYPE[s].SEC_FILTER_NAME !=undefined && global.Details.GROUP_TYPE[s].SEC_FILTER_NAME !=null){
                                aType += " - "+global.Details.GROUP_TYPE[s].SEC_FILTER_NAME;
                            }
                            aType +="<br/>";
                        }
                        this.setState({
                            setAssetType: aType
                        });
                    } else {
                        this.setState({
                            setAssetType: "NA"
                        });
                    }
                } else {
                    this.setState({
                        setAssetType: "NA"
                    });

                }






                if (res.data.ASSET_DESCRIPTION == null) {
                    var desc = 'No Desc Available';
                } else {
                    var desc = res.data.ASSET_DESCRIPTION;

                }
                // alert(1);
                if (res.data.ASSET_USERCASE == null) {
                    var useCase = 'No Use case Available';
                } else {
                    var useCase = res.data.ASSET_USERCASE;

                }
                if (res.data.ASSET_TYPE.length > 1) {
                    this.setState({
                        classArch: ""
                    });

                } else {
                    // alert(res.data.ASSET_TYPE.length);
                    if (res.data.ASSET_TYPE.length > 0) {
                        if (res.data.ASSET_TYPE[0].FILTER_NAME == "White Papers" || res.data.ASSET_TYPE[0].FILTER_NAME == "Proposal Templates") {
                            this.setState({
                                classArch: "hide"
                            });
                        }
                    }
                    else {
                        this.setState({
                            classArch: ""
                        });

                    }

                }

                var replaceSemicolonAsset = (res.data.ASSET_OWNER).replace(/,/g, '\n');


                this.setState({ Details });
                this.setState({ Asset_desc: desc, AssetOwner: replaceSemicolonAsset, use_case:useCase });
                if (this.state.Details.ASSET_VIDEO_LINK != "" && this.state.Details.ASSET_VIDEO_LINK != null) {
                    this.setState({ ASSET_THUMBNAIL: '<iframe id="kmsembed-0_39k6jvkd" width="608" height="402" src="' + this.state.Details.ASSET_VIDEO_LINK + '" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" ></iframe>' });
                } else {
                    this.setState({ ASSET_THUMBNAIL: '<img id="imageProp" src="' + this.state.Details.ASSET_THUMBNAIL + '">' });
                }
                var html = "";
                var htmlCollateral = "";


                var archStatus;

            // alert(res.data.IMAGES.length );
                if (res.data.IMAGES.length > 0) {
                    archStatus = true;
                    if (res.data.ASSET_ARCHITECTURE_DESCRIPTION == null) {
                        // var desc='No Desc Available';
                        html += 'No Desc Available';

                    } else {
                        // html+='<div class="pd10 ">No Desc Available</div>';

                        //  var desc=res.data.ASSET_DESCRIPTION;
                        html += res.data.ASSET_ARCHITECTURE_DESCRIPTION;

                    }
                    // html+='<div class="pd10 ">'+res.data.ASSET_DESCRIPTION+'</div>';
                    var htmlImg="";

                    for (var i = 0; i < res.data.IMAGES.length; i++) {

                        htmlImg += '<div class="col-md-12"><img id="imageProp" src="' + res.data.IMAGES[i]["IMAGEURL"] + '"/><hr/></div>';
                    }
                } 
                
                else {
                    archStatus = false;
                    html += '<p class="text-center col-md-12">No Data Found.</p>';
                }
                // console.log(res.data.LINKS);
                for (var j = 0; j < res.data.LINKS.length; j++) {
                    htmlCollateral += '<div class="list-group-item"><h6 class="Title collateralTitle">' + res.data.LINKS[j]["TYPE"] + ' (' + res.data.LINKS[j].arr.length + ')</h6>';


                    htmlCollateral += '<div class="row">';
                    var month_name = function (dt) {
                        var mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        return mlist[dt.getMonth()];
                    };




                    for (var k = 0; k < res.data.LINKS[j].arr.length; k++) {
                        if (res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"] == null) {
                            var desc = 'No Desc Available';
                        } else {
                            var desc = res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]
                        }
                        var split = res.data.ASSET_MODIFIED_DATE.split('T');
                        // console.log(res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"]);
                        var getdate = split[0].split('-');
                        var d = getdate[1] + '&nbsp;' + month_name(new Date(split[0]));
                        var statusId = res.data.LINKS[j].arr[k]["LINK_ID"] + "status";
                        var info = "";
                        if ((res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"] != "") && (res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"] != null)) {
                            info = '<span title="' + res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"] + '">&#x1f6c8;</span>';
                        }
                        var getPro = (res.data.LINKS[j].arr[k]["LINK_URL"]).split(':');
                        //    alert(getPro[0]);
                        var getProUrl;
                        if ((getPro[0] == 'http') || (getPro[0] == 'https')) {
                            getProUrl = '';
                        } else {
                            getProUrl = 'https://';
                        }
                        if (res.data.LINKS[j]["TYPE"] == 'CODE REPOSITORY' && res.data.LINKS[j].arr[k]["DEPLOY_STATUS"] == 1) {
                            document.getElementById('StatusDeploy').value = statusId;

                            //
                            // htmlCollateral+='<div class="pd-10 line-height"> &rarr;	<a href="'+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank">'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</a> <button variant="primary" class="text-center  deploy" data-toggle="modal" >Deploy to UCM</button></div>';
                            htmlCollateral += '<div class="col-md-4"><div class="card"><h1>' + res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"] + '</h1>' + info + '<p class="updatedDate hide deployStat" id=' + statusId + '></p><div class="bottomSec row"><div class="flex space-between"><span><a href="' + getProUrl + res.data.LINKS[j].arr[k]["LINK_URL"] + '" target="_blank"><button class="btn-primary btn-xs ">View</button></a></span><span><button id="deploy" class="btn-primary btn-xs deploy " data-instance=' + res.data.ASSET_OS + ' data-key=' + statusId + ' data-toggle="modal" >Deploy</button><span></div></div></div></div>';
                        } else {
                            // htmlCollateral+='<div class="pd-10 line-height"> &rarr;	<a href="'+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank">'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</a></div>';
                            htmlCollateral += '<div class="col-md-4"><div class="card"><h1>' + res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"] + '</h1>' + info + '<div class="bottomSec row"><div class="flex space-between"><span><a href="' + getProUrl + res.data.LINKS[j].arr[k]["LINK_URL"] + '" target="_blank"><button class="btn-primary btn-xs">View</button></a></span></div></div></div></div>';
                        }

                    }
                    htmlCollateral += '</div>';
                }


                this.setState({
                    hasCollatrals: res.data.LINKS.length > 0 ? true : false,
                    hasArchitecture: archStatus,
                    Architechure: html,
                    ArchitechureImg:htmlImg,
                    Collateral: htmlCollateral
                });

            })

        //   axios.get('http://132.145.141.18:3200/api/getOnlyActiveTenancies').then(res => {
        //         var tenancydrop="<option>Select Tenancy</option>";

        //             for(var i=0;i<=res.data.length-1;i++){
        //                 tenancydrop += '<option  value="'+res.data[i].tenancy_name+'">'+res.data[i].tenancy_name+'</option>';
        //             }
        //             this.setState({
        //                 DropdownTenancy:tenancydrop
        //             }); 
        //   });
        var url = window.location.href;

        var statusGov = url.split('&Governance=');
        //   alert(statusGov[1]);
        if (statusGov[1] == 'Y') {
            this.setState({
                class: 'col-md-6 pull-right right0'
                // socialClass:'hide'
            });
        }
        var MyAssetStat = url.split('&MyASSET=');
        if (MyAssetStat[1] == 'Y') {

            this.setState({
                class: 'hide',

               Myclass: 'col-md-8'

            });
        }
    }
    RequestDemo = (val) => {
        // alert('test');
        document.getElementById("requestdemo").style.display = 'block';

    }
    ApproveAsset = (val) => {
        //     alert('test'+val);
        //  alert(this.state.ReviewNoteOverviewVal);
        //  var url = window.location.href;

        //   var ID=url.split('?');
        //   var idVal=ID[1].split('&');
        var objJson = [];
        if ((this.state.ReviewNoteOverviewVal != "")) {
            var splitter = this.state.ReviewNoteOverviewVal.split('seprator');
            //var SelectedTabForSection='Approve';
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);

        } if ((this.state.ReviewNoteArchitechureVal != "")) {
            var splitter = this.state.ReviewNoteArchitechureVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);
        }
        if ((this.state.ReviewNoteCollateralVal != "")) {
            var splitter = this.state.ReviewNoteCollateralVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);
        }
        if (this.state.ReviewNoteOverviewVal != "" || this.state.ReviewNoteArchitechureVal != "" || this.state.ReviewNoteCollateralVal != "") {
            var reqParm = {
                "review_note": objJson, "assetId": global.ID,
                "asset_status": "Live",
                "user_email": sessionStorage.getItem("user_email")


            };
            axios.post(global.Ip + global.Port + '/governance/postreviewnote', reqParm, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            }).then(res => {
                //console.log(res.data);
                alert(res.data.status);
                this.setState({
                    RedirectBack: 'true'
                });
            });

        } else {
            alert('Please enter any of review note');
        }
    }
    RectifyAsset = (val) => {
        //     alert('test'+val);
        //  alert(this.state.ReviewNoteOverviewVal);
        var objJson = [];
        if ((this.state.ReviewNoteOverviewVal != "")) {
            var splitter = this.state.ReviewNoteOverviewVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);

        } if ((this.state.ReviewNoteArchitechureVal != "")) {
            var splitter = this.state.ReviewNoteArchitechureVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);
        }
        if ((this.state.ReviewNoteCollateralVal != "")) {
            var splitter = this.state.ReviewNoteCollateralVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);
        }
        if (this.state.ReviewNoteOverviewVal != "" || this.state.ReviewNoteArchitechureVal != "" || this.state.ReviewNoteCollateralVal != "") {
            var reqParm = {
                "review_note": objJson, "assetId": global.ID,
                "asset_status": "Pending Rectification",
                "user_email": sessionStorage.getItem("user_email")

            };
            axios.post(global.Ip + global.Port + '/governance/postreviewnote', reqParm, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            }).then(res => {
                //console.log(res.data);
                alert(res.data.status);
                this.setState({
                    RedirectBack: 'true'
                });
            });

        } else {
            alert('Please enter any of review note');
        }
    }

    RejectAsset = (val) => {
        //     alert('test'+val);
        //  alert(this.state.ReviewNoteOverviewVal);
        var objJson = [];
        if ((this.state.ReviewNoteOverviewVal != "")) {
            var splitter = this.state.ReviewNoteOverviewVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);

        } if ((this.state.ReviewNoteArchitechureVal != "")) {
            var splitter = this.state.ReviewNoteArchitechureVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);
        }
        if ((this.state.ReviewNoteCollateralVal != "")) {
            var splitter = this.state.ReviewNoteCollateralVal.split('seprator');
            var data = {
                "section": splitter[0],
                "note": splitter[1]
            }


            objJson.push(data);
        }
        if (this.state.ReviewNoteOverviewVal != "" || this.state.ReviewNoteArchitechureVal != "" || this.state.ReviewNoteCollateralVal != "") {
            var reqParm = {
                "review_note": objJson, "assetId": global.ID,
                "asset_status": "Reject",
                "user_email": sessionStorage.getItem("user_email")

            };
            axios.post(global.Ip + global.Port + '/governance/postreviewnote', reqParm, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            }).then(res => {
                //console.log(res.data);
                alert(res.data.status);
                this.setState({
                    RedirectBack: 'true'
                });
            });

        } else {
            alert('Please enter any of review note');
        }
        //console.log(objJson);




    }
    checkStatus = (e, id) => {

        axios.get('http://132.145.141.18:3200/api/GetDeploymentStatus?id=' + id)
            .then(res => {
                // alert('Current status is &nbsp;'+res.data.status);
                document.getElementById('status').innerHTML = res.data.status;
                // console.log(res.data.status);
                // this.setState({
                //     deploymentStatus:res.data.status
                // }); 
                // alert(res.msg);


            });


    }
    // componentDidMount(){
    //     console.log(global.Governance);
    //     var url = window.location.href;

    //     var statusGov=url.split('&Governance=');

    //     if(statusGov[1]=='Edit'){
    //         this.setState({
    //             class:'col-md-8'
    //           });
    //     }
    //   }
    //   handleChangeAd= (e) => {
    //     var subnetdrop="<option>Select Subnet</option>"; 
    //     var Vcn= document.getElementById('VCN').value;
    //     var VCNIdCheck=Vcn.split('name');
    //     var VcnIdVal=VCNIdCheck[0];
    //     var Ad= document.getElementById('AD').value;
    //      if(VcnIdVal!="" && Ad!=""){
    //         let Subnet_array=[];
    //         let Subnet_name_array=[];
    //          for(var i=0;i<= global.dataResponse.length-1;i++){
    //              if((VcnIdVal==global.dataResponse[i].vcn_ocid) && (Ad==global.dataResponse[i].sub_ad)){
    //                 Subnet_array.push(global.dataResponse[i].subnet_ocid);
    //                 Subnet_name_array.push(global.dataResponse[i].subnet_name);

    //              }
    //         }
    //         var arrloopedSubnet=removeDuplicates(Subnet_array);
    //         var arrloopedSubnetname=removeDuplicates(Subnet_name_array);
    //         for(var j=0;j<=arrloopedSubnet.length-1;j++){
    //           subnetdrop += '<option value="'+arrloopedSubnet[j]+'name'+arrloopedSubnetname[j]+'">'+arrloopedSubnetname[j]+'</option>';
    //         }
    //       this.setState({
    //         subnetdrop:subnetdrop
    //       }); 
    //      }
    //      function removeDuplicates(arr){
    //          let unique_array = []
    //          for(let i = 0;i < arr.length; i++){
    //              if(unique_array.indexOf(arr[i]) == -1){
    //                  unique_array.push(arr[i])
    //              }
    //          }
    //          return unique_array
    //      }
    //    }
    PromoteAsset = (e) => {
        //   if(document.getElementById("togBtn").checked){
        //     //   alert("checked");


        //       var val=1;
        //   }else{

        //       alert("not checked");
        //       var val=0;
        //   }
        var reqParm = {
            "assetId": global.ID,
            //   "asset_promote_status":val,
            "lob_leader_email": sessionStorage.getItem("user_email"),
            "type": 'asset',
            "lob_leader_lob": sessionStorage.getItem("LOB")
        };

        axios.post(global.Ip + global.Port + '/admin/promote', reqParm, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")
            }
        }).then(res => {
            //console.log(res.data);
            //  alert(res.data.status);
            //  sessionStorage.setItem('leaderStatus',"true");



            var url = window.location.href;

            var ID = url.split('?');
            var idVal = ID[1].split('&');
            if (idVal[1] != "") {
                global.ID = idVal[0];

            }
            //   alert('1');
            axios.get(global.Ip + global.Port + '/asset/' + global.ID, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")


                }
            })
                .then(res => {
                    const Details = res.data;
                    //  console.log(res.data.ASSET_ARCHITECTURE_DESCRIPTION);
                    global.Details = Details;
                    global.PromoteStatus = global.Details.PROMOTE;
                    var salesPlay = "";

                    //  var indus="";
                    var prop = 'SALES_PLAY';

                    if (global.Details.hasOwnProperty(prop)) {
                        // alert(global.Details1.SALES_PLAY.length);
                        // console.log(global.Details1.SALES_PLAY);
                        if (global.Details.SALES_PLAY.length > 0) {
                            for (var s = 0; s <= global.Details.SALES_PLAY.length - 1; s++) {
                                salesPlay += global.Details.SALES_PLAY[s].FILTER_NAME + "<br/>";
                            }
                            this.setState({
                                setSalesPlay: salesPlay
                            });
                        } else {
                            this.setState({
                                setSalesPlay: "NA"
                            });
                        }
                    } else {
                        this.setState({
                            setSalesPlay: "NA"
                        });
                    }
                    var solArea = "";
                    var prop = 'SOLUTION_AREAS';

                    if (global.Details.hasOwnProperty(prop)) {
                        if (global.Details.SOLUTION_AREAS.length > 0) {
                            for (var s = 0; s <= global.Details.SOLUTION_AREAS.length - 1; s++) {
                                solArea += global.Details.SOLUTION_AREAS[s].FILTER_NAME;
                                if(global.Details.SOLUTION_AREAS[s].SEC_FILTER_NAME!= undefined && global.Details.SOLUTION_AREAS[s].SEC_FILTER_NAME!=null){
                                    solArea += " - "+global.Details.SOLUTION_AREAS[s].SEC_FILTER_NAME;
                                }
                                solArea +="<br/>";
                            }
                            this.setState({
                                setSolutionArea: solArea
                            });
                        } else {
                            this.setState({
                                setSolutionArea: "NA"
                            });
                        }
                    } else {
                        this.setState({
                            setSolutionArea: "NA"
                        });
                    }

                    // this.setState({
                    //     promoteStatus:"NA"
                    // });  
                    var indus = "";
                    var prop = 'INDUSTRY';

                    if (global.Details.hasOwnProperty(prop)) {
                        if (global.Details.INDUSTRY.length > 0) {
                            for (var s = 0; s <= global.Details.INDUSTRY.length - 1; s++) {
                                indus += global.Details.INDUSTRY[s].FILTER_NAME + "<br/>";
                                if(global.Details.INDUSTRY[s].SEC_FILTER_NAME !=undefined && global.Details.INDUSTRY[s].SEC_FILTER_NAME !=null){
                                    indus +=" - "+ global.Details.INDUSTRY[s].SEC_FILTER_NAME;
                                }
                                indus+="<br/>";
                            }
                            this.setState({
                                setIndustry: indus
                            });
                        } else {
                            this.setState({
                                setIndustry: "NA"
                            });
                        }
                    } else {
                        this.setState({
                            setIndustry: "NA"
                        });

                    }
                    var aType = "";
                    var prop = 'GROUP_TYPE';

                    if (global.Details.hasOwnProperty(prop)) {
                        if (global.Details.GROUP_TYPE.length > 0) {
                            for (var s = 0; s <= global.Details.GROUP_TYPE.length - 1; s++) {
                                aType += global.Details.GROUP_TYPE[s].FILTER_NAME;
                                if(global.Details.GROUP_TYPE[s].SEC_FILTER_NAME != undefined && global.Details.GROUP_TYPE[s].SEC_FILTER_NAME != null){
                                    aType += " - "+global.Details.GROUP_TYPE[s].SEC_FILTER_NAME;
                                }
                                aType +="<br/>";
                            }
                            this.setState({
                                setAssetType: aType
                            });
                        } else {
                            this.setState({
                                setAssetType: "NA"
                            });
                        }
                    } else {
                        this.setState({
                            setAssetType: "NA"
                        });

                    }
                    if (res.data.ASSET_DESCRIPTION == null) {
                        var desc = 'No Desc Available';
                    } else {
                        var desc = res.data.ASSET_DESCRIPTION;

// alert(desc);

                    }
                    if (res.data.ASSET_USERCASE == null) {
                        var useCase = 'No Use case Available';
                    } else {
                        var useCase = res.data.ASSET_USERCASE;

                    }
// console.log(useCase);



                    if (res.data.ASSET_TYPE.length > 1) {
                        this.setState({
                            classArch: ""
                        });

                    } else {
                        // alert(res.data.ASSET_TYPE.length);
                        if (res.data.ASSET_TYPE.length > 0) {
                            if (res.data.ASSET_TYPE[0].FILTER_NAME == "White Papers" || res.data.ASSET_TYPE[0].FILTER_NAME == "Proposal Templates") {
                                this.setState({
                                    classArch: "hide"
                                });
                            }
                        }
                        else {
                            this.setState({
                                classArch: ""
                            });

                        }

                    }

                    var replaceSemicolonAsset = (res.data.ASSET_OWNER).replace(/,/g, '\n');


                    this.setState({ Details });
                    this.setState({ Asset_desc: desc, AssetOwner: replaceSemicolonAsset , use_case:useCase});
                    if (this.state.Details.ASSET_VIDEO_LINK != "" && this.state.Details.ASSET_VIDEO_LINK != null) {
                        this.setState({ ASSET_THUMBNAIL: '<iframe id="kmsembed-0_39k6jvkd" width="608" height="402" src="' + this.state.Details.ASSET_VIDEO_LINK + '" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" ></iframe>' });
                    } else {
                        this.setState({ ASSET_THUMBNAIL: '<img id="imageProp" src="' + this.state.Details.ASSET_THUMBNAIL + '">' });
                    }
                    var html = "";
                    var htmlCollateral = "";
                    var archStatus;
                    if (res.data.IMAGES.length > 0) {
                        archStatus = true;
                       // alert(res.data.ASSET_ARCHITECTURE_DESCRIPTION);
                        if (res.data.ASSET_ARCHITECTURE_DESCRIPTION == null) {
                            html += 'No Desc Available';

                        } else {
                            html += res.data.ASSET_ARCHITECTURE_DESCRIPTION;

                        }
                        // html+='<div class="pd10 ">'+res.data.ASSET_DESCRIPTION+'</div>';


                        for (var i = 0; i < res.data.IMAGES.length; i++) {

                            html += '<div class="col-md-12"><img id="imageProp" src="' + res.data.IMAGES[i]["IMAGEURL"] + '"/><hr/></div>';
                        }
                    } else {
                        archStatus = false;
                        html += 'No Data Found.';
                    }
                    // console.log(res.data.LINKS);
                    for (var j = 0; j < res.data.LINKS.length; j++) {
                        htmlCollateral += '<div class="list-group-item"><h6 class="Title collateralTitle">' + res.data.LINKS[j]["TYPE"] + ' (' + res.data.LINKS[j].arr.length + ')</h6>';


                        htmlCollateral += '<div class="row">';
                        var month_name = function (dt) {
                            var mlist = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                            return mlist[dt.getMonth()];
                        };




                        for (var k = 0; k < res.data.LINKS[j].arr.length; k++) {
                            if (res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"] == null) {
                                var desc = 'No Desc Available';
                            } else {
                                var desc = res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]
                            }
                            var split = res.data.ASSET_MODIFIED_DATE.split('T');
                            // console.log(res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"]);
                            var getdate = split[0].split('-');
                            var d = getdate[1] + '&nbsp;' + month_name(new Date(split[0]));
                            var statusId = res.data.LINKS[j].arr[k]["LINK_ID"] + "status";
                            var info = "";
                            if ((res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"] != "") && (res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"] != null)) {
                                info = '<span title="' + res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"] + '">&#x1f6c8;</span>';
                            }
                            var getPro = (res.data.LINKS[j].arr[k]["LINK_URL"]).split(':');
                            //    alert(getPro[0]);
                            var getProUrl;
                            if ((getPro[0] == 'http') || (getPro[0] == 'https')) {
                                getProUrl = '';
                            } else {
                                getProUrl = 'https://';
                            }
                            if (res.data.LINKS[j]["TYPE"] == 'CODE REPOSITORY' && res.data.LINKS[j].arr[k]["DEPLOY_STATUS"] == 1) {
                                document.getElementById('StatusDeploy').value = statusId;

                                //
                                // htmlCollateral+='<div class="pd-10 line-height"> &rarr;	<a href="'+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank">'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</a> <button variant="primary" class="text-center  deploy" data-toggle="modal" >Deploy to UCM</button></div>';
                                htmlCollateral += '<div class="col-md-4"><div class="card"><h1>' + res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"] + '</h1>' + info + '<p class="updatedDate hide deployStat" id=' + statusId + '></p><div class="bottomSec row"><div class="flex space-between"><span><a href="' + getProUrl + res.data.LINKS[j].arr[k]["LINK_URL"] + '" target="_blank"><button class="btn-primary btn-xs ">View</button></a></span><span><button id="deploy" class="btn-primary btn-xs deploy " data-instance=' + res.data.ASSET_OS + ' data-key=' + statusId + ' data-toggle="modal" >Deploy</button><span></div></div></div></div>';
                            } else {
                                // htmlCollateral+='<div class="pd-10 line-height"> &rarr;	<a href="'+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank">'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</a></div>';
                                htmlCollateral += '<div class="col-md-4"><div class="card"><h1>' + res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"] + '</h1>' + info + '<div class="bottomSec row"><div class="flex space-between"><span><a href="' + getProUrl + res.data.LINKS[j].arr[k]["LINK_URL"] + '" target="_blank"><button class="btn-primary btn-xs">View</button></a></span></div></div></div></div>';
                            }

                        }
                        htmlCollateral += '</div>';
                    }


                    this.setState({
                        hasCollatrals: res.data.LINKS.length > 0 ? true : false,
                        hasArchitecture: archStatus,
                        Architechure: html,
                        Collateral: htmlCollateral
                    });

                })

            // axios.get('http://132.145.141.18:3200/api/getOnlyActiveTenancies').then(res => {
            //       var tenancydrop="<option>Select Tenancy</option>";

            //           for(var i=0;i<=res.data.length-1;i++){
            //               tenancydrop += '<option  value="'+res.data[i].tenancy_name+'">'+res.data[i].tenancy_name+'</option>';
            //           }
            //           this.setState({
            //               DropdownTenancy:tenancydrop
            //           }); 
            // });
            var url = window.location.href;

            var statusGov = url.split('&Governance=');
            //   alert(statusGov[1]);
            if (statusGov[1] == 'Y') {
                this.setState({
                    class: 'col-md-6 pull-right right0',
                    // socialClass:'hide'
                });
            }
            var MyAssetStat = url.split('&MyASSET=');
            // alert(MyAssetStat[1]);
            if (MyAssetStat[1] == 'Y') {

                this.setState({
                    Myclass: 'col-md-8',
                    class:"hide"

                });
            }






            //  this.setState({
            //     // RedirectBack:'true'
            // });
        }
        ).catch(error => {
            alert(error)
        });

    }

    //   handleChangeCmptmnt = (e) => {
    //    var Vcndrop="<option>Select VCN</option>";
    //    var Region= document.getElementById('Region').value;
    //    var Compartment= document.getElementById('Compartment').value;
    //     if(Region!="" && Compartment!=""){
    //         let Vcn_array =[]; let Vcn_name_array=[];
    //         for(var i=0;i<= global.dataResponse.length-1;i++){
    //             if((Region==global.dataResponse[i].region)){
    //                 Vcn_array.push(global.dataResponse[i].vcn_ocid);
    //                 Vcn_name_array.push(global.dataResponse[i].vcn_name);
    //             }

    //        }
    //        var arrloopedVcn=removeDuplicates(Vcn_array);
    //        var arrloopedVcnName=removeDuplicates(Vcn_name_array);
    //        for(var j=0;j<=arrloopedVcn.length-1;j++){

    //         Vcndrop += '<option value="'+arrloopedVcn[j]+'name'+arrloopedVcnName[j]+'">'+arrloopedVcnName[j]+'</option>';
    //      }
    //      this.setState({
    //          Vcndrop:Vcndrop
    //      }); 
    //     }
    //     function removeDuplicates(arr){
    //         let unique_array = []
    //         for(let i = 0;i < arr.length; i++){
    //             if(unique_array.indexOf(arr[i]) == -1){
    //                 unique_array.push(arr[i])
    //             }
    //         }
    //         return unique_array
    //     }
    //   }
    handleKeyNoteChange = (e, val) => {
        //  alert('test'+val);
        this.setState({
            [e.target.name]: val + 'seprator' + e.target.value
        })


    }
    //       handleChange = (e) => {

    //         var tenancySelected = document.getElementById("Tenancy").value;



    //         axios.get('http://132.145.141.18:3200/api/getmporderformDataByTenancy?id='+tenancySelected)
    //         .then(res => {
    //                  global.dataResponse=res.data;
    //                  console.log(global.dataResponse);
    //                  var regiondrop="<option>Select Region</option>";var Compartmentdrop="<option>Select Compartment</option>";  var Addrop="<option>Select Ad</option>"; var shapeNamedrop="<option>Select Shape</option>";
    //                  let region_array = [];
    //                  let compartment_array = [];
    //                  let compartment_name_array = [];
    //                  let Ad_array =[];
    //                 //  let Subnet_array=[];
    //                  for(var i=0;i<=res.data.length-1;i++){
    //                         region_array.push(res.data[i].region);
    //                         compartment_array.push(res.data[i].compartment_ocid);
    //                         compartment_name_array.push(res.data[i].compartment_name);
    //                         Ad_array.push(res.data[i].sub_ad);
    //                    }
    //                     var arrlooped=removeDuplicates(region_array);
    //                      for(var j=0;j<=arrlooped.length-1;j++){
    //                         regiondrop += '<option value="'+arrlooped[j]+'">'+arrlooped[j]+'</option>';
    //                      }
    //                      var arrloopedCompartment=removeDuplicates(compartment_array);
    //                      var arrloopedCompartmentname=removeDuplicates(compartment_name_array);
    //                      for(var j=0;j<=arrloopedCompartment.length-1;j++){
    //                         Compartmentdrop += '<option value="'+arrloopedCompartment[j]+'name'+arrloopedCompartmentname[j]+'" >'+arrloopedCompartmentname[j]+'</option>';
    //                      }
    //                     var arrloopedAd=removeDuplicates(Ad_array);
    //                      for(var j=0;j<=arrloopedAd.length-1;j++){
    //                         Addrop += '<option value="'+arrloopedAd[j]+'">'+arrloopedAd[j]+'</option>';
    //                      }

    //                      this.setState({
    //                         DropdownRegion:regiondrop,
    //                         Compartmentdrop:Compartmentdrop,
    //                         subnetAddrop:Addrop
    //                     }); 
    //         }); 

    //         function removeDuplicates(arr){
    //             let unique_array = []
    //             for(let i = 0;i < arr.length; i++){
    //                 if(unique_array.indexOf(arr[i]) == -1){
    //                     unique_array.push(arr[i])
    //                 }
    //             }
    //             return unique_array
    //         }

    // }
    // cleanText = text => {
    //     e.target.value
    //     var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    //     if (format.test(text)) {
    //       this.showAlert("Special characters are not allowed!")
    //     }
    //     text = text.replace(/[^A-Za-z0-9]/g, "");
    // document.getElementById("ReqOpp").value= text };


    handleChangeRequ = (e) => {
        var text = e.target.value;
        var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        if (format.test(text)) {
            alert("Special characters are not allowed!");
            //   return false;
        }
        text = text.replace(/[^A-Za-z0-9]/g, "");
        // alert(text);
        document.getElementById("ReqOpp").value = text // this.setState({
        //     [e.target.name]: e.target.value
        // }) 
        // if(e.target.name=="createdDate"){

        // }
        // alert(this.state.createdDate) ; 
    }
    render() {
        if (this.state.RedirectBack == 'true') {
            return <Redirect push to="/Governance" />;
        }

        function closePop() {
            document.getElementById("myModal").style.display = 'none';
            document.getElementById('DeployUCM').style.display = 'block';
            document.getElementById('Deploystatus').classList.add('hide');
            document.getElementById("requestdemo").style.display = 'none';
            document.getElementById('requestForDemoStatus').classList.add = 'hide';


        }
        function RequestPop() {
            // alert('1');
            if (document.getElementById('ReqOpp').value != "") {
                var customeName = document.getElementById('ReqCustomer').value;
                var OpptId = document.getElementById('ReqOpp').value;
                var todayDate = new Date().toISOString().slice(0, 10);
                var d1 = new Date(todayDate);
                var d2 = new Date(document.getElementById('Reqdd').value);
                if (d2.getTime() < d1.getTime()) {
                    alert("Requested demo date should be greater than or equal to today's date");
                    return false;
                } else {
                    //  alert('date is fine.'); 
                }

                // alert(d1.getTime());


                // alert(document.getElementById('Reqdd').value);
                // if((document.getElementById('Reqdd').value).getTime())>=(todayDate.getTime()){

                // }
                // return false;
                var DemoDate = document.getElementById('Reqdd').value;
                var demonote = document.getElementById('ReqDemoNote').value;


                axios.post(global.Ip + global.Port + '/user/requestdemo', {
                    "assetid": global.ID,
                    "email": sessionStorage.getItem('user_email'),
                    "name": sessionStorage.getItem('user_name'),
                    "mobile": sessionStorage.getItem('phone'),
                    "location": sessionStorage.getItem('location'),
                    "request_demo_date": DemoDate,
                    "request_opportunity_id": OpptId,
                    "request_demo_note": demonote,
                    "request_demo_customer_name": customeName,
                    "asset_name": "",
                    "asset_owner": "",
                    "pillar": sessionStorage.getItem('pillar'),
                    "user_email": sessionStorage.getItem("user_email")
                }, {
                    headers: {
                        "user_email": sessionStorage.getItem("user_email")

                    }
                }).then(res => {
                    // console.log(res);
                    if (res.data.status == "success") {
                        alert(res.data.msg);
                        // document.getElementById("requestdemo").style.display = 'none';

                        document.getElementById('requestdemoPopup').classList.add('hide');

                        document.getElementById('requestForDemoStatus').classList.remove('hide');
                        return false;
                    }

                })
            } else {
                alert('Please enter OpportunityId');
                document.getElementById('ReqOpp').focus();
                return false;
            }
        }
        //     function deployPop(){
        //        var Tenancy=document.getElementById('Tenancy').value;
        //        var Region=document.getElementById('Region').value;
        //        var Compartment=document.getElementById('Compartment').value;
        //        var compartmentsplit=Compartment.split('name');
        //        var cmptId=compartmentsplit[0];
        //        var Cmptname=compartmentsplit[1]
        //        var VCN=document.getElementById('VCN').value;
        //        var VCNsplit=VCN.split('name');
        //        var VCNId=VCNsplit[0];
        //        var VCNname=VCNsplit[1];
        //        var Ad=document.getElementById('AD').value;
        //        var Subnet=document.getElementById('Subnet').value;
        //        var Subnetsplit=Subnet.split('name');
        //        var SubnetId=Subnetsplit[0];
        //        var subnetname=Subnetsplit[1];
        //     //    var Shape=document.getElementById('Subnet').value;
        //         if(Tenancy=="Select Tenancy"){
        //           alert('Please select Tenancy');  
        //           return false;
        //         }else if(Region=="Select Region"){
        //             alert('Please select Region');  
        //             return false;
        //         }else if(Compartment=="Select Compartment"){
        //             alert('Please select Compartment');  
        //             return false;
        //         }else if(VCN=="Select VCN"){
        //             alert('Please select VCN');  
        //             return false;
        //         }else if(Ad=="Select Ad"){
        //             alert('Please select Ad');  
        //             return false;
        //         }else if(Subnet=="Select Subnet"){
        //             alert('Please select Subnet');  
        //             return false;
        //         }else{


        //         document.getElementById('loader').classList.remove('hide');
        //         document.getElementById('deploytoServer').classList.add('hide');
        //         document.getElementById('btnDeploy').classList.add('hide');


        //         // var Tenancy=document.getElementById('Tenancy').value;
        //         // var Region=document.getElementById('Region').value;
        //         // var Compartment=document.getElementById('Compartment').value;
        //         // var VCN=document.getElementById('VCN').value;

        //         var AD= document.getElementById('AD').value;
        //         var AdVal=AD.split('AD-');
        //         // var Subnet=document.getElementById('Subnet').value;
        //         var Shape=document.getElementById('Shape').value;

        //         // axios.get('http://132.145.141.18:3200/api/getmporderformDataByTenancy?id='+Tenancy)
        //         // .then(res => {

        //         // alert(global.dataResponse[0].tenancy_ocid);



        //         var reqParms = {
        //             "tenancy_name": Tenancy,
        //             "TenancyId":global.dataResponse[0].tenancy_ocid,
        //             "region": Region,
        //             "compartment_name": Cmptname,
        //             "cmptId": cmptId,
        //             "vcn_name": VCNname,
        //             "vcnId":VCNId,
        //             "instance": global.instanceValue,
        //             "AD": parseInt(AdVal[1]),
        //             "subnet_name":subnetname,
        //             "subnetId": SubnetId,
        //             "shape":Shape,
        //             "owner_chargeback": "string",
        //             "owner_team": "string",
        //             "owner_type": 'string',
        //             "owner_uptime": 'string'
        //         }


        //         axios.post('http://132.145.141.18:3200/api/Initializescripts',reqParms)
        //         .then(resAPI => {
        //             if(resAPI.data.msg!=""){
        //                 global.instanceId=resAPI.data.msg;
        //                 document.getElementById('loader').classList.add('hide');
        //                 document.getElementById('btnDeploy').classList.remove('hide');
        //                 document.getElementById('deploytoServer').classList.remove('hide');
        //                 global.tenancy_name=Tenancy;
        //                 global.idInstance=resAPI.data.msg;
        //                 document.getElementById('tenancycreatedId').innerHTML=global.tenancy_name +'';
        //                     // document.getElementById('deployStatusVal').classlist.remove('hide');  

        //                 document.getElementById('DeployUCM').style.display='none';  
        //                 document.getElementById('Deploystatus').classList.remove('hide');
        //                 var StatusIdVal=  document.getElementById('StatusDeploy').value;
        //                 document.getElementById(StatusIdVal).classList.remove('hide');
        //                  Tenancy="";
        //                  Region="";
        //                  Compartment=""
        //                  VCN="";
        //                  Ad="";
        //                  Subnet="";

        //             }else{
        //                 alert('There is some trouble in deployment. Sorry for inconvenience caused.');
        //                 return false;
        //             }
        //         }).catch((error) => {
        //             if (error.response) {
        //                 alert('There is some trouble in deployment. Sorry for inconvenience caused.');
        //                 return false;

        //               }
        //           });
        //   //  });
        // }
        //     }
        setTimeout(function () {
            var classname = document.getElementsByClassName("deploy");
            // var classrefresh = document.getElementsByClassName("refresh");
            var openDialogBoxUi = function () {
                var instanceValue = this.getAttribute('data-instance');
                //    alert(instanceValue);
                global.instanceValue = instanceValue;
                document.getElementById("myModal").style.display = 'block';

            };
            // var refreshFunc =function(){
            //     // var dataId= this.getAttribute('data-id');
            //     // // var dataSplit=dataId.split('status');
            //     // // var id=dataSplit[0];
            //     // axios.post('http://132.145.141.18:3200/api/GetDeploymentStatus?id='+dataId)
            //     // .then(res => {
            //     //     console.log(res);
            //     // })


            // }
            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', openDialogBoxUi, false);
            }
            // for (var i = 0; i < classrefresh.length; i++) {
            //     classname[i].addEventListener('click', refreshFunc, false);
            // }
        }, 3000);
        var todayDate = new Date().toISOString().slice(0, 10);

        // sessionStorage.setItem('user_email','deepika.r@oracle.com');
        // sessionStorage.setItem('user_name','deepika');
        // alert(global.MessagingTab);

        return (
            <div>
                <h5 class="mt-20 row"><span class="col-md-6" >{this.state.Details.ASSET_TITLE}</span>
                    {sessionStorage.getItem('leader') == "true" &&
                        <span class="col-md-3 marg-5 text-right"> <small>Promote:{global.PromoteStatus}</small> &nbsp;<label class="switch">
                            <input type="checkbox" id="togBtn" value="false" name="disablePromote" checked={global.PromoteStatus == true ? "checked" : ""} onChange={e => this.PromoteAsset(e)} />
                            <span class="slider round"></span>
                        </label></span>}

                    {this.state.Details.ASSET_STATUS == "Live" &&
                        <span class="col-md-3">   <a href="javascript:void(0)" onClick={e => this.RequestDemo(e)} class="btn pull-right btn-sm btn-primary">{this.state.requestTitle}</a></span>}
                </h5>


                <Row className="mt-20">
                    <Col>
                        <div class={this.state.class}>
                            <ButtonGroup aria-label="Basic example ">
                                {this.state.Details.ASSET_STATUS != "Live" && <Button variant="outline-warning" size="sm" onClick={e => this.ApproveAsset(e)}>Approve</Button>}
                                {this.state.Details.ASSET_STATUS != "Pending Rectification" && <Button variant="outline-warning" size="sm" onClick={e => this.RectifyAsset(e)}> Send for Rectification</Button>}
                                <Button variant="outline-warning" size="sm" onClick={e => this.RejectAsset(e)}>Reject</Button>
                            </ButtonGroup>
                        </div>
                        <Tabs defaultActiveKey="Overview" id="uncontrolled-tab-example" className="mb-4">

                            <Tab eventKey="Overview" title="Overview">
                                <div className="mb40" dangerouslySetInnerHTML={{ __html: this.state.ASSET_THUMBNAIL }}></div>

                                {/* <p class="mt10" dangerouslySetInnerHTML={{ __html: this.state.Asset_desc }}></p> */}
                                <ReactMarkdown source={this.state.Asset_desc} />  

                                

                                
                                <div class="row descAsset pd10 ">
                                    <div class="col-sm-6"><strong>{this.state.assettype} Name</strong><br /> {this.state.Details.ASSET_TITLE}</div>
                                    <div class="col-sm-6"><strong>{this.state.assettype} ID </strong><br />{this.state.Details.ASSET_ID}</div>
                                    {this.state.Details.ASSET_SCRM_ID != null && <> <div class="col-sm-6"><strong>Service Request Id </strong><br />{this.state.Details.ASSET_SCRM_ID}</div></>}
                                    <div class="col-sm-6"><strong>{this.state.assettype} Owner</strong> <br />{this.state.AssetOwner} </div>
                                    <div class="col-sm-6"><strong>{this.state.assettype} Expiry Tenure</strong><br /> {this.state.Details.ASSET_EXPIRY_DATE} Months</div>
                                    {this.state.setSalesPlay != "NA" && <> <div class="col-sm-6"><strong>Sales Initiatives</strong><br /> <span dangerouslySetInnerHTML={{ __html: this.state.setSalesPlay }}></span></div></>}
                                    {this.state.setSolutionArea != "NA" && <> <div class="col-sm-6"><strong>Solution Area</strong><br /> <span dangerouslySetInnerHTML={{ __html: this.state.setSolutionArea }}></span> </div></>}
                                    {this.state.setIndustry != "NA" && <><div class="col-sm-6"> <strong>Industry</strong><br /> <span dangerouslySetInnerHTML={{ __html: this.state.setIndustry }}></span></div></>}
                                    {this.state.setAssetType != "NA" && <><div class="col-sm-6"> <strong>Asset Type</strong><br /> <span dangerouslySetInnerHTML={{ __html: this.state.setAssetType }}></span></div></>}
                                    {this.state.Details.ASSET_CUSTOMER != null && <><div class="col-sm-6"> <strong>Customer</strong><br /> <span dangerouslySetInnerHTML={{ __html: this.state.Details.ASSET_CUSTOMER }}></span></div></>}
                                </div>

                                <Row>
                                    <div class={this.state.class}>
                                        {global.OverviewTab != "" && global.OverviewTab != undefined && global.OverviewTab != null &&
                                            <div className="mb20"><strong>Previous note:</strong> {global.OverviewTab}</div>
                                        }

                                        <br />


                                        <Form.Group as={Col}   >
                                            <Form.Label>Review Note</Form.Label>
                                            {/* <FormControl as="textarea" aria-label="With textarea" /> */}

                                            <Form.Control as="textarea" onChange={e => this.handleKeyNoteChange(e, 'Overview')} defaultValue="" aria-label="With textarea" id="ReviewNoteOverviewVal" name='ReviewNoteOverviewVal'
                                            />
                                        </Form.Group>
                                    </div>
                                    <div class={this.state.Myclass}>
                                        <Form.Group as={Col}   >
                                            {/* <Form.Label>Review Note</Form.Label> */}
                                            {/* <FormControl as="textarea" aria-label="With textarea" /> */}
                                            {global.OverviewTab != "" && global.OverviewTab != undefined && global.OverviewTab != null &&

                                            <div className="mb20"><strong>Previous note:</strong> {global.OverviewTab}</div>
                                            }
                                            {/* <Form.Control as="textarea" readonly aria-label="With textarea" ={global.OverviewTab}
                                            /> */}
                                        </Form.Group>
                                    </div>
                                </Row>

                            </Tab>
                            {/* {((this.state.use_case!="No Use case Available")) &&  */}
                             {( (this.state.use_case!="No Use case Available") && (this.state.setAssetType=="Workshop<br/>"))  &&
                             <Tab eventKey="Messaging" title="Messaging">
                             <ReactMarkdown source={this.state.use_case} />  

                             <Row>
                                 <div class={this.state.class}>
                                     <Form.Group as={Col}   >
                                         {((global.MessagingTab != "") && (global.MessagingTab != undefined) && (global.MessagingTab != null)) &&
                                             <div className="mb20"><strong>Previous note:</strong> {global.MessagingTab}</div>
                                         }
                                         <Form.Label>Review Note</Form.Label>

                                         <Form.Control as="textarea" id="ReviewNoteArchitechureVal" defaultValue="" name='ReviewNoteArchitechureVal'
                                             onChange={e => this.handleKeyNoteChange(e, 'Messaging')}>
                                         </Form.Control>
                                     </Form.Group>
                                 </div>
                                 <div class={this.state.Myclass}>
                                     <Form.Group as={Col}  >
                                         {/* <Form.Label>Review Note</Form.Label> */}
                                         {((global.MessagingTab != "") && (global.MessagingTab != undefined) && (global.MessagingTab != null)) &&

                                         <div className="mb20"><strong>Previous note:</strong> {global.MessagingTab}</div>
                                           }
                                              {/* <Form.Control as="textarea" readonly value={global.MessagingTab}>
                                         </Form.Control> */}
                                     </Form.Group>
                                 </div>
                             </Row>
                         </Tab>
                        }
                       {((this.state.use_case!="No Use case Available") && (this.state.setAssetType!="Workshop<br/>") )  &&

                                <Tab eventKey="UseCase" title="Use Case">

                                <ReactMarkdown source={this.state.use_case} />  

                                <Row>
                                    <div class={this.state.class}>
                                        <Form.Group as={Col}   >
                                            {((global.MessagingTab != "") && (global.MessagingTab != undefined) && (global.MessagingTab != null)) &&
                                                <div className="mb20"><strong>Previous note:</strong> {global.MessagingTab}</div>
                                            }
                                            <Form.Label>Review Note</Form.Label>

                                            <Form.Control as="textarea" id="ReviewNoteArchitechureVal" defaultValue="" name='ReviewNoteArchitechureVal'
                                                onChange={e => this.handleKeyNoteChange(e, 'Messaging')}>
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div class={this.state.Myclass}>
                                        <Form.Group as={Col}  >
                                            {/* <Form.Label>Review Note</Form.Label> */}
                                            {((global.MessagingTab != "") && (global.MessagingTab != undefined) && (global.MessagingTab != null)) &&

                                            <div className="mb20"><strong>Previous note:</strong> {global.MessagingTab}</div>
                                              }
                                                 {/* <Form.Control as="textarea" readonly value={global.MessagingTab}>
                                            </Form.Control> */}
                                        </Form.Group>
                                    </div>
                                </Row>
                            </Tab>  
                             
                            }
                               
                        
    



                            {this.state.hasArchitecture &&
                                <Tab eventKey="Architecture" title="Architecture">
                                    <Row dangerouslySetInnerHTML={{ __html: this.state.ArchitechureImg }}></Row>

                                     <ReactMarkdown source={this.state.Architechure} />  
                                     {/* <ReactMarkdown source={this.state.Asset_desc} />   */}

                                    {/* <Row dangerouslySetInnerHTML={{ __html: this.state.Architechure }}></Row> */}
                                    <Row>
                                        <div class={this.state.class}>
                                            <Form.Group as={Col}   >
                                                {global.DetailsTab != "" && global.DetailsTab != undefined && global.DetailsTab != null &&
                                                    <div className="mb20"><strong>Previous note:</strong> {global.DetailsTab}</div>
                                                }
                                                {/* <Form.Label>Review Note</Form.Label> */}

                                                <Form.Control as="textarea" id="ReviewNoteArchitechureVal" defaultValue="" name='ReviewNoteArchitechureVal'
                                                    onChange={e => this.handleKeyNoteChange(e, 'Architecture')}>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div class={this.state.Myclass}>
                                            <Form.Group as={Col}  >
                                                {/* <Form.Label>Review Note</Form.Label> */}
                                                {global.DetailsTab != "" && global.DetailsTab != undefined && global.DetailsTab != null &&

                                                <div className="mb20"><strong>Previous note:</strong> {global.DetailsTab}</div>
                                                  }
                                                {/* <Form.Control as="textarea" readonly defaultValue={global.DetailsTab}>
                                                </Form.Control> */}
                                            </Form.Group>
                                        </div>
                                    </Row>
                                </Tab>}
                            {this.state.hasCollatrals &&
                                <Tab eventKey="Collateral" title="Collateral">
                                    <ListGroup variant="flush" dangerouslySetInnerHTML={{ __html: this.state.Collateral }}></ListGroup>
                                    <br />
                                    <Row>
                                        <div class={this.state.class}>
                                            {global.CollateralTab != "" && global.CollateralTab != undefined && global.CollateralTab != null &&
                                                <div className="mb20"><strong>Previous note:</strong> {global.CollateralTab}</div>
                                            }
                                            <Form.Group as={Col}  >

                                                <Form.Label>Review Note</Form.Label>
                                                <Form.Control as="textarea" id="ReviewNoteCollateralVal" defaultValue="" name='ReviewNoteCollateralVal'
                                                    onChange={e => this.handleKeyNoteChange(e, "Collateral")}>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                        <div class={this.state.Myclass}>
                                            <Form.Group as={Col}  >
                                                {/* <Form.Label>Review Note</Form.Label> */}
                                                {global.CollateralTab != "" && global.CollateralTab != undefined && global.CollateralTab != null &&

                                                <div className="mb20"><strong>Previous note:</strong> {global.CollateralTab}</div>
                                                 }
                                                {/* <Form.Control as="textarea" readonly defaultValue={global.CollateralTab}>
                                                </Form.Control> */}
                                            </Form.Group>
                                        </div>
                                    </Row>
                                </Tab>}
                        </Tabs>
                    </Col>
                </Row>
                <div id="myModal" class="modal" role="dialog">
                    <div class="modal-dialog" id="DeployUCM">

                        {/* <div class="modal-content">
                <div class="modal-header">
                  
                    <h4 class="modal-title" id="DeployUCM">Deploy to UCM</h4>
                   
                </div>
                <div class="modal-body scroll">
                <div id="loader" class="hide text-center"><img src="http://sampark.rajasthan.gov.in/dashbordimg/loading.gif"/></div>
                <Form id="deploytoServer">
                <Row>
                    <Form.Group as={Col}  md={12} >
                        <Form.Label>Tenancy</Form.Label>
                        <Form.Control as="select" id="Tenancy" name='Tenancy' dangerouslySetInnerHTML={{ __html: this.state.DropdownTenancy}} onChange={e => this.handleChange(e)}>
                       
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}  md={12} >
                        <Form.Label>Region</Form.Label>
                        <Form.Control as="select" id="Region" name='Region' dangerouslySetInnerHTML={{ __html: this.state.DropdownRegion}}>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}  md={12} >
                        <Form.Label>Compartment</Form.Label>
                        <Form.Control as="select" id="Compartment" name='Compartment' dangerouslySetInnerHTML={{ __html: this.state.Compartmentdrop}} onChange={e => this.handleChangeCmptmnt(e)}>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}  md={12} >
                        <Form.Label>VCN</Form.Label>
                        <Form.Control as="select" id="VCN" name='VCN' dangerouslySetInnerHTML={{ __html: this.state.Vcndrop}} >
                       
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}  md={12} >
                        <Form.Label>AD</Form.Label>
                        <Form.Control as="select" id="AD" name='AD' dangerouslySetInnerHTML={{ __html: this.state.subnetAddrop}} onChange={e => this.handleChangeAd(e)}>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}  md={12} >
                        <Form.Label>Subnet</Form.Label>
                        <Form.Control as="select" id="Subnet" name='Subnet' dangerouslySetInnerHTML={{ __html: this.state.subnetdrop}}>
                        </Form.Control>
                    </Form.Group>
                </Row>
               
                <Row>
                    <Form.Group as={Col}  md={12} >
                        <Form.Label>Shape Name</Form.Label>
                        <Form.Control as="select" id="Shape" name='Shape' >
                            <option>VM.Standard1.1</option>
                            <option> VM.Standard1.2</option>
                            <option> VM.Standard2.1 </option>
                            <option>VM.Standard2.2 </option>
                            <option>VM.Standard2.4 </option>
                            <option> VM.Standard.E2.1 </option>
                            <option> VM.Standard.E2.2 </option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <input type="hidden" name="StatusDeploy" id="StatusDeploy"/>
                </Form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnDeploy" class="btn btn-primary" data-dismiss="modal" onClick={closePop}>Cancel</button> &nbsp; <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={deployPop}>Deploy</button>
                </div>
                </div> */}

                    </div>
                    <div class="modal-dialog hide" id="Deploystatus">

                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Deployment Status</h4>
                            </div>
                            <div class="modal-body">
                                <Alert show={this.state.show} variant="light">
                                    <Alert.Heading>Your instances are now launching</Alert.Heading>
                                    {/* <p>
                        <small>The following depoloyment have been initiated <br/> For Tenancy &nbsp;<span id="tenancycreatedId"> {global.tenancy_name}  </span><br/> Current Ucm deployment Status is: <strong id="status"> {this.state.deploymentStatus}</strong>
                        <a href="javascript:void(0);" class="" onClick={e => this.checkStatus(e,global.idInstance)}>&nbsp;&nbsp;Check Status</a></small>
                    </p> */}

                                </Alert>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={closePop}>Close</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div id="requestdemo" class="modal" role="dialog">
                    <div class="modal-dialog" id="requestdemoPopup">

                        <div class="modal-content">
                            <div class="modal-header">

                                <h4 class="modal-title">{this.state.requestTitle}</h4>

                            </div>
                            <div class="modal-body scroll">
                                <div id="loader" class="hide text-center"><img src="http://sampark.rajasthan.gov.in/dashbordimg/loading.gif" /></div>
                                <Form>
                                    {/* <Row>
                            <Form.Group as={Col}  md={12} >
                                <Form.Label>AssetId</Form.Label>
                                <Form.Control as="hidden" id="ReqAssetId" name='AssetId' value={this.state.Details.ASSET_ID}   ></Form.Control>
                            </Form.Group>
                        </Row> */}

                                    <Row>
                                        <Form.Group as={Col} md={12} >
                                            <Form.Label>Requester Name</Form.Label>
                                            <Form.Control type="text" readOnly="true" id="ReqName" name='ReqName' value={sessionStorage.getItem('user_name')}>
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={12} >
                                            <Form.Label>Requester Email</Form.Label>
                                            <Form.Control type="text" readOnly="true" id="ReqEmail" name='ReqEmail' value={sessionStorage.getItem('user_email')}></Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={12} >
                                            <Form.Label>Customer Name</Form.Label>
                                            <Form.Control type="text" id="ReqCustomer" name='ReqCustomer'>

                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md={12} >
                                            <Form.Label> OpportunityId  <sup>*</sup></Form.Label>
                                            <Form.Control type="text" id="ReqOpp" name='ReqOpp' maxLength={5} onChange={e => this.handleChangeRequ(e)}
                                            >

                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                                    {/* <Row>
                            <Form.Group as={Col}  md={12} >
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control as="hidden" id="ReqMobile" name='ReqMobile' value={sessionStorage.getItem('phone')} >
                            
                                </Form.Control>
                            </Form.Group>
                        </Row> */}
                                    {/* <Row>
                            <Form.Group as={Col}  md={12} >
                                <Form.Label>Location</Form.Label>
                                <Form.Control as="hidden" id="ReqLocation" name='ReqLocation' value={sessionStorage.getItem('location')}>
                                </Form.Control>
                            </Form.Group>
                        </Row> */}
                                    <Row>
                                        <Form.Group as={Col} md={12} >
                                            <Form.Label>Demo Date &nbsp;&nbsp;</Form.Label>
                                            {/* <Form.Control as="date" id="Reqdd" name='Reqdd'> */}
                                            <input type="date" name="Reqdd" id="Reqdd" min={todayDate} />
                                            {/* </Form.Control> */}
                                        </Form.Group>
                                    </Row>


                                    <Row>
                                        <Form.Group as={Col} md={12} >
                                            <Form.Label> Additional Notes</Form.Label>
                                            <Form.Control as="textarea" id="ReqDemoNote" name='ReqDemoNote' >

                                            </Form.Control>
                                        </Form.Group>
                                    </Row>

                                    {/* <Row>
                            <Form.Group as={Col}  md={12} >
                                <Form.Label>Asset Name</Form.Label>
                                <Form.Control as="text" id="ReqAssetName" name='ReqAssetName' value={this.state.Details.ASSET_TITLE} >
                                
                                </Form.Control>
                            </Form.Group>
                        </Row> */}
                                    {/* <Row>
                            <Form.Group as={Col}  md={12} >
                                <Form.Label>Asset Owner</Form.Label>
                                <Form.Control as="text" id="ReqAssetOwner" name='ReqAssetOwner' value={this.state.Details.ASSET_OWNER} >
                                
                                </Form.Control>
                            </Form.Group>
                        </Row> */}
                                    {/* <Row>
                            <Form.Group as={Col}  md={12} >
                                <Form.Label>Pillar</Form.Label>
                                <Form.Control as="text" id="ReqPillar" name='ReqPillar' value={sessionStorage.getItem('pillar')} >
                                
                                </Form.Control>
                            </Form.Group>
                        </Row> */}
                                </Form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" id="btnDeploy" class="btn btn-primary" data-dismiss="modal" onClick={closePop}>Cancel</button> &nbsp; <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={RequestPop}>Request</button>
                            </div>
                        </div>

                    </div>
                    <div class="modal-dialog hide" id="requestForDemoStatus">

                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Request Demo Status</h4>
                            </div>
                            <div class="modal-body">
                                <Alert show={this.state.show} variant="light">
                                    <Alert.Heading><small>Demo request saved and email notification sent successfully.</small></Alert.Heading>


                                </Alert>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={closePop}>Close</button>
                            </div>
                        </div>

                    </div>

                </div>



            </div>
        )
    }
}

export default TabsPanel
