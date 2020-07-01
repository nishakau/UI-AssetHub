import React, { Component } from 'react'
import './index.css';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import SelectALL from '../selectAll';
import SelectALLWin from '../selectAllWins';

import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
export class FilterImageCard extends Component {
    state = {
        AssetData: [],
        winData:[],
        redirectPage:'', AssetID:'', redirectEditPage:'',classDeploy:'',redirectDeployPage:'',redirectWinPage:'',winID:'',
        assetMsg:'No matched record are available for your search yet',
        // WinMsg:'No matched record are available for your search yet'
      }
      componentDidMount() {
       
        if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
        {
        global.assetData=undefined;
        axios.get(global.Ip + global.Port + '/asset/allAssetsFilters', {
            headers: {
                filters: "170k5dr4xvz",
                sortBy: "createdDate",
                order: "desc",
                "offset":0,
                "limit":-1,
                "user_email":sessionStorage.getItem("user_email")
               
            }
          })
          .then(res => {
            //   console.log(res.data);
            const AssetData = res.data.ASSETS;
            global.AssetCount=res.data.TOTALCOUNT;
            global.AssetselectAll= res.data.ASSETS;
            this.setState({ AssetData });
          })
          global.winData=undefined;

        //   var mainUrl=global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
        //   var header= {
        //           "offset":0,
        //           "limit":-1,
        //           "searchString":Searchdata,
        //           "filters":SplitCat[0]
        //       }
        axios.get(global.Ip + global.Port + '/winstory/getAllWinStoryByFilters', {
            headers: {
                filters: "14983ddhswcdol",
                limit: -1,
                offset: 0,
                sortBy: "createdDate",
                order: "desc",
                "user_email":sessionStorage.getItem("user_email")
                
              }
          })
          .then(res => {
            //    console.log(res.data);
            //    alert('1');
            const winData = res.data.WINSTORIES;
            global.WinselectAll= res.data.WINSTORIES;
            global.WinCount=res.data.TOTALCOUNT;
            this.setState({ winData });
          })
        }
      }
      handleView = id => event => {
         // alert(sessionStorage.getItem('user_email'));
        var resparam=  {
            "assetId":id,
            "viewed_on":"Web",
            "viewedBy":sessionStorage.getItem('user_email'),
            'viewed_by_username':sessionStorage.getItem('user_name'),
            "user_email":sessionStorage.getItem("user_email")
           
        }
        axios.post(global.Ip + global.Port + '/asset/views', resparam,{ headers: {
            "user_email": sessionStorage.getItem("user_email")             

        }})
          .then(res => {
                if(res.data.status=="view added"){
                   console.log('Added View'); 
                }  
          })
          this.setState({
                redirectPage: true,
                AssetID:id,
                TabStatus:'Details'
            }); 
            global.TabStatus='Details'
      }
      handleViewWin = id => event => {
        //   alert('test');
        // alert(sessionStorage.getItem('user_email'));
       var resparam=  {
           "winstoryId":id,
           "viewed_on":"w",
           "viewed_by_email":sessionStorage.getItem('user_email'),
           'viewed_by_username':sessionStorage.getItem('user_name'),
            "user_email":sessionStorage.getItem("user_email")
        
       }
       axios.post(global.Ip + global.Port + '/winstory/view', resparam,{ headers: {
        "user_email": sessionStorage.getItem("user_email")             

    }})
         .then(res => {
               if(res.data.status=="view added"){
                  console.log('Added View'); 
               }  
         })
         this.setState({
               redirectWinPage: true,
               winID:id,
               TabStatus:'Details'
           }); 
           global.TabStatus='Details'
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
  render() {
    var mappingImageOnChange = this.props.onChange;
    const { open } = this.state;  



    function filterBox(event) {
        var j="";
        var id=event.target.getAttribute("id");
      //  alert(id);
        // return false;
        // var splitId=id.split();
        setTimeout(function(){ 
            var SplitIdPanel=(id).split('MAP');

        // alert(document.getElementById(id).checked);
        //alert(document.getElementById(id).hasAttribute("checked"));
      if(document.getElementById(id).hasAttribute("checked")== false){


        var att = document.createAttribute("checked");       // Create a "class" attribute
        att.value = "checked";    
        document.getElementById(id).setAttributeNode(att);

        document.getElementById(id).checked = true;  



                //alert('1');
                // document.getElementById(id).removeAttribute("checked");
                // document.getElementById(id).checked = false;  
                //   alert('Asset unselected successfully');

        if(global.selectedMapAsset!=undefined){
            // alert('1111');
            var SplitIdPanel=(id).split('MAP');
            j+=global.selectedMapAsset +','+SplitIdPanel[0];
            // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
            if(global.selectedMapAsset.indexOf(SplitIdPanel[0]) != -1 ){
                var array=global.selectedMapAsset.split(',');
                for (var i=array.length-1; i>=0; i--) {
                    if (array[i] === SplitIdPanel[0]) {
                        array.splice(i, 1);
                        j=  array.toString();
                    }
                }

            }else{}
        }else{
            j=SplitIdPanel[0];
            // alert()
            
        }
        var TrimmedVar=  j.replace(/^,|,$/g, '');
        // alert(TrimmedVar);
        global.selectedMapAsset= TrimmedVar;
        
        if((global.selectedMapWin!=undefined) && (global.selectedMapWin!=null) && (global.selectedMapWin!="")){
            var wins=global.selectedMapWin;
        }else{
            var wins="";
        }
        // alert(global.selectedAsset+'AW'+wins);
    }
    
    else{
        // alert(j);
        // console.log(global.selectedUnMapAsset);
        // console.log(SplitIdPanel);
        if(global.selectedMapAsset!=undefined){

        if(global.selectedMapAsset.indexOf(SplitIdPanel[0]) != -1 ){

            var array=global.selectedMapAsset.split(',');
            for (var i=array.length-1; i>=0; i--) {
                if (array[i] === SplitIdPanel[0]) {
                    array.splice(i, 1);
                    j=  array.toString();
                }
            }
            global.selectedMapAsset=j;
        }
    }else{
        j=SplitIdPanel[0];

    }
    var TrimmedVar=  j.replace(/^,|,$/g, '');
        // alert(TrimmedVar);
        global.selectedMapAsset= TrimmedVar;
        
        if((global.selectedMapWin!=undefined) && (global.selectedMapWin!=null) && (global.selectedMapWin!="")){
            var wins=global.selectedMapWin;
        }else{
            var wins="";
        }
        // alert(j);
        document.getElementById(id).checked = false;  
        document.getElementById(id).removeAttribute("checked");
    }
    // alert(global.selectedMapAsset);
    mappingImageOnChange(global.selectedMapAsset+'AW'+wins);
   
 }, 1000);


       
      

 
       
       
    }

    function filterBoxWin(event) {
        var j="";
        var id=event.target.getAttribute("id");
      
        setTimeout(function(){ 
            
            var SplitIdPanel=(id).split('MAP');
 
            
            // alert(document.getElementById(id).checked); 
            if( document.getElementById(id).hasAttribute("checked")== false){
                //alert('1');
                var att = document.createAttribute("checked");       // Create a "class" attribute
                att.value = "checked";    
                document.getElementById(id).setAttributeNode(att);
        
                document.getElementById(id).checked = true;  

                // alert('Win unselected successfully');

        if(global.selectedMapWin!=undefined){
            // alert('1111');
            var SplitIdPanel=(id).split('MAP');
            j+=global.selectedMapWin +','+SplitIdPanel[0];
            // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
            if(global.selectedMapWin.indexOf(SplitIdPanel[0]) != -1 ){
                var array=global.selectedMapWin.split(',');
                for (var i=array.length-1; i>=0; i--) {
                    if (array[i] === SplitIdPanel[0]) {
                        array.splice(i, 1);
                        j=  array.toString();
                    }
                }

            }else{}
        }else{
            j=SplitIdPanel[0];
            // alert()
            
        }
        var TrimmedVar=  j.replace(/^,|,$/g, '');
        // alert(TrimmedVar);
        global.selectedMapWin= TrimmedVar;
        
        if((global.selectedMapAsset!=undefined) && (global.selectedMapAsset!=null) && (global.selectedMapAsset!="")){
            var Assets=global.selectedMapAsset;
        }else{
            var Assets='';
        }
        // alert(global.selectedAsset);
    } else{
        // alert(j);
        if(global.selectedMapWin!=undefined){
        if(global.selectedMapWin.indexOf(SplitIdPanel[0]) != -1 ){
            var array=global.selectedMapWin.split(',');
            for (var i=array.length-1; i>=0; i--) {
                if (array[i] === SplitIdPanel[0]) {
                    array.splice(i, 1);
                    j=  array.toString();
                }
            }
            global.selectedMapWin=j;
        }
    }else{
        j=SplitIdPanel[0];
    }
    var TrimmedVar=  j.replace(/^,|,$/g, '');
    // alert(TrimmedVar);
    global.selectedMapWin= TrimmedVar;
    
    if((global.selectedMapAsset!=undefined) && (global.selectedMapAsset!=null) && (global.selectedMapAsset!="")){
        var Assets=global.selectedMapAsset;
    }else{
        var Assets='';
    }
        // alert(j);
        document.getElementById(id).checked = false;  
        document.getElementById(id).removeAttribute("checked");

        // document.getElementById(id).checked = true;  
    }
    mappingImageOnChange(Assets+'AW'+global.selectedMapWin);

        
 }, 1000);
       
    }


















    // function filterBox(event) {
    //     var j="";
 
       
    //    //  alert(global.selectedAsset);
    //     if(global.selectedMapAsset!=undefined){
    //         // alert('1111');
    //         j+=global.selectedMapAsset +','+event.target.getAttribute("id");
    //         // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
    //         if(global.selectedMapAsset.indexOf(event.target.getAttribute("id")) != -1 ){
    //             var array=global.selectedMapAsset.split(',');
    //             for (var i=array.length-1; i>=0; i--) {
    //                 if (array[i] === event.target.getAttribute("id")) {
    //                     array.splice(i, 1);
    //                     j=  array.toString();
    //                 }
    //             }

    //         }else{}
    //     }else{
    //         j=event.target.getAttribute("id");
    //       //  alert(j);
    //     // if(global.selectedcheckbox!=undefined){

    //     //     if(global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1 ){
    //     //         var array=global.selectedcheckbox.split(',');
    //     //         for (var i=array.length-1; i>=0; i--) {
    //     //             if (array[i] === event.target.getAttribute("id")) {
    //     //                 array.splice(i, 1);
    //     //                 j=  array.toString();
    //     //             }
    //     //         }

    //     //     }else{ j=event.target.getAttribute("id");}
    //     // }
    //     }
    //     var TrimmedVar=  j.replace(/^,|,$/g, '');
    //     // alert(TrimmedVar);
    //     global.selectedMapAsset= TrimmedVar;
    //      // alert(global.selectedAsset);
    //     //  var n = global.selectedcheckbox.search("14983ddhswcdol");
    //     // //   alert(n);

    //     // if(n!=-1){
    //     //     global.selectedCategory="WIN";
    //     //     // alert('Win story is coming soon');
    //     //     // return false;
    //     //     document.getElementById("CategoryBox").value = "WIN";
    //     //     // document.getElementById('WinStory').style.display='block';

    //     // }
    //     // else{
    //     //     global.selectedCategory="ASSET";
    //     //     document.getElementById("CategoryBox").value = "ASSET";
    //     //     // document.getElementById('WinStory').style.display='block';
    //     // }
    //  //   alert(global.selectedAsset);
    //     if((global.selectedMapWin!=undefined) && (global.selectedMapWin!=null) && (global.selectedMapWin!="")){
    //         var wins=global.selectedMapWin;
    //     }else{
    //         var wins="";
    //     }
    //     mappingImageOnChange(global.selectedMapAsset+'AW'+wins);
    // }

    // function filterBoxWin(event) {
    //     var j="";
 
       
    //    //  alert(global.selectedAsset);
    //     if(global.selectedMapWin!=undefined){
    //         // alert('1111');
    //         j+=global.selectedMapWin +','+event.target.getAttribute("id");
    //         // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
    //         if(global.selectedMapWin.indexOf(event.target.getAttribute("id")) != -1 ){
    //             var array=global.selectedMapWin.split(',');
    //             for (var i=array.length-1; i>=0; i--) {
    //                 if (array[i] === event.target.getAttribute("id")) {
    //                     array.splice(i, 1);
    //                     j=  array.toString();
    //                 }
    //             }

    //         }else{}
    //     }else{
    //         j=event.target.getAttribute("id");
    //       //  alert(j);
    //     // if(global.selectedcheckbox!=undefined){

    //     //     if(global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1 ){
    //     //         var array=global.selectedcheckbox.split(',');
    //     //         for (var i=array.length-1; i>=0; i--) {
    //     //             if (array[i] === event.target.getAttribute("id")) {
    //     //                 array.splice(i, 1);
    //     //                 j=  array.toString();
    //     //             }
    //     //         }

    //     //     }else{ j=event.target.getAttribute("id");}
    //     // }
    //     }
    //     var TrimmedVar=  j.replace(/^,|,$/g, '');
    //     // alert(TrimmedVar);
    //     global.selectedMapWin= TrimmedVar;
    //      // alert(global.selectedAsset);
    //     //  var n = global.selectedcheckbox.search("14983ddhswcdol");
    //     // //   alert(n);

    //     // if(n!=-1){
    //     //     global.selectedCategory="WIN";
    //     //     // alert('Win story is coming soon');
    //     //     // return false;
    //     //     document.getElementById("CategoryBox").value = "WIN";
    //     //     // document.getElementById('WinStory').style.display='block';

    //     // }
    //     // else{
    //     //     global.selectedCategory="ASSET";
    //     //     document.getElementById("CategoryBox").value = "ASSET";
    //     //     // document.getElementById('WinStory').style.display='block';
    //     // }
    //  //   alert(global.selectedAsset);
    //     if((global.selectedMapAsset!=undefined) && (global.selectedMapAsset!=null) && (global.selectedMapAsset!="")){
    //         var Assets=global.selectedMapAsset;
    //     }else{
    //         var Assets='';
    //     }
    //     mappingImageOnChange(Assets+'AW'+global.selectedMapWin);
    // }
    













      var msg;
    if(this.state.redirectPage){
        // window.open("/details/?" + this.state.AssetID, '_blank');

        return <Redirect push to={"/details/?" + this.state.AssetID} />; 
    }
    if(this.state.redirectDeployPage){
        // window.open("/deploy/?" + this.state.deployAssetID, '_blank');

        return <Redirect push to={"/deploy/?" + this.state.deployAssetID} />; 
    }
    if(this.state.redirectEditPage){
        // window.location.href="/AssetManagement/?" + this.state.EditAssetID;
        // window.open("/AssetManagement/?" + this.state.EditAssetID, '_blank');

        return <Redirect push to={"/AssetManagement/?" + this.state.EditAssetID} />; 
    }
    if(this.state.redirectWinPage){
        // window.open("/WSdetails/?" + this.state.winID, '_blank');

        return <Redirect push to={"/WSdetails/?" + this.state.winID} />; 

    }
      var AssetDatanew;
      var WinDatanew;
    //   console.log(global.assetData);
    if(global.LobMsg=="LOB"){
      var norecordMsg="No recommendations available for your LOB yet";

    }else{
        var norecordMsg=this.state.assetMsg;
    }
    
    if(global.assetMapData!=undefined){
        AssetDatanew=global.assetMapData;  
      }else{
        AssetDatanew=this.state.AssetData;
      }
// console.log(AssetDatanew);
      if(global.winMapData!=undefined){

             WinDatanew=global.winMapData;  
      }else{
        WinDatanew=this.state.winData;
      }
      var AsstCnt=AssetDatanew.length;
      var WinCnt=WinDatanew.length;
    //   console.log(AsstCnt);
      setTimeout(function(){
        if(AsstCnt>0){
            msg=''; 
            // document.getElementById('dataAssetShow').classList.remove('hide');
           
    
    
            }else{
                  
                msg='No Record found.';
                // document.getElementById('dataAssetShow').classList.add('hide');    // global.
    
            }
          if(WinCnt>0){
            msg=''; 
            // document.getElementById('dataAssetShow').classList.remove('hide');
            // document.getElementById('dataWinShow').classList.remove('hide');
            
    
    
            }else{
                msg='No Record found.';
            // document.getElementById('dataAssetShow').classList.add('hide');
            // document.getElementById('dataWinShow').classList.add('hide');    
    
    
            }
         }, 500);
         

// alert(global.selectedCategory);
    //   console.log("test");
    //   console.log(WinDatanew);

    return (
        <Row className="mt-10" >

           {/* <Col md={12} className="mb-12 text-center"> <strong >{global.errorMsg}</strong></Col> */}
           <h5 class="col-md-12">Assets ( {AsstCnt} ) <span class="ml-20"><SelectALL /></span></h5>
           {AsstCnt != 0 ? (
           <div id="dataAssetShowMap" class="col-md-12">
            
                <div className="Scroll" id="SortCardMapSection" >
 {AssetDatanew.map((AssetData,index)=> 
    <Col md={4} data-id={AssetData.ASSET_ID}  id={AssetData.ASSET_ID}  className="mb-4 filterCard cards"  >
    {/* {AssetData.PROMOTE==true &&
    <div class="promoted" >Promoted</div>} */}
     <div class="dfd ">

      
        <div className="cardInfor maptitle">
        <label class="">
            <input type="checkbox" onClick={filterBox} id={AssetData.ASSET_ID  + "MAP"} name="filterDataPanelAsset"/>
            <span class="checkmark"></span>
        </label> 
       <div className="cardTitle" title= {AssetData.ASSET_TITLE}>
            
                {AssetData.ASSET_TITLE}
                <div className="small">{AssetData.ASSET_ID}</div>
            </div>
           
           
        </div>
    </div>
    {/* </div> */}
    </Col>
 )}

   </div>  


           </div>
 ):(
     <div>
    <Row className="errorMSG">
    <Col md={12} className="mb-12 pd40 text-center"> <strong >{norecordMsg}</strong></Col>
  </Row>
  </div>
)}


           {/* {global.selectedCategory != "WIN" ? ( <> */}
            
           {/* </> ):(
              <> */}
              <>
              <h5 class="col-md-12 mt-20 sectionCover">Wins ( {WinCnt} )<span class="ml-20"><SelectALLWin /></span></h5>
              
              <hr/>
              {WinCnt != 0 ? (  
              <div id="dataWinShowMap" class="dataWindow col-md-12">
                      <div className="Scroll" >

              
                {WinDatanew.map((winData,index)=> 
                 <Col md={4} data-id={winData.WINSTORY_ID}  id={winData.WINSTORY_ID } className="mb-4 filterCard cards" >
                    {/* {winData.PROMOTE==true &&
                    <div class="promoted" >Promoted</div>} */}
                    <div class="dfd">
                     {/* <Image src={winData.WINSTORY_LOGO} className="roundedCard"  /> */}
                     {/* <div class="viewEdit text-center home">
                              <a href="javascript:void(0);"  onClick={this.handleViewWin(winData.WINSTORY_ID)} class="view"> View </a>
                     </div> */}
                     <div className="cardInfor maptitle">
                     <label class="">
                        <input type="checkbox" onClick={filterBoxWin} id={winData.WINSTORY_ID + "MAP"} name="filterDataPanelWin" />
                        <span class="checkmark"></span>
                    </label> 
                    <div className="cardTitle" title= {winData.WINSTORY_NAME}>&nbsp;
                         
                             {winData.WINSTORY_NAME}
                             <div className="small">{winData.WINSTORY_ID}</div>
                         </div>
                        
                     </div>
                     </div>
                     {/* </div> */}
                 </Col>
              )}
              </div>
             </div>):(<Row className="errorMSG">
                  <Col md={12} className="mb-12 pd40 text-center"> <strong >{norecordMsg}</strong></Col>
              </Row>)}
              </>
            {/* </>  */}
          {/* // )} */}
             
        </Row>
    )
  }
}

export default FilterImageCard
