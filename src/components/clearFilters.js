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
class AssetDetails extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        invalidUrl:''
      }
      componentDidMount() {
      
            
       
      }
  render() {
    var ListOnChange = this.props.onClick;
    function  UncheckAllFilters(event){
            global.selectedcheckbox= "";
            ListOnChange(global.selectedcheckbox);
            var items=document.getElementsByName('filterData');
                for(var i=0; i<items.length; i++){
                    if(items[i].type=='checkbox')
                        items[i].checked=false;
                }
                ListOnChange(global.selectedcheckbox);

        }

        return (
            <>
                <a class={global.classClear} href="javascript:void(0)" onClick={UncheckAllFilters}>Clear All</a>
            </>
               
        );
    }
  }
  
  export default AssetDetails;