import React, { Component } from 'react'
import './index.css';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {  
       
      UniqueVisitorCount:''
    };
  }
  componentDidMount() {
    
    if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
    {
    // sessionStorage.setItem('user_email','deepika.r@oracle.com');
    // sessionStorage.setItem('user_name','deepika R');

    var name=sessionStorage.getItem('user_name');
      if(name!=undefined){
        var firsttwoletter = name.substring(0,1);
        this.setState({
            username: firsttwoletter,
            name:name
        });
        global.username=firsttwoletter;
        global.name=name;
      }
      
    axios.get(global.Ip + global.Port + '/asset/banner',{
                headers: {
                    "user_email":sessionStorage.getItem('user_email')         
        
                }
        })
      .then(res => {
        global.totalUniqueVisitors=(res.data.visit[0].COUNT) + (res.data.visit[1].COUNT);
        //  alert(global.totalUniqueVisitors);
            this.setState({ UniqueVisitorCount: global.totalUniqueVisitors});
      })

    }

     
  }
  render() {
    

     
  





    return (

      
        <div className="footer">
        <div className="flex">
        <hr/>
            <img src="../img/Oracle_Logo.png" style={{height:'25px'}} /> 
            <div className="ml-5 text-center footerTitle">&copy;	Powered by &nbsp; &#10077; NATech Solution Hubs &#10078;
            </div>
            <img id="Loader" class="hide" src="https://i.pinimg.com/originals/58/4b/60/584b607f5c2ff075429dc0e7b8d142ef.gif" height="30px"/>
            <div class="pull-right uniqueVisitors">Total  Visitors : <strong>{global.totalUniqueVisitors}</strong></div>
        </div>
      </div>
    )
  }
}

export default Footer
