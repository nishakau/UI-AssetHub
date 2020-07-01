import React, { Component } from 'react'
import {
   Redirect
} from "react-router-dom";
import axios from 'axios';

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        LoginName: '',
        LoginPwd: '',
        LoginSuccess: ''
    };
}
componentDidMount() {
    {/* Check if user is already loggedIn */}
    axios.get(global.Ip + '/ssoheader.php')
    .then(res => {
        // console.log('header'+res.data);
        var split=res.data.split('#');
        global.email=split[0].trim();
        global.name=split[1].trim();
      //  console.log(global.email);

        // localStorage.setItem('user_email','deepika.r@oracle.com');
        // localStorage.setItem('user_name','deepika');
        sessionStorage.setItem("user_name",global.name);
        sessionStorage.setItem("user_email",global.email);
    
            if (sessionStorage.getItem('user_name') != undefined) {
                this.setState({
                    LoginSuccess: true
                });
    
            }
            sessionStorage.setItem("user_name",global.name);
            sessionStorage.setItem("user_email",global.email);


        // alert(name+'----'+email);    
    });
   
}  
  render() {
    if(this.state.LoginSuccess){
      return <Redirect push to="/home" />; 
  }
    // return <Redirect push to="/" />; 
    return (
        <div>
           
        </div>
    )
  }
}

export default Footer
