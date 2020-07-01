import React, { Component } from 'react';

class SelecetAll extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        invalidUrl:'',
        text:'Check All'
      }
      componentDidMount() {
      
            
       
      }
      checkAllAssets = () =>{
        global.textdata=undefined;
        var items=document.getElementsByName("filterDataPanelAsset");
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox'){
                var att = document.createAttribute("checked");       // Create a "class" attribute
                att.value = "checked";    
                items[i].setAttributeNode(att);
        
              //  document.getElementById(id).checked = true;  
                items[i].checked=true;

            }

        }
        this.setState({ text:'Uncheck All' }); 
        global.SelectAllAssetWins=true;


      }
      uncheckAllAssets = () =>{
        global.textdata=undefined;
        var items=document.getElementsByName("filterDataPanelAsset");
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox')
                items[i].checked=false;
                items[i].removeAttribute("checked");
        }
        this.setState({ text:'Check All' }); 
        global.SelectAllAssetWins=undefined;

        

      }
  render() {
   var text;
  //  alert(global.textdata);
    if(global.textdata!=undefined){
      text=global.textdata;
    }else{
      text=this.state.text;

    }

        return (
            <>
              {( (text=="Check All")) ? (

                <a class="selectAll btn btn-primary btn-sm" href="javascript:void(0)" onClick={(e) => this.checkAllAssets()} >{text}</a>
              ):(
                <a class="selectAll btn btn-primary btn-sm" href="javascript:void(0)" onClick={(e) => this.uncheckAllAssets()}>{text}</a>
              )}
            </>
               
        );
    }
  }
  
  export default SelecetAll;