import React, { Component } from 'react';
class UnSelectAllWins extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        invalidUrl:'',
        text:'Uncheck All'
      }
      componentDidMount() {
      
            
       
      }
      checkAllAssets = () =>{

        var items=document.getElementsByName("filterDataUnMapWin");
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox'){
                items[i].checked=true;
                var att = document.createAttribute("checked");       // Create a "class" attribute
                att.value = "checked";    
                items[i].setAttributeNode(att);

            }

        }
        this.setState({ text:'Uncheck All' }); 
        
        global.UnSelectAllAssetWins=undefined;


      }
      uncheckAllAssets = () =>{

        var items=document.getElementsByName("filterDataUnMapWin");
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox')
                items[i].checked=false;
                items[i].removeAttribute("checked");
        }
        this.setState({ text:'check All' }); 
        global.UnSelectAllAssetWins=true;

        

      }
  render() {
   

        return (
            <>
              {( (this.state.text=="Uncheck All")) ? (

                <a class="selectAll btn btn-primary btn-sm" href="javascript:void(0)" onClick={(e) => this.uncheckAllAssets()} >{this.state.text}</a>
              ):(
                <a class="selectAll btn btn-primary btn-sm" href="javascript:void(0)" onClick={(e) => this.checkAllAssets()}>{this.state.text}</a>
              )}
            </>
               
        );
    }
  }
  
  export default UnSelectAllWins;