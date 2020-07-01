import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import { Search } from './search/Search';
import ClearFilter from './clearFilters';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form  from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import ImageCard from './imageCard/FilterImageCard';
import UnMapCards from './imageCard/unmapImageCard';
import FiltersList  from './filters/filterListSelection';
import Mappedfilters from './filters/mappedFilters';

// import {
//     Header
// } from './detailsHeader';
import Footer from './Footer/Footer';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
export class FilterManagemnt extends Component {
    state = {
        AssetDataLive: [],AssetUnderReview: [],PendingRectification:[],AssetRejected: [],AssetLive:[],

        redirectPage:'', AssetID:'', redirectEditPage:'',classDeploy:'',redirectDeployPage:'',redirectDetailPage:'',successMsg:"",
        class: 'section',
        FilterDataList: [],
        buttonParam:'+',
        classDeactive:""
      }
      
      handleClick(val,e) {
        var inputval=document.getElementById(val+'val').value;
        if(inputval=="true"){
            document.getElementById(val).classList.add('show');
            document.getElementById(val+'val').value='false';
            document.getElementById(val+'expand').innerHTML='-';
        }else{
            document.getElementById(val).classList.remove('show');
            document.getElementById(val+'val').value='true';
            document.getElementById(val+'expand').innerHTML='+';

        }
    }
    UnmappingImageOnChange  = (data)=>{
        // alert(data);
        
       var splitData=data.split('AW');
    //    console.log(splitData);
    //    alert(data);
        
       global.AssetsPUM=splitData[0];
        //  global.mappingImage=data;

       global.WinsPUM=splitData[1];
    //    alert( global.WinsPUM)
       
    }
    mappingImageOnChange = (data)=>{
        // alert(data);
        
       var splitData=data.split('AW');
    //    console.log(splitData);
    //    alert(data);
        
       global.AssetsP=splitData[0];
        //  global.mappingImage=data;

       global.WinsP=splitData[1];
       
    }
    mappingOnChange = (data) => {
       // alert(data);

        global.mappingFilter=data;

    }
    searchOnChange = (data)  => {
    
    var filterdata;
    var ValSortBy="";
    if(global.sortByval!=undefined){
         ValSortBy=global.sortByval;
         var OffsetLimit=20;
    }else{
         ValSortBy="";
         var OffsetLimit=-1;
    }
    if(global.selectedcheckbox!=undefined){
        filterdata=global.selectedcheckbox;
    }else{
        filterdata='';
    }
    
    if((filterdata.indexOf('14983ddhswcdol')!=-1) && (filterdata.indexOf('Gdjfdskyuetr472V')==-1) ){
///////////////////////////////////////////////////////////////////////////////////////
var winUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
var headerWin= {
    "offset":0,
    "limit":OffsetLimit,
    "searchString":data,
    "filters":filterdata,
    "user_email":sessionStorage.getItem("user_email"),
    "sortBy":ValSortBy

}
//}
axios.get(winUrl, {
    headers: headerWin
}).then(resWin => {
   
        global.winMapData=resWin.data.WINSTORIES;
       
        var msg;
       
    this.setState({
        winData: resWin.data.ASSETS,
        // assetDataCount: global.assetCount,
        // errorMsg:msg,
        filterData:filterdata,
        assetTitle:'Search Result'
    })
    global.assetMapData=[];
    this.setState({
        assetData: []
    })
})
    }else if((filterdata.indexOf('Gdjfdskyuetr472V')!=-1)&&(filterdata.indexOf('14983ddhswcdol')==-1)){

        var mainUrl=global.Ip + global.Port + '/asset/allAssetsFilters';
    var header= {
        "offset":0,
        "limit":OffsetLimit,
        "searchString":data,
        "filters":filterdata,
        "user_email":sessionStorage.getItem("user_email"),
        "sortBy":ValSortBy
    
    }
    //}
    axios.get(mainUrl, {
        headers: header
    }).then(res => {
       
            global.assetMapData=res.data.ASSETS;
            global.assetCount="Asset (" + res.data.TOTALCOUNT + ")";
    
            var msg;
            
        this.setState({
            assetData: res.data.ASSETS,
            assetDataCount: global.assetCount,
            // errorMsg:msg,
            filterData:filterdata,
            assetTitle:'Search Result'
        })
        global.winMapData=[];
        this.setState({
            winData: []
        })
    })
    }else{
        var mainUrl=global.Ip + global.Port + '/asset/allAssetsFilters';
    var header= {
        "offset":0,
        "limit":OffsetLimit,
        "searchString":data,
        "filters":filterdata,
        "user_email":sessionStorage.getItem("user_email"),
        "sortBy":ValSortBy
    
    }
    //}
    axios.get(mainUrl, {
        headers: header
    }).then(res => {
       
            global.assetMapData=res.data.ASSETS;
            global.assetCount="Asset (" + res.data.TOTALCOUNT + ")";
    
            var msg;
            
        this.setState({
            assetData: res.data.ASSETS,
            assetDataCount: global.assetCount,
            // errorMsg:msg,
            filterData:filterdata,
            assetTitle:'Search Result'
        })
    })
///////////////////////////////////////////////////////////////////////////////////////
var winUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
var headerWin= {
    "offset":0,
    "limit":OffsetLimit,
    "searchString":data,
    "filters":filterdata,
    "user_email":sessionStorage.getItem("user_email"),
    "sortBy":ValSortBy

}
//}
axios.get(winUrl, {
    headers: headerWin
}).then(resWin => {
   
        global.winMapData=resWin.data.WINSTORIES;
       
        var msg;
       
    this.setState({
        winData: resWin.data.ASSETS,
        // assetDataCount: global.assetCount,
        // errorMsg:msg,
        filterData:filterdata,
        assetTitle:'Search Result'
    })
})
    }
    
    
    
    
    
    
    ///////////////////////////////////////////////////////////////////////////////////////
    // }
    }
    ListOnUnMapChange =(data) => {
        //  alert(data);
        if(data!=""){
            this.setState({
             classClear:'clearall small pull-right'
            })
          }else{
            this.setState({
                classClear:'clearall small pull-right hide'
            }) 
          }
        // document.getElementById('Loader').classList.remove('hide');

        // document.getElementById('dataAssetShow').classList.add('hide');
        // document.getElementById('dataWinShow').classList.add('hide');
        
        
        var Searchdata;var SearchedParams;
        if(global.selectedDropdownContract!=undefined){
            Searchdata=global.selectedDropdownContract;
            SearchedParams='Search result is For Filters: ' +data + 'Search '+Searchdata;
          
        }else{
            Searchdata='';
            SearchedParams='Search result is For Filters: ' +data;
        }
        var ValSortBy="";
        if(global.sortByval!=undefined){
             ValSortBy=global.sortByval;
             var offsetLimit=20;
        }else{
             ValSortBy="";
             var offsetLimit=-1;

        }
        if((data.indexOf('14983ddhswcdol')!=-1) && (data.indexOf('Gdjfdskyuetr472V')==-1) ){
            var mainWinUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
            var headerWin= {
                    "offset":0,
                    "limit":offsetLimit,
                    "searchString":Searchdata,
                    "filters":data,
                    "sortBy":ValSortBy,
                     "user_email":sessionStorage.getItem("user_email")
                }
                axios.get(mainWinUrl, {
                    headers: headerWin
                    })
                    .then(resWin => {
                    // document.getElementById('Loader').classList.add('hide');
                    // document.getElementById('dataAssetShow').classList.remove('hide');
                    // document.getElementById('dataWinShow').classList.remove('hide');
                
                
                    // if(SplitCat[1]=="WIN"){
                    //     global.assetData=res.data.WINSTORIES;
                    //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
                    // }else{
                        global.winUnMapData=resWin.data.WINSTORIES;
                
                       
                    this.setState({
                        winData: resWin.data.ASSETS,
                        // assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult:SearchedParams,
                        assetTitle:'Search Result'
                    })
                    global.AssetUnMapData=[];
                    this.setState({
                        assetData: [],
                        assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult:SearchedParams
                    })
                })


        }else if((data.indexOf('Gdjfdskyuetr472V')!=-1)&&(data.indexOf('14983ddhswcdol')==-1)){
            var mainUrl=global.Ip + global.Port + '/asset/allAssetsFilters';
            var header= {
                "offset":0,
                "limit":offsetLimit,
                "searchString":Searchdata,
                "filters":data,
                "sortBy":ValSortBy,
                "user_email":sessionStorage.getItem("user_email")
            }
       // }
        
    axios.get(mainUrl, {
    headers: header
    })
    .then(res => {
    // document.getElementById('Loader').classList.add('hide');
    // document.getElementById('dataAssetShow').classList.remove('hide');
    // document.getElementById('dataWinShow').classList.add('hide');


    // if(SplitCat[1]=="WIN"){
    //     global.assetData=res.data.WINSTORIES;
    //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
    // }else{
        global.assetUnMapData=res.data.ASSETS;
        // global.assetData=res.data.ASSETS;
        global.assetCount="Asset (" +res.data.TOTALCOUNT + ")";
    //}




    // var msg;
    // if(global.assetData.length==0){
    //     msg='No Record found.';
    //     document.getElementById('dataAssetShow').classList.add('hide');

    // }else{
    //     msg=''; 
    //     document.getElementById('dataAssetShow').classList.remove('hide');

    // }
    global.AssetCount=res.data.TOTALCOUNT;
    this.setState({
        assetData: global.assetData,
        assetDataCount: global.assetCount,
        // errorMsg:msg,
        searchParamResult:SearchedParams
    })
    global.WinUnMapData=[];
                    this.setState({
                        winData: [],
                        assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult:SearchedParams
                    })
})

        }else{
            var mainUrl=global.Ip + global.Port + '/asset/allAssetsFilters';
            var header= {
                "offset":0,
                "limit":offsetLimit,
                "searchString":Searchdata,
                "filters":data,
                "sortBy":ValSortBy,
                "user_email":sessionStorage.getItem("user_email")
            }
       // }
        
    axios.get(mainUrl, {
    headers: header
    })
    .then(res => {
    // document.getElementById('Loader').classList.add('hide');
    // document.getElementById('dataAssetShow').classList.remove('hide');
    // document.getElementById('dataWinShow').classList.add('hide');


    // if(SplitCat[1]=="WIN"){
    //     global.assetData=res.data.WINSTORIES;
    //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
    // }else{
        global.assetUnMapData=res.data.ASSETS;
        // global.assetData=res.data.ASSETS;
        global.assetCount="Asset (" +res.data.TOTALCOUNT + ")";
    //}




    // var msg;
    // if(global.assetData.length==0){
    //     msg='No Record found.';
    //     document.getElementById('dataAssetShow').classList.add('hide');

    // }else{
    //     msg=''; 
    //     document.getElementById('dataAssetShow').classList.remove('hide');

    // }
    global.AssetCount=res.data.TOTALCOUNT;
    this.setState({
        assetData: global.assetData,
        assetDataCount: global.assetCount,
        // errorMsg:msg,
        searchParamResult:SearchedParams
    })
})

var mainWinUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
var headerWin= {
        "offset":0,
        "limit":offsetLimit,
        "searchString":Searchdata,
        "filters":data,
        "sortBy":ValSortBy,
         "user_email":sessionStorage.getItem("user_email")
    }
    axios.get(mainWinUrl, {
        headers: headerWin
        })
        .then(resWin => {
        // document.getElementById('Loader').classList.add('hide');
        // document.getElementById('dataAssetShow').classList.remove('hide');
        // document.getElementById('dataWinShow').classList.remove('hide');
    
    
        // if(SplitCat[1]=="WIN"){
        //     global.assetData=res.data.WINSTORIES;
        //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
        // }else{
            global.winUnMapData=resWin.data.WINSTORIES;
    
            // global.winData=resWin.data.WINSTORIES;
            // global.assetCount="Win Stories (" + res.data.TOTALCOUNT +")";
    
            // var msg;
            // if(global.winData.length==0){
            //         msg='No Record found.';
            //         // document.getElementById('dataAssetShow').classList.add('hide');
            //         document.getElementById('dataWinShow').classList.add('hide');
    
    
            // }else{
            //         msg=''; 
            //         // document.getElementById('dataAssetShow').classList.remove('hide');
            //         document.getElementById('dataWinShow').classList.remove('hide');
    
    
            // }
        this.setState({
            winData: resWin.data.ASSETS,
            // assetDataCount: global.assetCount,
            // errorMsg:msg,
            searchParamResult:SearchedParams,
            assetTitle:'Search Result'
        })
    })
        }
        // var SplitCat=data.split("&");
        // if(SplitCat[1]=="WIN"){
            
       // }else{
           








}
      componentDidMount() {
        if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
        {
        axios.get(global.Ip + global.Port + '/asset/allfilters',{
            headers: {
                "user_email":sessionStorage.getItem('user_email')         
    
            }
        })
          .then(res => {
            const FilterDataList = res.data.allFilters;
            this.setState({ FilterDataList });
          })
        }
      }
    //   handleEditFilter = (val,e) =>{
    //     document.getElementById("FilterPanel").classList.remove('hide');

