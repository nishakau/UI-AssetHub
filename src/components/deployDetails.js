import React, { Component } from 'react';
import { Header } from './Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Loader from './loader/loader';
import Footer from './Footer/Footer';
import Tabs from './tabs/tabs';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
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
        invalidUrl: ''
    }
    componentDidMount() {
        var url = window.location.href;
        if (url.indexOf('?') != -1) {

        }
        else {
            alert('Invalid Url');
            window.location.href = "/";
        }


        axios.get('http://132.145.141.18:3200/api/getOnlyActiveTenancies').then(res => {
            var tenancydrop = "<option>Select Tenancy</option>";

            for (var i = 0; i <= res.data.length - 1; i++) {
                tenancydrop += '<option value="' + res.data[i].tenancy_name + '">' + res.data[i].tenancy_name + '</option>';
            }
            this.setState({
                DropdownTenancy: tenancydrop
            });
        });

    }
    handleChangeAd = (e) => {
        var subnetdrop = "<option>Select Subnet</option>";
        var Vcn = document.getElementById('VCN').value;
        var Ad = document.getElementById('AD').value;
        if (Vcn != "" && Ad != "") {
            let Subnet_array = [];
            for (var i = 0; i <= global.dataResponse.length - 1; i++) {
                if ((Vcn == global.dataResponse[i].vcn_ocid) && (Ad == global.dataResponse[i].sub_ad)) {
                    Subnet_array.push(global.dataResponse[i].subnet_ocid);

                }
            }
            var arrloopedSubnet = removeDuplicates(Subnet_array);
            for (var j = 0; j <= arrloopedSubnet.length - 1; j++) {
                subnetdrop += '<option value="' + arrloopedSubnet[j] + '">' + arrloopedSubnet[j] + '</option>';
            }
            this.setState({
                subnetdrop: subnetdrop
            });
        }
        function removeDuplicates(arr) {
            let unique_array = []
            for (let i = 0; i < arr.length; i++) {
                if (unique_array.indexOf(arr[i]) == -1) {
                    unique_array.push(arr[i])
                }
            }
            return unique_array
        }
    }


    handleChangeCmptmnt = (e) => {
        var Vcndrop = "<option>Select VCN</option>";
        var Region = document.getElementById('Region').value;
        var Compartment = document.getElementById('Compartment').value;
        if (Region != "" && Compartment != "") {
            let Vcn_array = [];
            for (var i = 0; i <= global.dataResponse.length - 1; i++) {
                if ((Region == global.dataResponse[i].region) && (Compartment == global.dataResponse[i].compartment_ocid)) {
                    Vcn_array.push(global.dataResponse[i].vcn_ocid);

                }

            }
            var arrloopedVcn = removeDuplicates(Vcn_array);
            for (var j = 0; j <= arrloopedVcn.length - 1; j++) {
                Vcndrop += '<option value="' + arrloopedVcn[j] + '">' + arrloopedVcn[j] + '</option>';
            }
            this.setState({
                Vcndrop: Vcndrop
            });
        }
        function removeDuplicates(arr) {
            let unique_array = []
            for (let i = 0; i < arr.length; i++) {
                if (unique_array.indexOf(arr[i]) == -1) {
                    unique_array.push(arr[i])
                }
            }
            return unique_array
        }
    }
    handleChange = (e) => {

        var tenancySelected = document.getElementById("Tenancy").value;



        axios.get('http://132.145.141.18:3200/api/getmporderformDataByTenancy?id=' + tenancySelected)
            .then(res => {
                global.dataResponse = res.data;
                var regiondrop = "<option>Select Region</option>"; var Compartmentdrop = "<option>Select Compartment</option>"; var Addrop = "<option>Select Ad</option>"; var shapeNamedrop = "<option>Select Shape</option>";
                let region_array = [];
                let compartment_array = [];
                let Ad_array = [];
                let Subnet_array = [];
                for (var i = 0; i <= res.data.length - 1; i++) {
                    region_array.push(res.data[i].region);
                    compartment_array.push(res.data[i].compartment_ocid);
                    Ad_array.push(res.data[i].sub_ad);
                }
                var arrlooped = removeDuplicates(region_array);
                for (var j = 0; j <= arrlooped.length - 1; j++) {
                    regiondrop += '<option value="' + arrlooped[j] + '">' + arrlooped[j] + '</option>';
                }
                var arrloopedCompartment = removeDuplicates(compartment_array);
                for (var j = 0; j <= arrloopedCompartment.length - 1; j++) {
                    Compartmentdrop += '<option value="' + arrloopedCompartment[j] + '">' + arrloopedCompartment[j] + '</option>';
                }
                var arrloopedAd = removeDuplicates(Ad_array);
                for (var j = 0; j <= arrloopedAd.length - 1; j++) {
                    Addrop += '<option value="' + arrloopedAd[j] + '">' + arrloopedAd[j] + '</option>';
                }

                this.setState({
                    DropdownRegion: regiondrop,
                    Compartmentdrop: Compartmentdrop,
                    subnetAddrop: Addrop
                });
            });

        function removeDuplicates(arr) {
            let unique_array = []
            for (let i = 0; i < arr.length; i++) {
                if (unique_array.indexOf(arr[i]) == -1) {
                    unique_array.push(arr[i])
                }
            }
            return unique_array
        }

    }

    render() {
        function deployPop() {
            var Tenancy = document.getElementById('Tenancy').value;
            var Region = document.getElementById('Region').value;
            var Compartment = document.getElementById('Compartment').value;
            var VCN = document.getElementById('VCN').value;
            var Ad = document.getElementById('AD').value;
            var Subnet = document.getElementById('Subnet').value;
            var Shape = document.getElementById('Subnet').value;
            if (Tenancy == "Select Tenancy") {
                alert('Please select Tenancy');
                return false;
            } else if (Region == "Select Region") {
                alert('Please select Region');
                return false;
            } else if (Compartment == "Select Compartment") {
                alert('Please select Compartment');
                return false;
            } else if (VCN == "Select VCN") {
                alert('Please select VCN');
                return false;
            } else if (Ad == "Select Ad") {
                alert('Please select Ad');
                return false;
            } else if (Subnet == "Select Subnet") {
                alert('Please select Subnet');
                return false;
            } else {
                document.getElementById('loader').classList.remove('hide');
                document.getElementById('deploytoServer').classList.add('hide');
                document.getElementById('btnDeploy').classList.add('hide');
                // var Tenancy=document.getElementById('Tenancy').value;
                // var Region=document.getElementById('Region').value;
                // var Compartment=document.getElementById('Compartment').value;
                // var VCN=document.getElementById('VCN').value;

                var AD = 2;   //document.getElementById('AD').value;
                var Subnet = document.getElementById('Subnet').value;
                var Shape = document.getElementById('Shape').value;

                axios.get('http://132.145.141.18:3200/api/getmporderformDataByTenancy?id=' + Tenancy)
                    .then(res => {

                        // alert(res.data[0].tenancy_ocid);



                        var reqParms = {
                            "instance": "Linux",
                            "region": Region,
                            "AD": AD,
                            "shape": Shape,
                            "TenancyId": res.data[0].tenancy_ocid,
                            "cmptId": Compartment,
                            "subnetId": Subnet,
                            "vcnId": VCN,
                            "owner_chargeback": "string",
                            "owner_team": "string",
                            "owner_type": 'string',
                            "owner_uptime": 'string'
                        }

                        axios.post('http://132.145.141.18:3200/api/Initializescripts', reqParms)
                            .then(res => {
                                if (res.data.msg == "success") {
                                    axios.post('http://132.145.141.18:3200/api/RunScriptsInit', {
                                        "instance": "Linux"
                                    })
                                        .then(res => {
                                            console.log(res.data.msg);
                                            if (res.data.msg == "success") {

                                                axios.post('http://132.145.141.18:3200/api/RunScriptsApply')
                                                    .then(res => {

                                                        document.getElementById('loader').classList.add('hide');
                                                        document.getElementById('btnDeploy').classList.remove('hide');
                                                        document.getElementById('deploytoServer').classList.remove('hide');
                                                        global.tenancy_name = Tenancy;
                                                        document.getElementById('tenancycreatedId').innerHTML = global.tenancy_name + ' &nbsp; View deployment Log';
                                                        document.getElementById('DeployUCM').style.display = 'none';
                                                        document.getElementById('Deploystatus').style.display = 'block';

                                                    });

                                            }
                                            else {
                                                document.getElementById('loader').classList.add('hide');
                                                document.getElementById('btnDeploy').classList.remove('hide');
                                                document.getElementById('deploytoServer').classList.remove('hide');
                                                alert('There is some trouble in deployment. Sorry for inconvenience caused.');
                                                return false;
                                            }

                                        });
                                } else {
                                    alert('There is some trouble in deployment. Sorry for inconvenience caused.');
                                    return false;
                                }
                            }).catch((error) => {
                                if (error.response) {
                                    alert('There is some trouble in deployment. Sorry for inconvenience caused.');
                                    return false;

                                }
                            });
                    });
            }
        }

        // setTimeout(function() {
        //     var classname = document.getElementsByClassName("deploy");
        //     var openDialogBoxUi = function() {
        //         document.getElementById("myModal").style.display = 'block';

        //     };

        //     for (var i = 0; i < classname.length; i++) {
        //         classname[i].addEventListener('click', openDialogBoxUi, false);
        //     }
        // }, 3000);
        return (
            <div className="App">
                {/* <Header /> */}
                <div className="BodyContainer mt-4">
                    <Container fluid={false}>
                        <Row>
                            <Col md={8}>
                                <div id="myModal" class="" role="dialog">
                                    <div class="modal-dialog" id="DeployUCM">

                                        <div class="modal-content">
                                            <div class="modal-header">

                                                <h4 class="modal-title" id="DeployUCM">Deploy to UCM</h4>

                                            </div>
                                            <div class="modal-body">
                                                <div id="loader" class="hide text-center"><img src="http://sampark.rajasthan.gov.in/dashbordimg/loading.gif" /></div>
                                                <Form id="deploytoServer">
                                                    <Row>
                                                        <Form.Group as={Col} md={12} >
                                                            <Form.Label>Tenancy</Form.Label>
                                                            <Form.Control as="select" id="Tenancy" name='Tenancy' dangerouslySetInnerHTML={{ __html: this.state.DropdownTenancy }} onChange={e => this.handleChange(e)}>

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group as={Col} md={12} >
                                                            <Form.Label>Region</Form.Label>
                                                            <Form.Control as="select" id="Region" name='Region' dangerouslySetInnerHTML={{ __html: this.state.DropdownRegion }}>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group as={Col} md={12} >
                                                            <Form.Label>Compartment</Form.Label>
                                                            <Form.Control as="select" id="Compartment" name='Compartment' dangerouslySetInnerHTML={{ __html: this.state.Compartmentdrop }} onChange={e => this.handleChangeCmptmnt(e)}>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group as={Col} md={12} >
                                                            <Form.Label>VCN</Form.Label>
                                                            <Form.Control as="select" id="VCN" name='VCN' dangerouslySetInnerHTML={{ __html: this.state.Vcndrop }} >

                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group as={Col} md={12} >
                                                            <Form.Label>AD</Form.Label>
                                                            <Form.Control as="select" id="AD" name='AD' dangerouslySetInnerHTML={{ __html: this.state.subnetAddrop }} onChange={e => this.handleChangeAd(e)}>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                    <Row>
                                                        <Form.Group as={Col} md={12} >
                                                            <Form.Label>Subnet</Form.Label>
                                                            <Form.Control as="select" id="Subnet" name='Subnet' dangerouslySetInnerHTML={{ __html: this.state.subnetdrop }}>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>

                                                    <Row>
                                                        <Form.Group as={Col} md={12} >
                                                            <Form.Label>Shape Name</Form.Label>
                                                            <Form.Control as="select" id="Shape" name='Shape' >
                                                                <option>VM.Standard1.1</option>
                                                                <option> VM.Standard1.2</option>
                                                                <option> VM.Standard2.1 </option>
                                                                <option>VM.Standard2.2 </option>
                                                                <option>VM.Standard2.4 </option>
                                                                <option> VM.Standard.E2.1 </option>
                                                                <option> VM.Standard.E2.2 </option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Row>
                                                </Form>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" id="btnDeploy" class="btn btn-primary" data-dismiss="modal" onClick={deployPop}>Deploy</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="modal-dialog hide" id="Deploystatus">

                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h4 class="modal-title">Deployment Status</h4>
                                            </div>
                                            <div class="modal-body">
                                                <Alert show={this.state.show} variant="success">
                                                    <Alert.Heading>Your deployment is now launching</Alert.Heading>
                                                    <p>
                                                        <small>The following depoloyment have been initiated </small><a href="#" id="tenancycreatedId">{global.tenancy_name}</a>
                                                    </p>

                                                </Alert>
                                            </div>
                                        </div>

                                    </div>
                                </div>




                            </Col>
                            <Col md={4} className="rightNav">Comments and Rating will be coming soon.</Col>
                        </Row>
                    </Container>
                    <Footer />
                </div>

            </div>
        );
    }
}

export default AssetDetails;