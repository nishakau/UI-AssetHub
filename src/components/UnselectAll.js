import React, { Component } from 'react';
import { Header } from './Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form  from 'react-bootstrap/Form';
import Loader from './loader/loader';
import Footer from './Footer/Footer';
import Tabs from './tabs/tabs';
import Button from 'react-bootstrap/Button'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
class UnSelectAll extends Component {
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

        var items=document.getElementsByName("filterDataUnMapAsset");
        for(var i=0; i<items.length; i++){
            if(items[i].type=='checkbox'){
                items[i].checked=true;
                var att = document.createAttribute("checked");       // Create a "class" attribute
                att.value = "checked";    
                items[i].setAttributeNode(att);
        
              //  document.getElementById(id).checked = true;  
                items[i].checked=true;

            }

        }
        this.setState({ text:'Uncheck All' }); 
        
        global.UnSelectAllAssetWins=undefined;


      }
      uncheckAllAssets = () =>{

        var items=document.getElementsByName("filterDataUnMapAsset");
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
  
  export default UnSelectAll;