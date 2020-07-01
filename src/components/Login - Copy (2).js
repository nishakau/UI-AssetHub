import React, { Component } from 'react'
import {
   Redirect
} from "react-router-dom";
import axios from 'axios';
export class INDEXCOMPONENT extends Component {
  constructor(props) {
    super(props);
    this.state = {
        LoginSuccess: 'login'
    };
}

  
 render() {
  

    if(this.state.LoginSuccess){
      
            return <Redirect push to="/web" />; 
        
     }
    return (
        <div>
            
        </div>
    )
  }
}

export default INDEXCOMPONENT
