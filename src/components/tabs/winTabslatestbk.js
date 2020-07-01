import React, { Component } from 'react'
import './index.css';
import Row  from 'react-bootstrap/Row';
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


import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
export class winTabs extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    
    }
    
    state = {
        Details: [],
        invalidUrl:'',
        WINSTORY_THUMBNAIL:'',
        LOBs: '',
        Imperatives: '',
        index: 0,
        direction: null,
        Architechure:'',
        Collateral:'',
        Asset_desc:'',
        getResponseId:'',
        DropdownTenancy:'',
        DropdownRegion:'',
        Compartmentdrop:'',
        Vcndrop:'',
        subnetdrop:'',
        subnetAddrop:'',
        shapeNamedrop:'',
        deploymentStatus:'In Process',
        ReviewNoteOverviewVal:'',
        ReviewNoteArchitechureVal:'',
        ReviewNoteCollateralVal:'',
        class:'hide',
        RedirectBack:'',
        Myclass:'hide',
        AssetOwner:'',
        classArch:'',
        dealInfo:''
       
      }
      
      handleSelect(selectedIndex, e) {
        this.setState({
          index: selectedIndex,
          direction: e.direction,
        });
      }
      
      componentDidMount() {
         var url = window.location.href;
       
          var ID=url.split('?');
          var idVal=ID[1].split('&');
          global.ID=idVal[0];
        //   alert('1');
            axios.get(global.Ip + global.Port + '/winstory/'+idVal[0])
          .then(res => {
            const Details = res.data;
            // console.log(res.data);
            // return false;
          //  console.log(res.data.ASSET_ARCHITECTURE_DESCRIPTION);
            global.Details=Details;
            var dealInfoTab="";
            // alert();
            if((global.Details.WINSTORY_THUMBNAIL!="") && (global.Details.WINSTORY_THUMBNAIL!=undefined) && (global.Details.WINSTORY_THUMBNAIL!=null))
          {
            dealInfoTab+="<img src="+global.Details.WINSTORY_THUMBNAIL+"> <br/>";

          }else{
            dealInfoTab+="";
  
          }
            this.setState({
                dealInfo:dealInfoTab
            });
            // if(res.data.ASSET_DESCRIPTION==null){
            //     var desc='No Desc Available';
            // }else{
            //  var desc=res.data.ASSET_DESCRIPTION;

            // }
            // if(res.data.ASSET_TYPE.length>1){
            //     this.setState({
            //         classArch:""
            //     });

            // }else{
            //     if(res.data.ASSET_TYPE[0].FILTER_NAME=="White Papers" || res.data.ASSET_TYPE[0].FILTER_NAME=="Proposal Templates")
            //     this.setState({
            //         classArch:"hide"
            //     });
            // }

            // var replaceSemicolonAsset=(res.data.ASSET_OWNER).replace(/;/g, '\n');

            
            this.setState({ Details });
            // this.setState({ Asset_desc:desc ,AssetOwner:replaceSemicolonAsset});
            // if(this.state.Details.ASSET_VIDEO_LINK!="" && this.state.Details.ASSET_VIDEO_LINK!=null){
            //     this.setState({ WINSTORY_THUMBNAIL:'<iframe id="kmsembed-0_39k6jvkd" width="608" height="402" src="'+this.state.Details.ASSET_VIDEO_LINK+'" class="kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" ></iframe>' });
            // }else{
                this.setState({ WINSTORY_THUMBNAIL:'<img src="'+this.state.Details.WINSTORY_THUMBNAIL+'">' });
            // }
            var html="";
            var htmlCollateral="";




        //     if(res.data.IMAGES.length>0){
        //         if(res.data.ASSET_ARCHITECTURE_DESCRIPTION==null){
        //             // var desc='No Desc Available';
        //             html+='<div class="pd10 ">No Desc Available</div>';

        //         }else{
        //             // html+='<div class="pd10 ">No Desc Available</div>';

        //         //  var desc=res.data.ASSET_DESCRIPTION;
        //         html+='<div class="pd10 ">'+res.data.ASSET_ARCHITECTURE_DESCRIPTION+'</div>';

        //         }
        //         // html+='<div class="pd10 ">'+res.data.ASSET_DESCRIPTION+'</div>';

          
        //     for(var i=0;i<res.data.IMAGES.length;i++){
               
        //        html+='<div class="col-md-12"><img src="'+res.data.IMAGES[i]["IMAGEURL"]+'"/><hr/></div>';
        //     }
        // }else{
        //     html+='<p class="text-center col-md-12">No Data Found.</p>';  
        // }
            
            for(var j=0;j<res.data.LINKS.length;j++){
                htmlCollateral+='<div class="list-group-item"><h6 class="Title collateralTitle">'+res.data.LINKS[j]["TYPE"]+' ('+res.data.LINKS[j].arr.length+')</h6>';
              
              
                htmlCollateral+='<div class="row">';
                var month_name = function(dt){
                    var mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
                      return mlist[dt.getMonth()];
                    };
                
               
              
              
                for(var k=0;k<res.data.LINKS[j].arr.length;k++){
                   if(res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]==null){
                       var desc='No Desc Available';
                   }else{
                    var desc=res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]
                   }
                //    var split=res.data.ASSET_MODIFIED_DATE.split('T');
                   console.log(res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"]);
                //    var getdate= split[0].split('-');
                //    var d=getdate[1]+'&nbsp;' + month_name(new Date(split[0]));
                   var statusId=res.data.LINKS[j].arr[k]["LINK_ID"]+"status";
                   var info="";
                   if((res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"]!="") && (res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"]!=null)){
                    info='<span title="'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION_DATA"] +'">&#x1f6c8;</span>';
                   }
                   var getPro=(res.data.LINKS[j].arr[k]["LINK_URL"]).split(':');
                //    alert(getPro[0]);
                   var  getProUrl;
                   if((getPro[0]=='http') || (getPro[0]=='https')){
                        getProUrl='';
                   }else{
                        getProUrl='https://';
                   }
                   if(res.data.LINKS[j]["TYPE"]=='CODE REPOSITORY' && res.data.LINKS[j].arr[k]["DEPLOY_STATUS"]==1){
                       document.getElementById('StatusDeploy').value=statusId;
                   
//
                    // htmlCollateral+='<div class="pd-10 line-height"> &rarr;	<a href="'+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank">'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</a> <button variant="primary" class="text-center  deploy" data-toggle="modal" >Deploy to UCM</button></div>';
                    htmlCollateral+='<div class="col-md-4"><div class="card"><h1>'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</h1>'+info+'<p class="updatedDate hide deployStat" id='+statusId+'></p><div class="bottomSec row"><div class="flex space-between"><span><a href="'+getProUrl+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank"><button class="btn-primary btn-xs ">View</button></a></span><span><button id="deploy" class="btn-primary btn-xs deploy " data-instance='+res.data.ASSET_OS+' data-key='+statusId+' data-toggle="modal" >Deploy</button><span></div></div></div></div>';
                   }else{
                    // htmlCollateral+='<div class="pd-10 line-height"> &rarr;	<a href="'+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank">'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</a></div>';
                    htmlCollateral+='<div class="col-md-4"><div class="card"><h1>'+res.data.LINKS[j].arr[k]["LINK_DESCRIPTION"]+'</h1>'+info+'<div class="bottomSec row"><div class="flex space-between"><span><a href="'+getProUrl+res.data.LINKS[j].arr[k]["LINK_URL"]+'" target="_blank"><button class="btn-primary btn-xs">View</button></a></span></div></div></div></div>';
                   }

               }
               htmlCollateral+='</div>';
             }
            var winstory_other_filters = JSON.parse(res.data.WINSTORY_OTHER_FILTER) 
            // this.state.LOBs = winstory_other_filters.LOB
            // this.state.Imperatives = winstory_other_filters.Imperative
            

            this.setState({
                Architechure:html,
                Collateral:htmlCollateral
            });

          })
         
          axios.get('http://132.145.141.18:3200/api/getOnlyActiveTenancies').then(res => {
                var tenancydrop="<option>Select Tenancy</option>";

                    for(var i=0;i<=res.data.length-1;i++){
                        tenancydrop += '<option  value="'+res.data[i].tenancy_name+'">'+res.data[i].tenancy_name+'</option>';
                    }
                    this.setState({
                        DropdownTenancy:tenancydrop
                    }); 
          });
           var url = window.location.href;
       
            var statusGov=url.split('&Governance=');
        //   alert(statusGov[1]);
            if(statusGov[1]=='Y'){
                this.setState({
                    class:'col-md-6 pull-right right0',
                    // socialClass:'hide'
                });
            }
            var MyAssetStat=url.split('&MyASSET=');
            if(MyAssetStat[1]=='Y'){
                
                this.setState({
                    Myclass:'col-md-8',
                    
                });
            }
      }
      
        ApproveAsset= (val)=> {
        //     alert('test'+val);
        //  alert(this.state.ReviewNoteOverviewVal);
        //  var url = window.location.href;
       
        //   var ID=url.split('?');
        //   var idVal=ID[1].split('&');
        var objJson=[];
         if((this.state.ReviewNoteOverviewVal!="") ){
             var splitter=this.state.ReviewNoteOverviewVal.split('seprator');
             //var SelectedTabForSection='Approve';
                var data = {
                    "section":splitter[0],
                    "note":splitter[1]
                }
               
        
        objJson.push(data);

    } if((this.state.ReviewNoteArchitechureVal!="")){
        var splitter=this.state.ReviewNoteArchitechureVal.split('seprator');
        var data = {
            "section":splitter[0],
            "note":splitter[1]
        }
       
        
    objJson.push(data);
    }
    if((this.state.ReviewNoteCollateralVal!="")){
        var splitter=this.state.ReviewNoteCollateralVal.split('seprator');
        var data = {
            "section":splitter[0],
            "note":splitter[1]
        }
       
        
    objJson.push(data);
    }   
if(this.state.ReviewNoteOverviewVal!="" || this.state.ReviewNoteArchitechureVal!=""  || this.state.ReviewNoteCollateralVal!="" ){
    var reqParm={"review_note":objJson,"assetId":global.ID,
                 "asset_status":"Live"};
    axios.post(global.Ip + global.Port + '/governance/postreviewnote',reqParm).then(res => {
        //console.log(res.data);
             alert(res.data.status);
             this.setState({
                RedirectBack:'true'
            });
   });
      
}else{
    alert('Please enter any of review note');
}
        }