    //   }
      onAppoveFilter = (e, img) => {

        var objDocumentAdded = document.getElementById('ChildFilter'+e+'Add').children;
        var objJson = [];
        if(document.getElementById('ChildFilter'+e).children[1].value!="")
        {

            var data = {
                "filter_name": document.getElementById('ChildFilter'+e).children[1].value,
                "filter_image":  document.getElementById('ImageChildFilter'+e).innerHTML ,
                "filter_type_l2":""

                //global.CovertedparentImage    //global.ImageChildFilter
                // "LINK_DESCRIPTION_DATA": document.getElementById('DocumentLink').children[2].children[0].value
            };
            objJson.push(data);

        }
        
        for (var i = 0; i <= objDocumentAdded.length-1; i++) {
            var imageChild="ImageChildFilter"+e+i;

            if(document.getElementById('ChildFilter'+e+'Add' + i).children[1].value !="") 
            
            {
                var image="ImageChildFilter"+e+"Add"+ i;
                // global.imageChildPath=;
                
                console.log(i);
            var data = {
                "filter_name": document.getElementById('ChildFilter'+e+'Add' + i).children[1].value,
                "filter_image":  document.getElementById(image).innerHTML //global.CovertedparentImage,

            };

              objJson.push(data);
             }
        }
        console.log(objJson);
        // return false;
       // alert(e);
        var reqParms = {
           "child_filter":objJson,
            "existingFilter" :1,
            "filter_type":e,
            "filter_status":1,
            "filter_type_image":img,
            "user_email":sessionStorage.getItem("user_email")

        }
        var url=global.Ip + global.Port+"/admin/addnewfilter";
        axios.post(url, reqParms,{ headers: {
            "user_email": sessionStorage.getItem("user_email")             

        }}).then(response => {
            alert('inserted successfully');
            if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
            {
            axios.get(global.Ip + global.Port + '/asset/allfilters',{
                headers: {
                    "user_email":sessionStorage.getItem('user_email')         
        
                }
            })
              .then(res => {
                const FilterDataList = res.data.allFilters;
                this.setState({ FilterDataList });
                global.FilterDataList=FilterDataList;
                global.FilterDataMapList=FilterDataList;
                document.getElementById("ChildFilter"+e).classList.add("hide");
                document.getElementById("ChildFilter"+e).children[1].value="";
                document.getElementById("ChildFilter"+e).children[2].value="";
                document.getElementById("ChildFilter"+e+"frm").classList.add("hide");

                // this.setState({ classDeactive: response.data.message});

              })
            }

         //   var div = document.createElement("div");
             //   div.innerHTML = document.getElementById("EnterChildFilterData").value;
        //   var id=   document.getElementById("EnterChildFilterData").parentElement.nodeName;
        //   var id=  document.getElementById("EnterChildFilterData").parentElement.nodeName;
        //   console.log(id);
        //         document.getElementById(id).insertAdjacentHTML("beforeBegin",
        //   '<div class="list-group-item"><div>'+document.getElementById("EnterChildFilterData").value+'</div></div>');
              //  document.getElementById(e).appendChild(div);
        //   alert(document.getElementById("EnterChildFilterData").parentElement.nodeName.getAttribute("id"));
            // var btn = document.createElement("BUTTON");
            //     btn.innerHTML = "CLICK ME";
            //     document.body.appendChild(btn);
               // this.setState({ class: "active"});
        });







      }

    //   onAppoveFilter = (e, img) => {
        // onEditfilterPanel = () => {
        //     // document.getElementById("FilterPanel").classList.remove('hide');
        // }

        closePopModal = (id) => {
            document.getElementById(id).classList.add('hide');
        }
      onEditParentfilter = (e) => {
        //   alert('1');
        // //   alert((document.getElementById("EditParentFilter"+global.dataName+"Data").value));
        //   return false;
        if((global.EditParentFilterImage!="") && (global.EditParentFilterImage!=undefined) && (global.EditParentFilterImage!=null)){
            var image=global.EditParentFilterImage;
        }else{
            var image="";
        }
        var reqParms = {
            "child_filter":[{}],
            "filter_type": document.getElementById("EditParentFilter"+global.dataName+"Data").value, 
            "old_filter_type":global.OlddataType,
             // send value when want to update filter type name 
            "filter_type_image":image, 
              // send value when want to update filter type image
            "user_email":sessionStorage.getItem("user_email")
 
         }
         console.log(reqParms);
         var txt;
            var r = window.confirm("Are you sure you want to edit filter Name "+ global.dataName +" to " + (document.getElementById("EditParentFilter"+global.dataName+"Data").value));
            if (r == true) {
            // txt = "You pressed OK!";

            var url=global.Ip + global.Port+"/admin/editFilter";
            axios.post(url, reqParms,{ headers: {
                "user_email": sessionStorage.getItem("user_email")             
    
            }}).then(response => {
                // alert('inserted successfully');
                alert('Filter Updated successfully');

                if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
                {
                axios.get(global.Ip + global.Port + '/asset/allfilters',{
                    headers: {
                        "user_email":sessionStorage.getItem('user_email')         
            
                    }
                })
                  .then(res => {
                    document.getElementById("FilterPanel"+global.dataName+"Data").classList.add('hide');
                    document.getElementById("EditParentFilter"+global.dataName+"Data").value="";
                    // test3456Data
                    const FilterDataList = res.data.allFilters;
                    this.setState({ FilterDataList });
                    global.FilterDataList=FilterDataList;
                    global.FilterDataMapList=FilterDataList;
                            // document.getElementById("FilterPanel").classList.add('hide');

    
                    // this.setState({ classDeactive: response.data.message});
    
                  })
                }
   
            })

            } else {
            txt = "You pressed Cancel!";
            }
      }
      onEditfilter = () => {
  //              alert(global.oldId + "----"+ global.OlddataType + "---"+ global.dataName + "---"+  global.dataImage +"---"+ document.getElementById("EditChildFilter"+global.dataName+"Data").value);
       
      var objJson=[];
        var data = {
            "filter_name": document.getElementById("EditChildFilter"+global.dataName+"Data").value,
            "filter_type_l2":"",
            "filter_image": global.EditFilterImage,
            "filter_id":global.oldId


            // "filter_name": document.getElementById('ChildFilter').children[1].value,
            // "filter_image":  global.ConvertedChildImage ,
            // "filter_type_l2":""

            //global.CovertedparentImage    //global.ImageChildFilter
            // "LINK_DESCRIPTION_DATA": document.getElementById('DocumentLink').children[2].children[0].value
        };
        objJson.push(data);
        var reqParms = {
            "child_filter":objJson,
            "filter_type": global.OlddataType, 
            "old_filter_type":"",
             // send value when want to update filter type name 
            "filter_type_image":"", 
              // send value when want to update filter type image
            "user_email":sessionStorage.getItem("user_email")
 
         }
         var txt;
            var r = window.confirm("Are you sure you want to edit filter"+ global.dataName +" to " +document.getElementById("EditChildFilter"+global.dataName+"Data").value);
            if (r == true) {
            txt = "You pressed OK!";

            var url=global.Ip + global.Port+"/admin/editFilter";
            axios.post(url, reqParms,{ headers: {
                "user_email": sessionStorage.getItem("user_email")             
    
            }}).then(response => {
                // alert('inserted successfully');
                alert('Filter Updated successfully');

                if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
                {
                axios.get(global.Ip + global.Port + '/asset/allfilters',{
                    headers: {
                        "user_email":sessionStorage.getItem('user_email')         
            
                    }
                })
                  .then(res => {
                    document.getElementById("FilterPanel"+global.dataName+"Data").classList.add('hide');
                    document.getElementById("EditChildFilter"+global.dataName+"Data").value="";
                    // test3456Data
                    const FilterDataList = res.data.allFilters;
                    this.setState({ FilterDataList });
                    global.FilterDataList=FilterDataList;
                    global.FilterDataMapList=FilterDataList;
                            // document.getElementById("FilterPanel").classList.add('hide');

    
                    // this.setState({ classDeactive: response.data.message});
    
                  })
                }
   
            })

            } else {
            txt = "You pressed Cancel!";
            }
        //  if(global.oldId=="")
        
    
    
    }
      UploadDirectSubChild = (e) => {
       // alert(e.target.parentElement.getAttribute("id"));
        e.preventDefault();
        var data = new FormData()
        var filename=e.target.files[0].name;
        var filesize=e.target.files[0].size;
        // console.log(filename + filesize);
        var SplitExtn=filename.split('.');
            // console.log(SplitExtn[1]);
            var tolowerextn=(SplitExtn[1].toLowerCase());
            // console.log(tolowerextn);
            
         //   if((e.target.getAttribute("id")=="upload-cover-photo") || (e.target.getAttribute("id")=="upload-cover-logo") ){
            if((filesize <=100000) && (tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg')){
            // if((e.target.files.size <=6000000) ){
                // console.log(e.target.files);

            for (const file of e.target.files) {
                // console.log(e.target.files);
                

                //  if((file.size <=6000000) && ((SplitExtn[1]=='png') || (SplitExtn[1]=='PNG') || (SplitExtn[1]=='Jpeg')|| (SplitExtn[1]=='jpg') )){

                //}
                function getBase64(file,val) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                //     reader.onload = function () {
                //     // console.log(reader.result);
                //     // console.log(val);
                //     // if(val=="CovertedparentImage"){
                //         global.ConvertedUploadDirectSubChild=reader.result;

                //         console.log(global.ConvertedUploadDirectSubChild);

                //    // }
                //     // else{
                //     //     global.CovertedLogobase64=reader.result;
                //     // }
                //     };
                reader.onload = function () {
                    // console.log(reader.result);
                    // console.log(val);
                    // if(val=="CovertedparentImage"){
                        global.val=reader.result;
                        var p = window.document.createElement("p");   
                        p.className="hide";
// console.log(val);
                        p.id=val;// Create a <button> element
                        p.innerHTML = reader.result;                   // Insert text
                        window.document.body.appendChild(p);   
                        // console.log(global.val);

                   // }
                    // else{
                    //     global.CovertedLogobase64=reader.result;
                    // }
                    };
                    reader.onerror = function (error) {
                    console.log('Error: ', error);
                    };
                }
                data.append('file', file, file.name)
                // alert(e.target.getAttribute("id"));
             //   if (e.target.getAttribute("id") == "parentImage") {
                    console.log(file);
                    var headerObj = {
                        "type": 'thumbnail',
                        "Content-Type": 'multipart/form-data'
                    }
                    var ConvertedChildImage="Image"+e.target.parentElement.getAttribute("id");
                    getBase64(file,ConvertedChildImage);
                    // global.CoverPhoto = data;
                    // global.headerObj = headerObj; 
                    // var reader = new FileReader();
                    // reader.readAsDataURL(file);
                    // reader.onload = () => {
                    //     global.CoverPhotobase64 = reader.result;
                    //     this.setState({
                    //         WINSTORY_THUMBNAIL: ""
                    //     })
                    // };
                    // reader.onerror = function (error) {
                    //     global.CoverPhotobase64 = reader.error;
                    // };
                    // console.log( data);
              //  }
            
                // if (e.target.getAttribute("id") == "upload-cover-logo") {
                //     //  alert('2');
                //     var headerObj1 = {
                //         "type": 'logo',
                //         "Content-Type": 'multipart/form-data'
                //     }
                //     getBase64(file,"CovertedLogobase64");


                // }
                // console.log(data);

            } 
            } else{
                if(filesize >100000){
                    alert('Please upload image upto  100 kb');
                    document.getElementById(e.target.getAttribute("id")).value="";
                    return false;

                }
                else{
                if(tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg'){
                }
                else{
                    
                    alert('Please Upload either PNG or jpg/jpeg image');
                    document.getElementById(e.target.getAttribute("id")).value="";
                    return false;

                }
            }
        }
        
      }
      UploadEditParent = (e) => {
        e.preventDefault();
        var data = new FormData()
        var filename=e.target.files[0].name;
        var filesize=e.target.files[0].size;
        // console.log(filename + filesize);
        var SplitExtn=filename.split('.');
            // console.log(SplitExtn[1]);
            var tolowerextn=(SplitExtn[1].toLowerCase());
            // console.log(tolowerextn);
            
         //   if((e.target.getAttribute("id")=="upload-cover-photo") || (e.target.getAttribute("id")=="upload-cover-logo") ){
            if((filesize <=100000) && (tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg')){
            // if((e.target.files.size <=6000000) ){
                // console.log(e.target.files);

            for (const file of e.target.files) {
                // console.log(e.target.files);
                

                //  if((file.size <=6000000) && ((SplitExtn[1]=='png') || (SplitExtn[1]=='PNG') || (SplitExtn[1]=='Jpeg')|| (SplitExtn[1]=='jpg') )){

                //}
                function getBase64(file,val) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                //     reader.onload = function () {
                //     // console.log(reader.result);
                //     // console.log(val);
                //     // if(val=="CovertedparentImage"){
                //         global.ConvertedUploadDirectSubChild=reader.result;

                //         console.log(global.ConvertedUploadDirectSubChild);

                //    // }
                //     // else{
                //     //     global.CovertedLogobase64=reader.result;
                //     // }
                //     };
                reader.onload = function () {
                    // console.log(reader.result);
                    // console.log(val);
                    // if(val=="CovertedparentImage"){
                        global.EditParentFilterImage=reader.result;
//                          var p = window.document.createElement("p");   
//                          p.className="hide";
//  // console.log(val);
//                          p.id=val;// Create a <button> element
//                          p.innerHTML = reader.result;                   // Insert text
//                          window.document.body.appendChild(p);   
                        // console.log(global.val);

                   // }
                    // else{
                    //     global.CovertedLogobase64=reader.result;
                    // }
                    };
                    reader.onerror = function (error) {
                    console.log('Error: ', error);
                    };
                }
                data.append('file', file, file.name)
                // alert(e.target.getAttribute("id"));
             //   if (e.target.getAttribute("id") == "parentImage") {
                    console.log(file);
                    var headerObj = {
                        "type": 'thumbnail',
                        "Content-Type": 'multipart/form-data'
                    }
                    var ConvertedChildImage="EditParentFilterImage";
                    getBase64(file,ConvertedChildImage);
                    // global.CoverPhoto = data;
                    // global.headerObj = headerObj; 
                    // var reader = new FileReader();
                    // reader.readAsDataURL(file);
                    // reader.onload = () => {
                    //     global.CoverPhotobase64 = reader.result;
                    //     this.setState({
                    //         WINSTORY_THUMBNAIL: ""
                    //     })
                    // };
                    // reader.onerror = function (error) {
                    //     global.CoverPhotobase64 = reader.error;
                    // };
                    // console.log( data);
              //  }
            
                // if (e.target.getAttribute("id") == "upload-cover-logo") {
                //     //  alert('2');
                //     var headerObj1 = {
                //         "type": 'logo',
                //         "Content-Type": 'multipart/form-data'
                //     }
                //     getBase64(file,"CovertedLogobase64");


                // }
                // console.log(data);

            } 
            } else{
                if(filesize >100000){
                    alert('Please upload image upto  100 kb');
                    document.getElementById(e.target.getAttribute("id")).value="";
                    return false;

                }
                else{
                if(tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg'){
                }
                else{
                    
                    alert('Please Upload either PNG or jpg/jpeg image');
                    document.getElementById(e.target.getAttribute("id")).value="";
                    return false;

                }
            }
        }
      }

