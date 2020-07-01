import React, { Component } from 'react';
import { Header } from './Header';

// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Search } from './search/Search';
// import axios from 'axios';
// import Container from 'react-bootstrap/Container';
// import ImageCard from './imageCard/ImageCard';
// import Form  from 'react-bootstrap/Form';
// import FiltersList  from './filters/filterList';
// import Loader from './loader/loader';
// import Footer from './Footer/Footer';
// import ClearFilter from './clearFilters';
// import FilterManagement from './filterManagement';
// import Button from 'react-bootstrap/Button'
// import {Link,Redirect } from "react-router-dom";
// import SORTBY from "./sortBy";
// import DIALOG from './dialog';
// import CREATEDD from './createdropdown';
class MobReportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { 'assetTitle': 'Asset', componentMange: '', assetData: '', errorMsg: '', assetCount: '', filterData: '', searchParamResult: "", classClear: 'hide clearall small pull-right', disabledUI: false };
  }

  componentDidMount() {
    // sessionStorage.setItem('user_email','deepika.r@oracle.com');

    // axios.get(global.Ip + global.Port + '/asset/allAssetsFilters', {
    // headers: {
    //     "offset":0,
    //     "limit":-1,
    //     "user_email":sessionStorage.getItem("user_email")

    // }
    // })
    // .then(res => {
    //     // var msg;
    // // if(res.data.ASSETS.length==0){
    // //         msg='No Record found.';
    // //         document.getElementById('dataAssetShow').classList.add('hide');

    // // }else{
    // //         msg=''; 
    // //         document.getElementById('dataAssetShow').classList.remove('hide');

    // // }
    // this.setState({
    //     assetDataCount: "Asset ("+res.data.TOTALCOUNT +')',
    //     // errorMsg:msg

    // })


    // })
  }



  render() {
    // alert( global.role);


    return (
      <div className="App">
        {/* <Header /> */}
        <div class="container pd15">

          <p align="center">

            <iframe id="Reports"
              title="Reports"
              width="100%"
              height="850"
              src="https://assethuboac-orasenatdhubsblue02.analytics.ocp.oraclecloud.com/dv/ui?pageid=visualAnalyzer&reportmode=presentation&reportpath=%2F%40Catalog%2Fshared%2FAssethub-PROD%2FHeatMap%20-%20Prod">
            //src="https://assethuboac-orasenatdhubsred01.analytics.ocp.oraclecloud.com/dv/ui?pageid=visualAnalyzer&reportmode=presentation&reportpath=%2F%40Catalog%2Fshared%2FAsset%20Hub%2FAssethub%20Reports%20-%20I">

            </iframe>
          </p>

          {/* <iframe /> */}
        </div>
        {/* <Footer /> */}

      </div>

    );
  }
}

export default MobReportComponent;