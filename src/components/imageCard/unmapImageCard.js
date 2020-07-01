import React, { Component } from 'react'
import './index.css';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import axios from 'axios';
import UNSELECT from '../UnselectAll';
import UNSELECTWin from '../UnselectAllWins';
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
        assetMsg:'No records available',
      }
      componentDidMount() {
       
       
      }
    
  render() {
      var msg;
    var UnmappingImageOnChange = this.props.onChange;
    const { open } = this.state;  
    function filterBox(event) {
        var j="";
        var id=event.target.getAttribute("id");
      //  alert(id);
        // return false;
        // var splitId=id.split();
        setTimeout(function(){ 
            var SplitIdPanel=(id).split('Panel');

        // alert(document.getElementById(id).checked);
        //alert(document.getElementById(id).hasAttribute("checked"));
      if(document.getElementById(id).hasAttribute("checked")== true){
                //alert('1');
                document.getElementById(id).removeAttribute("checked");
                document.getElementById(id).checked = false;  
                //   alert('Asset unselected successfully');

        if(global.selectedUnMapAsset!=undefined){
            // alert('1111');
            var SplitIdPanel=(id).split('Panel');
            j+=global.selectedUnMapAsset +','+SplitIdPanel[0];
            // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
            if(global.selectedUnMapAsset.indexOf(SplitIdPanel[0]) != -1 ){
                var array=global.selectedUnMapAsset.split(',');
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
        global.selectedUnMapAsset= TrimmedVar;
        
        if((global.selectedUnMapWin!=undefined) && (global.selectedUnMapWin!=null) && (global.selectedUnMapWin!="")){
            var wins=global.selectedUnMapWin;
        }else{
            var wins="";
        }
        // alert(global.selectedAsset+'AW'+wins);
    }
    
    else{
        // alert(j);
        // console.log(global.selectedUnMapAsset);
        // console.log(SplitIdPanel);
        if(global.selectedUnMapAsset!=undefined){

        if(global.selectedUnMapAsset.indexOf(SplitIdPanel[0]) != -1 ){

            var array=global.selectedUnMapAsset.split(',');
            for (var i=array.length-1; i>=0; i--) {
                if (array[i] === SplitIdPanel[0]) {
                    array.splice(i, 1);
                    j=  array.toString();
                }
            }
            global.selectedUnMapAsset=j;
        }
    }else{
        j=SplitIdPanel[0];

    }
    var TrimmedVar=  j.replace(/^,|,$/g, '');
        // alert(TrimmedVar);
        global.selectedUnMapAsset= TrimmedVar;
        
        if((global.selectedUnMapWin!=undefined) && (global.selectedUnMapWin!=null) && (global.selectedUnMapWin!="")){
            var wins=global.selectedUnMapWin;
        }else{
            var wins="";
        }
        // alert(j);
        var att = document.createAttribute("checked");       // Create a "class" attribute
        att.value = "checked";    
        document.getElementById(id).setAttributeNode(att);

        document.getElementById(id).checked = true;  
    }
    console.log(global.selectedUnMapAsset);
    UnmappingImageOnChange(global.selectedUnMapAsset+'AW'+wins);
   
 }, 1000);


       
      

 
       
       
    }

    function filterBoxWin(event) {
        var j="";
        var id=event.target.getAttribute("id");
      
        setTimeout(function(){ 
            
            var SplitIdPanel=(id).split('Panel');
 
            
            // alert(document.getElementById(id).checked); 
            if( document.getElementById(id).hasAttribute("checked")== true){
                //alert('1');
                document.getElementById(id).checked = false;  
                document.getElementById(id).removeAttribute("checked");

                // alert('Win unselected successfully');

        if(global.selectedUnMapWin!=undefined){
            // alert('1111');
            var SplitIdPanel=(id).split('Panel');
            j+=global.selectedUnMapWin +','+SplitIdPanel[0];
            // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
            if(global.selectedUnMapWin.indexOf(SplitIdPanel[0]) != -1 ){
                var array=global.selectedUnMapWin.split(',');
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
        global.selectedUnMapWin= TrimmedVar;
        
        if((global.selectedUnMapAsset!=undefined) && (global.selectedUnMapAsset!=null) && (global.selectedUnMapAsset!="")){
            var Assets=global.selectedUnMapAsset;
        }else{
            var Assets='';
        }
        // alert(global.selectedAsset);
    } else{
        // alert(j);
        if(global.selectedUnMapWin!=undefined){
        if(global.selectedUnMapWin.indexOf(SplitIdPanel[0]) != -1 ){
            var array=global.selectedUnMapWin.split(',');
            for (var i=array.length-1; i>=0; i--) {
                if (array[i] === SplitIdPanel[0]) {
                    array.splice(i, 1);
                    j=  array.toString();
                }
            }
            global.selectedUnMapWin=j;
        }
    }else{
        j=SplitIdPanel[0];
    }
    var TrimmedVar=  j.replace(/^,|,$/g, '');
    // alert(TrimmedVar);
    global.selectedUnMapWin= TrimmedVar;
    
    if((global.selectedUnMapAsset!=undefined) && (global.selectedUnMapAsset!=null) && (global.selectedUnMapAsset!="")){
        var Assets=global.selectedUnMapAsset;
    }else{
        var Assets='';
    }
        // alert(j);
        var att = document.createAttribute("checked");       // Create a "class" attribute
        att.value = "checked";    
        document.getElementById(id).setAttributeNode(att);

        document.getElementById(id).checked = true;  

        // document.getElementById(id).checked = true;  
    }
    UnmappingImageOnChange(Assets+'AW'+global.selectedUnMapWin);

        
 }, 1000);
       
    }
    
    
      var AssetDatanew;
      var WinDatanew;
    //   console.log(global.assetData);
    if(global.LobMsg=="LOB"){
      var norecordMsg="No recommendations available for your LOB yet";

    }else{
        var norecordMsg=this.state.assetMsg;
    }
    
    if(global.assetUnMapData!=undefined){
        AssetDatanew=global.assetUnMapData;  
      }else{
        AssetDatanew=[];

      }
    //   console.log(AssetDatanew);
//alert(global.winData);
      if(global.winUnMapData!=undefined){

             WinDatanew=global.winUnMapData;  
      }else{
        WinDatanew=[];
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
        <Row className=" mt-30" >

           {/* <Col md={12} className="mb-12 text-center"> <strong >{global.errorMsg}</strong></Col> */}
           <h5 class="col-md-12">Assets ( {AsstCnt} ) <span class="ml-20"><UNSELECT/></span></h5>
           {AsstCnt != 0 ? (
           <div id="dataAssetShowUnMap" class="col-md-12">
            
                <div className="Scroll" >
                {AssetDatanew.map((AssetData,index)=> 
                    <Col md={4} data-id={AssetData.ASSET_ID}  id={AssetData.ASSET_ID}  className="mb-4 filterCard cards"  >
                    {/* {AssetData.PROMOTE==true &&
                    <div class="promoted" >Promoted</div>} */}
                    <div class="dfd ">

                    
                        <div className="cardInfor maptitle">
                        <label class="">
                            <input type="checkbox" checked onClick={filterBox} id={AssetData.ASSET_ID + "Panel"} name="filterDataUnMapAsset"/>
                            {/* <span class="checkmark"></span> */}
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
              <h5 class="col-md-12 mt-20 sectionCover">Wins ( {WinCnt} ) <span class="ml-20"><UNSELECTWin /></span></h5>
              
              <hr/>
              {WinCnt != 0 ? (  
              <div id="dataWinShowUnMap" class="dataWindow col-md-12">
                      <div className="Scroll" >

              
                {WinDatanew.map((winData,index)=> 
                 <Col md={4} data-id={winData.WINSTORY_ID}  id={winData.WINSTORY_ID} className="mb-4 filterCard cards" >
                    {/* {winData.PROMOTE==true &&
                    <div class="promoted" >Promoted</div>} */}
                    <div class="dfd">
                     {/* <Image src={winData.WINSTORY_LOGO} className="roundedCard"  /> */}
                     {/* <div class="viewEdit text-center home">
                              <a href="javascript:void(0);"  onClick={this.handleViewWin(winData.WINSTORY_ID)} class="view"> View </a>
                     </div> */}
                     <div className="cardInfor maptitle">
                     <label class="">
                        <input type="checkbox" checked="checked" onClick={filterBoxWin} id={winData.WINSTORY_ID + "Panel"} name="filterDataUnMapWin"/>
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