RectifyAsset= (val)=> {
    //     alert('test'+val);
    //  alert(this.state.ReviewNoteOverviewVal);
    var objJson=[];
     if((this.state.ReviewNoteOverviewVal!="") ){
         var splitter=this.state.ReviewNoteOverviewVal.split('seprator');
            var data = {
                "section":splitter[0],
                "note":splitter[1]
            }
           
    
    objJson.push(data);

} if((this.state.ReviewNoteArchitechureVal!="")){
    var splitter=this.state.ReviewNoteArchitechureVal.split('seprator');
    var data = {
        "section":splitter[0],
        "note":splitter[1]
    }
   
    
objJson.push(data);
}
if((this.state.ReviewNoteCollateralVal!="")){
    var splitter=this.state.ReviewNoteCollateralVal.split('seprator');
    var data = {
        "section":splitter[0],
        "note":splitter[1]
    }
   
    
objJson.push(data);
}   
if(this.state.ReviewNoteOverviewVal!="" || this.state.ReviewNoteArchitechureVal!=""  || this.state.ReviewNoteCollateralVal!="" ){
    var reqParm={"review_note":objJson,"assetId":global.ID,
    "asset_status":"Pending Rectification"};
axios.post(global.Ip + global.Port + '/governance/postreviewnote',reqParm).then(res => {
    //console.log(res.data);
         alert(res.data.status);
         this.setState({
            RedirectBack:'true'
        });
});
  
}else{
alert('Please enter any of review note');
} 
}

