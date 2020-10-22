import React, { Component } from 'react'
import {connect} from 'react-redux';

import {userRoleChange} from '../actions';

import {
    Redirect
} from "react-router-dom";
import axios from 'axios';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginName: '',
            LoginPwd: '',
            LoginSuccess: ''
        };
    }
    componentDidMount() {
        // alert(global.loginStatus);
        // if ((sessionStorage.getItem("user_email") != undefined) && (sessionStorage.getItem("user_email") != null) && (sessionStorage.getItem("user_email") != "")) {
        if(this.props.state != undefined){
        if ((this.props.state.user_email != undefined) && (this.props.state.user_email != null) && (this.props.state.user_email != "")) {
            
            var reqParms = {
                "email": this.props.state.user_email,
                "user_email": this.props.state.user_email
            }
            axios.post(global.Ip + global.Port + '/user/findbyemail/', reqParms, {
                headers: {
                    "user_email": this.props.state.user_email

                }
            })
                .then(res => {
                    if (res.data.exist == 'no') {
                        global.loginStatus = res.data.exist;
                        // document.getElementById("myModalnew").style.display = 'block';
                        //     alert('test');
                        this.setState({
                            LoginSuccess: true
                        });
                        // alert('NOt registred');
                        //  document.getElementById("myModalnew").style.display = 'block'; 
                    } else {
                        let userRoleAccess={};
                        global.loginStatus = res.data.exist;
                        sessionStorage.setItem("role", res.data.role);
                        sessionStorage.setItem("location", res.data.location);
                        sessionStorage.setItem("pillar", res.data.pillar);
                        sessionStorage.setItem("phone", res.data.phone);
                        sessionStorage.setItem("leader", res.data.leader);


                        if (res.data.lob == null) {
                            sessionStorage.setItem("LOB", "Others");
                            userRoleAccess.lob ="Others";

                        } else {
                            sessionStorage.setItem("LOB", res.data.lob);
                            userRoleAccess.lob =res.data.lob;
                        }

                        userRoleAccess.role =res.data.role;
                        userRoleAccess.location = res.data.location;
                        userRoleAccess.pillar = res.data.pillar;
                        userRoleAccess.phone = res.data.phone;
                        userRoleAccess.leader = res.data.leader;
                       // userRoleAccess.user_email = sessionStorage.getItem("user_email");
                        userRoleAccess.user_email = this.props.state.user_email;
                        this.props.userRoleChange(userRoleAccess);
                        // global.role=res.data.role;
                        // global.location=res.data.location;
                        // global.pillar=res.data.pillar;
                        this.setState({
                            LoginSuccess: true
                        });
                    }
                }).catch(error => {
                    // alert(error+", Sorry for the delayed response");
                    sessionStorage.clear();
                    localStorage.clear();
                    var split = (window.location.href).split("?");
                    // alert(split[0]);
                    window.location.href = split[0] + '?eraseCache=true';
                });


        }} else {
            axios.get(global.baseDom + '/ssoheader.php')
                .then(res => {
                    if (res.data.indexOf('<!DOCTYPE html>') == -1) {
                        var split = res.data.split('#');
                        if ((split[1] != "") && (split[1] != undefined) && (split[1] != null)) {
                            global.email = split[0].trim();
                            global.name = split[1].trim();
                        } else { }
                        sessionStorage.setItem("user_name", global.name);
                        sessionStorage.setItem("user_email", global.email);
                        if (sessionStorage.getItem('user_name') != undefined) {
                            var reqParms = {
                                "email": sessionStorage.getItem('user_email'),
                                "user_email": sessionStorage.getItem("user_email")
                            }
                            axios.post(global.Ip + global.Port + '/user/findbyemail/', reqParms, {
                                headers: {
                                    "user_email": sessionStorage.getItem("user_email")

                                }
                            })
                                .then(res => {
                                    if (res.data.exist == 'no') {
                                        global.loginStatus = res.data.exist;
                                        // document.getElementById("myModalnew").style.display = 'block';
                                        //     alert('test');
                                        this.setState({
                                            LoginSuccess: true
                                        });
                                        // alert('NOt registred');
                                        //  document.getElementById("myModalnew").style.display = 'block'; 
                                    } else {
                                        let userRoleAccess ={};
                                        global.loginStatus = res.data.exist;
                                        sessionStorage.setItem("role", res.data.role);
                                        sessionStorage.setItem("location", res.data.location);
                                        sessionStorage.setItem("pillar", res.data.pillar);
                                        sessionStorage.setItem("phone", res.data.phone);
                                        sessionStorage.setItem("leader", res.data.leader);
                                        if (res.data.lob == null) {
                                            sessionStorage.setItem("LOB", "Others");
                                            userRoleAccess.lob = "Others";
                                        } else {
                                            sessionStorage.setItem("LOB", res.data.lob);
                                            userRoleAccess.lob =res.data.lob;
                                        }
                                        // global.role=res.data.role;
                                        // global.location=res.data.location;
                                        // global.pillar=res.data.pillar;
                                        this.setState({
                                            LoginSuccess: true
                                        });
                                        userRoleAccess.role =res.data.role;
                                        userRoleAccess.location = res.data.location;
                                        userRoleAccess.pillar = res.data.pillar;
                                        userRoleAccess.phone = res.data.phone;
                                        userRoleAccess.leader = res.data.leader;
                                        userRoleAccess.user_email = global.email;
                                        this.props.userRoleChange(userRoleAccess);
                                       
                                    }
                                }).catch(error => {
                                    // alert(error+", Sorry for the delayed response");
                                    sessionStorage.clear();
                                    localStorage.clear();
                                    var split = (window.location.href).split("?");
                                    // alert(split[0]);
                                    window.location.href = split[0] + '?eraseCache=true';
                                });

                            axios.post(global.Ip + global.Port + '/user/captureactivity/w/login/' + sessionStorage.getItem("user_name") + '/' + sessionStorage.getItem("user_email")).then(res => {
                            })
                        }
                    }

                    else {
                        //  alert("Bad session, Sorry for the delayed response");
                        sessionStorage.clear();
                        localStorage.clear();
                        var split = (window.location.href).split("?");
                        // alert(split[0]);
                        window.location.href = split[0] + '?eraseCache=true';
                    }

                }




                ).catch(error => {
                    //   alert(error+", Sorry for the delayed response");
                    sessionStorage.clear();
                    localStorage.clear();
                    var split = (window.location.href).split("?");
                    // alert(split[0]);
                    window.location.href = split[0] + '?eraseCache=true';
                });

        }






    }
    render() {
        if (this.state.LoginSuccess) {
            return <Redirect push to="/home" />;
        }
        return (
            <div></div>
        )
    }
}

const mapStateToProps = (state) =>{
    return state;

};


export default connect(mapStateToProps,{userRoleChange})(Footer);