      UploadEditChild = (e) => {
        // alert(e.target.parentElement.getAttribute("id"));
         e.preventDefault();
         var data = new FormData()
         var filename=e.target.files[0].name;
         var filesize=e.target.files[0].size;
         // console.log(filename + filesize);
         var SplitExtn=filename.split('.');
             // console.log(SplitExtn[1]);
             var tolowerextn=(SplitExtn[1].toLowerCase());
             // console.log(tolowerextn);
             
          //   if((e.target.getAttribute("id")=="upload-cover-photo") || (e.target.getAttribute("id")=="upload-cover-logo") ){
             if((filesize <=100000) && (tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg')){
             // if((e.target.files.size <=6000000) ){
                 // console.log(e.target.files);
 
             for (const file of e.target.files) {
                 // console.log(e.target.files);
                 
 
                 //  if((file.size <=6000000) && ((SplitExtn[1]=='png') || (SplitExtn[1]=='PNG') || (SplitExtn[1]=='Jpeg')|| (SplitExtn[1]=='jpg') )){
 
                 //}
                 function getBase64(file,val) {
                     var reader = new FileReader();
                     reader.readAsDataURL(file);
                 //     reader.onload = function () {
                 //     // console.log(reader.result);
                 //     // console.log(val);
                 //     // if(val=="CovertedparentImage"){
                 //         global.ConvertedUploadDirectSubChild=reader.result;
 
                 //         console.log(global.ConvertedUploadDirectSubChild);
 
                 //    // }
                 //     // else{
                 //     //     global.CovertedLogobase64=reader.result;
                 //     // }
                 //     };
                 reader.onload = function () {
                     // console.log(reader.result);
                     // console.log(val);
                     // if(val=="CovertedparentImage"){
                         global.EditFilterImage=reader.result;
//                          var p = window.document.createElement("p");   
//                          p.className="hide";
//  // console.log(val);
//                          p.id=val;// Create a <button> element
//                          p.innerHTML = reader.result;                   // Insert text
//                          window.document.body.appendChild(p);   
                         // console.log(global.val);
 
                    // }
                     // else{
                     //     global.CovertedLogobase64=reader.result;
                     // }
                     };
                     reader.onerror = function (error) {
                     console.log('Error: ', error);
                     };
                 }
                 data.append('file', file, file.name)
                 // alert(e.target.getAttribute("id"));
              //   if (e.target.getAttribute("id") == "parentImage") {
                     console.log(file);
                     var headerObj = {
                         "type": 'thumbnail',
                         "Content-Type": 'multipart/form-data'
                     }
                     var ConvertedChildImage="EditFilterImage";
                     getBase64(file,ConvertedChildImage);
                     // global.CoverPhoto = data;
                     // global.headerObj = headerObj; 
                     // var reader = new FileReader();
                     // reader.readAsDataURL(file);
                     // reader.onload = () => {
                     //     global.CoverPhotobase64 = reader.result;
                     //     this.setState({
                     //         WINSTORY_THUMBNAIL: ""
                     //     })
                     // };
                     // reader.onerror = function (error) {
                     //     global.CoverPhotobase64 = reader.error;
                     // };
                     // console.log( data);
               //  }
             
                 // if (e.target.getAttribute("id") == "upload-cover-logo") {
                 //     //  alert('2');
                 //     var headerObj1 = {
                 //         "type": 'logo',
                 //         "Content-Type": 'multipart/form-data'
                 //     }
                 //     getBase64(file,"CovertedLogobase64");
 
 
                 // }
                 // console.log(data);
 
             } 
             } else{
                 if(filesize >100000){
                     alert('Please upload image upto  100 kb');
                     document.getElementById(e.target.getAttribute("id")).value="";
                     return false;
 
                 }
                 else{
                 if(tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg'){
                 }
                 else{
                     
                     alert('Please Upload either PNG or jpg/jpeg image');
                     document.getElementById(e.target.getAttribute("id")).value="";
                     return false;
 
                 }
             }
         }
         
       }

      UploadChildMediaFile = (e) => {
        // alert(e.target.parentElement.getAttribute("id"));
        e.preventDefault();
        var data = new FormData()
        var filename=e.target.files[0].name;
        var filesize=e.target.files[0].size;
        // console.log(filename + filesize);
        var SplitExtn=filename.split('.');
            // console.log(SplitExtn[1]);
            var tolowerextn=(SplitExtn[1].toLowerCase());
            // console.log(tolowerextn);
            
         //   if((e.target.getAttribute("id")=="upload-cover-photo") || (e.target.getAttribute("id")=="upload-cover-logo") ){
            if(filesize <=100000 && (tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg')){
            // if((e.target.files.size <=6000000) ){
                // console.log(e.target.files);

            for (const file of e.target.files) {
                // console.log(e.target.files);
                

                //  if((file.size <=6000000) && ((SplitExtn[1]=='png') || (SplitExtn[1]=='PNG') || (SplitExtn[1]=='Jpeg')|| (SplitExtn[1]=='jpg') )){

                //}
                function getBase64(file,val) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function () {
                    console.log(reader.result);
                    console.log(val);
                    // if(val=="CovertedparentImage"){
                        global.ConvertedChildImage=reader.result;

                      //  console.log(global.val);

                   // }
                    // else{
                    //     global.CovertedLogobase64=reader.result;
                    // }
                    };
                    reader.onerror = function (error) {
                    console.log('Error: ', error);
                    };
                }
                data.append('file', file, file.name)
                // alert(e.target.getAttribute("id"));
             //   if (e.target.getAttribute("id") == "parentImage") {
                    console.log(file);
                    var headerObj = {
                        "type": 'thumbnail',
                        "Content-Type": 'multipart/form-data'
                    }
                    var ConvertedChildImage="Image"+e.target.parentElement.getAttribute("id");
                    getBase64(file,ConvertedChildImage);
                    // global.CoverPhoto = data;
                    // global.headerObj = headerObj; 
                    // var reader = new FileReader();
                    // reader.readAsDataURL(file);
                    // reader.onload = () => {
                    //     global.CoverPhotobase64 = reader.result;
                    //     this.setState({
                    //         WINSTORY_THUMBNAIL: ""
                    //     })
                    // };
                    // reader.onerror = function (error) {
                    //     global.CoverPhotobase64 = reader.error;
                    // };
                    // console.log( data);
              //  }
            
                // if (e.target.getAttribute("id") == "upload-cover-logo") {
                //     //  alert('2');
                //     var headerObj1 = {
                //         "type": 'logo',
                //         "Content-Type": 'multipart/form-data'
                //     }
                //     getBase64(file,"CovertedLogobase64");


                // }
                // console.log(data);

            } 
            } else{
                if(filesize >100000){
                    alert('Please upload image upto  100 kb');
                    document.getElementById(e.target.getAttribute("id")).value="";
                    return false;

                }
                else{
                if(tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg'){
                }
                else{
                    
                    alert('Please Upload either PNG or jpg/jpeg image');
                    document.getElementById(e.target.getAttribute("id")).value="";
                    return false;

                }
            }
        }
        
      }
      
      UploadMediaFile = (e) => {
                e.preventDefault();
                var data = new FormData()
                var filename=e.target.files[0].name;
                var filesize=e.target.files[0].size;
                // console.log(filename + filesize);
                var SplitExtn=filename.split('.');
                    // console.log(SplitExtn[1]);
                    var tolowerextn=(SplitExtn[1].toLowerCase());
                    // console.log(tolowerextn);
                    
                 //   if((e.target.getAttribute("id")=="upload-cover-photo") || (e.target.getAttribute("id")=="upload-cover-logo") ){
                    if(filesize <=100000 && (tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg')){
                    // if((e.target.files.size <=6000000) ){
                        // console.log(e.target.files);

                    for (const file of e.target.files) {
                        // console.log(e.target.files);
                        

                        //  if((file.size <=6000000) && ((SplitExtn[1]=='png') || (SplitExtn[1]=='PNG') || (SplitExtn[1]=='Jpeg')|| (SplitExtn[1]=='jpg') )){

                        //}
                        function getBase64(file,val) {
                            var reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = function () {
                            console.log(reader.result);
                            console.log(val);
                            if(val=="CovertedparentImage"){
                                global.CovertedparentImage=reader.result;

                            }
                            // else{
                            //     global.CovertedLogobase64=reader.result;
                            // }
                            };
                            reader.onerror = function (error) {
                            console.log('Error: ', error);
                            };
                        }
                        data.append('file', file, file.name)
                        // alert(e.target.getAttribute("id"));
                        if (e.target.getAttribute("id") == "parentImage") {
                            console.log(file);
                            var headerObj = {
                                "type": 'thumbnail',
                                "Content-Type": 'multipart/form-data'
                            }
                            getBase64(file,"CovertedparentImage");
                            // global.CoverPhoto = data;
                            // global.headerObj = headerObj; 
                            // var reader = new FileReader();
                            // reader.readAsDataURL(file);
                            // reader.onload = () => {
                            //     global.CoverPhotobase64 = reader.result;
                            //     this.setState({
                            //         WINSTORY_THUMBNAIL: ""
                            //     })
                            // };
                            // reader.onerror = function (error) {
                            //     global.CoverPhotobase64 = reader.error;
                            // };
                            // console.log( data);
                        }
                    
                        // if (e.target.getAttribute("id") == "upload-cover-logo") {
                        //     //  alert('2');
                        //     var headerObj1 = {
                        //         "type": 'logo',
                        //         "Content-Type": 'multipart/form-data'
                        //     }
                        //     getBase64(file,"CovertedLogobase64");


                        // }
                        // console.log(data);

                    } 
                    } else{
                        if(filesize >100000){
                            alert('Please upload image upto  100 kb');
                            document.getElementById(e.target.getAttribute("id")).value="";
                            return false;

                        }
                        else{
                        if(tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg'){
                        }
                        else{
                            
                            alert('Please Upload either PNG or jpg/jpeg image');
                            document.getElementById(e.target.getAttribute("id")).value="";
                            return false;

                        }
                    }
                }
      //  }

  
        
    }


    // checkParentFilter=()=>{
    //     if(checkParentFilter)
    // }
    UnMapApplyFilters = (e) =>{
      
        if(global.selectedcheckboxUnMap!=undefined){
            var FiterIds=(global.selectedcheckboxUnMap).split(',');
        }
        else if(( (global.AssetsPUM=="")||(global.AssetsPUM==null)|| (global.AssetsPUM==undefined)) && ((global.WinsPUM=="")|| (global.WinsPUM==undefined) || (global.WinsPUM==null))){
            alert('You have to select Asset/Win');
            return false;
        }
        if((global.AssetsPUM!="") && (global.AssetsPUM!=undefined)){
            var AssetIds=(global.AssetsPUM).split(',');
    
        }else{
            var AssetIds=[];
    
        }
    if((global.WinsPUM!="") && (global.WinsPUM!=undefined)){
        var WinsIds=(global.WinsPUM).split(',');
    
    }else{
        var WinsIds=[];
    
    }
    var reqParms = {
        filter:FiterIds,
        assets:AssetIds,
        wins:WinsIds
        } 

    //}
    var url=global.Ip+global.Port+"/admin/unmapfilters";
    axios.post(url, reqParms,{ headers: {
        "user_email": sessionStorage.getItem("user_email")             

    }}).then(response => {

            if(response.data.status="Success"){
                alert(response.data.message);
                if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
                {
                axios.get(global.Ip + global.Port + '/asset/allfilters',{
                    headers: {
                        "user_email":sessionStorage.getItem('user_email')         
            
                    }
                })
                  .then(res => {
                    const FilterDataList = res.data.allFilters;
                    global.FilterDataList=FilterDataList;
                    global.FilterDataMapList=FilterDataList;

                    this.setState({ FilterDataList });
                    //global.FilterDataList=FilterDataList;
                    // document.getElementById("ChildFilter"+e).classList.add("hide");
                    // document.getElementById("ChildFilter"+e).children[1].value="";
                    // document.getElementById("ChildFilter"+e).children[2].value="";
                    // document.getElementById("ChildFilter"+e+"frm").classList.add("hide");
    
                    // this.setState({ classDeactive: response.data.message});
    
                  })
                  var Searchdata;var SearchedParams;
                  if(global.selectedDropdownContract!=undefined){
                      Searchdata=global.selectedDropdownContract;
                      SearchedParams='Search result is For Filters: ' +FiterIds + 'Search '+Searchdata;
                    
                  }else{
                      Searchdata='';
                      SearchedParams='Search result is For Filters: ' +FiterIds;
                  }
                  var ValSortBy="";
                  if(global.sortByval!=undefined){
                       ValSortBy=global.sortByval;
                       var offsetLimit=20;
                  }else{
                       ValSortBy="";
                       var offsetLimit=-1;
          
                  }
          
                  // var SplitCat=data.split("&");
                  // if(SplitCat[1]=="WIN"){
                      var mainWinUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
                      var headerWin= {
                              "offset":0,
                              "limit":offsetLimit,
                              "searchString":Searchdata,
                              "filters":"",
                              "sortBy":ValSortBy,
                               "user_email":sessionStorage.getItem("user_email")
                          }
                 // }else{
                      var mainUrl=global.Ip + global.Port + '/asset/allAssetsFilters';
                      var header= {
                          "offset":0,
                          "limit":offsetLimit,
                          "searchString":Searchdata,
                          "filters":"",
                          "sortBy":ValSortBy,
                          "user_email":sessionStorage.getItem("user_email")
                      }
                 // }
                  
              axios.get(mainUrl, {
              headers: header
              })
              .then(res => {
              // document.getElementById('Loader').classList.add('hide');
              // document.getElementById('dataAssetShow').classList.remove('hide');
              // document.getElementById('dataWinShow').classList.add('hide');
          
          
              // if(SplitCat[1]=="WIN"){
              //     global.assetData=res.data.WINSTORIES;
              //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
              // }else{
                  global.assetUnMapData=res.data.ASSETS;
                  global.assetCount="Asset (" +res.data.TOTALCOUNT + ")";
              //}
          
          
          
          
              // var msg;
              // if(global.assetData.length==0){
              //     msg='No Record found.';
              //     document.getElementById('dataAssetShow').classList.add('hide');
          
              // }else{
              //     msg=''; 
              //     document.getElementById('dataAssetShow').classList.remove('hide');
          
              // }
              global.AssetCount=res.data.TOTALCOUNT;
              this.setState({
                  assetData: global.assetData,
                  assetDataCount: global.assetCount,
                  // errorMsg:msg,
                  searchParamResult:SearchedParams
              })
          })
          axios.get(mainWinUrl, {
              headers: headerWin
              })
              .then(resWin => {
              // document.getElementById('Loader').classList.add('hide');
              // document.getElementById('dataAssetShow').classList.remove('hide');
              // document.getElementById('dataWinShow').classList.remove('hide');
          
          
              // if(SplitCat[1]=="WIN"){
              //     global.assetData=res.data.WINSTORIES;
              //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
              // }else{
                  global.winUnMapData=resWin.data.WINSTORIES;
                  // global.assetCount="Win Stories (" + res.data.TOTALCOUNT +")";
          
                  // var msg;
                  // if(global.winData.length==0){
                  //         msg='No Record found.';
                  //         // document.getElementById('dataAssetShow').classList.add('hide');
                  //         document.getElementById('dataWinShow').classList.add('hide');
          
          
                  // }else{
                  //         msg=''; 
                  //         // document.getElementById('dataAssetShow').classList.remove('hide');
                  //         document.getElementById('dataWinShow').classList.remove('hide');
          
          
                  // }
              this.setState({
                  winData: resWin.data.ASSETS,
                  // assetDataCount: global.assetCount,
                  // errorMsg:msg,
                  searchParamResult:SearchedParams,
                  assetTitle:'Search Result'
              })
          })
                } 
                global.selectedUnMapWin= undefined;
                global.selectedUnMapAsset= undefined;
                global.selectedUnMapcheckbox=undefined;
                global.selectedcheckboxUnMap=undefined;
                global.mappingFilter=undefined;
                global.WinsPUM=undefined;
                global.AssetsPUM=undefined;
              //   function  UncheckAllFilters(event){
                  global.selectedcheckbox= "";
                  // ListOnChange(global.selectedcheckbox);
                  var items=document.getElementsByName('filterData');
                  var Assetitems=document.getElementsByName('filterDataUnMap');
                  if(items.length>0){
                      for(var i=0; i<items.length; i++){
                          if(items[i].type=='checkbox')
                              items[i].checked=false;
                      }
  
                  }
                  if(Assetitems.length>0){
                    for(var i=0; i<Assetitems.length; i++){
                        if(Assetitems[i].type=='checkbox')
                        Assetitems[i].checked=true;
                    }

                }
            
            }

    })

    }
    ApplyFilters = (e) =>{
       
        if(( (global.AssetsP=="")||(global.AssetsP==null)|| (global.AssetsP==undefined)) && ((global.WinsP=="")|| (global.WinsP==undefined) || (global.WinsP==null))){
            alert('You have to select Asset/Win');
            return false;
        }
        else if((global.mappingFilter=="") || (global.mappingFilter==undefined) || (global.mappingFilter==null)){
            alert('Before hitting Apply button.You have to Select Filters and to which you want to map Assets/Wins');
            return false;
        }
        // alert(global.selectedAsset);
        // alert(global.mappingFilter)

            var FiterIds=(global.mappingFilter).split(',');
            if(global.AssetsP!=""){
                var AssetIds=(global.AssetsP).split(',');

            }else{
                var AssetIds=[];

            }
            if(global.WinsP!=""){
            var WinsIds=(global.WinsP).split(',');

            }else{
            var WinsIds=[];

            }
    // var WinsIds=(global.WinsP).split(',');

        var reqParms = {
            filter:FiterIds,
            assets:AssetIds,
            wins:WinsIds
            } 


            // console.log(reqParms);
            // return false;
        //}
        var url=global.Ip+global.Port+"/admin/mapfilters";
        axios.post(url, reqParms,{ headers: {
            "user_email": sessionStorage.getItem("user_email")             

        }}).then(response => {

                if(response.data.status="Success"){
                    alert(response.data.message);
                    if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
                    {
                    axios.get(global.Ip + global.Port + '/asset/allfilters',{
                        headers: {
                            "user_email":sessionStorage.getItem('user_email')         
                
                        }
                    })
                      .then(res => {
                        const FilterDataListnew = res.data.allFilters;

                        this.setState({ FilterDataListnew });
                        global.FilterDataMapList=FilterDataListnew;
                        global.FilterDataList=FilterDataListnew;
                        // document.getElementById("ChildFilter"+e).classList.add("hide");
                        // document.getElementById("ChildFilter"+e).children[1].value="";
                        // document.getElementById("ChildFilter"+e).children[2].value="";
                        // document.getElementById("ChildFilter"+e+"frm").classList.add("hide");
        
                        // this.setState({ classDeactive: response.data.message});
        
                      })
                      var Searchdata;var SearchedParams;
                      if(global.selectedDropdownContract!=undefined){
                          Searchdata=global.selectedDropdownContract;
                          SearchedParams='Search result is For Filters: ' +FiterIds + 'Search '+Searchdata;
                        
                      }else{
                          Searchdata='';
                          SearchedParams='Search result is For Filters: ' +FiterIds;
                      }
                      var ValSortBy="";
                      if(global.sortByval!=undefined){
                           ValSortBy=global.sortByval;
                           var offsetLimit=20;
                      }else{
                           ValSortBy="";
                           var offsetLimit=-1;
              
                      }
              
                      // var SplitCat=data.split("&");
                      // if(SplitCat[1]=="WIN"){
                          var mainWinUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
                          var headerWin= {
                                  "offset":0,
                                  "limit":offsetLimit,
                                  "searchString":Searchdata,
                                  "filters":"",
                                  "sortBy":ValSortBy,
                                   "user_email":sessionStorage.getItem("user_email")
                              }
                     // }else{
                          var mainUrl=global.Ip + global.Port + '/asset/allAssetsFilters';
                          var header= {
                              "offset":0,
                              "limit":offsetLimit,
                              "searchString":Searchdata,
                              "filters":"",
                              "sortBy":ValSortBy,
                              "user_email":sessionStorage.getItem("user_email")
                          }
                     // }
                      
                  axios.get(mainUrl, {
                  headers: header
                  })
                  .then(res => {
                  // document.getElementById('Loader').classList.add('hide');
                  // document.getElementById('dataAssetShow').classList.remove('hide');
                  // document.getElementById('dataWinShow').classList.add('hide');
              
              
                  // if(SplitCat[1]=="WIN"){
                  //     global.assetData=res.data.WINSTORIES;
                  //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
                  // }else{
                      global.assetData=res.data.ASSETS;
                      global.assetCount="Asset (" +res.data.TOTALCOUNT + ")";
                  //}
              
              
              
              
                  // var msg;
                  // if(global.assetData.length==0){
                  //     msg='No Record found.';
                  //     document.getElementById('dataAssetShow').classList.add('hide');
              
                  // }else{
                  //     msg=''; 
                  //     document.getElementById('dataAssetShow').classList.remove('hide');
              
                  // }
                  global.AssetCount=res.data.TOTALCOUNT;
                  this.setState({
                      assetData: global.assetData,
                      assetDataCount: global.assetCount,
                      // errorMsg:msg,
                      searchParamResult:SearchedParams
                  })
              })
              axios.get(mainWinUrl, {
                  headers: headerWin
                  })
                  .then(resWin => {
                  // document.getElementById('Loader').classList.add('hide');
                  // document.getElementById('dataAssetShow').classList.remove('hide');
                  // document.getElementById('dataWinShow').classList.remove('hide');
              
              
                  // if(SplitCat[1]=="WIN"){
                  //     global.assetData=res.data.WINSTORIES;
                  //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
                  // }else{
                      global.winData=resWin.data.WINSTORIES;
                      // global.assetCount="Win Stories (" + res.data.TOTALCOUNT +")";
              
                      // var msg;
                      // if(global.winData.length==0){
                      //         msg='No Record found.';
                      //         // document.getElementById('dataAssetShow').classList.add('hide');
                      //         document.getElementById('dataWinShow').classList.add('hide');
              
              
                      // }else{
                      //         msg=''; 
                      //         // document.getElementById('dataAssetShow').classList.remove('hide');
                      //         document.getElementById('dataWinShow').classList.remove('hide');
              
              
                      // }
                     
                            // ListOnChange(global.selectedcheckbox);
            
                   // }
                  this.setState({
                      winData: resWin.data.ASSETS,
                      // assetDataCount: global.assetCount,
                      // errorMsg:msg,
                      searchParamResult:SearchedParams,
                      assetTitle:'Search Result'
                  })
              })



             



              global.selectedMapWin= undefined;
              global.selectedMapAsset= undefined;
              global.selectedMapcheckbox=undefined;
              global.mappingFilter=undefined;
              global.AssetsP=undefined;
              global.WinsP=undefined;
            //   function  UncheckAllFilters(event){
                global.selectedcheckbox= "";
                // ListOnChange(global.selectedcheckbox);
                var items=document.getElementsByName('filterData');
                if(items.length>0){
                    for(var i=0; i<items.length; i++){
                        if(items[i].type=='checkbox')
                            items[i].checked=false;
                    }

                }
                // var Assetitems=document.getElementsByName('SortCardMapSection');
                // if(Assetitems.length>0){
                //     for(var i=0; i<Assetitems.length; i++){
                //         if(Assetitems[i].type=='checkbox')
                //         Assetitems[i].checked=false;
                //     }

                // }  
                      



                    }     
             }

        })

       


    }
    onClose = (e) => {
        this.setState({ successMsg: ""});

    }
      onCreateClick = (e) => {
        //   alert(document.getElementById('EnterParentFilter').value);
            // alert(global.ConvertedChildImage);
        if((document.getElementById('EnterParentFilter').value=="") || ((global.CovertedparentImage=="") || (global.CovertedparentImage==undefined) || (global.CovertedparentImage==null)) ){
          
                alert('Parent Filter Name and image is mandatory');
                return false;
           


        }else if((document.getElementById('EnterChildFilter').value=="") || ((global.ConvertedChildImage=="") || (global.ConvertedChildImage==undefined) || (global.ConvertedChildImage==null))){
            alert('One chiid filter creation is mandatory With name and image');
            return false;

        }else{

        var objDocumentAdded = document.getElementById('ChildFilterAdd').children;
        var objJson = [];
        if(document.getElementById('ChildFilter').children[1].value!="")
        {

            var data = {
                "filter_name": document.getElementById('ChildFilter').children[1].value,
                "filter_image":  global.ConvertedChildImage ,
                "filter_type_l2":""

                //global.CovertedparentImage    //global.ImageChildFilter
                // "LINK_DESCRIPTION_DATA": document.getElementById('DocumentLink').children[2].children[0].value
            };
            objJson.push(data);

        }
        
        for (var i = 0; i <= objDocumentAdded.length-1; i++) {
            var imageChild="ImageChildFilter"+i;

            if((document.getElementById('ChildFilterAdd' + i).children[1].value !=""))
            {
                var image="ImageChildFilterAdd"+ i;
                var element = document.getElementById(image);
 
                //If it isn't "undefined" and it isn't "null", then it exists.
                if(typeof(element) != 'undefined' && element != null){
                    var data = {
                        "filter_name": document.getElementById('ChildFilterAdd' + i).children[1].value,
                        "filter_image":  document.getElementById(image).innerHTML //global.CovertedparentImage,
        
                    };
        
                      objJson.push(data);
                     }
                     else{
                        alert('Filter Name and Filter image is mandatory');
                        return false;  
                    }  
                    
                    } 
                     
                     
                    
            //     if ((document.getElementById(image).innerHTML==null) || (document.getElementById(image).innerHTML==undefined) || (document.getElementById(image).innerHTML=="")){
                    
            //     } else{
            //         // global.imageChildPath=;
                    
            //         // console.log(i);
    
                
          
          
            // }
            
            
            // || ((document.getElementById(image).innerHTML=="") || (document.getElementById(image).innerHTML==undefined) || (document.getElementById(image).innerHTML==null))  ) 
            
            // {
            //     alert('Parent Filter Name and image is mandatory');
            //     return false;

            // }
           
        }
        console.log(objJson);

        var reqParms = {
            "child_filter":objJson,
            "filter_type":document.getElementById("EnterParentFilter").value,
            "filter_status":1,
            // "filter_name":document.getElementById("EnterParentFilter").value,
            "filter_type_image":global.CovertedparentImage,
            "user_email":sessionStorage.getItem("user_email")

        }
        var url=global.Ip+global.Port+"/admin/addnewfilter";
        axios.post(url, reqParms,{ headers: {
            "user_email": sessionStorage.getItem("user_email")             

        }}).then(response => {

            if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
            {
            axios.get(global.Ip + global.Port + '/asset/allfilters',{
                headers: {
                    "user_email":sessionStorage.getItem('user_email')         
        
                }
            })
              .then(res => {
                const FilterDataList = res.data.allFilters;
                this.setState({ FilterDataList });
                // document.getElementById("ChildFilter"+e).classList.add("hide");
                // document.getElementById("ChildFilter"+e).children[1].value="";
                // document.getElementById("ChildFilter"+e).children[2].value="";
                // document.getElementById("ChildFilter"+e+"frm").classList.add("hide");

                // this.setState({ classDeactive: response.data.message});

              })
            }
                this.setState({ successMsg: response.data.message});
                global.ConvertedChildImage="";
                global.CovertedparentImage="";
                for (var i = 0; i <= objDocumentAdded.length-1; i++) {
                    if((document.getElementById('ChildFilterAdd' + i).children[1].value !=""))
                    {
                        if(typeof(element) != 'undefined' && element != null){
                            var image="ImageChildFilterAdd"+ i;
                            document.getElementById(image).innerHTML="";
                        }
                    }

                }

        });
        
        }
        
      }
    //   onAppoveFilter = (e) => {
    //     alert(e);


    //   }
     deleteBox = (e,id) =>{

        global.filterdeleteId=id;
        var txt;
        
        var r = window.confirm("Are you sure you want to remove filter "+ e.target.getAttribute("dataName"));
        if (r == true) {
            var reqParms = {
                "filter_id":global.filterdeleteId
            }
            var url=global.Ip+global.Port+"/admin/deletefilter";
            axios.delete(url, {data:{ "filter_id":global.filterdeleteId}, headers:{Authorization: "token","user_email": sessionStorage.getItem("user_email") }}).then(response => {
                if(response.data.status="Success"){
                    alert("Filter deleted Successfully");
                    if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
                    {
                    axios.get(global.Ip + global.Port + '/asset/allfilters',{
                        headers: {
                            "user_email":sessionStorage.getItem('user_email')         
                
                        }
                    })
                      .then(res => {
                        const FilterDataList = res.data.allFilters;
                        this.setState({ FilterDataList });  
                        global.FilterDataList=FilterDataList;
                        global.FilterDataMapList=FilterDataList;          
                      })
                    }
                }
               
            });

        }else{

        }
        

       }
       deleteBoxParent = (e,id) =>{
        // alert(e);
                global.filterdeleteId=id;
                var txt;
                var r = window.confirm("Are you sure you want to remove filter "+e.target.getAttribute("dataName"));
                if (r == true) {
                  
                    var reqParms = {
                        "filter_id":global.filterdeleteId
                    }
                    var url=global.Ip+global.Port+"/admin/deleteparent/"+global.filterdeleteId;
                    axios.delete(url, {data:{}, headers:{Authorization: "token","user_email": sessionStorage.getItem("user_email") }}).then(response => {
                        if(response.data.status="Success"){
                            alert("Filter deleted Successfully");
                            if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
                            {
                            axios.get(global.Ip + global.Port + '/asset/allfilters',{
                                headers: {
                                    "user_email":sessionStorage.getItem('user_email')         
                        
                                }
                            })
                              .then(res => {
                                const FilterDataList = res.data.allFilters;
                                this.setState({ FilterDataList });  
                                global.FilterDataList=FilterDataList;
                                global.FilterDataMapList=FilterDataList;          
                              })
                            }
                        }
                       
                    });


                } else {
                 // txt = "You pressed Cancel!";
                }
               
        
               }
     onAddNew = (e) => {
        // alert(document.getElementById(e).classList.contains("hide"));
        if(document.getElementById(e).classList.contains("hide")==true){
                document.getElementById(e).classList.remove("hide");
                document.getElementById(e+"frm").classList.remove("hide");
        }else{
        function selectBox(event) {
            //  alert("test");
         //   alert(event.target.value);
            if((event.target.value=="") && (event.target.value==undefined) &&  (event.target.value==null)){
               // alert("1");
                var strUser = document.getElementById(e).value;
            }else{
                var strUser = event.target.value;
              //  alert("2");
            }
            // global.selectedVal=strUser;
            axios.get(global.Ip + global.Port + '/asset/allfilters',{
                headers: {
                    "user_email":sessionStorage.getItem('user_email')                
                }
            }).then(res => {
                const FilterData = res.data.allFilters;
                // this.setState({ FilterData });

                // console.log(FilterData);
                for(var k=0;k<FilterData.length;k++){
                    // if(id=="EnterParentFilter"){
                    //     if((FilterData[k].Type).toLowerCase()==strUser.toLowerCase()){
                    //         alert("Filter Type already existed.Please try with different one.");
                    //         event.target.value="";
                    //          return false;
                    //     }
                    // }else{
                            if((FilterData[k].filters).length>0){
                                for(var j=0;j<(FilterData[k].filters).length;j++){
                                    // console.log(FilterData[k].filters[j].FILTER_NAME);
                                    // console.log(strUser);
                                    if((FilterData[k].filters[j].FILTER_NAME).toLowerCase()==strUser.toLowerCase()){

                                        alert("Filter Type already existed.Please try with different one.");
                                        event.target.value="";
                                        return false;
                                    }

                                }
                           // }
                        }


                    
                   
                }
            })
          }

        function UploadChildMediaFile(event){
            // console.log(event.target.parentElement);
            if(event!=null && event!=undefined && event!=""){
            // console.log(event.target.parentElement.getAttribute("id"));
            // console.log(event.target.files[0].name);
            // return false;
            // console.log(e.target.parentElement.getAttribute("id"));
            event.preventDefault();
            var data = new FormData()
            var filename=event.target.files[0].name;
            var filesize=event.target.files[0].size;
            // console.log(filename + filesize);
            var SplitExtn=filename.split('.');
                // console.log(SplitExtn[1]);
                var tolowerextn=(SplitExtn[1].toLowerCase());
                // console.log(tolowerextn);
                
             //   if((e.target.getAttribute("id")=="upload-cover-photo") || (e.target.getAttribute("id")=="upload-cover-logo") ){
                if(filesize <=100000 && (tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg')){
                // if((e.target.files.size <=6000000) ){
                    // console.log(e.target.files);
    
                for (const file of event.target.files) {
                    // console.log(e.target.files);
                    
    
                    //  if((file.size <=6000000) && ((SplitExtn[1]=='png') || (SplitExtn[1]=='PNG') || (SplitExtn[1]=='Jpeg')|| (SplitExtn[1]=='jpg') )){
    
                    //}
                    function getBase64(file,val) {
                        // alert(val);
                        // console.log("test"+val);
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                        // console.log(reader.result);
                        // console.log(val);
                        // if(val=="CovertedparentImage"){
                            global.val=reader.result;
                            var p = window.document.createElement("p");   
                            p.className="hide";

                            p.id=val;// Create a <button> element
                            p.innerHTML = reader.result;                   // Insert text
                            window.document.body.appendChild(p);   
                            // console.log(global.val);
    
                       // }
                        // else{
                        //     global.CovertedLogobase64=reader.result;
                        // }
                        };
                        reader.onerror = function (error) {
                        console.log('Error: ', error);
                        };
                    }
                    data.append('file', file, file.name)
                    // alert(e.target.getAttribute("id"));
                 //   if (e.target.getAttribute("id") == "parentImage") {
                        console.log(file);
                        var headerObj = {
                            "type": 'thumbnail',
                            "Content-Type": 'multipart/form-data'
                        }
                        var ConvertedChildImage="Image"+event.target.parentElement.getAttribute("id");
                        getBase64(file,ConvertedChildImage);
                        // global.CoverPhoto = data;
                        // global.headerObj = headerObj; 
                        // var reader = new FileReader();
                        // reader.readAsDataURL(file);
                        // reader.onload = () => {
                        //     global.CoverPhotobase64 = reader.result;
                        //     this.setState({
                        //         WINSTORY_THUMBNAIL: ""
                        //     })
                        // };
                        // reader.onerror = function (error) {
                        //     global.CoverPhotobase64 = reader.error;
                        // };
                        // console.log( data);
                  //  }
                
                    // if (e.target.getAttribute("id") == "upload-cover-logo") {
                    //     //  alert('2');
                    //     var headerObj1 = {
                    //         "type": 'logo',
                    //         "Content-Type": 'multipart/form-data'
                    //     }
                    //     getBase64(file,"CovertedLogobase64");
    
    
                    // }
                    // console.log(data);
    
                } 
                } else{
                    if(filesize >100000){
                        alert('Please upload image upto  100 kb');
                        document.getElementById(event.target.getAttribute("id")).value="";
                        return false;
    
                    }
                    else{
                    if(tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg'){
                    }
                    else{
                        
                        alert('Please Upload either PNG or jpg/jpeg image');
                        document.getElementById(event.target.getAttribute("id")).value="";
                        return false;
    
                    }
                }
            }









        }

        }
        var itm = document.getElementById(e);
        var cln = itm.cloneNode(true);
        cln.children[1].value ="";
        cln.children[2].value ="";
        cln.id = e + 'Add' + document.getElementById(e + 'Add').children.length;
    //    console.log(cln);
         cln.children[1].addEventListener('change', selectBox);
        // .addEventListener('onBlur', callback(someVar));

        cln.children[2].addEventListener('change', UploadChildMediaFile);

        document.getElementById(e + 'Add').appendChild(cln);
    }
     }
    render() {
    //    alert(global.dataName);
        function selectBox(id){
            //  alert(id);
  
            // var d = document.getElementById("CategoryBox").value;
              // global.selectedCategory= d;
              var e = document.getElementById(id);
              var strUser = e.value;
            // alert(strUser +"1");
            if((global.filterData!="")&& (global.filterData!=undefined) && (global.filterData!=null)){
                    var FilterData=global.filterData;
                for(var k=0;k<FilterData.length;k++){
                    if(id=="EnterParentFilter"){
                        if((FilterData[k].Type).toLowerCase()==strUser.toLowerCase()){
                            alert("Filter Type already existed.Please try with different one.");
                            document.getElementById(id).value="";
                             return false;
                        }
                    }else{
                            if((FilterData[k].filters).length>0){
                              //  alert("test");

                                for(var j=0;j<(FilterData[k].filters).length;j++){
                                    console.log("filterL2"+FilterData[k].filters[j].FILTER_NAME);
                                    if((FilterData[k].filters[j].FILTER_NAME).toLowerCase()==strUser.toLowerCase()){

                                        alert("Filter Type already existed.Please try with different one.");
                                        document.getElementById(id).value="";
                                        return false;
                                    }

                                }
                            }
                        }


                    
                   
                }


            }else{

            axios.get(global.Ip + global.Port + '/asset/allfilters',{
                headers: {
                    "user_email":sessionStorage.getItem('user_email')                
                }
            }).then(res => {
                console.log(res);
                const FilterData = res.data.allFilters;
                global.filterData=FilterData;
                // this.setState({ FilterData });

                // console.log(FilterData);
                for(var k=0;k<FilterData.length;k++){
                    if(id=="EnterParentFilter"){
                        // alert(FilterData[k].Type);
                        if((FilterData[k].Type!=null) && (FilterData[k].Type!=undefined ) && (FilterData[k].Type!=""))
                       {
                            if((FilterData[k].Type).toLowerCase()==strUser.toLowerCase()){
                                alert("Filter Type already existed.Please try with different one.");
                                document.getElementById(id).value="";
                                return false;
                            }
                        }
                    }else{
                      //  alert("test");
                        if(id.indexOf("Parent")==-1){
                            if((FilterData[k].filters).length>0){
                                for(var j=0;j<(FilterData[k].filters).length;j++){
                                    // alert((FilterData[k].filters[j].FILTER_NAME).toLowerCase()==strUser.toLowerCase());
                                    // console.log("filterL2"+FilterData[k].filters[j].FILTER_NAME);
                                    console.log((FilterData[k].filters[j].FILTER_NAME).toLowerCase());
                                    console.log((strUser).toLowerCase());
                                    if((FilterData[k].filters[j].FILTER_NAME).toLowerCase()==strUser.toLowerCase()){

                                        alert("Filter Type already existed.Please try with different one.");
                                        document.getElementById(id).value="";
                                        return false;
                                    }

                                }
                            }
                        }else{
                            if((FilterData[k].Type!=null) && (FilterData[k].Type!=undefined) && (FilterData[k].Type!=""))
                            {
                                 if((FilterData[k].Type).toLowerCase()==strUser.toLowerCase()){
                                     alert("Filter Type already existed.Please try with different one.");
                                     document.getElementById(id).value="";
                                     return false;
                                 }
                             }
                             
                        }
                            
                        }


                    
                   
                }
            })

        }
            // console.log(strUser);

        }
      
    // const { open } = this.state;  
    function Mappedpanel(event){
        document.getElementById("MappedFilterPanel").classList.remove('hide');

    }
    function filterBox(event) {
        var j="";
        // alert(event.target.getAttribute("id"));
        document.getElementById("FilterPanel"+event.target.getAttribute("dataName")+"Data").classList.remove('hide');

        document.getElementById('CurrentFilterName'+event.target.getAttribute("dataName")+"Data").value=event.target.getAttribute("dataName");
        global.oldId=event.target.getAttribute("id");
        global.OlddataType=event.target.getAttribute("datatype");
        global.dataName=event.target.getAttribute("dataName");
        global.dataImage=event.target.getAttribute("dataImage");
        document.getElementById("filterimg"+event.target.getAttribute("dataName")+"Data").src=global.dataImage;
       // alert(global.oldId + "----"+ global.OlddataType + "---"+ global.dataName + "---"+  global.dataImage);
        // if(global.oldId=="14983ddhswcdol"){
            
        // }
       


        // if(global.selectedcheckbox!=undefined){
        //     // alert('1111');
        //     j+=global.selectedcheckbox +','+event.target.getAttribute("id");
        //     // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
        //     if(global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1 ){
        //         var array=global.selectedcheckbox.split(',');
        //         for (var i=array.length-1; i>=0; i--) {
        //             if (array[i] === event.target.getAttribute("id")) {
        //                 array.splice(i, 1);
        //                 j=  array.toString();
        //             }
        //         }

        //     }else{}
        // }else{
        //     j=event.target.getAttribute("id");
          
        // }
        var TrimmedVar=  j.replace(/^,|,$/g, '');
        // alert(TrimmedVar);
        global.selectedcheckbox= TrimmedVar;
    }
    function closePop() {
        document.getElementById("FilterPanel").classList.add("hide"); 
    }
    var ListOnChange = this.props.onChange;
    const { open } = this.state;  
    function filterBoxCheck(event) {
        // alert("test");
        var j="";
        // alert(global.selectedcheckbox);
        if(global.selectedcheckbox!=undefined){
            // alert('1111');
            j+=global.selectedcheckbox +','+event.target.getAttribute("id");
            // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
            if(global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1 ){
                var array=global.selectedcheckbox.split(',');
                for (var i=array.length-1; i>=0; i--) {
                    if (array[i] === event.target.getAttribute("id")) {
                        array.splice(i, 1);
                        j=  array.toString();
                    }
                }

            }else{}
        }else{
            j=event.target.getAttribute("id");
            // alert('1' +j);
        // if(global.selectedcheckbox!=undefined){

        //     if(global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1 ){
        //         var array=global.selectedcheckbox.split(',');
        //         for (var i=array.length-1; i>=0; i--) {
        //             if (array[i] === event.target.getAttribute("id")) {
        //                 array.splice(i, 1);
        //                 j=  array.toString();
        //             }
        //         }

        //     }else{ j=event.target.getAttribute("id");}
        // }
        }
        var TrimmedVar=  j.replace(/^,|,$/g, '');
        // alert(TrimmedVar);
        global.selectedcheckbox= TrimmedVar;
        // //   alert(global.selectedcheckbox);
        //  var n = global.selectedcheckbox.search("14983ddhswcdol");
        // //   alert(n);

        // if(n!=-1){
        //     global.selectedCategory="WIN";
        //     // alert('Win story is coming soon');
        //     // return false;
        //     document.getElementById("CategoryBox").value = "WIN";
        //     // document.getElementById('WinStory').style.display='block';

        // }
        // else{
        //     global.selectedCategory="ASSET";
        //     document.getElementById("CategoryBox").value = "ASSET";
        //     // document.getElementById('WinStory').style.display='block';
        // }
         ListOnChange(global.selectedcheckbox);
    }
    return (
        <div className="App">
        {/* <Header /> */}
        <div className="BodyContainer mt-4">
        <div class="Pull-right col-md-12"><a href="javascript:history.back(-1)">&#x2190; &nbsp;Back to Previous Screen</a></div>

        <Container fluid={false}>

          <div className="text-center col-md-12 Heading">{this.state.msg}</div>

            <Row>
                <Col md={12}>
                    <div className="title flex">
                        <div class="nowrap">FILTER MANAGEMENT</div>
                        <div class="titleLine"></div>
                    </div>
                </Col>
            </Row>  
        </Container>
        <Row className=" col-md-12" >
        {this.state.successMsg!="" &&
           <Col  className="col-md-12 text-center"><div class="alert">
           <img src="https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png"/>
                    {/* <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>  */}
                    {this.state.successMsg}<br/>
                    <button type="button" class="btn mt-20 btn-primary" name="Close" value="Close" onClick={(e) => this.onClose(e)}>Close</button>

                    </div> 
            </Col>
        } {this.state.successMsg=="" &&
           <Col className="col-md-12">
                        <Tabs defaultActiveKey="Add" id="uncontrolled-tab-example" className="mb-4">
                        
                                <Tab eventKey="Add" title="Add New Filter">
                                <form className="col-md-12 filtersForm">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"><strong>Enter Parent Filter</strong></label>
                                        <input type="text" class="form-control" id="EnterParentFilter" onBlur={(ev) => {
                                            // console.log(`Pressed keyCode ${ev.key}`);
                                        //  if (ev.key === 'Enter') {
                                            selectBox("EnterParentFilter");
                                            ev.preventDefault();
                                        // }
                                        }}  placeholder="Enter Parent Filter"/>

                                        <input type="file" class="upImage"  encType="multipart/form-data" name="file" id="parentImage" onChange={e => this.UploadMediaFile(e)} />  
                                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>  onClick={(e) => this.checkParentFilter()} */}
                                    </div>
                                    <div class="form-group col-md-12 clearfix mt-20">
                                        <div id="ChildFilter" className="mt-20">
                                            <label for="exampleInputPassword1">Enter Child Filter</label> 
                                            <input type="text" class="form-control" id="EnterChildFilter" placeholder="Enter Child Filter" onBlur={(ev) => {
                                                // console.log(`Pressed keyCode ${ev.key}`);
                                            //  if (ev.key === 'Enter') {
                                                selectBox("EnterChildFilter");
                                                ev.preventDefault();
                                            // }
                                            }}/>
                                            <input type="file" class="upImage" encType="multipart/form-data" name="file"  onChange={e => this.UploadChildMediaFile(e)}/>  

                                        </div>
                                        <div id="ChildFilterAdd">

                                         </div>
                                    </div>
                                    <Button variant="btn btn-primary mt-20"  size="sm"  data-id='DocumentLink' onClick={(e) => this.onAddNew('ChildFilter')}>+ Add New</Button>
                                  

                                    {/* <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                                    </div> */}
                                    <div>
                                        <button type="button" class="mt-20 btn btn-primary" name="submit" value="submit" onClick={(e) => this.onCreateClick(e)}>Submit</button>
                                     </div>
                                </form>

                               </Tab> 



                               <Tab eventKey="AddChild" title="Add Child Filter To The Existing filter">
                               <div class="collaps  filterMgmnt">

                                {this.state.FilterDataList.map((FilterData,index)=> 
                                    <div className={this.state.class}>
                                       {FilterData.Type !=null &&
                                       <>
                                        <h6 onClick={this.handleClick.bind(this,FilterData.Type)}><strong>{FilterData.Type}</strong><span className="expand" id={FilterData.Type+'expand'}>-</span></h6>
                                        
                                       
                                        <ListGroup  id={FilterData.Type} className="show">
                                       

                                        {FilterData.filters.map((Filters,index) => 
                                            <ListGroup.Item >
                                                {['checkbox'].map(type => (
                                                <div className="col-md-12" key={Filters.FILTER_ID} data-id={Filters.FILTER_NAME}>
                                                {Filters.FILTER_NAME}
                                                   
                                               </div>
                                                ))}

                                            </ListGroup.Item>)}
                                            <div class="form-group  filterfrm col-md-12 mt-20 hide" id={"ChildFilter"+FilterData.Type+"frm"}>
                                                <div id={"ChildFilter"+FilterData.Type} className="mt-20 hide">
                                                    <label for="exampleInputPassword1"><strong>Add Filter</strong></label> 
                                                    <input type="text" class="form-control" id={"EnterChildFilter"+FilterData.Type+"Data"}  placeholder="Add Filter" onBlur={(ev) => {
                                                        // console.log(`Pressed keyCode ${ev.key}`);
                                                    //  if (ev.key === 'Enter') {
                                                        selectBox("EnterChildFilter"+FilterData.Type+"Data");
                                                        ev.preventDefault();
                                                    // }
                                                    }}/>
                                                    <input class="mt-20" type="file"  encType="multipart/form-data" name="file"  onChange={e => this.UploadDirectSubChild(e)}/>  
                                                   
                                                </div>
                                                <div id={"ChildFilter"+FilterData.Type+"Add"} >

                                                </div>
                                                <Button variant="btn btn-primary mt-20" size="sm" data-id='DocumentLink' onClick={(e) => this.onAppoveFilter(FilterData.Type,FilterData.FILTER_TYPE_IMAGE )} >Save</Button> &nbsp;&nbsp;&nbsp;
                                                {/* <Button variant="outline-primary mt-20" size="sm" data-id='DocumentLink' >Cancel</Button>&nbsp;&nbsp; */}

                                            </div>

                                           

                                            <Button variant="btn btn-primary mt-20" size="sm" data-id='DocumentLink' onClick={(e) => this.onAddNew('ChildFilter'+FilterData.Type)}>+ Add New</Button>

                                            <input type="hidden" id={FilterData.Type+'val'} value="false"/>
                                        </ListGroup>
                                        </>
                                       }
                                </div>
                                )}
                                </div>

                               </Tab>   
                                <Tab eventKey="Edit" title="Edit filter">
                                <div class="collaps  filterMgmnt">
                                {/* <input id="CurrentFilterName" name="CurrentFilterName" readonly/> &rarr; 
                                 <input type="file"  encType="multipart/form-data" name="file"  onChange={e => this.UploadDirectSubChild(e)}/>  
                                    <input type="text" id="NewFilterName" name="NewFilterName"/>
                                {/* onClick={(e) => this.onAppoveFilter(FilterData.Type,FilterData.FILTER_TYPE_IMAGE )}  */}
                               {/* &nbsp;&nbsp; <Button variant="outline-primary mt-20" size="sm" data-id='DocumentLink' onClick={(e) => this.onEditfilter()} >Save</Button> &nbsp;&nbsp;&nbsp; */}

                                {this.state.FilterDataList.map((FilterData,index)=> 
                                    <div className={this.state.class}>
                                    {FilterData.Type !=null &&
                                    <>
                                    
                                        <h6 onClick={this.handleClick.bind(this,FilterData.Type)}><strong>{FilterData.Type}</strong><span className="pull-right pull-right ParentdeleteItem" onClick={filterBox}
                                                        custom
                                                        // type={type}
                                                        dataType={FilterData.Type}
                                                        dataName={FilterData.Type}
                                                        dataImage={FilterData.FILTER_TYPE_IMAGE}
                                                        id={FilterData.FILTER_ID} id={FilterData.Type+'ParentFilter'}>&#x270E;</span></h6>


                                                        <div class="modal-dialog hide" id={"FilterPanel"+FilterData.Type+"Data"}>

                                                            <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h6 class="modal-title">Edit Filter</h6>
                                                                    </div>
                                                                    <div class="modal-body">


                                                                    <div >
                                                                        <div class="mb-20">
                                                                        <label for="exampleInputPassword1">Current Parent Filter</label> 
                                                                        <input type="text" class="form-control" id={"CurrentFilterName"+FilterData.Type+"Data"} readonly="readonly" placeholder="Enter Child Filter" />
                                                                       </div>
                                                                       <div class="mb-20">
                                                                        <label>Current Parent Filter Image</label> 
                                                                       <div> <img id={"filterimg"+FilterData.Type+"Data"} src="" width="40px"/></div>
                                                                       </div>
                                                                       <div class="mb-20">
                                                                        <label for="exampleInputPassword1">Enter New Parent Filter</label> 
                                                                        <input type="text" class="form-control" id={"EditParentFilter"+FilterData.Type+"Data"}  placeholder="Enter Child Filter" onBlur={(ev) => {
                                                                            // console.log(`Pressed keyCode ${ev.key}`);
                                                                        //  if (ev.key === 'Enter') {
                                                                            selectBox("EditParentFilter"+FilterData.Type+"Data");
                                                                            ev.preventDefault();
                                                                        // }
                                                                        }}/>
                                                                        </div>
                                                                        <div class="mb-20">
                                                                        <label for="exampleInputPassword1">Upload New Child Filter Image</label> 

                                                                        <input type="file"  encType="multipart/form-data" name="file"  onChange={e => this.UploadEditParent(e)}/>  
                                                                        </div>
                                                                    </div>








                                                                </div>
                                                                <div class="modal-footer">
                                                                <Button variant="btn btn-primary" data-id='DocumentLink' onClick={(e) => this.onEditParentfilter(e)} >Save</Button>

                                                                    <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={(e) => this.closePopModal("FilterPanel"+FilterData.Type+"Data")} >Close</button>
                                                                </div>
                                                            </div>

                                                            </div>
                                        
                                    
                                        <ListGroup  id={FilterData.Type} className="show">
                                    

                                        {FilterData.filters.map((Filters,index) => 
                                    
                                            <ListGroup.Item >
                                                {['checkbox'].map(type => (
                                                <>
                                                <div key={Filters.FILTER_ID} data-id={Filters.FILTER_NAME} >
                                                <span  class="deletefilerPanel"> {Filters.FILTER_NAME}</span>   <span class="deleteItem" onClick={filterBox}
                                                        custom
                                                        type={type}
                                                        dataType={FilterData.Type}
                                                        dataName={Filters.FILTER_NAME}
                                                        dataImage={Filters.FILTER_IMAGE}
                                                        id={Filters.FILTER_ID}
                                                    > &#x270E; </span>
                                                        <div class="modal-dialog hide" id={"FilterPanel"+Filters.FILTER_NAME+"Data"}>

                                                        <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <h6 class="modal-title">Edit Filter</h6>
                                                                </div>
                                                                <div class="modal-body">


                                                                <div >
                                                                <div class="mb-20">
                                                                    <label for="exampleInputPassword1">Current Child Filter</label> 
                                                                    <input type="text" class="form-control" id={"CurrentFilterName"+Filters.FILTER_NAME+"Data"} readonly="readonly" placeholder="Enter Child Filter" />
                                                                 </div>
                                                                 <div class="mb-20">
                                                                    <label>Current Child Filter Image</label> 
                                                                      <div>  <img id={"filterimg"+Filters.FILTER_NAME+"Data"} src="" width="40px"/></div>
                                                                </div>  
                                                                <div class="mb-20">  
                                                                    <label for="exampleInputPassword1">Enter New Child Filter</label> 
                                                                      <input type="text" class="form-control" id={"EditChildFilter"+Filters.FILTER_NAME+"Data"}  placeholder="Enter Child Filter" onBlur={(ev) => {
                                                                        // console.log(`Pressed keyCode ${ev.key}`);
                                                                    //  if (ev.key === 'Enter') {
                                                                        selectBox("EditChildFilter"+Filters.FILTER_NAME+"Data");
                                                                        ev.preventDefault();
                                                                    // }
                                                                    }}/>
                                                               </div>
                                                               <div>
                                                                    <label for="exampleInputPassword1">Upload New Child Filter Image</label> 

                                                                    <input type="file"  encType="multipart/form-data" name="file"  onChange={e => this.UploadEditChild(e)}/>  
                                                                </div>
                                                                </div>







                                                
                                                            </div>
                                                            <div class="modal-footer">
                                                            <Button variant="btn btn-primary" data-id='DocumentLink' onClick={(e) => this.onEditfilter()} >Save</Button>

                                                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={(e) => this.closePopModal("FilterPanel"+Filters.FILTER_NAME+"Data")} >Close</button>
                                                            </div>
                                                    </div>

                                                </div>
                                                {/* {Filters.FILTER_NAME} */}
                                                    {/* <Form.Check onClick={filterBox}
                                                        custom
                                                        type={type}
                                                        dataType={FilterData.Type}
                                                        dataName={Filters.FILTER_NAME}
                                                        dataImage={Filters.FILTER_IMAGE}
                                                        id={Filters.FILTER_ID}
                                                        label={Filters.FILTER_NAME}
                                                        name="filterData"
                                                        /> */}

                                            </div>
                                            
                                            </>
                                                ))}
                                
                                            </ListGroup.Item>)}
                                        

                                        {/* popup */}
                                        

                                            {/* <Button variant="outline-primary mt-20" size="sm" onClick={(e) => this.onEditfilter(FilterData.Type)}>SAVE</Button> */}

                                            <input type="hidden" id={FilterData.Type+'val'} value="false"/>
                                        </ListGroup>
                                        </>
                                    }
                                </div>
                                )}
                                </div>
{/* test2                                 */}

                               </Tab>   

                                <Tab eventKey="Delete" title="Delete Filter">
                                <div class="collaps  filterMgmnt">
                                {/* <input id="CurrentFilterName" name="CurrentFilterName" readonly/> &rarr; 
                                 <input type="file"  encType="multipart/form-data" name="file"  onChange={e => this.UploadDirectSubChild(e)}/>  
                                    <input type="text" id="NewFilterName" name="NewFilterName"/>
                                {/* onClick={(e) => this.onAppoveFilter(FilterData.Type,FilterData.FILTER_TYPE_IMAGE )}  */}
                               {/* &nbsp;&nbsp; <Button variant="outline-primary mt-20" size="sm" data-id='DocumentLink' onClick={(e) => this.onEditfilter()} >Save</Button> &nbsp;&nbsp;&nbsp; */}

                                {this.state.FilterDataList.map((FilterData,index)=> 
                                    <div className={this.state.class}>
                                    {FilterData.Type !=null &&
                                    <>
                                    
                                        <h6 onClick={this.handleClick.bind(this,FilterData.Type)}><strong>{FilterData.Type}</strong>
                                        <span className="pull-right ParentdeleteItem"  onClick={(e) => this.deleteBoxParent(e,FilterData.Type)}
                                                        custom
                                                        // type={type}
                                                        dataType={FilterData.Type}
                                                        dataName={FilterData.Type}
                                                        dataImage={FilterData.FILTER_TYPE_IMAGE}
                                                        id={FilterData.FILTER_ID}><img width="12px" title="Delete" src="./img/Trash_Orange.png"/></span></h6>

                                        
                                    
                                        <ListGroup  id={FilterData.Type} className="show">
                                    

                                        {FilterData.filters.map((Filters,index) => 
                                    
                                            <ListGroup.Item >
                                                {['checkbox'].map(type => (
                                                <>
                                                <div key={Filters.FILTER_ID} data-id={Filters.FILTER_NAME} >
                                               <span class="deletefilerPanel">{Filters.FILTER_NAME}</span>  <span class="deleteItem" onClick={(e) => this.deleteBox(e,Filters.FILTER_ID)}                                                          custom
                                                        type={type}
                                                        dataType={FilterData.Type}
                                                        dataName={Filters.FILTER_NAME}
                                                        dataImage={Filters.FILTER_IMAGE}
                                                        id={Filters.FILTER_ID}
                                                    > <img src="./img/Trash_Orange.png" title="Delete" width="12px"/> </span>
                                                        
                                               

                                            </div>
                                            
                                            </>
                                                ))}
                                
                                            </ListGroup.Item>
                                        
                                        
                                        )}
                                        

                                        {/* popup */}
                                        

                                            {/* <Button variant="outline-primary mt-20" size="sm" onClick={(e) => this.onEditfilter(FilterData.Type)}>SAVE</Button> */}

                                        </ListGroup>
                                        </>
                                    }
                                </div>
                                )}
                                </div>

                               </Tab>  
                               <Tab eventKey="Map" title="Map Filter">

                               <div class="collaps  pull-left">

                               
                                 <div className="filters" id="SortFilterMapSection">
                                                <Form>
                                                    <Mappedfilters  onChange={this.mappingOnChange.bind(this)}/>

                                                    {/* <FiltersList  onChange={this.ListOnChange.bind(this)}/> */}
                                                </Form>
                                            </div>
                                           
                                </div>
                              

                                {/* <button class="btn btn-primary ml-20" onClick={Mappedpanel}>MAPPED TO</button>
                                <div class="modal-dialog hide" id={"MappedFilterPanel"}>

                                    <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Edit Filter</h4>
                                            </div>
                                            <div class="modal-body">


                                            <div className="filters" id="SortFilterSection">
                                                <Form>
                                                    <Mappedfilters  onChange={this.mappingOnChange.bind(this)}/>
                                                </Form>
                                            </div>








                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={(e) => this.ApplyFilters(e)} >Apply</button>
                                        </div>
                                    </div>

                                    </div> */}
                                     <div class="mapSearch">
                                        <Search onChange={this.searchOnChange.bind(this)}/>
                                     </div>

                                    <ImageCard onChange={this.mappingImageOnChange.bind(this)} />



                                <div class="clearfix text-center mb-20">
                                <p>This action will Map selected Assets/Wins to selected filters</p>
                                <button type="button" class="btn btn-primary" onClick={(e) => this.ApplyFilters(e)} >Apply Mapping</button>
                                </div>




                               {/* test4 */}
                               </Tab>  
                               <Tab eventKey="UnMap" title="UnMap Filter">
                               {/* test5 */}

                               {/* <Search onChange={this.searchOnChange.bind(this)}/> */}

                                <div class="collaps  pull-left">

                                <ClearFilter  onClick={this.ListOnUnMapChange.bind(this)}/>

                                <div className="filters" id="SortFilterSection">
                                                <Form>
                                                    {/* <Mappedfilters  onChange={this.mappingOnChange.bind(this)}/> */}

                                                    <FiltersList  onChange={this.ListOnUnMapChange.bind(this)}/>
                                                </Form>
                                            </div>
                                 {/* <button type="button" class="btn btn-block btn-primary" onClick={(e) => this.UnMapApplyFilters(e)} >UnMap Filter</button> */}

                                </div>
                        
                            <UnMapCards onChange={this.UnmappingImageOnChange.bind(this)} />

                            <div class="clearfix text-center mb-20">
                            <p>This action will UnMap selected Assets/Wins to selected filters</p>
                            <button type="button" class="btn btn-primary" onClick={(e) => this.UnMapApplyFilters(e)} >Confirm</button>
                            </div>
                        </Tab>  
                                                          
                              
                        </Tabs>
                </Col>   
        }           
             
        </Row>
        </div>
        <Footer/>
        </div>
    )
  }
}

export default FilterManagemnt