RejectAsset= (val)=> {
    //     alert('test'+val);
    //  alert(this.state.ReviewNoteOverviewVal);
    var objJson=[];
     if((this.state.ReviewNoteOverviewVal!="") ){
         var splitter=this.state.ReviewNoteOverviewVal.split('seprator');
            var data = {
                "section":splitter[0],
                "note":splitter[1]
            }
           
    
    objJson.push(data);

} if((this.state.ReviewNoteArchitechureVal!="")){
    var splitter=this.state.ReviewNoteArchitechureVal.split('seprator');
    var data = {
        "section":splitter[0],
        "note":splitter[1]
    }
   
    
objJson.push(data);
}
if((this.state.ReviewNoteCollateralVal!="")){
    var splitter=this.state.ReviewNoteCollateralVal.split('seprator');
    var data = {
        "section":splitter[0],
        "note":splitter[1]
    }
   
    
objJson.push(data);
}   
if(this.state.ReviewNoteOverviewVal!="" || this.state.ReviewNoteArchitechureVal!=""  || this.state.ReviewNoteCollateralVal!="" ){
    var reqParm={"review_note":objJson,"assetId":global.ID,
    "asset_status":"Reject"};
    axios.post(global.Ip + global.Port + '/governance/postreviewnote',reqParm).then(res => {
    //console.log(res.data);
         alert(res.data.status);
         this.setState({
            RedirectBack:'true'
        });
});
  
}else{
alert('Please enter any of review note');
} 
//console.log(objJson);

        
         
        
	    }
      checkStatus= (e,id) => {

            axios.get('http://132.145.141.18:3200/api/GetDeploymentStatus?id='+id)
                    .then(res => {
                        // alert('Current status is &nbsp;'+res.data.status);
                        document.getElementById('status').innerHTML=res.data.status;
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
      handleChangeAd= (e) => {
        var subnetdrop="<option>Select Subnet</option>"; 
        var Vcn= document.getElementById('VCN').value;
        var VCNIdCheck=Vcn.split('name');
        var VcnIdVal=VCNIdCheck[0];
        var Ad= document.getElementById('AD').value;
         if(VcnIdVal!="" && Ad!=""){
            let Subnet_array=[];
            let Subnet_name_array=[];
             for(var i=0;i<= global.dataResponse.length-1;i++){
                 if((VcnIdVal==global.dataResponse[i].vcn_ocid) && (Ad==global.dataResponse[i].sub_ad)){
                    Subnet_array.push(global.dataResponse[i].subnet_ocid);
                    Subnet_name_array.push(global.dataResponse[i].subnet_name);
 
                 }
            }
            var arrloopedSubnet=removeDuplicates(Subnet_array);
            var arrloopedSubnetname=removeDuplicates(Subnet_name_array);
            for(var j=0;j<=arrloopedSubnet.length-1;j++){
              subnetdrop += '<option value="'+arrloopedSubnet[j]+'name'+arrloopedSubnetname[j]+'">'+arrloopedSubnetname[j]+'</option>';
            }
          this.setState({
            subnetdrop:subnetdrop
          }); 
         }
         function removeDuplicates(arr){
             let unique_array = []
             for(let i = 0;i < arr.length; i++){
                 if(unique_array.indexOf(arr[i]) == -1){
                     unique_array.push(arr[i])
                 }
             }
             return unique_array
         }
       }


      handleChangeCmptmnt = (e) => {
       var Vcndrop="<option>Select VCN</option>";
       var Region= document.getElementById('Region').value;
       var Compartment= document.getElementById('Compartment').value;
        if(Region!="" && Compartment!=""){
            let Vcn_array =[]; let Vcn_name_array=[];
            for(var i=0;i<= global.dataResponse.length-1;i++){
                if((Region==global.dataResponse[i].region)){
                    Vcn_array.push(global.dataResponse[i].vcn_ocid);
                    Vcn_name_array.push(global.dataResponse[i].vcn_name);
                }
               
           }
           var arrloopedVcn=removeDuplicates(Vcn_array);
           var arrloopedVcnName=removeDuplicates(Vcn_name_array);
           for(var j=0;j<=arrloopedVcn.length-1;j++){

            Vcndrop += '<option value="'+arrloopedVcn[j]+'name'+arrloopedVcnName[j]+'">'+arrloopedVcnName[j]+'</option>';
         }
         this.setState({
             Vcndrop:Vcndrop
         }); 
        }
        function removeDuplicates(arr){
            let unique_array = []
            for(let i = 0;i < arr.length; i++){
                if(unique_array.indexOf(arr[i]) == -1){
                    unique_array.push(arr[i])
                }
            }
            return unique_array
        }
      }
      handleKeyNoteChange = (e,val) => {
     //  alert('test'+val);
        this.setState({
            [e.target.name]: val+'seprator'+e.target.value
        })   


}
      handleChange = (e) => {
       
        var tenancySelected = document.getElementById("Tenancy").value;



        axios.get('http://132.145.141.18:3200/api/getmporderformDataByTenancy?id='+tenancySelected)
        .then(res => {
                 global.dataResponse=res.data;
                 console.log(global.dataResponse);
                 var regiondrop="<option>Select Region</option>";var Compartmentdrop="<option>Select Compartment</option>";  var Addrop="<option>Select Ad</option>"; var shapeNamedrop="<option>Select Shape</option>";
                 let region_array = [];
                 let compartment_array = [];
                 let compartment_name_array = [];
                 let Ad_array =[];
                //  let Subnet_array=[];
                 for(var i=0;i<=res.data.length-1;i++){
                        region_array.push(res.data[i].region);
                        compartment_array.push(res.data[i].compartment_ocid);
                        compartment_name_array.push(res.data[i].compartment_name);
                        Ad_array.push(res.data[i].sub_ad);
                   }
                    var arrlooped=removeDuplicates(region_array);
                     for(var j=0;j<=arrlooped.length-1;j++){
                        regiondrop += '<option value="'+arrlooped[j]+'">'+arrlooped[j]+'</option>';
                     }
                     var arrloopedCompartment=removeDuplicates(compartment_array);
                     var arrloopedCompartmentname=removeDuplicates(compartment_name_array);
                     for(var j=0;j<=arrloopedCompartment.length-1;j++){
                        Compartmentdrop += '<option value="'+arrloopedCompartment[j]+'name'+arrloopedCompartmentname[j]+'" >'+arrloopedCompartmentname[j]+'</option>';
                     }
                    var arrloopedAd=removeDuplicates(Ad_array);
                     for(var j=0;j<=arrloopedAd.length-1;j++){
                        Addrop += '<option value="'+arrloopedAd[j]+'">'+arrloopedAd[j]+'</option>';
                     }
                     
                     this.setState({
                        DropdownRegion:regiondrop,
                        Compartmentdrop:Compartmentdrop,
                        subnetAddrop:Addrop
                    }); 
        }); 
       
        function removeDuplicates(arr){
            let unique_array = []
            for(let i = 0;i < arr.length; i++){
                if(unique_array.indexOf(arr[i]) == -1){
                    unique_array.push(arr[i])
                }
            }
            return unique_array
        }

}

  render() {
   if(this.state.RedirectBack=='true') {
    return <Redirect push to="/Governance" />; 
   }
    //   if(global.Governance=='Edit'){
    //       alert('test');
    //   }
      function closePop() {
        document.getElementById("myModal").style.display = 'none'; 
        document.getElementById('DeployUCM').style.display='block';  
        document.getElementById('Deploystatus').classList.add('hide');
    }
    
    function deployPop(){
       var Tenancy=document.getElementById('Tenancy').value;
       var Region=document.getElementById('Region').value;
       var Compartment=document.getElementById('Compartment').value;
       var compartmentsplit=Compartment.split('name');
       var cmptId=compartmentsplit[0];
       var Cmptname=compartmentsplit[1]
       var VCN=document.getElementById('VCN').value;
       var VCNsplit=VCN.split('name');
       var VCNId=VCNsplit[0];
       var VCNname=VCNsplit[1];
       var Ad=document.getElementById('AD').value;
       var Subnet=document.getElementById('Subnet').value;
       var Subnetsplit=Subnet.split('name');
       var SubnetId=Subnetsplit[0];
       var subnetname=Subnetsplit[1];
    //    var Shape=document.getElementById('Subnet').value;
        if(Tenancy=="Select Tenancy"){
          alert('Please select Tenancy');  
          return false;
        }else if(Region=="Select Region"){
            alert('Please select Region');  
            return false;
        }else if(Compartment=="Select Compartment"){
            alert('Please select Compartment');  
            return false;
        }else if(VCN=="Select VCN"){
            alert('Please select VCN');  
            return false;
        }else if(Ad=="Select Ad"){
            alert('Please select Ad');  
            return false;
        }else if(Subnet=="Select Subnet"){
            alert('Please select Subnet');  
            return false;
        }else{


        document.getElementById('loader').classList.remove('hide');
        document.getElementById('deploytoServer').classList.add('hide');
        document.getElementById('btnDeploy').classList.add('hide');
        
        
        // var Tenancy=document.getElementById('Tenancy').value;
        // var Region=document.getElementById('Region').value;
        // var Compartment=document.getElementById('Compartment').value;
        // var VCN=document.getElementById('VCN').value;
        
        var AD= document.getElementById('AD').value;
        var AdVal=AD.split('AD-');
        // var Subnet=document.getElementById('Subnet').value;
        var Shape=document.getElementById('Shape').value;
        
        // axios.get('http://132.145.141.18:3200/api/getmporderformDataByTenancy?id='+Tenancy)
        // .then(res => {

        // alert(global.dataResponse[0].tenancy_ocid);

               
        
        var reqParms = {
            "tenancy_name": Tenancy,
            "TenancyId":global.dataResponse[0].tenancy_ocid,
            "region": Region,
            "compartment_name": Cmptname,
            "cmptId": cmptId,
            "vcn_name": VCNname,
            "vcnId":VCNId,
            "instance": global.instanceValue,
            "AD": parseInt(AdVal[1]),
            "subnet_name":subnetname,
            "subnetId": SubnetId,
            "shape":Shape,
            "owner_chargeback": "string",
            "owner_team": "string",
            "owner_type": 'string',
            "owner_uptime": 'string'
        }
        
        
        axios.post('http://132.145.141.18:3200/api/Initializescripts',reqParms)
        .then(resAPI => {
            if(resAPI.data.msg!=""){
                global.instanceId=resAPI.data.msg;
                document.getElementById('loader').classList.add('hide');
                document.getElementById('btnDeploy').classList.remove('hide');
                document.getElementById('deploytoServer').classList.remove('hide');
                global.tenancy_name=Tenancy;
                global.idInstance=resAPI.data.msg;
                document.getElementById('tenancycreatedId').innerHTML=global.tenancy_name +'';
                    // document.getElementById('deployStatusVal').classlist.remove('hide');  
                
                document.getElementById('DeployUCM').style.display='none';  
                document.getElementById('Deploystatus').classList.remove('hide');
                var StatusIdVal=  document.getElementById('StatusDeploy').value;
                document.getElementById(StatusIdVal).classList.remove('hide');
                 Tenancy="";
                 Region="";
                 Compartment=""
                 VCN="";
                 Ad="";
                 Subnet="";
                // axios.post('http://132.145.141.18:3200/api/RunScriptsInit', {
                //     "instance": "Linux"})
                //     .then(res => {
                //         console.log(res.data.msg);
                //         if(res.data.msg=="success"){

                //             axios.post('http://132.145.141.18:3200/api/RunScriptsApply')
                //                 .then(res => {

                //                     document.getElementById('loader').classList.add('hide');
                //                     document.getElementById('btnDeploy').classList.remove('hide');
                //                     document.getElementById('deploytoServer').classList.remove('hide');
                //                     global.tenancy_name=Tenancy;
                //                     document.getElementById('tenancycreatedId').innerHTML=global.tenancy_name +' &nbsp; View deployment Log';
                //                     document.getElementById('DeployUCM').style.display='none';  
                //                     document.getElementById('Deploystatus').style.display='block'; 

                //                 });
                        
                //         }
                //         else{
                //             document.getElementById('loader').classList.add('hide');
                //             document.getElementById('btnDeploy').classList.remove('hide');
                //             document.getElementById('deploytoServer').classList.remove('hide');
                //             alert('There is some trouble in deployment. Sorry for inconvenience caused.');
                //             return false;
                //         }

                //     });   
            }else{
                alert('There is some trouble in deployment. Sorry for inconvenience caused.');
                return false;
            }
        }).catch((error) => {
            if (error.response) {
                alert('There is some trouble in deployment. Sorry for inconvenience caused.');
                return false;
    
              }
          });
  //  });
}
    }
    setTimeout(function() {
        var classname = document.getElementsByClassName("deploy");
        // var classrefresh = document.getElementsByClassName("refresh");
        var openDialogBoxUi = function() {
           var instanceValue= this.getAttribute('data-instance');
        //    alert(instanceValue);
           global.instanceValue=instanceValue;
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

if((this.state.Details.WINSTORY_LOGO!=null) && (this.state.Details.WINSTORY_LOGO!="")&& (this.state.Details.WINSTORY_LOGO!=undefined) )
   {
       var imgLog=this.state.Details.WINSTORY_LOGO;
   } 
   else{
    var imgLog="";

   }// alert(global.OverviewTab);
    return (
        <div>
            {/* <h5 className="mt-20"></h5> */}
            <div className="mt-20 mb-20 Win-logo"><img src={imgLog}/> <strong>{this.state.Details.WINSTORY_NAME}</strong></div>
            <br/>
            <Row className="">
                    <Col>
                    <div class={this.state.class}>
                    <ButtonGroup aria-label="Basic example ">
                            <Button variant="outline-warning" size="sm" onClick={e => this.ApproveAsset(e)}>Approve</Button>
                            <Button variant="outline-warning" size="sm" onClick={e => this.RectifyAsset(e)}> Send for Rectification</Button>
                            <Button variant="outline-warning" size="sm" onClick={e => this.RejectAsset(e)}>Reject</Button>
                    </ButtonGroup>
                    </div>
                        <Tabs defaultActiveKey="Overview" id="uncontrolled-tab-example" className="mb-4">
                        
                                <Tab eventKey="Overview" title="Overview">
                               {/* <div dangerouslySetInnerHTML={{ __html: this.state.WINSTORY_THUMBNAIL }}></div> */}
                               
                                <p class="mt10" dangerouslySetInnerHTML={{ __html: this.state.Asset_desc }}></p>
                                <div class="row descAsset pd10 ">
                                    <div class="col-sm-6"><strong>Win Story Name</strong><br/> {this.state.Details.WINSTORY_NAME}</div>
                                    <div class="col-sm-6"><strong>Win ID </strong><br/>{this.state.Details.WINSTORY_ID}</div>
                                    {/* <div class="col-sm-6"><strong>Deal Cycle Time </strong><br/> {this.state.Details.WINSTORY_DEAL_CYCLE_TIME} </div> */}
                                    <div class="col-sm-6"><strong>Rep & SE</strong> <br/>{this.state.Details.WINSTORY_REPS_SE} </div>
                                    <div class="col-sm-6"><strong>Win Quater</strong><br/>{this.state.Details.WINSTORY_FISCAL_QUARTER}</div>
                                    <div class="col-sm-6"><strong>Channel</strong><br/>{this.state.Details.WINSTORY_CHANNEL}</div>

                                    {/* <div class="col-sm-6"><strong>Oracle LOB</strong><br/> {this.state.Details.ASSET_TITLE}</div> */}
                                    {/* <div class="col-sm-6"><strong>Industry / Sector</strong><br/>{this.state.Details.ASSET_ID}</div> */}
                                    <div class="col-sm-6"><strong>Competition</strong><br/> {this.state.Details.WINSTORY_COMPETIION}</div>
                                    <div class="col-sm-6"><strong>Deal Size(SARR)</strong> <br/>{this.state.Details.WINSTORY_DEAL_SIZE} </div>
                                    {/* <div class="col-sm-6"><strong>Competion</strong><br/>{this.state.Details.WINSTORY_COMPETIION}</div> */}
                                    <div class="col-sm-6"><strong>Renewal</strong><br/>{this.state.Details.WINSTORY_RENEWAL}</div>

                                    <div class="col-sm-6"><strong>Partner</strong><br/> {this.state.Details.WINSTORY_PARTNER}</div>
                                    {/* <div class="col-sm-6"><strong>Application install</strong><br/>{this.state.Details.ASSET_ID}</div> */}
                                    {/* <div class="col-sm-6"><strong>Persona</strong><br/> {this.state.Details.ASSET_EXPIRY_DATE} Months</div> */}
                                    {/* <div class="col-sm-6"><strong>Imperative</strong> <br/>{this.state.Details.WINSTORY_IMPERATIVE} </div> */}
                                    <div class="col-sm-6"><strong>Use case(s)</strong><br/>{this.state.Details.WINSTORY_USECASE}</div>
                                    <div class="col-sm-6"><strong>Why the Customer Bought/ The Impact of the purchase to the customer</strong><br/>{this.state.Details.WINSTORY_CUSTOMER_IMPACT}</div>
                                    <div class="col-sm-6"><strong>The Business Drivers </strong><br/>{this.state.Details.WINSTORY_BUSSINESS_DRIVER}</div>
                                    <div class="col-sm-6"><strong>Sales Proces</strong><br/>{this.state.Details.WINSTORY_SALES_PROCESS}</div>
                                    <div class="col-sm-6"><strong>Learnt Lessons</strong><br/>{this.state.Details.WINSTORY_LESSON_LEARNT}</div>
                                </div>

                                <Row>
                                    <div class={this.state.class}>
                                    {global.OverviewTab !="" && global.OverviewTab !=undefined && global.OverviewTab !=null &&
                                            <div className="mb20"><strong>Previous note:</strong> {global.OverviewTab}</div>
                                         }

                                         <br/>

                                         
                                    <Form.Group as={Col}   >
                                        <Form.Label>Review Note</Form.Label>
                                        {/* <FormControl as="textarea" aria-label="With textarea" /> */}
                                       
                                       <Form.Control as="textarea" onChange={e => this.handleKeyNoteChange(e,'Overview')} defaultValue="" aria-label="With textarea" id="ReviewNoteOverviewVal" name='ReviewNoteOverviewVal'
                                        />
                                    </Form.Group>
                                    </div>
                                    <div class={this.state.Myclass}>
                                    <Form.Group as={Col}   >
                                        <Form.Label>Review Note</Form.Label>
                                        {/* <FormControl as="textarea" aria-label="With textarea" /> */}

                                        <Form.Control as="textarea" readonly aria-label="With textarea" defaultValue={global.OverviewTab}
                                        />
                                    </Form.Group>
                                    </div>
                                </Row>
                               
                                </Tab>
                                {/* {this.state.classArch!="hide" &&
                                <Tab eventKey="Architecture" title="Architecture">
                                    <Row dangerouslySetInnerHTML={{ __html: this.state.Architechure}}></Row>
                                        <Row>
                                        <div class={this.state.class}>
                                        <Form.Group as={Col}   >
                                        {global.DetailsTab !="" && global.DetailsTab !=undefined && global.DetailsTab !=null &&
                                            <div className="mb20"><strong>Previous note:</strong> {global.DetailsTab}</div>
                                             }
                                            <Form.Label>Review Note</Form.Label>
                                           
                                            <Form.Control as="textarea" id="ReviewNoteArchitechureVal" defaultValue="" name='ReviewNoteArchitechureVal'
                                            onChange={e => this.handleKeyNoteChange(e,'Architecture')}>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                        <div class={this.state.Myclass}>
                                        <Form.Group as={Col}  >
                                            <Form.Label>Review Note</Form.Label>
                                            <Form.Control as="textarea" readonly defaultValue={global.DetailsTab}>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                    </
                                    "Row>
                                </Tab>} */}
                            <Tab eventKey="DealInformation" title="Deal Information">
                            {this.state.dealInfo!=""  &&
                                <ListGroup variant="flush" dangerouslySetInnerHTML={{ __html: this.state.dealInfo}}></ListGroup>}
                                <br/>
                                <div class="row descAsset pd10 ">
                                    <div class="col-sm-6"><strong>Win Story Customer Impact</strong><br/> {this.state.Details.WINSTORY_CUSTOMER_IMPACT}</div>
                                    <div class="col-sm-6"><strong>Win Story Business driver </strong><br/>{this.state.Details.WINSTORY_BUSSINESS_DRIVER}</div>
                                    <div class="col-sm-6"><strong>Sales Process</strong><br/>{this.state.Details.WINSTORY_SALES_PROCESS}</div>
                                    <div class="col-sm-6"><strong>Learnt Lessons </strong><br/>{this.state.Details.WINSTORY_LESSON_LEARNT}</div>
                                </div>
                                </Tab>
                                {this.state.Collateral !="" &&
                                <Tab eventKey="Collateral" title="Collateral">
                                <ListGroup variant="flush" dangerouslySetInnerHTML={{ __html: this.state.Collateral}}></ListGroup>
                                <br/>
                                <Row>
                                        <div class={this.state.class}>
                                        {global.CollateralTab !="" && global.CollateralTab !=undefined && global.CollateralTab !=null &&
                                            <div className="mb20"><strong>Previous note:</strong> {global.CollateralTab}</div>
                                             }
                                        <Form.Group as={Col}  >
                                           
                                            <Form.Label>Review Note</Form.Label>
                                            <Form.Control as="textarea" id="ReviewNoteCollateralVal" defaultValue="" name='ReviewNoteCollateralVal'
                                            onChange={e => this.handleKeyNoteChange(e,"Collateral")}>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                        <div class={this.state.Myclass}>
                                        <Form.Group as={Col}  >
                                            <Form.Label>Review Note</Form.Label>
                                            <Form.Control as="textarea" readonly defaultValue={global.CollateralTab}>
                                            </Form.Control>
                                        </Form.Group>
                                        </div>
                                    </Row>
                                </Tab>}
                        </Tabs>
                </Col>   
            </Row>
            <div id="myModal" class="modal" role="dialog">
            <div class="modal-dialog" id="DeployUCM">

                <div class="modal-content">
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
                </div>

            </div>
            <div class="modal-dialog hide" id="Deploystatus">

                <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Deployment Status</h4>
                </div>
                <div class="modal-body">
                <Alert show={this.state.show} variant="light">
                    <Alert.Heading>Your instances are now launching</Alert.Heading>
                    <p>
                        <small>The following depoloyment have been initiated <br/> For Tenancy &nbsp;<span id="tenancycreatedId"> {global.tenancy_name}  </span><br/> Current Ucm deployment Status is: <strong id="status"> {this.state.deploymentStatus}</strong>
                        <a href="javascript:void(0);" class="" onClick={e => this.checkStatus(e,global.idInstance)}>&nbsp;&nbsp;Check Status</a></small>
                    </p>

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

export default winTabs