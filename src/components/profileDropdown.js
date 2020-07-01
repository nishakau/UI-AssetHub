import React, { Component } from 'react';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

class profilePanel extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        invalidUrl: '',
        profileImg: "./img/Profile_Icon.png"
    }
    componentDidMount() {
        // sessionStorage.setItem('user_email','deepika.r@oracle.com');
        if ((sessionStorage.getItem('user_email') != "") && (sessionStorage.getItem('user_email') != null) && (sessionStorage.getItem('user_email') != undefined)) {
            axios.get(global.Ip + global.Port + '/user/getprofileimage/m/' + sessionStorage.getItem("user_email"), {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            }).then(response => {
                // alert("1");     

                if (response.data.msg == "No image is found") {
                    this.setState({
                        profileImg: "http://placehold.it/180"
                    });
                } else {
                    var d = new Date();
                    var n = d.getTime();
                    this.setState({
                        profileImg: response.data.image + "?" + n
                    });
                }
                // window.location.href=""; 
            });
        }


    }
    UploadMediaFile = (e) => {
        e.preventDefault();
        var data = new FormData()
        var filename = e.target.files[0].name;
        var filesize = e.target.files[0].size;
        // console.log(filename + filesize);
        var SplitExtn = filename.split('.');
        // console.log(SplitExtn[1]);
        var tolowerextn = (SplitExtn[1].toLowerCase());

        // console.log(tolowerextn);

        // if((e.target.getAttribute("id")=="upload-cover-photo") || (e.target.getAttribute("id")=="upload-cover-logo") ){
        // if(filesize <=100000 && (tolowerextn=='png' || tolowerextn=='jpg' || tolowerextn=='jpeg')){
        // if((e.target.files.size <=6000000) ){
        // console.log(e.target.files);

        for (const file of e.target.files) {
            function getBase64(file, val) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    //   console.log(reader.result);
                    //   console.log(val);
                    if (val == "CovertedPhotobase64") {
                        global.CovertedPhotobase64 = reader.result

                        axios.post(global.Ip + global.Port + '/user/uploadProfileImage/m/' + sessionStorage.getItem("user_email"), {
                            "image": global.CovertedPhotobase64,
                            "user_email": sessionStorage.getItem("user_email")

                        }, {
                            headers: {
                                "user_email": sessionStorage.getItem("user_email")

                            }
                        }).then(response => {
                            //  console.log(response);
                            //   this.setState({
                            //     profileImg:response.data.image+"?"+n
                            // });

                            if (response.data.status == "success") {
                                alert(response.data.msg);
                                var d = new Date();
                                var n = d.getTime();

                                document.getElementById('dummyImage').src = response.data.image + "?" + n;
                                document.getElementById('profileImg').src = response.data.image + "?" + n;
                                global.profileImg = response.data.image + "?" + n;
                                // alert(global.profileImg);

                            } else {
                                alert(response.data.msg);

                            }

                            // document.getElementById('blah').src = window.URL.createObjectURL(this.files);
                            // document.getElementById().src=response.data.i
                            // window.location.href=""; 
                        });
                        // console.log(global.CovertedPhotobase64);

                    }
                    //   else{
                    //     global.CovertedLogobase64=reader.result;
                    //   }
                };
                reader.onerror = function (error) {
                    console.log('Error: ', error);
                };
            }
            data.append('file', file, file.name);
            console.log(file);
            getBase64(file, "CovertedPhotobase64");


        }
        //     }

        // }
        // alert('1');
    }




    //   UploadMediaFile = (e) => {
    //     e.preventDefault();
    //     var data = new FormData()
    //     var filename=e.target.files[0].name;
    //     console.log(e.target.files);
    //     // alert(input);
    //     // console.log(input);
    //   }
    logout = (data) => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "";
        // window.location.href="https://oradocs-corp.sites.us2.oraclecloud.com/documents/logout";
    }
    openNav = (data) => {
        document.getElementById("mySidebar").style.width = "400px";
        // document.getElementById("mySidebar").style.= "250px";
        // document.getElementById("main").style.marginLeft = "250px";
    }
    closeNav = (data) => {
        document.getElementById("mySidebar").style.width = "0";
        // document.getElementById("main").style.marginLeft= "0";
    }
    render() {
        //   alert("1");
        // alert( global.profileImg);

        return (
            <>
                {/* <Dropdown icon={null}>
                        <Dropdown.Toggle   > */}
                <div id="mySidebar" class="sidebar">
                    <a href="javascript:void(0)" class="closebtn" onClick={this.closeNav.bind(this)}>×</a>
                    <div class="choose_file">
                        <div class="imgpanel">
                            <img id="dummyImage" src={this.state.profileImg} alt="your image" />
                            <img src="https://cdn3.iconfinder.com/data/icons/multimedia/100/camera_1-512.png" width="40px" id="camera" />
                            <input name="Select File" type='file' id="File" onChange={e => this.UploadMediaFile(e)} />
                        </div>
                        <div class="pull-right">
                            <div className="uName mt10 capitalize"> {sessionStorage.getItem("user_name")} </div>
                            <div className="uName"> {sessionStorage.getItem("user_email")} </div>
                            <div className="uName uppercase"><lable>LOB: </lable> {sessionStorage.getItem("LOB")} </div>

                        </div>
                    </div>


                    {/* <input /> */}
                    <Link to="/myFavourite">My Favourites</Link>
                    <Link to="/userPreference">User Preferences</Link>


                    {/* <a href="#">Manage Account</a> */}
                    {/* <Link to="/helpSupport">Help & Support</Link> */}
                    {/* <a href="javascript:void(0)" onClick={this.logout.bind(this)}>Logout</a> */}
                </div>
                {/* onClick={this.openNav.bind(this)} {global.username}*/}
                {global.username != "" && <div class="loginname" title={global.name} onClick={this.openNav.bind(this)}><img id="profileImg" src={this.state.profileImg} alt="your image" /></div>}

                {/* </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Link  to="/AssetManagement"><div>Create Asset</div></Link>
                            <Link  to="/WinManagement"><div>Create Win</div></Link>
                    </Dropdown.Menu>
                  </Dropdown> */}
            </>

        );
    }
}

export default profilePanel;