import React, {
    Component
} from 'react';
// import {
//     Header
// } from './detailsHeader';
import { Header } from './Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form'
import Footer from './Footer/Footer';
import Button from 'react-bootstrap/Button'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import Dropdown from 'react-bootstrap/Dropdown';
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
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
        this.state = {
            AssetName: '',
            value: localStorage.getItem(`smde_${this.props.id}`) || this.props.value,
            mdeValue:'',
            Notional_Architechure_Notes:'',
            mdeUseCaseValue:'',
            video_link: '',
            ScrmID: '',
            Customer: '',
            AssetExpiryDate: 6,
            SolutionArea: '',
            Industry: '',
           // Platform: '',
            Asset_Description: '',
            Use_Case: '',
            AssetType: '',
            //SalesPlay: '',
            Asset_Accessablity: '',
            OwnerGroupFilterDrop:"",
            // Notional_Architechure_Notes: '',
            solutionFilterdrop: "",
            IndustryFilterdrop: '',
            AssetTypedrop: '',
            SalesPlaydrop: '',
            msg: 'CREATE ASSET',
            msgbtn: "SUBMIT",
            id: '',
            arch: '',
            class: 'createPanel',
            LoginSuccessRedirect: '',
            ImagesArch: [],
            AssetOwner: sessionStorage.getItem("user_email"),
            AssetFormSelection: '',
            ListOfForms: [],
            AssetFormSelectionLabel: '',
            documentdata: []
            // Location:''
        };
    }

    componentDidMount() {
        global.CoverPhoto = '';
        global.thumbnail = '';
        var url = window.location.href;
        this.setState({
            AssetFormSelection: '170k5dr4xvz',
            AssetFormSelectionLabel: 'Solution Asset'
        })
        if (url.indexOf('?') != -1) {
            var ID = url.split('?');
            axios.get(global.Ip + global.Port + '/asset/' + ID[1], {
                "user_email": sessionStorage.getItem("user_email")
            }, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            })
                .then(res => {
                    var arch = "";
                    this.setState({
                        ImagesArch: res.data.IMAGES
                    })
                    for (var valuesol = 0; valuesol <= res.data.FILTERMAP.length - 1; valuesol++) {
                        if (res.data.FILTERMAP[valuesol].TYPE == 'Asset  Type') {
                            for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                console.log(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                                console.log(res.data.FILTERMAP[valuesol].arr[p].FILTER_NAME);
                                //arrAsst.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                                console.log(res.data.FILTERMAP[valuesol].arr[p].FILTER_TYPE);
                                if (res.data.FILTERMAP[valuesol].arr[p].FILTER_TYPE == "Asset  Type" && (res.data.FILTERMAP[valuesol].arr[p].FILTER_ID == '170k5dr4xvz' || res.data.FILTERMAP[valuesol].arr[p].FILTER_ID == 'dq7k9lprfox' || res.data.FILTERMAP[valuesol].arr[p].FILTER_ID == 'dq7k9sdgroc')) {

                                    //ListOfFormsData.push({ "id": res.data.FILTERMAP[valuesol].arr[p].FILTER_ID, "name": res.data.FILTERMAP[valuesol].arr[p].FILTER_NAME })
                                    this.setState({
                                        AssetFormSelection: res.data.FILTERMAP[valuesol].arr[p].FILTER_ID,
                                        AssetFormSelectionLabel: res.data.FILTERMAP[valuesol].arr[p].FILTER_NAME
                                    })
                                }
                            }
                            // var values3 = arrAsst;
                            // for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                            //     selectedElement.options[selectSol].selected = values3.indexOf(selectedElement.options[selectSol].value) >= 0;
                            // }

                        }
                    }
                    setTimeout(function () {
                       // document.getElementById('Asset_Description').setAttribute('maxlength',"4");

                        var arrSol = []; var arrOwn = []; var arrIndus = []; var arrPfrm = []; var arrAsst = [];
                        for (var valuesol = 0; valuesol <= res.data.FILTERMAP.length - 1; valuesol++) {
                            // console.log('Asset Details' + res.data.FILTERMAP[valuesol].TYPE);
                            // if (res.data.FILTERMAP[valuesol].TYPE == 'Asset  Type') {
                            //     // var selectedElement = document.getElementById('AssetType');
                            //     console.log('***************************** AssetFormSelection');
                            //     // // alert('1'+res.data.FILTERMAP[valuesol]);
                            //     for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                            //         //arrAsst.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                            //         console.log(res.data.FILTERMAP[valuesol].arr[p].FILTER_TYPE);
                            //         if (res.data.FILTERMAP[valuesol].arr[p].FILTER_TYPE == "Asset  Type" && (res.data.FILTERMAP[valuesol].arr[p].FILTER_ID == '170k5dr4xvz' || res.data.FILTERMAP[valuesol].arr[p].FILTER_ID == 'dq7k9lprfox')) {
                            //             console.log(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                            //             //ListOfFormsData.push({ "id": res.data.FILTERMAP[valuesol].arr[p].FILTER_ID, "name": res.data.FILTERMAP[valuesol].arr[p].FILTER_NAME })
                            //             this.setState({
                            //                 AssetFormSelection: res.data.FILTERMAP[valuesol].arr[p].FILTER_ID,
                            //                 AssetFormSelectionLabel: " - " + res.data.FILTERMAP[valuesol].arr[p].FILTER_NAME
                            //             })
                            //         }
                            //     }
                            // var values3 = arrAsst;
                            // for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                            //     selectedElement.options[selectSol].selected = values3.indexOf(selectedElement.options[selectSol].value) >= 0;
                            // }
                            // }
                            if (res.data.FILTERMAP[valuesol].TYPE == 'Solution Area') {
                                var selectedElement = document.getElementById('SolutionArea');

                                for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                    arrSol.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                                }
                                var values = arrSol;
                                for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                    //    console.log(selectedElement.options[selectSol].value);
                                    selectedElement.options[selectSol].selected = values.indexOf(selectedElement.options[selectSol].value) >= 0;
                                    //    console.log(values.indexOf(selectedElement.options[selectSol].value) >= 0);
                                }
                            }
                           
                            if (res.data.FILTERMAP[valuesol].TYPE == 'Industry') {
                                var selectedElement = document.getElementById('Industry');

                                for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                    arrIndus.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                                }
                                var values1 = arrIndus;
                                for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                    selectedElement.options[selectSol].selected = values1.indexOf(selectedElement.options[selectSol].value) >= 0;
                                }

                            }
                           /* if (res.data.FILTERMAP[valuesol].TYPE == 'Buyer Profile') {
                                var selectedElement = document.getElementById('Platform');

                                // alert('1'+res.data.FILTERMAP[valuesol]);
                                for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                    arrPfrm.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                                }
                                var values2 = arrPfrm;
                                for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                    selectedElement.options[selectSol].selected = values2.indexOf(selectedElement.options[selectSol].value) >= 0;
                                }

                            }*/

                           /* if (res.data.FILTERMAP[valuesol].TYPE == 'Sales Initiatives') {
                                var selectedElement = document.getElementById('SalesPlay');

                                // alert('1'+res.data.FILTERMAP[valuesol]);
                                for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                    arrAsst.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                                }
                                var values4 = arrAsst;
                                for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                    selectedElement.options[selectSol].selected = values4.indexOf(selectedElement.options[selectSol].value) >= 0;
                                }

                            }*/


                        }

                        var ColtrlDoc = "";
                        //  alert(res.data.LINKS.length);
                        for (var coltrl = 0; coltrl <= res.data.LINKS.length - 1; coltrl++) {
                            // if (res.data.LINKS[coltrl].TYPE == "DOCUMENT") {

                            //     document.getElementById('DocumentLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;
                            //     document.getElementById('DocumentLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                            //     document.getElementById('DocumentLink').children[2].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION_DATA;
                            //     for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                            //         var itm = document.getElementById('DocumentLink');
                            //         var cln = itm.cloneNode(true);
                            //         cln.id = 'DocumentLinkAdd' + parseInt(k - 1);
                            //         cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;
                            //         cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                            //         cln.children[2].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION_DATA;
                            //         document.getElementById('DocumentLinkAdd').appendChild(cln);
                            //     }
                            // }

                            if (res.data.LINKS[coltrl].TYPE == "DOCUMENT") {
                                var parts = res.data.LINKS[coltrl].arr[0].LINK_URL.split('/');
                                var lastSegment = parts.pop() || parts.pop();
                                document.getElementById('PresentationLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;
                                document.getElementById('PresentationLink').children[1].children[1].children[1].innerHTML = lastSegment;
                                document.getElementById('PresentationLink').children[2].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION_DATA;

                                for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                    var parts = res.data.LINKS[coltrl].arr[k].LINK_URL.split('/');
                                    var lastSegment = parts.pop() || parts.pop();
                                    var itm = document.getElementById('PresentationLink');
                                    var cln = itm.cloneNode(true);
                                    cln.id = 'PresentationLinkAdd' + parseInt(k - 1);
                                    cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;
                                    cln.children[1].children[1].children[1].innerHTML = lastSegment;
                                    cln.children[2].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION_DATA;
                                    document.getElementById('PresentationLinkAdd').appendChild(cln);
                                }
                            } else
                                if (res.data.LINKS[coltrl].TYPE == "MEDIA") {
                                    document.getElementById('MediaLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;
                                    document.getElementById('MediaLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                                    document.getElementById('MediaLink').children[2].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION_DATA;

                                    for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                        var itm = document.getElementById('MediaLink');
                                        var cln = itm.cloneNode(true);
                                        cln.id = 'MediaLinkAdd' + parseInt(k - 1);
                                        cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;
                                        cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                                        cln.children[2].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION_DATA;

                                        document.getElementById('MediaLinkAdd').appendChild(cln);
                                    }
                                } else if (res.data.LINKS[coltrl].TYPE == "CODE REPOSITORY") {
                                    document.getElementById('CodeLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;
                                    document.getElementById('CodeLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                                    document.getElementById('CodeLink').children[2].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION_DATA;

                                    if (res.data.LINKS[coltrl].arr[0].DEPLOY_STATUS == 1) {
                                        var statusChecked = true;
                                    } else {
                                        var statusChecked = false;
                                    }

                                    //document.getElementById('CodeLink').children[2].children[1].checked = statusChecked;

                                    for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                        var itm = document.getElementById('CodeLink');
                                        var cln = itm.cloneNode(true);
                                        cln.id = 'CodeLinkAdd' + parseInt(k - 1);
                                        cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;
                                        cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                                        cln.children[2].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION_DATA;

                                        // if (res.data.LINKS[coltrl].arr[k].DEPLOY_STATUS == 1) {
                                        //     var statusChecked = true;
                                        // } else {
                                        //     var statusChecked = false;
                                        // }
                                        // cln.children[2].children[1].checked = statusChecked;

                                        document.getElementById('CodeLinkAdd').appendChild(cln);
                                    }
                                }
                                else if (res.data.LINKS[coltrl].TYPE == "RELATED LINK") {
                                    document.getElementById('RelatedLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                                    document.getElementById('RelatedLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION_DATA;

                                    for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                        var itm = document.getElementById('RelatedLink');
                                        var cln = itm.cloneNode(true);
                                        cln.id = 'RelatedLinkAdd' + parseInt(k - 1);
                                        cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                                        cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION_DATA;

                                        document.getElementById('RelatedLinkAdd').appendChild(cln);
                                    }
                                }

                        }


                    }, 2000);

                    this.setState({
                        AssetName: res.data.ASSET_TITLE,
                        ScrmID: res.data.ASSET_SCRM_ID,
                        Customer: res.data.ASSET_CUSTOMER,
                        AssetOwner: res.data.ASSET_OWNER,
                        AssetExpiryDate: res.data.ASSET_EXPIRY_DATE,
                        Asset_Description: res.data.ASSET_DESCRIPTION,
                        Notional_Architechure_Notes: res.data.ASSET_ARCHITECTURE_DESCRIPTION,
                        Use_Case: res.data.ASSET_USERCASE,
                        ASSET_THUMBNAIL: res.data.ASSET_THUMBNAIL,
                        video_link: res.data.ASSET_VIDEO_LINK,
                        mdeValue: res.data.ASSET_DESCRIPTION,
                        mdeUseCaseValue: res.data.ASSET_USERCASE,
                        
                        msg: 'EDIT ASSET',
                        msgbtn: "SAVE",
                        class: 'editPanel',
                        id: res.data.ASSET_ID,
                        arch: arch,
                        // Location:res.data.ASSET_LOCATION
                    })
                })
        }
        axios.get(global.Ip + global.Port + '/asset/allfilters',{
            headers: {
                "user_email": sessionStorage.getItem("user_email"),
                "platform":"w"

            }
        }).then(res => {
            const FilterData = res.data.allFilters;
            var ListOfFormsData = [];
            for (var i = 0; i < res.data.allFilters.length; i++) {
                console.log(FilterData[i].Type);
                if (FilterData[i].Type == "Solution Area") {
                    var SolutionAreaDrop = "";
                    for (var Solfilter = 0; Solfilter < FilterData[i].filters.length; Solfilter++) {
                        if(FilterData[i].filters[Solfilter].SECONDARY.length >0){
                            for(let secondary=0;secondary<FilterData[i].filters[Solfilter].SECONDARY.length;secondary++){
                                SolutionAreaDrop += "<option value='" + FilterData[i].filters[Solfilter].SECONDARY[secondary].FILTER_ID + "'>" + FilterData[i].filters[Solfilter].FILTER_NAME +" - "+FilterData[i].filters[Solfilter].SECONDARY[secondary].SEC_FILTER_NAME +'</option>';
                            }
                            continue;
                        }
                        SolutionAreaDrop += "<option value='" + FilterData[i].filters[Solfilter].FILTER_ID + "'>" + FilterData[i].filters[Solfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        solutionFilterdrop: SolutionAreaDrop
                    })
                } 
                if (FilterData[i].Type == "Asset Owner Group") {
                    var OwnerGroupDrop = "";
                    for (var OwnerGroupfilter = 0; OwnerGroupfilter < FilterData[i].filters.length; OwnerGroupfilter++) {
                        OwnerGroupDrop += "<option value='" + FilterData[i].filters[OwnerGroupfilter].FILTER_ID + "'>" + FilterData[i].filters[OwnerGroupfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        OwnerGroupFilterDrop: OwnerGroupDrop
                    })
                } 
                else if (FilterData[i].Type == "Industry") {
                    var IndustryAreaDrop = "";
                    for (var Industryfilter = 0; Industryfilter < FilterData[i].filters.length; Industryfilter++) {

                        if(FilterData[i].filters[Industryfilter].SECONDARY.length >0){
                            for(let secondary=0;secondary<FilterData[i].filters[Industryfilter].SECONDARY.length;secondary++){
                                IndustryAreaDrop += "<option value='" + FilterData[i].filters[Industryfilter].SECONDARY[secondary].FILTER_ID + "'>" + FilterData[i].filters[Industryfilter].FILTER_NAME +" - "+FilterData[i].filters[Industryfilter].SECONDARY[secondary].SEC_FILTER_NAME +'</option>';
                            }
                            continue;
                        }

                        IndustryAreaDrop += "<option value='" + FilterData[i].filters[Industryfilter].FILTER_ID + "'>" + FilterData[i].filters[Industryfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        IndustryFilterdrop: IndustryAreaDrop
                    })
                } /*else if (FilterData[i].Type == "Buyer Profile") {
                    var PlatformAreaDrop = " ";
                    for (var Platformfilter = 0; Platformfilter < FilterData[i].filters.length; Platformfilter++) {
                        PlatformAreaDrop += "<option value='" + FilterData[i].filters[Platformfilter].FILTER_ID + "'>" + FilterData[i].filters[Platformfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        PlatformFilterdrop: PlatformAreaDrop
                    })
                }*/
                // else if (FilterData[i].Type == "Asset Type") {
                //     var AssetTypeAreaDrop = " ";
                //     for (var AssetTypefilter = 0; AssetTypefilter < FilterData[i].filters.length; AssetTypefilter++) {
                //         AssetTypeAreaDrop += "<option value='" + FilterData[i].filters[AssetTypefilter].FILTER_ID + "'>" + FilterData[i].filters[AssetTypefilter].FILTER_NAME + '</option>';
                //     }
                //     this.setState({
                //         AssetTypedrop: AssetTypeAreaDrop
                //     })
                // }
                /*else if (FilterData[i].Type == "Sales Initiatives") {
                    console.log(FilterData[i].Type);
                    var SalesPlayAreaDrop = " ";
                    for (var SalesPlayfilter = 0; SalesPlayfilter < FilterData[i].filters.length; SalesPlayfilter++) {
                        SalesPlayAreaDrop += "<option value='" + FilterData[i].filters[SalesPlayfilter].FILTER_ID + "'>" + FilterData[i].filters[SalesPlayfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        SalesPlaydrop: SalesPlayAreaDrop
                    })
                }*/
                else if (FilterData[i].Type == "Asset  Type") {
                    console.log(FilterData[i].Type);
                    for (var j = 0; j < FilterData[i].filters.length; j++) {
                        if (FilterData[i].filters[j].FILTER_TYPE == "Asset  Type" && (FilterData[i].filters[j].FILTER_ID == '170k5dr4xvz' || FilterData[i].filters[j].FILTER_ID == 'dq7k9lprfox' || FilterData[i].filters[j].FILTER_ID == 'dq7k9sdgroc')) {
                            //console.log(FilterData[i].filters[j].FILTER_NAME)
                            ListOfFormsData.push({ "id": FilterData[i].filters[j].FILTER_ID, "name": FilterData[i].filters[j].FILTER_NAME })
                        }
                    }
                    console.log(ListOfFormsData);
                    this.setState({
                        ListOfForms: ListOfFormsData
                    })
                }
            }

        })
        // axios.get(global.Ip + global.Port + '/asset/editAsset')
        // .then(res => {

        //     console.log(res);
        // });
    }

    UploadMediaFile = (e) => {
        console.log(e);
        e.preventDefault();
        var data = new FormData()
        var filename = e.target.files[0].name;
        var filesize = e.target.files[0].size;
        console.log(filename + filesize);
        var SplitExtn = filename.split('.');
        var tolowerextn = (SplitExtn[1].toLowerCase());
        if ((e.target.getAttribute("id") == "upload-cover-photo")) {
            if (filesize <= 500000 && (tolowerextn == 'png' || tolowerextn == 'jpg' || tolowerextn == 'jpeg')) {
                for (const file of e.target.files) {
                    data.append('file', file, file.name)
                    if (e.target.getAttribute("id") == "upload-cover-photo") {
                        var headerObj = {
                            "type": 'thumbnail',
                            "Content-Type": 'multipart/form-data',
                            "user_email": sessionStorage.getItem("user_email")
                        }
                        global.CoverPhoto = data;
                        global.headerObj = headerObj;
                    }
                    if (e.target.getAttribute("id") == "notionalArchtechure") {
                        var headerObj1 = {
                            "type": '',
                            "Content-Type": 'multipart/form-data',
                            "user_email": sessionStorage.getItem("user_email")
                        }
                        global.thumbnail = data;
                        global.headerThumbnailObj = headerObj1;
                    }
                }
            } else {
                if (filesize > 500000) {
                    alert('Please upload image upto  500 kb');
                    document.getElementById(e.target.getAttribute("id")).value = "";
                    return false;
                }
                else {
                    if (tolowerextn == 'png' || tolowerextn == 'jpg' || tolowerextn == 'jpeg') {
                    }
                    else {
                        alert('Please Upload either PNG or jpg/jpeg image');
                        document.getElementById(e.target.getAttribute("id")).value = "";
                        return false;

                    }
                }
            }
        }
        if ((e.target.getAttribute("id") == "notionalArchtechure")) {
            if (filesize <= 6000000 && (tolowerextn == 'png' || tolowerextn == 'jpg' || tolowerextn == 'jpeg')) {
                for (const file of e.target.files) {
                    data.append('file', file, file.name)
                    if (e.target.getAttribute("id") == "upload-cover-photo") {
                        var headerObj = {
                            "type": 'thumbnail',
                            "Content-Type": 'multipart/form-data',
                            "user_email": sessionStorage.getItem("user_email")
                        }
                        global.CoverPhoto = data;
                        global.headerObj = headerObj;
                    }
                    if (e.target.getAttribute("id") == "notionalArchtechure") {
                        var headerObj1 = {
                            "type": '',
                            "Content-Type": 'multipart/form-data',
                            "user_email": sessionStorage.getItem("user_email")
                        }
                        global.thumbnail = data;
                        global.headerThumbnailObj = headerObj1;
                    }
                }
            } else {
                if (filesize > 6000000) {
                    alert('Please upload image less than 6 mb');
                    document.getElementById(e.target.getAttribute("id")).value = "";
                    return false;
                }
                else {
                    if (tolowerextn == 'png' || tolowerextn == 'jpg' || tolowerextn == 'jpeg') {
                    }
                    else {

                        alert('Please Upload either PNG or jpg/jpeg image');
                        document.getElementById(e.target.getAttribute("id")).value = "";
                        return false;

                    }
                }
            }
        }
        if ((e.target.getAttribute("id") == "documents")) {
            for (const file of e.target.files) {
                data.append('file', file, file.name)
                this.state.documentdata.push(data);
            }
        }
    }



    handleEditChange = value => {
        this.setState({ mdeValue: value });
      };
      char_limit = 50;

      




      handleNotionalChange =value =>{
        this.setState({ Notional_Architechure_Notes: value });
  
      }
      handleUseCaseChange = value => {
        this.setState({ mdeUseCaseValue: value });
      };
      getIntance = instance => {
        // You can now store and manipulate the simplemde instance.
        instance.togglePreview();
      };
      
      

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })


    }
    forceUpdateHandler() {
        this.forceUpdate();
    };
    handleDetete = (value) => {
        console.log(this.state.ImagesArch);
        console.log(this.state.ImagesArch[value]);

        axios.delete(global.Ip + global.Port + '/asset/deleteImages/' + value, {
            "user_email": sessionStorage.getItem("user_email")
        }, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        }).then(response => {
            var temp = []
            if (this.state.ImagesArch.length == 1) {
                this.state.ImagesArch = []
            } else {

                temp = this.state.ImagesArch.filter(item => !(item.IMAGE_ID == value));
            }
            this.setState({
                ImagesArch: temp
            })
            this.forceUpdateHandler();
            //this.componentDidMount();
            //window.location.href = "";
        });
    }
    deleteNode = (id) => {
        alert('Delete Node' + id);
    }
    onAddNew = (e) => {
        var itm = document.getElementById(e);

        var cln = itm.cloneNode(true);

        cln.id = e + 'Add' + document.getElementById(e + 'Add').children.length;
        var fileId = e + 'uploadDoc' + document.getElementById(e + 'Add').children.length;
        cln.children[0].children[0].value = "";
        cln.children[1].children[0].value = "";
        console.log(cln.children[1].children[0]);
        if (e == "PresentationLink") {
            cln.children[1].innerHTML = '';
            cln.children[1].innerHTML = '<input type="file" id="' + fileId + '" name="uploadDocuments" encType="multipart/form-data" className="documentUpload111"  /> <div class="createPanel"><img src="../img/Reports.png" width="20px" height="20px" />&nbsp; <label></label>   </div>';
            cln.children[3].children[0].innerHTML = '<img src="../img/clear.png" alt="" height="20px" onclick="document.getElementById(\'' + cln.id + '\').remove();" />';
        }
        if (e != "RelatedLink") {
            cln.children[2].children[0].value = "";
        }
        console.log(cln);
        //document.getElementById(e + 'Add').appendChild(cln);

        document.getElementById(e + 'Add').insertBefore(cln, document.getElementById(e + 'Add').childNodes[0]);
    }
    uploadDocument = (doc, header, total, current) => {
        axios.post(global.Ip + global.Port + '/asset/uploadDoc/' + global.AssetIdCreated, doc, {
            headers: header
        })
            .then(response => {
                if (response.data == "working" || response.data == "done") {
                    if (total == current) {
                        alert('Your asset has been created. Kindly check in "My assets", for further updates as part of governance process');
                        // window.location.href = "/MyAssets";
                        this.setState({
                            LoginSuccessRedirect: true
                        });
                    }
                }
            })
    }
    onCreateClick = (e) => {
        // console.log(document.getElementById('SolutionArea').value);
        var dropDown = document.getElementById('SolutionArea'),
            SolutionAreaArray = [], p;
            SolutionAreaArray.push({ Value: this.state.AssetFormSelection });
        var dropDownIndustry = document.getElementById('Industry'), q;
        //var dropDownPlatform = document.getElementById('Platform'), r;
        // var dropDownAssetType = document.getElementById('AssetType'), t;
        //var dropDownSalesPlay = document.getElementById('SalesPlay'), k;
        
        for (p = 0; p < dropDown.options.length; p += 1) {
            if (dropDown.options[p].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                SolutionAreaArray.push({ Value: dropDown.options[p].value });
            }

        }

        for (q = 0; q < dropDownIndustry.options.length; q += 1) {
            if (dropDownIndustry.options[q].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                SolutionAreaArray.push({ Value: dropDownIndustry.options[q].value });
            }
        }
       /* for (r = 0; r < dropDownPlatform.options.length; r += 1) {
            if (dropDownPlatform.options[r].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                SolutionAreaArray.push({ Value: dropDownPlatform.options[r].value });
            }
        }*/
        // for (t = 0; t < dropDownAssetType.options.length ; t += 1) {
        //     if (dropDownAssetType.options[t].selected) {
        //         //countryArray.push( dropDown.options[i].value); //If you need only values 
        //         SolutionAreaArray.push({Value: dropDownAssetType.options[t].value });
        //     }
        //     // console.log(SolutionAreaArray);
        // }
        //Push for AssetType
        // SolutionAreaArray.push({Value: this.state.AssetFormSelection });

        /*for (k = 0; k < dropDownSalesPlay.options.length; k += 1) {
            if (dropDownSalesPlay.options[k].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                SolutionAreaArray.push({ Value: dropDownSalesPlay.options[k].value });
            }
            // console.log(SolutionAreaArray);
        }*/
        //var objDocumentAdded = document.getElementById('DocumentLinkAdd').children;
        var objPresentationAdded = document.getElementById('PresentationLinkAdd').children;
        var objMediaAdded = document.getElementById('MediaLinkAdd').children;
        var objRelatedAdded = document.getElementById('RelatedLinkAdd').children;
        var objCodeLinkAdded = document.getElementById('CodeLinkAdd').children;
        // alert(document.getElementById('DocumentLink').children[1].children[0].value);
        var objJson = [];
        var documentUploadHeader = [];
        // if (document.getElementById('DocumentLink').children[1].children[0].value != "" && document.getElementById('DocumentLink').children[0].children[0].value != "") {
        //     var data = {
        //         "LINK_URL_TYPE": "",
        //         "LINK_URL": document.getElementById('DocumentLink').children[1].children[0].value,
        //         "LINK_REPOS_TYPE": "DOCUMENT",
        //         "LINK_DESCRIPTION": document.getElementById('DocumentLink').children[0].children[0].value,
        //         "LINK_DESCRIPTION_DATA": document.getElementById('DocumentLink').children[2].children[0].value
        //     };
        //     objJson.push(data);

        // } else if (document.getElementById('DocumentLink').children[1].children[0].value != "" || document.getElementById('DocumentLink').children[0].children[0].value != "") {
        //     alert('You have to Fill both fields Document Link & Document Name');
        //     document.getElementById('DocumentLink').focus();
        //     return false;
        // }

        // for (var i = 0; i <= objDocumentAdded.length - 1; i++) {
        //     if (document.getElementById('DocumentLinkAdd' + i).children[1].children[0].value != "" && document.getElementById('DocumentLinkAdd' + i).children[0].children[0].value != "") {
        //         var data = {
        //             "LINK_URL_TYPE": "",
        //             "LINK_URL": document.getElementById('DocumentLinkAdd' + i).children[1].children[0].value,
        //             "LINK_REPOS_TYPE": "DOCUMENT",
        //             "LINK_DESCRIPTION": document.getElementById('DocumentLinkAdd' + i).children[0].children[0].value,
        //             "LINK_DESCRIPTION_DATA": document.getElementById('DocumentLinkAdd' + i).children[2].children[0].value

        //         };

        //         objJson.push(data);
        //     }
        //     else if (document.getElementById('DocumentLinkAdd' + i).children[1].children[0].value != "" || document.getElementById('DocumentLinkAdd' + i).children[0].children[0].value != "") {
        //         alert('You have to Fill both fields Document Link & Document Name');
        //         document.getElementById('DocumentLinkAdd' + i).focus();
        //         return false;
        //     }
        // }
        if (document.getElementById('PresentationLink').children[1].children[0].value != "" && document.getElementById('PresentationLink').children[0].children[0].value != "") {
            var headerObj = {
                "type": 'document',
                "Content-Type": 'multipart/form-data',
                "user_email": sessionStorage.getItem("user_email"),
                "LINK_URL_TYPE": "DOCUMENT",
                "LINK_REPOS_TYPE": "DOCUMENT",
                "LINK_DESCRIPTION": document.getElementById('PresentationLink').children[0].children[0].value,
                "LINK_DESCRIPTION_DATA": document.getElementById('PresentationLink').children[2].children[0].value
            }
            documentUploadHeader.push(headerObj);
            console.log(document.getElementById('PresentationLink').children[0].children[0].value);
            console.log(document.getElementById('PresentationLink').children[2].children[0].value);
        } else if (document.getElementById('PresentationLink').children[0].children[0].value == "" && (document.getElementById('PresentationLink').children[1].children[0].value != "" || document.getElementById('PresentationLink').children[2].children[0].value != "")) {
            // if (!document.getElementById('PresentationLink').children[1].children[1].children[1].innerHTML) {
            alert('Please fill Document name');
            document.getElementById('PresentationLink').focus();
            return false;
            //}
        } else if (document.getElementById('PresentationLink').children[2].children[0].value == "" && (document.getElementById('PresentationLink').children[1].children[0].value != "" || document.getElementById('PresentationLink').children[0].children[0].value != "")) {
            // if (!document.getElementById('PresentationLink').children[1].children[1].children[1].innerHTML) {
            alert('Please fill Document description');
            document.getElementById('PresentationLink').focus();
            return false;
            //}
        } else {
            if (!document.getElementById('PresentationLink').children[1].children[1].children[1].innerHTML && (document.getElementById('PresentationLink').children[0].children[0].value != "" || document.getElementById('PresentationLink').children[2].children[0].value != "")) {
                alert('Please attach the document');
                return false;
            }
        }

        for (var i = 0; i < objPresentationAdded.length; i++) {
            var data = new FormData()

            var elementID = 'PresentationLinkAdd' + i;
            console.log(elementID);
            console.log(document.getElementById(elementID).children[0].children[0].value);
            console.log(document.getElementById(elementID).children[2].children[0].value);

            if (document.getElementById(elementID).children[1].children[0].value != "" && document.getElementById(elementID).children[0].children[0].value != "") {
                var inputField = document.getElementById(elementID).children[1].children[0];
                var selectedFiles = inputField.files;
                var file = selectedFiles[0]
                var headerObj = {
                    "type": 'document',
                    "Content-Type": 'multipart/form-data',
                    "user_email": sessionStorage.getItem("user_email"),
                    "LINK_URL_TYPE": "DOCUMENT",
                    "LINK_REPOS_TYPE": "DOCUMENT",
                    "LINK_DESCRIPTION": document.getElementById(elementID).children[0].children[0].value,
                    "LINK_DESCRIPTION_DATA": document.getElementById(elementID).children[2].children[0].value
                }
                data.append('file', file, file.name);
                this.state.documentdata.push(data);
                documentUploadHeader.push(headerObj);
            }
            else if (document.getElementById(elementID).children[0].children[0].value == "") {
                //if (!document.getElementById(elementID).children[1].children[1].children[1].innerHTML) {
                alert('Please fill Document name');
                document.getElementById(elementID).focus();
                return false;
                // }
            } else if (document.getElementById(elementID).children[2].children[0].value == "") {
                //if (!document.getElementById(elementID).children[1].children[1].children[1].innerHTML) {
                alert('Please fill Document description');
                document.getElementById(elementID).focus();
                return false;
                //}
            } else {
                if (!document.getElementById('PresentationLink').children[1].children[1].children[1].innerHTML) {
                    alert('Please attach the document');
                    return false;
                }
            }
        }
        //console.log('documentdata:- ' + this.state.documentdata.length)
        //console.log('documentUploadHeader:- ' + documentUploadHeader.length);
        // console.log(global.documentdata);
        // if (global.documentdata && document.getElementById('documentName').value == "") {
        //     alert('You have to Fill the document name');
        //     document.getElementById('documentName').focus();
        //     return false;
        // }
        // if (global.documentdata && document.getElementById('documentDesc').value == "") {
        //     alert('You have to Fill the document description');
        //     document.getElementById('documentDesc').focus();
        //     return false;
        // }
        if (document.getElementById('MediaLink').children[1].children[0].value != "" && document.getElementById('MediaLink').children[0].children[0].value != "") {
            var mediaLink = {
                "LINK_URL_TYPE": "",
                "LINK_URL": document.getElementById('MediaLink').children[1].children[0].value,
                "LINK_REPOS_TYPE": "MEDIA",
                "LINK_DESCRIPTION": document.getElementById('MediaLink').children[0].children[0].value,
                "LINK_DESCRIPTION_DATA": document.getElementById('MediaLink').children[2].children[0].value

            }
            objJson.push(mediaLink);
        }
        else if (document.getElementById('MediaLink').children[1].children[0].value != "" || document.getElementById('MediaLink').children[0].children[0].value != "") {
            alert('You have to Fill both fields MEDIA Link & MEDIA Name');
            document.getElementById('MediaLink').focus();
            return false;
        }

        for (var i = 0; i <= objMediaAdded.length - 1; i++) {
            if (document.getElementById('MediaLinkAdd' + i).children[1].children[0].value != "" && document.getElementById('MediaLinkAdd' + i).children[0].children[0].value != "") {
                var data = {
                    "LINK_URL_TYPE": "",
                    "LINK_URL": document.getElementById('MediaLinkAdd' + i).children[1].children[0].value,
                    "LINK_REPOS_TYPE": "MEDIA",
                    "LINK_DESCRIPTION": document.getElementById('MediaLinkAdd' + i).children[0].children[0].value,

                    "LINK_DESCRIPTION_DATA": document.getElementById('MediaLinkAdd' + i).children[2].children[0].value
                };
                objJson.push(data);
            }
            else if (document.getElementById('MediaLinkAdd' + i).children[1].children[0].value != "" || document.getElementById('MediaLinkAdd' + i).children[0].children[0].value != "") {
                alert('You have to Fill both fields MEDIA Link & MEDIA Name');
                document.getElementById('MediaLinkAdd' + i).focus();
                return false;
            }

        }
        if (document.getElementById('CodeLink').children[1].children[0].value != "" && document.getElementById('CodeLink').children[0].children[0].value != "") {
            // if (document.getElementById('CodeLink').children[2].children[1].checked) {

            //     var status = 1;
            // } else {
            //     var status = 0;
            // }
            var CodeLink = {
                "LINK_URL_TYPE": "",
                "LINK_URL": document.getElementById('CodeLink').children[1].children[0].value,
                "LINK_REPOS_TYPE": "CODE REPOSITORY",
                "LINK_DESCRIPTION": document.getElementById('CodeLink').children[0].children[0].value,
                "LINK_DESCRIPTION_DATA": document.getElementById('CodeLink').children[2].children[0].value,

                'DEPLOY_STATUS': 0
            }
            objJson.push(CodeLink);
        }
        else if (document.getElementById('CodeLink').children[1].children[0].value != "" || document.getElementById('CodeLink').children[0].children[0].value != "") {
            alert('You have to Fill both fields CODE REPOSITORY Link & CODE REPOSITORY Name');
            document.getElementById('CodeLink').focus();
            return false;
        }

        for (var i = 0; i <= objCodeLinkAdded.length - 1; i++) {
            if (document.getElementById('CodeLinkAdd' + i).children[1].children[0].value != "" && document.getElementById('CodeLinkAdd' + i).children[0].children[0].value != "") {
                // if (document.getElementById('CodeLinkAdd' + i).children[2].children[1].checked) {

                //     var status = 1;
                // } else {
                //     var status = 0;
                // }
                var data = {
                    "LINK_URL_TYPE": "",
                    "LINK_URL": document.getElementById('CodeLinkAdd' + i).children[1].children[0].value,
                    "LINK_REPOS_TYPE": "CODE REPOSITORY",
                    "LINK_DESCRIPTION": document.getElementById('CodeLinkAdd' + i).children[0].children[0].value,
                    "LINK_DESCRIPTION_DATA": document.getElementById('CodeLinkAdd' + i).children[2].children[0].value,

                    'DEPLOY_STATUS': 0
                };
                objJson.push(data);
                //  console.log('test');
                //  console.log(objJson);
            }
            else if (document.getElementById('CodeLinkAdd' + i).children[1].children[0].value != "" || document.getElementById('CodeLinkAdd' + i).children[0].children[0].value != "") {
                alert('You have to Fill both fields CODE REPOSITORY Link & CODE REPOSITORY Name');
                document.getElementById('CodeLinkAdd' + i).focus();
                return false;
            }

        }

        if (document.getElementById('RelatedLink').children[0].children[0].value != "") {

            var relatedLink = {
                "LINK_URL_TYPE": "",
                "LINK_URL": document.getElementById('RelatedLink').children[0].children[0].value,
                "LINK_REPOS_TYPE": "RELATED LINK",
                "LINK_DESCRIPTION": document.getElementById('RelatedLink').children[0].children[0].value,
                "LINK_DESCRIPTION_DATA": document.getElementById('RelatedLink').children[1].children[0].value

            }
            objJson.push(relatedLink);
        }


        for (var i = 0; i <= objRelatedAdded.length - 1; i++) {
            if (document.getElementById('RelatedLinkAdd' + i).children[0].children[0].value != "") {
                var data = {
                    "LINK_URL_TYPE": "",
                    "LINK_URL": document.getElementById('RelatedLinkAdd' + i).children[0].children[0].value,
                    "LINK_REPOS_TYPE": "RELATED LINK",
                    "LINK_DESCRIPTION": document.getElementById('RelatedLinkAdd' + i).children[0].children[0].value,
                    "LINK_DESCRIPTION_DATA": document.getElementById('RelatedLinkAdd' + i).children[1].children[0].value

                };
                objJson.push(data);
            }

        }
        if (this.state.AssetName == "") {
            // alert(this.state.video_link);
            alert('Please enter Asset Name');
            document.getElementById('AssetName').focus();
            return false;
            e.preventDefault();

        }
        // else if (this.state.ScrmID == "") {
        //     alert('Please enter Service Request Id');
        //     document.getElementById('ScrmID').focus();
        //     return false;
        //     e.preventDefault();
        // } else if (this.state.Customer == "") {
        //     alert('Please enter Customer');
        //     document.getElementById('Customer').focus();
        //     return false;
        //     e.preventDefault();
        // } 
        else if (this.state.AssetOwner == "") {
            alert('Please enter Asset Owner');
            document.getElementById('AssetOwner').focus();
            return false;
            e.preventDefault();
        }
        else if (this.state.AssetOwner != "") {
            //var str = (this.state.AssetOwner).replace(/\s*,\s*/g, ";");
            var str = this.state.AssetOwner.replace(/\s+/g, '');

            // alert(str);
            var filter = /^(|([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;

            if (!filter.test(str)) {
                alert('Please provide a valid email address');
                return false;
            }

        }
        if (document.getElementById('AssetId').value == "") {
            
            if (this.state.SolutionArea == "") {
                alert('Please enter Asset Solution Area');
                document.getElementById('SolutionArea').focus();
                return false;
                e.preventDefault();
            }
             else if (this.state.Industry == "") {
                alert('Please enter Asset Industry');
                document.getElementById('Industry').focus();
                return false;
                e.preventDefault();
            } /*else if (this.state.Platform == "") {
                alert('Please enter Asset Buyer Profile');
                document.getElementById('Platform').focus();
                return false;
                e.preventDefault();
            }*/
            // else if(this.state.AssetType ==""){
            //     alert('Please enter Assets Type');
            //     document.getElementById('AssetType').focus();
            //     return false;
            //     e.preventDefault();
            // }
           /* else if (this.state.SalesPlay == "") {
                alert('Please enter Asset Sales Initiatives');
                document.getElementById('SalesPlay').focus();
                return false;
                e.preventDefault();
            }*/
        }

        if (this.state.mdeValue == "") {
            alert('Please enter Asset Description');
            document.getElementById('Asset_Description').focus();
            return false;
            e.preventDefault();
        }
        // else if (this.state.Use_Case == "") {
        //     alert('Please enter Asset UseCase');
        //     document.getElementById('Use_Case').focus();
        //     return false;
        //     e.preventDefault();
        // }
        // else if (this.state.video_link == "") {
        //     alert('Please enter Asset Cover video Link');
        //     document.getElementById('video_link').focus();
        //     return false;
        //     e.preventDefault();
        // }
        if (document.getElementById('AssetId').value == "") {
            if (document.getElementById('upload-cover-photo').value == "") {
                alert('Please enter Asset Cover photo');
                document.getElementById('upload-cover-photo').focus();
                return false;
                e.preventDefault();
            } else if (this.state.Notional_Architechure_Notes == "" && this.state.AssetFormSelection == "170k5dr4xvz") {
                alert('Please enter Asset Architecture Notes');
                document.getElementById('Notional_Architechure_Notes').focus();
                return false;
                e.preventDefault();
            } else if (document.getElementById('notionalArchtechure').value == "" && this.state.AssetFormSelection == "170k5dr4xvz") {
                alert('Please enter Asset Architecture');
                document.getElementById('notionalArchtechure').focus();
                return false;
                e.preventDefault();
            }
        }
        if (document.getElementById('AssetId').value != "") {
            var assetId = document.getElementById('AssetId').value;
        } else {
            var assetId = null;
        }
        // alert('1');
        var reqParms = {
            "assetId": assetId,
            "title": this.state.AssetName,
            "description": this.state.mdeValue,
            "userCase": this.state.mdeUseCaseValue,
            "customer": this.state.Customer,
            "createdBy": sessionStorage.getItem("user_email"),
            "owner": this.state.AssetOwner,
            "scrmId": this.state.ScrmID,
            "oppId": null,
            'expiryDate': this.state.AssetExpiryDate,
            "modifiedBy": sessionStorage.getItem("user_email"),
            "links": objJson,
            "filters": SolutionAreaArray,
            "video_link": this.state.video_link,
            "location": sessionStorage.getItem("location"),
            "asset_architecture_description": this.state.Notional_Architechure_Notes,
            "user_email": sessionStorage.getItem("user_email"),
            //"assettype": this.state.AssetFormSelection

        }
        var url = "";
        if (document.getElementById('AssetId').value == "") {
            url = global.Ip + global.Port + '/asset/';

            document.getElementById('loader').classList.remove('hide');
            document.getElementById('createForm').classList.add('hide');
            axios.post(url, reqParms, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email"),
                    "type":"submit"

                }
            })
                .then(response => {

                    if (document.getElementById('AssetId').value == "") {
                        global.AssetIdCreated = response.data.Asset_ID;

                    }
                    else {
                        global.AssetIdCreated = document.getElementById('AssetId').value;
                    }
                    axios.post(global.Ip + global.Port + '/asset/uploadImages/' + global.AssetIdCreated, global.CoverPhoto, {
                        headers: global.headerObj
                    })
                        .then(response => {
                            if (response.data == "working") {
                                if (global.thumbnail) {
                                    axios.post(global.Ip + global.Port + '/asset/uploadImages/' + global.AssetIdCreated, global.thumbnail, {
                                        headers: {
                                            "type": 'coverPhoto',
                                            "Content-Type": 'multipart/form-data',
                                            "desc": "",
                                            "user_email": sessionStorage.getItem("user_email")
                                        }
                                    }).then(response => {
                                            if (response.data == "working" || response.data == "done") {
                                                if (this.state.documentdata.length > 0) {
                                                    for (i = 0; i < this.state.documentdata.length; i++) {
                                                        console.log(this.state.documentdata[i])
                                                        console.log(documentUploadHeader[i])
                                                        this.uploadDocument(this.state.documentdata[i], documentUploadHeader[i], this.state.documentdata.length - 1, i);
                                                    }
                                                } else {
                                                    alert('Your asset has been created. Kindly check in "My assets", for further updates as part of governance process');
                                                    this.setState({
                                                        LoginSuccessRedirect: true
                                                    });
                                                }
                                            }
                                        }).catch((error) => {
                                            if (error.response) {
                                                alert('There is some trouble in saving data. Sorry for inconvenience caused.');
                                                document.getElementById('loader').classList.add('hide');
                                                document.getElementById('createForm').classList.remove('hide');
                                                return false;
                                            }
                                        });
                                } else {
                                    if (this.state.documentdata.length > 0) {
                                        for (i = 0; i < this.state.documentdata.length; i++) {
                                            console.log(this.state.documentdata[i])
                                            console.log(documentUploadHeader[i])
                                            this.uploadDocument(this.state.documentdata[i], documentUploadHeader[i], this.state.documentdata.length - 1, i);
                                        }
                                    } else {
                                        alert('Your asset has been created. Kindly check in "My assets", for further updates as part of governance process');
                                        this.setState({
                                            LoginSuccessRedirect: true
                                        });
                                    }
                                }
                            }
                        });

                }).catch((error) => {
                    if (error.response) {
                        alert('There is some trouble in saving data. Sorry for inconvenience caused.');
                        document.getElementById('loader').classList.add('hide');
                        document.getElementById('createForm').classList.remove('hide');
                        return false;

                    }
                });

        }
        else {
            url = global.Ip + global.Port + '/asset/editAsset/';
            document.getElementById('loader').classList.remove('hide');
            document.getElementById('createForm').classList.add('hide');
            axios.post(url, reqParms,{
                headers: {
                    "user_email": sessionStorage.getItem("user_email"),
                    "type":"edit"

                }
            })
                .then(response => {
                    if (document.getElementById('AssetId').value == "") {
                        global.AssetIdCreated = response.data.Asset_ID;

                    }
                    else {
                        global.AssetIdCreated = document.getElementById('AssetId').value;
                    }
                    axios.post(global.Ip + global.Port + '/asset/uploadImages/' + global.AssetIdCreated, global.CoverPhoto, {
                        headers: global.headerObj
                    })
                        .then(response => {

                            if (response.data == "working" || response.data =="updated") {
                                if (global.thumbnail) {
                                    axios.post(global.Ip + global.Port + '/asset/uploadImages/' + global.AssetIdCreated, global.thumbnail, {
                                        headers: {
                                            'type': 'coverPhoto',
                                            "Content-Type": 'multipart/form-data',
                                            "user_email": sessionStorage.getItem("user_email")
                                        }
                                    })
                                        .then(response => {
                                            if (response.data == "working" || response.data == "done" || response.data == "updated") {
                                                if (this.state.documentdata.length > 0) {
                                                    for (i = 0; i < this.state.documentdata.length; i++) {
                                                        this.uploadDocument(this.state.documentdata[i], documentUploadHeader[i], this.state.documentdata.length - 1, i);
                                                    }
                                                } else {
                                                    alert('Your asset has been created. Kindly check in "My assets", for further updates as part of governance process');
                                                    // window.location.href = "/MyAssets";
                                                    this.setState({
                                                        LoginSuccessRedirect: true
                                                    });
                                                }
                                            }
                                        }).catch((error) => {
                                            if (error.response) {
                                                alert('There is some trouble in saving data. Sorry for inconvenience caused.');
                                                document.getElementById('loader').classList.add('hide');
                                                document.getElementById('createForm').classList.remove('hide');
                                                return false;
                                            }
                                        });
                                }
                                else {
                                    if (this.state.documentdata.length > 0) {
                                        for (i = 0; i < this.state.documentdata.length; i++) {
                                            console.log(this.state.documentdata[i])
                                            console.log(documentUploadHeader[i])
                                            this.uploadDocument(this.state.documentdata[i], documentUploadHeader[i], this.state.documentdata.length - 1, i);
                                        }
                                    } else {
                                        alert('Your asset has been created. Kindly check in "My assets", for further updates as part of governance process');
                                        this.setState({
                                            LoginSuccessRedirect: true
                                        });
                                    }
                                }
                            }
                        });
                }).catch((error) => {
                    if (error.response) {
                        alert('There is some trouble in saving data. Sorry for inconvenience caused.');
                        document.getElementById('loader').classList.add('hide');
                        document.getElementById('createForm').classList.remove('hide');
                        return false;

                    }
                });
        }
        //}
    }
    formSelectionClick(param) {
        // alert()
        // console.log(param);
        
        this.setState({
            AssetFormSelection: param.id,
            AssetFormSelectionLabel: param.name
        })
    }
    render() {
        // handleChange = value => {
        //     this.setState({ mdeValue: value });
        //   };
        if (this.state.LoginSuccessRedirect) {
            return <Redirect push to="/MyAssets" />;
        }
       
        return (


            <div className="App">
                <Header />
                <div className="BodyContainer mt-4">
                    <Container fluid={false}>
                        <Row>
                            <div class="Pull-right col-md-12"><a href="javascript:history.back(-1)">&#x2190; &nbsp;Back to Previous Screen</a></div>
                        </Row>
                        <Row>
                            <Col sm={8}>
                                <div className="text-center col-md-12 Heading">{this.state.msg}</div>
                            </Col>
                            {/*<Col sm={4}>
                                <Dropdown disabled={this.state.id ? true : false}>
                                    <Dropdown.Toggle id="dropdown-basic" disabled={this.state.id ? true : false}>
                                        Select Asset Type -  {this.state.AssetFormSelectionLabel}
                                    </Dropdown.Toggle>
                                    {this.state.ListOfForms.length > 0 &&
                                        <Dropdown.Menu disabled={this.state.id ? true : false} >
                                            {this.state.ListOfForms.map((data) =>
                                                <Dropdown.Item disabled={this.state.id ? true : false} onClick={() => this.formSelectionClick(data)} > {data.name}</Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>}

                                </Dropdown>
                                            </Col>*/}
                        </Row>

                        {/* id---170k5dr4xvz====Packaged solutions {this.state.AssetFormSelection == "170k5dr4xvz" &&*/}

                        <Row>
                            <Col md={12}>
                                <div className="title flex">
                                    <div class="nowrap">ASSET OVERVIEW</div>
                                    <div class="titleLine"></div>
                                </div>
                                <div id="loader" class="hide text-center"><img src="http://sampark.rajasthan.gov.in/dashbordimg/loading.gif" /></div>

                                <Form id="createForm">
                                    <Row>
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>{this.state.AssetFormSelectionLabel} Name <sup>*</sup><span title="60 characters max; Highlight business value, and industry or technology; Avoid articles, auxiliary verbs, conjunctions, particles, prepositions, pronouns; Be unique (don't replicate old titles)">&#x1f6c8;</span></Form.Label>
                                            <Form.Control type="text" id="AssetName" name='AssetName' maxLength="255"
                                                value={this.state.AssetName}
                                                onChange={e => this.handleChange(e)} placeholder="Enter Asset Name" />
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>{this.state.AssetFormSelectionLabel} Owner <sup>*</sup><span title="Email Address(s)">&#x1f6c8;</span></Form.Label>
                                            <Form.Control type="text" id="AssetOwner" name='AssetOwner' maxLength="500"
                                                value={this.state.AssetOwner}
                                                onChange={e => this.handleChange(e)} placeholder="Enter Asset Owner" />
                                            <small>Hint: Only Email ID is acceptable. Please use ',' separator in case of multiple Email IDs </small>
                                        </Form.Group>
                                    </Row>
                                   <Row>
                                      
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>Solution Area <sup>*</sup><span title="Select all solution areas this asset involves ">&#x1f6c8;</span></Form.Label>
                                         
                                            <Form.Control as="select" multiple id="SolutionArea" name='SolutionArea' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.solutionFilterdrop }}>

                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>Industry <sup>*</sup><span title="All Industries this asset directly addresses should be selected">&#x1f6c8;</span></Form.Label>
                                            <Form.Control as="select" multiple id="Industry" name='Industry' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.IndustryFilterdrop }}>
                                            </Form.Control>
                                        </Form.Group>

                                    </Row>
                                    {/*<Row>
                                         <Form.Group as={Col} md={6} >
                                            <Form.Label>Industry <sup>*</sup><span title="All Industries this asset directly addresses should be selected">&#x1f6c8;</span></Form.Label>
                                            <Form.Control as="select" multiple id="Industry" name='Industry' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.IndustryFilterdrop }}>
                                            </Form.Control>
                                        </Form.Group> 
                                         
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>Buyer Profile <sup>*</sup><span title="All customer consumers that should be targeted with this asset should be selected">&#x1f6c8;</span></Form.Label>
                                            <Form.Control as="select" multiple id="Platform" name='Platform' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.PlatformFilterdrop }}>
                                            </Form.Control>
                                        </Form.Group>
                                        
                                    </Row>*/}
                                    <Row>
                                         
                                        {/* <Form.Group as={Col}  md={6} >
                                            <Form.Label>Assets Type <sup>*</sup><span title="All the different types of collateral that belong to this asset should be selected. this asset should be selected">&#x1f6c8;</span></Form.Label>
                                            <Form.Control as="select" multiple id="AssetType" name='AssetType' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.AssetTypedrop }}> 
                                             </Form.Control>
                                            </Form.Group>
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>Sales Initiatives <sup>*</sup><span title="All the different types of collateral that belong to this asset should be selected.">&#x1f6c8;</span></Form.Label>
                                            <Form.Control as="select" multiple id="SalesPlay" name='SalesPlay' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.SalesPlaydrop }}>
                                            </Form.Control>
                                        </Form.Group> */}
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>{this.state.AssetFormSelectionLabel} Expiry Tenure <span title="All assets will automatically default to 6 months expiration. Kindly select suitable value, if asset tenure needs to be more than 6 months">&#x1f6c8;</span></Form.Label>
                                            <br />
                                            <Form.Control as="select" id="AssetExpiryDate" name='AssetExpiryDate' onChange={e => this.handleChange(e)}>
                                                <option value="6">6 Months</option>
                                                <option value="9">9 Months</option>
                                                <option value="12">12 Months</option>
                                            </Form.Control>
                                           
                                        </Form.Group>    
                                       
                                         
                                        {/* <Form.Group as={Col}  md={6} >
                  <Form.Label>Location</Form.Label>
                     <Form.Control type="text" id="Location" name='Location'
                    value={this.state.Location}
                    onChange={e => this.handleChange(e)} placeholder="Enter Location" />
                  </Form.Group> */}
                                    </Row>
                                    {(this.state.AssetFormSelection == '170k5dr4xvz') &&
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Customer Name <span title="Please ensure this is the Oracle standard name, not an abbreviation
                        Examples: Development Center, not DC">&#x1f6c8;</span></Form.Label>
                                                <Form.Control type="text" id="Customer" name='Customer' maxLength="255"
                                                    value={this.state.Customer}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Customer" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Service Request ID </Form.Label>
                                                <Form.Control type="text" id="ScrmID" name='ScrmID' maxLength="20"
                                                    value={this.state.ScrmID}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Service Request ID" />
                                            </Form.Group>

                                        </Row>

                                    } 
                                    <Row>
                                    <Form.Group as={Col} md={6} >
                                            <Form.Label>Upload Thumbnail <sup>*</sup><span title="Upload the default image that would be displayed as thumbnail for the asset.">&#x1f6c8;</span></Form.Label>
                                            <Form.Control as="file">
                                                {/* <label for="upload-photo">Browse...</label> */}

                                                <input type="file" encType="multipart/form-data" name="file" id="upload-cover-photo" onChange={e => this.UploadMediaFile(e)} /> 
                                                
                                            </Form.Control>
                                            <div class="mt-2">
                                            {this.state.ASSET_THUMBNAIL != "" &&
                                                    <img src={this.state.ASSET_THUMBNAIL} class={this.state.class} height="40px" />}
                                                <small>Please upload png/jpeg image upto 500 kb in size</small>
                                            </div>

                                        </Form.Group>
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>Upload  Video Link <span title="Attach the default business video link of the asset from OTube/Youtube.">&#x1f6c8;</span></Form.Label>
                                            <Form.Control type="text" id="video_link" name='video_link' maxLength="255"
                                                value={this.state.video_link}
                                                onChange={e => this.handleChange(e)} placeholder="Enter Otube / Youtube Embed link" />

                                            {/* <Form.Control as="file">
                       
                        <input type="test" name="video_link" id="video_link" onChange={e => this.handleChange(e)}/>   {this.state.ASSET_Video!="" && 
                      <a href={this.state.ASSET_Video} target="_blank" class={this.state.class}>View</a>}
                     </Form.Control> */}
                                        </Form.Group>
                                       

                                    </Row>
                                    <hr/>

                                    <Row>
                                        <Form.Group as={Col} md={6} >
                                            <Form.Label>{this.state.AssetFormSelectionLabel} Description <sup>*</sup><span title="Describe the business value with a short description of the product (< 250 characters)">&#x1f6c8;</span></Form.Label>
                                            <SimpleMDE
                                             id="Asset_Description"
                                            getMdeInstance= { this.getInsance } // <-- set callback prop
                                            value={this.state.Asset_Description}
                                            onChange={this.handleEditChange}
                                            
                                            />
                                            
                                            
                                            {/* <SimpleMDE
                                        id="Asset_Description"
                                        label=""
                                        onChange={this.handleEditChange}
                                        value={this.state.textValue}
                                        options={{
                                            autofocus: true,
                                            spellChecker: false
                                            // etc.
                                        }}
                                        /> */}
                                          
                                            {/* <Form.Control as="textarea" id="Asset_Description" name='Asset_Description' maxLength="4000"
                                                onChange={e => this.handleChange(e)} value={this.state.Asset_Description}>

                                            </Form.Control> */}
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} >
                                        <Form.Label>{this.state.AssetFormSelectionLabel=="Workshop" && <> Messaging, Personas & Leading Questions </>} {this.state.AssetFormSelectionLabel!="Workshop" && <> Use Case </>}</Form.Label>
                                            <SimpleMDE
                                             id="Use_Case"
                                            getMdeInstance= { this.getInsance } // <-- set callback prop
                                            value={this.state.Use_Case}
                                            onChange={this.handleUseCaseChange}
                                            
                                            />
                                            {/* <Form.Control as="textarea" name='Use_Case' id="Use_Case" maxLength="4000"
                                                onChange={e => this.handleChange(e)} value={this.state.Use_Case}>

                                            </Form.Control> */}
                                        </Form.Group>
                                      
                                    </Row>
                                   
                                    {/* <Row>
                  <Form.Group as={Col}  md={6} controlId="formGridEmail">
                     <Form.Label>Asset  Accessablity</Form.Label>
                     <Form.Control as="textarea" name='Asset_Accessablity'
                    onChange={e => this.handleChange(e)}>
                        {this.state.Asset_Accessablity}
                     </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}  md={6} controlId="formGridEmail">
                  </Form.Group>
               </Row> */}
                                    <div class="mt-4">
                                        <div className="title flex">
                                            <div class="nowrap">NOTIONAL ARCHITECTURE </div>
                                            <div class="titleLine"></div>
                                        </div>
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Notional Architecture Notes {(this.state.AssetFormSelection == "170k5dr4xvz") && <sup>*</sup>}<span title="Notes should  include: Technologies used; Description of the flow of information; Could include difficulties">&#x1f6c8;</span></Form.Label>
                                                <SimpleMDE
                                             id="Notional_Architechure_Notes"
                                             name='Notional_Architechure_Notes'
                                            getMdeInstance= { this.getInsance } // <-- set callback prop
                                            value={this.state.Notional_Architechure_Notes}
                                            onChange={this.handleNotionalChange}
                                            
                                            />
                                               
                                                {/* <Form.Control as="textarea" id="Notional_Architechure_Notes" name='Notional_Architechure_Notes' maxLength="1000"
                                                    onChange={e => this.handleChange(e)} value={this.state.Notional_Architechure_Notes}>

                                                </Form.Control> */}
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Upload Architecture {(this.state.AssetFormSelection == "170k5dr4xvz") && <sup>*</sup>}<span title="Upload images related to architecture ">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="file">
                                                    {/* <label for="upload-photo">Browse...</label> */}
                                                    <input type="file" multiple="multiple" name="archPhoto" encType="multipart/form-data" id="notionalArchtechure" onChange={e => this.UploadMediaFile(e)} />
                                                    {/* <div class={this.state.class}>

                                                        {this.state.ImagesArch.map((IMAGES, index) =>
                                                            <>
                                                            
                                                                <img src={IMAGES.IMAGEURL} width="50px" height="50px" />&nbsp;
                                                                <a href="javascript:void(0)" onClick={() => this.handleDetete(IMAGES.IMAGE_ID)}>Delete</a>
                                                            </>
                                                        )}
                                                    </div> */}
                                                    {/* <small>Please upload png/jpeg image less than 6 mb in size</small> */}
                                                </Form.Control>
                                                <div class="mt-2">
                                                {this.state.ImagesArch.map((IMAGES, index) =>
                                                            <>
                                                            <div >
                                                                <img src={IMAGES.IMAGEURL}  height="40px" />&nbsp;
                                                                <a href="javascript:void(0)" onClick={() => this.handleDetete(IMAGES.IMAGE_ID)}>Delete</a>
                                                           </div>
                                                            </>
                                                        )}
                                                        <div><small>Please upload png/jpeg image upto 6 mb in size</small></div>
                                            </div>
                                            </Form.Group>

                                        </Row>
                                    </div>

                                    <div class="mt-4">
                                        <div className="title flex">
                                            <div class="nowrap">COLLATERAL</div>
                                            <div class="titleLine"></div>
                                        </div>
                                        {/* <div class="flex justify">
                                            <div><strong>Add Document Link</strong> <span title="Please attach document link(s) related to asset presentation(s) like solution pitch, demo script etc.">&#x1f6c8;</span></div>
                                            <Button variant="outline-primary" size="sm" onClick={(e) => this.onAddNew('DocumentLink')}>+ Add New</Button>
                                        </div>

                                        <div>
                                            <Row id="DocumentLink">
                                                <Form.Group as={Col} md={3} >
                                                    <Form.Control type="text" maxLength="255" placeholder="Enter Document Name" />
                                                </Form.Group>
                                                <Form.Group as={Col} md={3} >
                                                    <Form.Control type="text" maxLength="2000" placeholder="Enter Document Link" />
                                                </Form.Group>
                                                <Form.Group as={Col} md={6} >
                                                    <Form.Control type="textarea" maxLength="4000" placeholder="Enter Description" />
                                                </Form.Group>
                                            </Row>
                                            <div id="DocumentLinkAdd" />
                                        </div> */}
                                    </div>

                                    <div>
                                        <div class="flex justify">
                                            <div><strong>Upload Document</strong><span title="Please attach document(s) related to demo overview, solution flow etc.">&#x1f6c8;</span></div>
                                            <Button variant="outline-primary" size="sm" data-id='DocumentLink' onClick={(e) => this.onAddNew('PresentationLink')}>+ Add New</Button>
                                        </div>

                                        <div id="PresentationLinkAdd" />
                                        <Row id="PresentationLink">
                                            <Form.Group as={Col} md={3} >
                                                <Form.Control type="text" maxLength="255" id="documentName" placeholder="Enter Document Name" />
                                            </Form.Group>
                                            <Form.Group as="file" as={Col} md={3} >
                                                <input type="file" name="uploadDocuments" id="documents" encType="multipart/form-data" className="documentUpload" onChange={e => this.UploadMediaFile(e)} />
                                                <div class={this.state.class}>
                                                    <img src="../img/Reports.png" width="20px" height="20px" />&nbsp;
                                                    <label></label>&nbsp;
                                                    {/* <a href="javascript:void(0)" onClick={() => this.handleDetete()}>Delete</a> */}
                                                </div>
                                            </Form.Group>
                                            <Form.Group as={Col} md={5} >
                                                <Form.Control type="textarea" maxLength="4000" id="documentDesc" placeholder="Enter Description" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={1} >
                                                <div></div>
                                            </Form.Group>
                                        </Row>
                                    </div>
                                    <div>
                                        <div class="flex justify">
                                            <div><strong>Add Media Link</strong><span title="Attach the additional business video link(s) of the asset from OTube/Youtube.">&#x1f6c8;</span></div>
                                            <Button variant="outline-primary" size="sm" data-id='DocumentLink' onClick={(e) => this.onAddNew('MediaLink')}>+ Add New</Button>
                                        </div>

                                        <div id="MediaLinkAdd" />
                                        <Row id="MediaLink">
                                            <Form.Group as={Col} md={3} >
                                                {/* <Form.Label>Enter Media File Name</Form.Label> */}
                                                <Form.Control type="text" maxLength="255" placeholder="Enter Media Name" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={3} >
                                                {/* <Form.Label>Enter Media Url</Form.Label> */}
                                                <Form.Control type="text" maxLength="2000" placeholder="Enter Media Link" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                {/* <Form.Label>Enter Presentation Url</Form.Label> */}
                                                <Form.Control type="textarea" maxLength="4000" placeholder="Enter Description" />
                                            </Form.Group>
                                        </Row>
                                    </div>
                                    <div>
                                        <div class="flex justify">
                                            <div><strong>Add Code Repo Link</strong><span title="Please attach ALM/ORAHUB link related to asset code repository">&#x1f6c8;</span></div>
                                            <Button variant="outline-primary" size="sm" data-id='DocumentLink' onClick={(e) => this.onAddNew('CodeLink')}>+ Add New</Button>
                                        </div>

                                        <div id="CodeLinkAdd" />
                                        <Row id="CodeLink">
                                            <Form.Group as={Col} md={3} >
                                                {/* <Form.Label>Enter Media File Name</Form.Label> */}
                                                <Form.Control type="text" maxLength="255" placeholder="Enter Code Repo Name" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={3} >
                                                {/* <Form.Label>Enter Media Url</Form.Label> */}
                                                <Form.Control type="text" maxLength="2000" placeholder="Enter Code Repo Link" />
                                            </Form.Group>
                                            {/* <Form.Group as={Col} md={5} >
                                                <strong class="deploy_status">Please select if the code is deployable</strong><Form.Control type="checkbox" placeholder="Enter Code Repo Link" title="Deployable Status" />
                                            </Form.Group> */}
                                            <Form.Group as={Col} md={6} >
                                                {/* <Form.Label>Enter Presentation Url</Form.Label> */}
                                                <Form.Control type="textarea" maxLength="4000" placeholder="Enter Description" />
                                            </Form.Group>
                                        </Row>
                                    </div>
                                    <div>
                                        <div class="flex justify">
                                            <div><strong>Add Additional Link</strong><span title="Please attach any additional links related to the asset">&#x1f6c8;</span></div>
                                            <Button variant="outline-primary" data-id='DocumentLink' size="sm" onClick={(e) => this.onAddNew('RelatedLink')}>+ Add New</Button>
                                        </div>

                                        <div id="RelatedLinkAdd" />
                                        <Row id="RelatedLink">
                                            <Form.Group as={Col} md={5} >
                                                {/* <Form.Label>Enter Related Url</Form.Label> */}
                                                <Form.Control type="text" maxLength="2000" placeholder="Enter Link" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                {/* <Form.Label>Enter Presentation Url</Form.Label> */}
                                                <Form.Control type="text" maxLength="4000" placeholder="Enter Description" />
                                            </Form.Group>
                                        </Row>
                                    </div>


                                    <Form.Group as={Col} md={2} >

                                    </Form.Group>
                                    <Row>
                                        <input type="hidden" id="AssetId" name="AssetId" value={this.state.id} />
                                        <a variant="primary" className="text-center mb20 CreateAsset" onClick={(e) => this.onCreateClick(e)} type="submit">
                                            {this.state.msgbtn}
                                        </a>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        );
    }
}
export default AssetDetails;