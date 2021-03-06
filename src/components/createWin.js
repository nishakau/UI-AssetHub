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
import Dropdown from 'react-bootstrap/Dropdown';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { globalAgent } from 'http';
class AssetDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            WinstoryName: '',
            Customer: '',
            RepAndSE: '',
            WinStoryOwner: '',
            WinFiscalQuarter: '',
            Channel: '',
            Competition: '',
            DealSize: '',
            SolutionUsecase: '',
            LOB: '',
            LOBSecondLevel: '',
            Partner: '',
            Renewal: '',
            ApplicationInstall: '',
            Imperative: '',
            ImperativeSecondLevel: '',
            CustomerImpact: '',
            BusinessDriver: '',
            SalesProcess: '',
            LessonsLearnt: '',
            SolutionArea: '',
            SolutionAreaL2: '',
            Industry: '',
            Use_Case: '',
            AssetTypeID: '',
            solutionFilterdrop: [],
            solutionL2Filterdrop: [],
            IndustryFilterdrop: '',
            CompetitorFilterdrop: '',
            SalesPlaydrop: '',
            LOBFilterDrop: [],
            LOBFilterDrop2: [],
            ImperativeFilterDrop: [],
            ImperativeFilterDrop2: [],
            SolutionUseCaseDrop: '',
            WinStatusdrop: [],
            msg: 'CREATE WIN STORY',
            msgbtn: "SUBMIT",
            id: '',
            arch: '',
            class: 'createPanel',
            LoginSuccessRedirect: '',
            ImagesArch: [],
            WINSTORY_LOGO: '',
            PlatformFilterdrop: [],
            createdDate: "",
            WinFormSelection: 'fd5k53p09dl',
            ListOfWinForms: [],
            WinFormSelectionLabel: '-Wins',
            consltQ1: '',
            consltQ2: '',
            consltQ3: '',
            consltQ4: '',
            // Location:''
        };
    }
    componentDidMount() {
        // sessionStorage.setItem('user_email','deepika.r@oracle.com');
        // var loadStatus=""{

        // }
        // window.location.reload(true);

        var url = window.location.href;
        this.setState({
            WinFiscalQuarter: 'FY19 Q1'
        })
        this.setState({
            Channel: 'Field'
        })
        if (url.indexOf('?') != -1) {
            var ID = url.split('?');
            axios.get(global.Ip + global.Port + '/winstory/' + ID[1], {
                "user_email": sessionStorage.getItem("user_email")
            }, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            }).then(res => {
                console.log(res);
                var arch = "";
                // console.log(res.data.IMAGES);

                setTimeout(() => {

                    // document.getElementById('AssetExpiryDate').value=res.data.ASSET_EXPIRY_DATE;
                    console.log('*********************Filtermp***************************');
                    console.log(res.data.FILTERMAP);
                    var arrSol = []; var arrIndus = []; var arrCometitor = []; var arrPfrm = []; var arrAsst = []; var arrWin = [];
                    for (var valuesol = 0; valuesol < res.data.FILTERMAP.length; valuesol++) {
                        console.log(res.data.FILTERMAP[valuesol].TYPE);
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
                        // if (res.data.FILTERMAP[valuesol].TYPE == 'Win Status') {
                        //     var selectedElement = document.getElementById('WinStatus');
                        //     for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                        //         arrWin.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                        //     }
                        //     var values10 = arrWin;
                        //     for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                        //         selectedElement.options[selectSol].selected = values10.indexOf(selectedElement.options[selectSol].value) >= 0;
                        //     }
                        // }
                        if (res.data.FILTERMAP[valuesol].TYPE == 'Competitor') {
                            var selectedElement = document.getElementById('Competitor');
                            console.log(res.data.FILTERMAP[valuesol].arr);
                            for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                arrCometitor.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                                console.log("arrCometitor" + res.data.FILTERMAP[valuesol].TYPE);
                            }
                            var values1 = arrCometitor;
                            for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                selectedElement.options[selectSol].selected = values1.indexOf(selectedElement.options[selectSol].value) >= 0;
                            }
                        }
                        if (res.data.FILTERMAP[valuesol].TYPE == 'Sales Initiatives') {
                            var selectedElement = document.getElementById('SalesPlay');

                            // alert('1'+res.data.FILTERMAP[valuesol]);
                            for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                arrAsst.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                            }
                            var values4 = arrAsst;
                            for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                selectedElement.options[selectSol].selected = values4.indexOf(selectedElement.options[selectSol].value) >= 0;
                            }

                        }
                        if (res.data.FILTERMAP[valuesol].TYPE == 'Buyer Profile') {
                            var selectedElement = document.getElementById('Platform');

                            // alert('1'+res.data.FILTERMAP[valuesol]);
                            for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                arrPfrm.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                            }
                            var values2 = arrPfrm;
                            for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                selectedElement.options[selectSol].selected = values2.indexOf(selectedElement.options[selectSol].value) >= 0;
                            }

                        }
                        if (res.data.FILTERMAP[valuesol].TYPE == 'Solution Area') {
                            var selectedElement = document.getElementById('SolutionArea');

                            for (var p = 0; p <= res.data.FILTERMAP[valuesol].arr.length - 1; p++) {
                                arrSol.push(res.data.FILTERMAP[valuesol].arr[p].FILTER_ID);
                            }
                            var values = arrSol;
                            // console.log(values);
                            // console.log(selectedElement.options.length);
                            for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                                //    console.log(selectedElement.options[selectSol].value);
                                selectedElement.options[selectSol].selected = values.indexOf(selectedElement.options[selectSol].value) >= 0;
                                //    console.log(values.indexOf(selectedElement.options[selectSol].value) >= 0);
                            }
                        }
                    }

                    // if(res.data.WINSTORY_MAPPED_L2_FILTERS!="" && res.data.WINSTORY_MAPPED_L2_FILTERS!=null){
                    //     let solAreaL2 = res.data.WINSTORY_MAPPED_L2_FILTERS.split(",");
                    //     var selectedElement = document.getElementById('SolutionAreaL2');
                    //     var arrSol = []
                    //        for(var p=0;p<=solAreaL2.length-1;p++){
                    //         arrSol.push(solAreaL2[p]);   
                    //        }
                    //        var values1 = arrSol;
                    //        for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                    //            selectedElement.options[selectSol].selected = values1.indexOf(selectedElement.options[selectSol].value) >= 0;
                    //        }

                    // }
                    if (other_filters.solution_use_case) {
                        var selectedElement = document.getElementById('SolutionUsecase');
                        var solusecase = []
                        for (var p = 0; p <= other_filters.solution_use_case.length - 1; p++) {
                            solusecase.push(other_filters.solution_use_case[p].FILTER_ID);
                        }
                        var values1 = solusecase;
                        for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                            selectedElement.options[selectSol].selected = values1.indexOf(selectedElement.options[selectSol].value) >= 0;
                        }

                    }
                    if (other_filters.LOB) {
                        var selectedElement = document.getElementById('LOBSecondLevel');
                        var lobsecondlevel = []
                        for (var p = 0; p <= other_filters.LOB.length - 1; p++) {
                            lobsecondlevel.push(other_filters.LOB[p].LOB_ID.toString());
                        }
                        var values1 = lobsecondlevel;
                        for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                            selectedElement.options[selectSol].selected = values1.indexOf(selectedElement.options[selectSol].value) >= 0;
                        }


                    }
                    if (other_filters.Imperative) {
                        var selectedElement = document.getElementById('ImperativeSecondLevel');
                        var imperativesecondlevel = []
                        for (var p = 0; p <= other_filters.Imperative.length - 1; p++) {
                            imperativesecondlevel.push(other_filters.Imperative[p].FILTER_ID.toString());
                        }
                        var values1 = imperativesecondlevel;
                        for (var selectSol = 0; selectSol < selectedElement.options.length; selectSol++) {
                            selectedElement.options[selectSol].selected = values1.indexOf(selectedElement.options[selectSol].value) >= 0;
                        }

                    }
                    var ColtrlDoc = "";
                    //  alert(res.data.LINKS.length);
                    for (var coltrl = 0; coltrl <= res.data.LINKS.length - 1; coltrl++) {
                        if (res.data.LINKS[coltrl].TYPE == "DOCUMENT") {

                            document.getElementById('DocumentLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_NAME;
                            document.getElementById('DocumentLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                            document.getElementById('DocumentLink').children[2].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;
                            for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                var itm = document.getElementById('DocumentLink');
                                var cln = itm.cloneNode(true);
                                cln.id = 'DocumentLinkAdd' + parseInt(k - 1);
                                cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_NAME;
                                cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                                cln.children[2].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;
                                document.getElementById('DocumentLinkAdd').appendChild(cln);
                            }





                        } else if (res.data.LINKS[coltrl].TYPE == "PRESENTATION") {
                            document.getElementById('PresentationLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_NAME;
                            document.getElementById('PresentationLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                            document.getElementById('PresentationLink').children[2].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;

                            for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                var itm = document.getElementById('PresentationLink');
                                var cln = itm.cloneNode(true);
                                cln.id = 'PresentationLinkAdd' + parseInt(k - 1);
                                cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_NAME;
                                cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                                cln.children[2].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;


                                document.getElementById('PresentationLinkAdd').appendChild(cln);
                            }
                        } else if (res.data.LINKS[coltrl].TYPE == "MEDIA") {
                            document.getElementById('MediaLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_NAME;
                            document.getElementById('MediaLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                            document.getElementById('MediaLink').children[2].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;

                            for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                var itm = document.getElementById('MediaLink');
                                var cln = itm.cloneNode(true);
                                cln.id = 'MediaLinkAdd' + parseInt(k - 1);
                                cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_NAME;
                                cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                                cln.children[2].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;

                                document.getElementById('MediaLinkAdd').appendChild(cln);
                            }
                        }
                        else if (res.data.LINKS[coltrl].TYPE == "RELATED") {
                            document.getElementById('RelatedLink').children[0].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_URL;
                            document.getElementById('RelatedLink').children[1].children[0].value = res.data.LINKS[coltrl].arr[0].LINK_DESCRIPTION;

                            for (var k = 1; k <= res.data.LINKS[coltrl].arr.length - 1; k++) {
                                var itm = document.getElementById('RelatedLink');
                                var cln = itm.cloneNode(true);
                                cln.id = 'RelatedLinkAdd' + parseInt(k - 1);
                                cln.children[0].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_URL;
                                cln.children[1].children[0].value = res.data.LINKS[coltrl].arr[k].LINK_DESCRIPTION;

                                document.getElementById('RelatedLinkAdd').appendChild(cln);
                            }
                        }

                    }

                }, 3000);


                var other_filters = JSON.parse(res.data.WINSTORY_OTHER_FILTER);
                console.log(other_filters);
                var LOBValue = "";  //[]
                if (other_filters.LOB[0] != null) {
                    LOBValue = other_filters.LOB[0].LOB_TYPE;
                }
                var ImperativeValue = ""; //[]

                if (other_filters.Imperative.length > 0) {
                    ImperativeValue = other_filters.Imperative[0].FILTER_TYPE;
                }
                var SolAreaFilterID = ""; //[]
                if (res.data.SOLUTION_AREAS.length > 0) {
                    SolAreaFilterID = res.data.SOLUTION_AREAS[0].FILTER_ID;
                }
                this.setState({
                    LOB: LOBValue,
                    Imperative: ImperativeValue,
                    SolutionArea: SolAreaFilterID,
                    ImagesArch: res.data.IMAGES
                });
                var SplitPicked = res.data.WINSTORY_CREATED_ON.split("T");
                //console.log(res.data.GROUP_TYPE[0].FILTER_ID)
                this.setState({
                    WinstoryName: res.data.WINSTORY_NAME,
                    // Deal_Cycle_Time: res.data.WINSTORY_DEAL_CYCLE_TIME,
                    Customer: res.data.WINSTORY_CUSTOMER_NAME,
                    RepAndSE: res.data.WINSTORY_REPS_SE,
                    WinStoryOwner: res.data.WINSTORY_CREATED_BY,
                    WinFiscalQuarter: res.data.WINSTORY_FISCAL_QUARTER,
                    Channel: res.data.WINSTORY_CHANNEL,
                    SolutionUsecase: res.data.WINSTORY_SOLUTION_USECASE,
                    Competition: res.data.WINSTORY_COMPETIION,
                    Partner: res.data.WINSTORY_PARTNER,
                    CustomerImpact: res.data.WINSTORY_CUSTOMER_IMPACT,
                    BusinessDriver: res.data.WINSTORY_BUSSINESS_DRIVER,
                    SalesProcess: res.data.WINSTORY_SALES_PROCESS,
                    LessonsLearnt: res.data.WINSTORY_LESSON_LEARNT,
                    Renewal: res.data.WINSTORY_RENEWAL,
                    ApplicationInstall: res.data.WINSTORY_APPLICATION_INSTALL,
                    DealSize: res.data.WINSTORY_DEAL_SIZE,
                    Use_Case: res.data.WINSTORY_USECASE,
                    WINSTORY_THUMBNAIL: res.data.WINSTORY_THUMBNAIL,
                    WINSTORY_LOGO: res.data.WINSTORY_LOGO,
                    msg: 'EDIT WIN STORY',
                    msgbtn: "SAVE",
                    class: 'editPanel',
                    id: res.data.WINSTORY_ID,
                    arch: arch,
                    createdDate: SplitPicked[0],
                    consltQ1: res.data.WINSTORY_CONSULTING_Q1,
                    consltQ2: res.data.WINSTORY_CONSULTING_Q2,
                    consltQ3: res.data.WINSTORY_CONSULTING_Q3,
                    consltQ4: res.data.WINSTORY_CONSULTING_Q4,
                    WinFormSelection: 'edit',
                    WinFormSelection: res.data.GROUP_TYPE[0].FILTER_ID,
                    WinFormSelectionLabel: res.data.GROUP_TYPE[0].FILTER_NAME,
                    // Location:res.data.ASSET_LOCATION
                })
                if (res.data.WINSTORY_THUMBNAIL != "" && res.data.WINSTORY_LOGO != "") {

                    global.CovertedLogobase64 = "";
                    global.CovertedPhotobase64 = "";


                }
                //     alert(res.data.WINSTORY_LOGO);
                //     var thumbnailURL = res.data.WINSTORY_THUMBNAIL
                //     //console.log(res.data.WINSTORY_THUMBNAIL)
                //     var imagetype= 'jpeg';
                //     if(thumbnailURL.indexOf('jpg')!=-1){
                //         imagetype = 'jpg';
                //     } 
                //     else if(thumbnailURL.indexOf('png')!=-1){
                //         imagetype = 'png';
                //     } 

                //     axios({
                //         method: 'get',
                //         url: res.data.WINSTORY_THUMBNAIL , 
                //              }).then(function(response){
                //                 var myFILE = new Blob([response.data], {type:`image/${imagetype}`});
                //                 var reader = new FileReader();
                //                 reader.readAsDataURL(myFILE);
                //                 reader.onload = function () {
                //                     // global.CoverPhotobase64 = reader.result;
                //                     global.CoverPhotobase64=null;
                //                 };
                //                 reader.onerror = function (error) {
                //                     global.CoverPhotobase64 = reader.error;
                //                 };
                //     })

                //  }
                //  if(res.data.WINSTORY_LOGO!=""){
                //      alert(res.data.WINSTORY_LOGO);
                //     var logoURL = res.data.WINSTORY_LOGO;
                //     //console.log(res.data.WINSTORY_THUMBNAIL)
                //     var imagetype= 'jpeg';
                //     if(logoURL.indexOf('jpg')!=-1){
                //         imagetype = 'jpg';
                //     } 
                //     else if(logoURL.indexOf('png')!=-1){
                //         imagetype = 'png';
                //     } 

                //     axios({
                //         method: 'get',
                //         url: res.data.WINSTORY_LOGO, 
                //              }).then(function(responseLogo){
                //                 var myFILElogo = new Blob([responseLogo.data], {type:`image/${imagetype}`});
                //                 var readerresponseLogo = new FileReader();
                //                 readerresponseLogo.readAsDataURL(myFILElogo);
                //                 readerresponseLogo.onload = function () {
                //                     // global.CoverLogobase64 = readerresponseLogo.result;
                //                     global.CoverLogobase64=null;
                //                 };
                //                 readerresponseLogo.onerror = function (error) {
                //                     global.CoverLogobase64 = readerresponseLogo.error;
                //                 };
                //     })

                //  }

            })
        }
        axios.get(global.Ip + global.Port + '/asset/allfilters', {
            "user_email": sessionStorage.getItem("user_email")
        }, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        }).then(res => {
            const FilterData = res.data.allFilters;
            var ListOfWinFormsData = [];
            for (var i = 0; i < res.data.allFilters.length; i++) {

                if (FilterData[i].Type == "Solution Area") {
                    var SolutionAreaDrop = "";
                    for (var Solfilter = 0; Solfilter < FilterData[i].filters.length; Solfilter++) {
                        SolutionAreaDrop += "<option value='" + FilterData[i].filters[Solfilter].FILTER_ID + "'>" + FilterData[i].filters[Solfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        solutionFilterdrop: SolutionAreaDrop
                    })
                    // var SolutionAreaDrop = [];
                    // global.SolutionAreaTypeL2 = [];

                    // // this.setState({
                    // //     solutionFilterdrop: FilterData[i].filters
                    // // })
                    // //default value
                    // if(this.state.id!="" && this.state.SolutionArea){
                    //     this.setState({
                    //         SolutionArea: this.state.SolutionArea
                    //     })
                    //     var defaultsoluAreal2 = this.state.solutionFilterdrop.filter(soll2any=>
                    //         soll2any.FILTER_ID == this.state.SolutionArea 
                    //     )
                    //     var filterTypeL2 = []
                    //     if(defaultsoluAreal2.length > 0){
                    //         if(defaultsoluAreal2[0].FILTER_TYPE_L2!=null && defaultsoluAreal2[0].FILTER_TYPE_L2!=""){
                    //             filterTypeL2 = defaultsoluAreal2[0].FILTER_TYPE_L2.split(",");
                    //         }
                    //     }
                    //     this.setState({
                    //         solutionL2Filterdrop: filterTypeL2
                    //     })
                    // }
                }
                else if (FilterData[i].Type == "Win Status") {
                    var WinStatusDrop = "";
                    for (var Industryfilter = 0; Industryfilter < FilterData[i].filters.length; Industryfilter++) {
                        WinStatusDrop += "<option value='" + FilterData[i].filters[Industryfilter].FILTER_ID + "'>" + FilterData[i].filters[Industryfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        WinStatusdrop: WinStatusDrop
                    })


                }
                else if (FilterData[i].Type == "Industry") {
                    var IndustryAreaDrop = "";
                    for (var Industryfilter = 0; Industryfilter < FilterData[i].filters.length; Industryfilter++) {
                        IndustryAreaDrop += "<option value='" + FilterData[i].filters[Industryfilter].FILTER_ID + "'>" + FilterData[i].filters[Industryfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        IndustryFilterdrop: IndustryAreaDrop
                    })
                } else if (FilterData[i].Type == "Competitor") {
                    var CompetitorAreaDrop = "";
                    for (var Industryfilter = 0; Industryfilter < FilterData[i].filters.length; Industryfilter++) {
                        CompetitorAreaDrop += "<option value='" + FilterData[i].filters[Industryfilter].FILTER_ID + "'>" + FilterData[i].filters[Industryfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        CompetitorFilterdrop: CompetitorAreaDrop
                    })
                }
                else if (FilterData[i].Type == "Assets Type") {
                    var AssetTypeAreaDrop = " ";
                    for (var AssetTypefilter = 0; AssetTypefilter < FilterData[i].filters.length; AssetTypefilter++) {
                        if (FilterData[i].filters[AssetTypefilter].FILTER_NAME == "Wins") {
                            this.setState({
                                AssetTypeID: FilterData[i].filters[AssetTypefilter].FILTER_ID
                            })
                        }
                    }
                }
                else if (FilterData[i].Type == "Sales Initiatives") {
                    var SalesPlayAreaDrop = " ";
                    for (var SalesPlayfilter = 0; SalesPlayfilter < FilterData[i].filters.length; SalesPlayfilter++) {
                        SalesPlayAreaDrop += "<option value='" + FilterData[i].filters[SalesPlayfilter].FILTER_ID + "'>" + FilterData[i].filters[SalesPlayfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        SalesPlaydrop: SalesPlayAreaDrop
                    })
                }
                else if (FilterData[i].Type == "Buyer Profile") {
                    var PlatformAreaDrop = " ";
                    for (var Platformfilter = 0; Platformfilter < FilterData[i].filters.length; Platformfilter++) {
                        PlatformAreaDrop += "<option value='" + FilterData[i].filters[Platformfilter].FILTER_ID + "'>" + FilterData[i].filters[Platformfilter].FILTER_NAME + '</option>';
                    }
                    this.setState({
                        PlatformFilterdrop: PlatformAreaDrop
                    })
                }
                else if (FilterData[i].Type == "Wins Type") {
                    for (var j = 0; j < FilterData[i].filters.length; j++) {
                        if (FilterData[i].filters[j].FILTER_GROUP == "type_win") {
                            console.log(FilterData[i].filters[j].FILTER_NAME)
                            ListOfWinFormsData.push({ "id": FilterData[i].filters[j].FILTER_ID, "name": FilterData[i].filters[j].FILTER_NAME })
                        }
                    }
                    this.setState({
                        ListOfWinForms: ListOfWinFormsData
                    })
                }
            }

        })
        axios.get(global.Ip + global.Port + '/winstory/winstoryLobs', {
            "user_email": sessionStorage.getItem("user_email")
        }, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        }).then(lobs => {
            this.setState({
                LOBFilterDrop: lobs.data.allLobs
            })
            //Default value
            if (this.state.id == "") {
                this.setState({
                    LOB: this.state.LOBFilterDrop[0].Type
                })
            }
            var defaultlobs = this.state.LOBFilterDrop.filter(lobsany =>
                lobsany.Type == this.state.LOB
            )
            if (defaultlobs[0].lobs != null) {
                var dfltLob = defaultlobs[0].lobs;
            } else {
                var dfltLob = "";

            }
            this.setState({
                LOBFilterDrop2: dfltLob
            })
        })
        axios.get(global.Ip + global.Port + '/winstory/winstoryimperative', {
            "user_email": sessionStorage.getItem("user_email")
        }, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        }).then(imperatives => {
            this.setState({
                ImperativeFilterDrop: imperatives.data.allOtherFilters
            })
            //Default Values
            if (this.state.id == "" || !this.state.Imperative) {
                this.setState({
                    Imperative: this.state.ImperativeFilterDrop[0].Type
                })
            }
            var defaultsubfilters = this.state.ImperativeFilterDrop.filter(subfilterssany =>
                subfilterssany.Type == this.state.Imperative
            )
            //(defaultsubfilters)
            if (defaultsubfilters.length > 0) {
                this.setState({
                    ImperativeFilterDrop2: defaultsubfilters[0].SubFilters
                })
            }
            else {
                this.setState({
                    ImperativeFilterDrop2: this.state.ImperativeFilterDrop[0].SubFilters
                })
            }

        })
        axios.get(global.Ip + global.Port + '/winstory/winstorysolutionusecase', {
            "user_email": sessionStorage.getItem("user_email")
        }, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        }).then(solutionusecase => {
            var SolutionAreaDrop = "";
            var SolutionUseCaseData = solutionusecase.data.Solution_Usecase;
            for (var SolutionFilter = 0; SolutionFilter < SolutionUseCaseData.length; SolutionFilter++) {
                SolutionAreaDrop += "<option value='" + SolutionUseCaseData[SolutionFilter].SOLUTION_USECASE_ID + "'>" + SolutionUseCaseData[SolutionFilter].SOLUTION_USECASE_NAME + '</option>';
            }
            this.setState({
                SolutionUseCaseDrop: SolutionAreaDrop
            })
        })
        //setting default values


        // axios.get(global.Ip + global.Port + '/asset/editAsset')
        // .then(res => {

        //     console.log(res);
        // });
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

        if ((e.target.getAttribute("id") == "upload-cover-photo") || (e.target.getAttribute("id") == "upload-cover-logo")) {
            if (filesize <= 500000 && (tolowerextn == 'png' || tolowerextn == 'jpg' || tolowerextn == 'jpeg')) {
                // if((e.target.files.size <=6000000) ){
                // console.log(e.target.files);

                for (const file of e.target.files) {
                    // console.log(e.target.files);


                    //  if((file.size <=6000000) && ((SplitExtn[1]=='png') || (SplitExtn[1]=='PNG') || (SplitExtn[1]=='Jpeg')|| (SplitExtn[1]=='jpg') )){

                    //}
                    function getBase64(file, val) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                            console.log(reader.result);
                            console.log(val);
                            if (val == "CovertedPhotobase64") {
                                global.CovertedPhotobase64 = reader.result;

                            } else {
                                global.CovertedLogobase64 = reader.result;
                            }
                        };
                        reader.onerror = function (error) {
                            console.log('Error: ', error);
                        };
                    }
                    data.append('file', file, file.name)
                    // alert(e.target.getAttribute("id"));
                    if (e.target.getAttribute("id") == "upload-cover-photo") {
                        console.log(file);
                        var headerObj = {
                            "type": 'thumbnail',
                            "Content-Type": 'multipart/form-data'
                        }
                        getBase64(file, "CovertedPhotobase64");
                        // global.CoverPhoto = data;
                        // global.headerObj = headerObj; 
                        // var reader = new FileReader();
                        // reader.readAsDataURL(file);
                        // reader.onload = () => {
                        //     global.CoverPhotobase64 = reader.result;
                        //     this.setState({
                        //         WINSTORY_THUMBNAIL: ""
                        //     })
                        // };
                        // reader.onerror = function (error) {
                        //     global.CoverPhotobase64 = reader.error;
                        // };
                        // console.log( data);
                    }

                    if (e.target.getAttribute("id") == "upload-cover-logo") {
                        //  alert('2');
                        var headerObj1 = {
                            "type": 'logo',
                            "Content-Type": 'multipart/form-data'
                        }
                        getBase64(file, "CovertedLogobase64");

                        // global.CoverLogo = data;
                        // global.headerObj = headerObj1; 
                        // var reader3 = new FileReader();
                        // reader3.readAsDataURL(file);
                        // console.log(reader3.result);
                        // reader3.onload = () => {
                        //     global.CoverLogobase64 = reader3.result;
                        //     this.setState({
                        //         WINSTORY_LOGO: ""
                        //     })
                        // };
                        // reader3.onerror = function (error) {
                        //     global.CoverLogobase64 = reader3.error;
                        // };
                        // console.log(global.CoverLogobase64);
                        // global.thumbnail = data;
                        // global.headerThumbnailObj = headerObj1;

                    }
                    // console.log(data);

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



    }

    handleChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })
        if (e.target.name == "createdDate") {

        }
        // alert(this.state.createdDate) ; 
    }

    handleChangeSecondLevel = (e) => {


        if (e.target.name == 'LOB') {
            this.setState({
                [e.target.name]: e.target.value
            })
            if (this.state.LOBFilterDrop != "") {
                var lobvalues = this.state.LOBFilterDrop.filter(lobsany => lobsany.Type == e.target.value)
                this.setState({
                    LOBFilterDrop2: lobvalues[0].lobs
                })
            }
        }
        else if (e.target.name == 'Imperative') {
            this.setState({
                [e.target.name]: e.target.value
            })
            var imperativevalues = this.state.ImperativeFilterDrop.filter(imperativesany => imperativesany.Type == e.target.value)
            this.setState({
                ImperativeFilterDrop2: imperativevalues[0].SubFilters
            })
        }
        else if (e.target.name == 'SolutionArea') {
            this.setState({
                [e.target.name]: e.target.value
            })
            var solutionAreaValues = this.state.solutionFilterdrop.filter(solutionany => solutionany.FILTER_ID == e.target.value)
            var filter_type_l2 = []
            if (solutionAreaValues[0].FILTER_TYPE_L2 != null && solutionAreaValues[0].FILTER_TYPE_L2 != "") {
                filter_type_l2 = solutionAreaValues[0].FILTER_TYPE_L2.split(",")
            }
            this.setState({
                solutionL2Filterdrop: filter_type_l2
            })
        }

    }

    handleChangeForSolutionAreaL2 = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        var SolutionL2Drop = "";
        for (var L2Filter = 0; L2Filter < global.SolutionAreaTypeL2.length; L2Filter++) {
            if (e.target.value == global.SolutionAreaTypeL2[L2Filter].FILTER_ID) {
                if (global.SolutionAreaTypeL2[L2Filter].FILTER_TYPE_L2 != null) {
                    var FILTER_TYPE_L2_ARRAY = global.SolutionAreaTypeL2[L2Filter].FILTER_TYPE_L2.split(',')
                    for (var TypeL2Filter = 0; TypeL2Filter < FILTER_TYPE_L2_ARRAY.length; TypeL2Filter++) {
                        SolutionL2Drop += "<option value='" + FILTER_TYPE_L2_ARRAY[TypeL2Filter] + "'>" + FILTER_TYPE_L2_ARRAY[TypeL2Filter] + '</option>';
                    }
                }
                this.setState({
                    solutionL2Filterdrop: SolutionL2Drop
                })
            }
        }

    }

    handleChangeForImperative = (e) => {
        if (e.target.value == 'NAT') {
            var ImperativeNAT = ["Ensure Data Safety", "Modernize Mission Critical Workloads", "Connect and Integrate Data"]
            global.ImperativeNATDrop = "";
            for (var ImperativeNATFilter = 0; ImperativeNATFilter < ImperativeNAT.length; ImperativeNATFilter++) {
                global.ImperativeNATDrop += "<option value='" + ImperativeNAT[ImperativeNATFilter] + "'>" + ImperativeNAT[ImperativeNATFilter] + '</option>';
            }
            this.setState({
                ImperativeFilterDrop: global.ImperativeNATDrop
            })
        }
        else {
            this.setState({
                ImperativeFilterDrop: global.ImperativeNACDrop
            })
        }
    }

    handleDetete = (value) => {
        axios.delete(global.Ip + global.Port + '/asset/deleteImages/' + value, {
            "user_email": sessionStorage.getItem("user_email")
        }, {
            headers: {
                "user_email": sessionStorage.getItem("user_email")

            }
        })
            .then(response => {
                window.location.href = "";
            });
    }
    onAddNew = (e) => {
        var itm = document.getElementById(e);
        var cln = itm.cloneNode(true);

        cln.id = e + 'Add' + document.getElementById(e + 'Add').children.length;

        cln.children[0].children[0].value = "";
        cln.children[1].children[0].value = "";

        if (e != "RelatedLink") {
            cln.children[2].children[0].value = "";
        }
        // if(e=="CodeLink"){
        //     cln.children[3].children[0].value ="";
        // }

        document.getElementById(e + 'Add').appendChild(cln);

    }

    onCreateClick = (e) => {
        // var dropDown = document.getElementById('SolutionArea'), 
        // SolutionAreaArray = [], p;
        var dropDown = document.getElementById('SolutionArea'),
            SolutionAreaArray = [], p;
        var dropDownIndustry = document.getElementById('Industry'), q;
        var dropDownCompetitor = document.getElementById('Competitor'), c;
        // var dropDownWinStatus= document.getElementById('WinStatus'), z;
        var dropDownLOB = document.getElementById('LOBSecondLevel'), r;
        var dropDownSolutionAreaL2 = document.getElementById('SolutionAreaL2'), s;
        var dropDownSolutionUseCase = document.getElementById('SolutionUsecase'), t;
        var dropDownImperative = document.getElementById('ImperativeSecondLevel'), u;
        var dropDownPlatform = document.getElementById('Platform'), n;
        var dropDownSalesPlay = document.getElementById('SalesPlay'), k;
        var filter_array = {};
        var winstory_other_filter_array = {};
        var l1_array = [];
        var CompetitorSelectedName = [];
        var l2_array = [];
        var LOB_array = [];
        var Imperative_array = [];
        var Solution_use_case_array = [];

        for (p = 0; p < dropDown.options.length; p += 1) {
            if (dropDown.options[p].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                l1_array.push(dropDown.options[p].value);
            }

        }

        for (q = 0; q < dropDownIndustry.options.length; q += 1) {
            if (dropDownIndustry.options[q].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                l1_array.push(dropDownIndustry.options[q].value);
            }
        }
        for (c = 0; c < dropDownCompetitor.options.length; c += 1) {
            console.log(dropDownCompetitor.options);

            if (dropDownCompetitor.options[c].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                l1_array.push(dropDownCompetitor.options[c].value);
                CompetitorSelectedName.push(dropDownCompetitor.options[c].text)
            }
        }
        // for (z = 0; z < dropDownWinStatus.options.length ; z += 1) {
        //     if (dropDownWinStatus.options[z].selected) {
        //         //countryArray.push( dropDown.options[i].value); //If you need only values 
        //         l1_array.push(dropDownWinStatus.options[z].value);
        //     }
        // }

        // for (n = 0; n < dropDownPlatform.options.length ; n += 1) {
        //     if (dropDownPlatform.options[n].selected) {
        //         //countryArray.push( dropDown.options[i].value); //If you need only values 
        //         l1_array.push(dropDownPlatform.options[n].value);
        //     }
        // }
        for (k = 0; k < dropDownSalesPlay.options.length; k += 1) {
            if (dropDownSalesPlay.options[k].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                l1_array.push(dropDownSalesPlay.options[k].value);
            }
            // console.log(SolutionAreaArray);
        }
        for (n = 0; n < dropDownPlatform.options.length; n += 1) {
            if (dropDownPlatform.options[n].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                l1_array.push(dropDownPlatform.options[n].value);
            }
        }
        for (s = 0; s < dropDownSolutionAreaL2.options.length; s += 1) {
            if (dropDownSolutionAreaL2.options[s].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                l2_array.push(dropDownSolutionAreaL2.options[s].value);
            }

        }
        for (r = 0; r < dropDownLOB.options.length; r += 1) {
            if (dropDownLOB.options[r].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                var LOBselected = this.state.LOBFilterDrop2.filter(lobstype => {
                    return (lobstype.LOB_ID == dropDownLOB.options[r].value && lobstype.LOB_TYPE == this.state.LOB);
                })
                LOB_array.push(LOBselected[0]);
            }
        }
        for (t = 0; t < dropDownSolutionUseCase.options.length; t += 1) {
            if (dropDownSolutionUseCase.options[t].selected) {
                //countryArray.push( dropDown.options[i].value); //If you need only values 
                Solution_use_case_array.push({
                    "FILTER_ID": dropDownSolutionUseCase.options[t].value,
                    "FILTER_VALUE": dropDownSolutionUseCase.options[t].text
                });
            }
        }
        for (u = 0; u < dropDownImperative.options.length; u += 1) {
            if (dropDownImperative.options[u].selected) {

                var Imperativeselected = this.state.ImperativeFilterDrop2.filter(imptype => {
                    return (imptype.FILTER_ID == dropDownImperative.options[u].value && imptype.FILTER_TYPE == this.state.Imperative);
                })
                Imperative_array.push(Imperativeselected[0]);
            }
        }
        //pushing assetType as well
        l1_array.push(this.state.AssetTypeID)
        l1_array.push(this.state.WinFormSelection)

        filter_array['l1'] = l1_array;
        filter_array['l2'] = l2_array;

        winstory_other_filter_array['LOB'] = LOB_array;
        winstory_other_filter_array['Imperative'] = Imperative_array;
        winstory_other_filter_array['solution_use_case'] = Solution_use_case_array;

        var objDocumentAdded = document.getElementById('DocumentLinkAdd').children;
        var objPresentationAdded = document.getElementById('PresentationLinkAdd').children;
        var objMediaAdded = document.getElementById('MediaLinkAdd').children;
        var objRelatedAdded = document.getElementById('RelatedLinkAdd').children;
        // var objCodeLinkAdded= document.getElementById('CodeLinkAdd').children;
        // alert(document.getElementById('DocumentLink').children[1].children[0].value);
        var objJson = [];
        var objDocumentList = []
        var objPresentationList = []
        var objMediaList = []
        var objRelatedList = []

        if (document.getElementById('DocumentLink').children[1].children[0].value != "" && document.getElementById('DocumentLink').children[0].children[0].value != "") {
            var data = {
                "LINK_URL_TYPE": "",
                "link_url": document.getElementById('DocumentLink').children[1].children[0].value,
                "link_repos_type": "DOCUMENT",
                "link_name": document.getElementById('DocumentLink').children[0].children[0].value,
                "link_description": document.getElementById('DocumentLink').children[2].children[0].value
            };
            //objJson.push(data);
            objDocumentList.push(data)

        } else if (document.getElementById('DocumentLink').children[1].children[0].value != "" || document.getElementById('DocumentLink').children[0].children[0].value != "") {
            alert('You have to Fill both fields Document Link & Document Name');
            document.getElementById('DocumentLink').focus();
            return false;
        }

        for (var i = 0; i <= objDocumentAdded.length - 1; i++) {
            if (document.getElementById('DocumentLinkAdd' + i).children[1].children[0].value != "" && document.getElementById('DocumentLinkAdd' + i).children[0].children[0].value != "") {
                var data = {
                    "LINK_URL_TYPE": "",
                    "link_url": document.getElementById('DocumentLinkAdd' + i).children[1].children[0].value,
                    "link_repos_type": "DOCUMENT",
                    "link_name": document.getElementById('DocumentLinkAdd' + i).children[0].children[0].value,
                    "link_description": document.getElementById('DocumentLinkAdd' + i).children[2].children[0].value
                };
                //objJson.push(data);
                objDocumentList.push(data)
            }
            else if (document.getElementById('DocumentLinkAdd' + i).children[1].children[0].value != "" || document.getElementById('DocumentLinkAdd' + i).children[0].children[0].value != "") {
                alert('You have to Fill both fields Document Link & Document Name');
                document.getElementById('DocumentLinkAdd' + i).focus();
                return false;
            }
        }
        objJson.push({
            type: "DOCUMENT",
            list: objDocumentList
        })
        if (document.getElementById('PresentationLink').children[1].children[0].value != "" && document.getElementById('PresentationLink').children[0].children[0].value != "") {
            var presentaionLink = {
                "LINK_URL_TYPE": "",
                "link_url": document.getElementById('PresentationLink').children[1].children[0].value,
                "link_repos_type": "PRESENTATION",
                "link_name": document.getElementById('PresentationLink').children[0].children[0].value,
                "link_description": document.getElementById('PresentationLink').children[2].children[0].value
            }
            //objJson.push(presentaionLink);
            objPresentationList.push(presentaionLink)
        } else if (document.getElementById('PresentationLink').children[1].children[0].value != "" || document.getElementById('PresentationLink').children[0].children[0].value != "") {
            alert('You have to Fill both fields Presentation Link & Presentation Name');
            document.getElementById('PresentationLink').focus();
            return false;
        }

        for (var i = 0; i <= objPresentationAdded.length - 1; i++) {
            if (document.getElementById('PresentationLinkAdd' + i).children[1].children[0].value != "" && document.getElementById('PresentationLinkAdd' + i).children[0].children[0].value != "") {
                var data = {
                    "LINK_URL_TYPE": "",
                    "link_url": document.getElementById('PresentationLinkAdd' + i).children[1].children[0].value,
                    "link_repos_type": "PRESENTATION",
                    "link_name": document.getElementById('PresentationLinkAdd' + i).children[0].children[0].value,
                    "link_description": document.getElementById('PresentationLinkAdd' + i).children[2].children[0].value
                };
                //objJson.push(data);
                objPresentationList.push(data)

            }
            else if (document.getElementById('PresentationLinkAdd' + i).children[1].children[0].value != "" || document.getElementById('PresentationLinkAdd' + i).children[0].children[0].value != "") {
                alert('You have to Fill both fields Presentation Link & Presentation Name');
                document.getElementById('PresentationLinkAdd' + i).focus();
                return false;
            }
        }
        objJson.push({
            type: "PRESENTATION",
            list: objPresentationList
        })
        if (document.getElementById('MediaLink').children[1].children[0].value != "" && document.getElementById('MediaLink').children[0].children[0].value != "") {
            var mediaLink = {
                "LINK_URL_TYPE": "",
                "link_url": document.getElementById('MediaLink').children[1].children[0].value,
                "link_repos_type": "MEDIA",
                "link_name": document.getElementById('MediaLink').children[0].children[0].value,
                "link_description": document.getElementById('MediaLink').children[2].children[0].value

            }
            //objJson.push(mediaLink);
            objMediaList.push(mediaLink)
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
                    "link_url": document.getElementById('MediaLinkAdd' + i).children[1].children[0].value,
                    "link_repos_type": "MEDIA",
                    "link_name": document.getElementById('MediaLinkAdd' + i).children[0].children[0].value,

                    "link_description": document.getElementById('MediaLinkAdd' + i).children[2].children[0].value
                };
                //objJson.push(data);
                objMediaList.push(data)
            }
            else if (document.getElementById('MediaLinkAdd' + i).children[1].children[0].value != "" || document.getElementById('MediaLinkAdd' + i).children[0].children[0].value != "") {
                alert('You have to Fill both fields MEDIA Link & MEDIA Name');
                document.getElementById('MediaLinkAdd' + i).focus();
                return false;
            }

        }
        objJson.push({
            type: "MEDIA",
            list: objMediaList
        })


        if (document.getElementById('RelatedLink').children[0].children[0].value != "") {

            var relatedLink = {
                "LINK_URL_TYPE": "",
                "link_url": document.getElementById('RelatedLink').children[0].children[0].value,
                "link_repos_type": "RELATED LINK",
                "link_name": document.getElementById('RelatedLink').children[0].children[0].value,
                "link_description": document.getElementById('RelatedLink').children[1].children[0].value

            }
            //objJson.push(relatedLink);
            objRelatedList.push(relatedLink)
        }


        for (var i = 0; i <= objRelatedAdded.length - 1; i++) {
            if (document.getElementById('RelatedLinkAdd' + i).children[0].children[0].value != "") {
                var data = {
                    "LINK_URL_TYPE": "",
                    "link_url": document.getElementById('RelatedLinkAdd' + i).children[0].children[0].value,
                    "link_repos_type": "RELATED LINK",
                    "link_name": document.getElementById('RelatedLinkAdd' + i).children[0].children[0].value,
                    "link_description": document.getElementById('RelatedLinkAdd' + i).children[1].children[0].value

                };
                //objJson.push(data);
                objRelatedList.push(data)
            }


        }
        objJson.push({
            type: "RELATED",
            list: objRelatedList
        })

        if (this.state.WinstoryName == "") {
            // alert(this.state.video_link);
            alert('Please enter Win Story Name');
            document.getElementById('WinstoryName').focus();
            return false;
            e.preventDefault();

        }
        if (this.state.Customer == "") {
            alert('Please enter Customer');
            document.getElementById('Customer').focus();
            return false;
            e.preventDefault();
        } if (this.state.WinStoryOwner == "") {
            alert('Please enter Win Story Owner');
            document.getElementById('WinStoryOwner').focus();
            return false;
            e.preventDefault();
        }

        if (this.state.RepAndSE == "") {
            alert('Please enter REP and SE name');
            document.getElementById('RepAndSE').focus();
            return false;
            e.preventDefault();
        }
        else if (this.state.RepAndSE != "") {
            //var str = (this.state.RepAndSE).replace(/\s*,\s*/g, ";");
            var str = this.state.RepAndSE.replace(/\s+/g, '');

            // alert(str);
            var filter = /^(|([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/;

            if (!filter.test(str)) {
                alert('Please provide a valid email address');
                document.getElementById('RepAndSE').focus();
                return false;
            }

        }

        if (this.state.WinFiscalQuarter == "") {
            alert('Please select fiscal quarter');
            document.getElementById('WinFiscalQuarter').focus();
            return false;
            e.preventDefault();
        }

        if (this.state.Channel == "") {
            alert('Please enter channel');
            document.getElementById('Channel').focus();
            return false;
            e.preventDefault();
        }
        if (this.state.DealSize == "") {
            alert('Please enter Deal Size');
            document.getElementById('DealSize').focus();
            return false;
            e.preventDefault();
        }



        if (document.getElementById('WinStoryId').value == "") {
            if (this.state.Industry == "") {
                alert('Please select Industry');
                document.getElementById('Industry').focus();
                return false;
                e.preventDefault();
            }
            if (CompetitorSelectedName == "") {
                alert('Please enter Competitor');
                document.getElementById('Competitor').focus();
                return false;
                e.preventDefault();
            }
            // else if (this.state.SalesPlay == "") {
            //     alert('Please enter Asset Sales Play');
            //     document.getElementById('SalesPlay').focus();
            //     return false;
            //     e.preventDefault();
            // } 
            // else if (this.state.Platform == "") {
            //     alert('Please enter Asset Target Audience');
            //     document.getElementById('Platform').focus();
            //     return false;
            //     e.preventDefault();
            // } 
            // else if (this.state.SolutionArea == "") {
            //     alert('Please select Win Story Solution Area');
            //     document.getElementById('SolutionArea').focus();
            //     return false;
            //     e.preventDefault();
            // }
            // if (this.state.SolutionArea != "") {
            //     if(this.state.SolutionAreaL2 == ""){
            //         alert(`Please select all the Solution Areas`);
            //         document.getElementById('SolutionArea').focus();
            //         return false;
            //         e.preventDefault();
            //     }

            // }
            else if (this.state.SolutionUsecase == "") {
                alert('Please select Solution Use Case ');
                document.getElementById('SolutionUsecase').focus();
                return false;
                e.preventDefault();
            }
            // else if (this.state.WinStatus == "") {
            //     alert('Please select Win Status');
            //     document.getElementById('WinStatus').focus();
            //     return false;
            //     e.preventDefault();
            // } 
            else if (this.state.LOB == "") {
                alert('Please select LOB');
                document.getElementById('LOB').focus();
                return false;
                e.preventDefault();
            }
            else if (this.state.LOB != "") {
                if (this.state.LOBSecondLevel == "") {
                    alert(`Please select ${this.state.LOB} LOBs`);
                    document.getElementById('LOBSecondLevel').focus();
                    return false;
                    e.preventDefault();
                }
            }
            // else if (this.state.Imperative == "") {
            //     alert('Please select Imperative');
            //     document.getElementById('Imperative').focus();
            //     return false;
            //     e.preventDefault();
            // }
            else if (this.state.Imperative != "") {
                if (this.state.ImperativeSecondLevel == "") {
                    alert(`Please select ${this.state.Imperative} Imperatives`);
                    document.getElementById('ImperativeSecondLevel').focus();
                    return false;
                    e.preventDefault();
                }

            }
        }
        if (this.state.Partner == "") {
            alert('Please enter partner');
            document.getElementById('Partner').focus();
            return false;
            e.preventDefault();
        }
        // if (this.state.Renewal == "") {
        //     alert('Please enter renewal');
        //     document.getElementById('Renewal').focus();
        //     return false;
        //     e.preventDefault();
        // } 

        if (this.state.Use_Case == "") {
            alert('Please enter Win story UseCase');
            document.getElementById('Use_Case').focus();
            return false;
            e.preventDefault();
        }
        if (document.getElementById('WinStoryId').value == "") {
            if (document.getElementById('upload-cover-photo').value == "") {
                alert('Please upload Win Story Cover photo');
                document.getElementById('upload-cover-photo').focus();
                return false;
                e.preventDefault();
            }
            if (document.getElementById('upload-cover-logo').value == "") {
                alert('Please upload Win Story logo');
                document.getElementById('upload-cover-logo').focus();
                return false;
                e.preventDefault();
            }
        }
        if (this.state.WinFormSelection == "fd5k53p09dl") {
            if (this.state.CustomerImpact == "") {
                alert('Please enter customer impact');
                document.getElementById('CustomerImpact').focus();
                return false;
                e.preventDefault();
            }
            if (this.state.BusinessDriver == "") {
                alert('Please enter business driver');
                document.getElementById('BusinessDriver').focus();
                return false;
                e.preventDefault();
            }
            if (this.state.SalesProcess == "") {
                alert('Please enter sales process');
                document.getElementById('SalesProcess').focus();
                return false;
                e.preventDefault();
            }
            if (this.state.LessonsLearnt == "") {
                alert('Please enter lessons learnt');
                document.getElementById('LessonsLearnt').focus();
                return false;
                e.preventDefault();
            }
        }


        if (this.state.WinFormSelection == "fd5k53p15c7") {
            if (this.state.consltQ1 == "") {
                alert('Please enter customer impact');
                document.getElementById('consltQ1').focus();
                return false;
                e.preventDefault();
            }
            if (this.state.consltQ2 == "") {
                alert('Please enter business driver');
                document.getElementById('consltQ2').focus();
                return false;
                e.preventDefault();
            }
            if (this.state.consltQ3 == "") {
                alert('Please enter sales process');
                document.getElementById('consltQ3').focus();
                return false;
                e.preventDefault();
            }
            if (this.state.consltQ4 == "") {
                alert('Please enter lessons learnt');
                document.getElementById('consltQ4').focus();
                return false;
                e.preventDefault();
            }
        }



        //  if (this.state.Asset_Description == "") {
        //         alert('Please enter Asset Description');
        //         document.getElementById('Asset_Description').focus();
        //         return false;
        //         e.preventDefault();
        //     } 
        //     else if (this.state.Use_Case == "") {
        //         alert('Please enter Asset UseCase');
        //         document.getElementById('Use_Case').focus();
        //         return false;
        //         e.preventDefault();
        //     } 


        if (document.getElementById('WinStoryId').value != "") {
            var winstoryId = document.getElementById('WinStoryId').value;

        } else {
            var winstoryId = null;
        }
        //console.log('id---', document.getElementById('WinStoryId').value, 'lll', this.state.id)
        // console.log (global.CovertedLogobase64);
        // console.log(global.CovertedLogobase64);
        // console.log("my test");
        // alert(document.getElementById('createdDate').value);
        // if(createdDate)
        var selecteddate = document.getElementById('createdDate').value;
        //  alert(selecteddate);
        if (selecteddate != "") {
            var splitDate = selecteddate.split("-");
            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            //  const date = new Date(splitDate[2], splitDate[1], splitDate[0]); 
            // const month = date.toLocaleString('default', { month: 'long' });
            // console.log(month +'20');
            console.log(splitDate);
            if (splitDate[1] < 10) {
                var split = splitDate[1].split("0");
                var monthAppnd = split[1] - 1;
            } else {
                var monthAppnd = splitDate[1] - 1;

            }
            //  console.log(month[monthAppnd]);
            // alert(month[monthAppnd]);
            var dt = splitDate[2] + "-" + month[monthAppnd] + "-" + splitDate[0];
        } else {
            alert('Please Select created date first');
            document.getElementById('createdDate').focus();
            return false;
        }

        //    this.setState({
        //        createdDate: dt
        //    }) 
        var reqParms = {
            "winstory_id": winstoryId,
            "winstory_name": this.state.WinstoryName,
            "winstory_customer_name": this.state.Customer,
            "winstory_deal_size": this.state.DealSize,
            "winstory_partner": this.state.Partner,
            "winstory_renewal": this.state.Renewal,
            "winstory_reps_se": this.state.RepAndSE,
            "winstory_customer_impact": this.state.CustomerImpact,
            "winstory_bussiness_driver": this.state.BusinessDriver,
            "winstory_sales_process": this.state.SalesProcess,
            "winstory_lesson_learnt": this.state.LessonsLearnt,
            "winstory_created_by": this.state.WinStoryOwner,
            "winstory_usecase": this.state.Use_Case,
            "winstory_channel": this.state.Channel,
            'winstory_fiscal_quarter': this.state.WinFiscalQuarter,
            "winstory_thumbnail": global.CovertedPhotobase64,
            "winstory_logo": global.CovertedLogobase64,
            "winstory_other_filter": winstory_other_filter_array,
            "links": objJson,
            "winstory_competiion": CompetitorSelectedName.join(),
            "mapped_filters": filter_array,
            "oppId": null,
            "modifiedBy": sessionStorage.getItem("user_email"),
            "location": sessionStorage.getItem("location"),
            "created_on": dt,
            "user_email": sessionStorage.getItem("user_email"),
            "WINSTORY_CONSULTING_Q1": this.state.consltQ1,
            "WINSTORY_CONSULTING_Q2": this.state.consltQ2,
            "WINSTORY_CONSULTING_Q3": this.state.consltQ3,
            "WINSTORY_CONSULTING_Q4": this.state.consltQ4,

            // "asset_architecture_description":this.state.Notional_Architechure_Notes
        }
        var url = "";
        ///uncoment
        if (document.getElementById('WinStoryId').value == "") {
            url = global.Ip + global.Port + '/winstory/save';

            document.getElementById('loader').classList.remove('hide');
            document.getElementById('createForm').classList.add('hide');
            // console.log(reqParms );
            // console.log("sending");

            //add the code here
            axios.post(url, reqParms, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            })
                .then(response => {
                    // console.log(response)


                    if (document.getElementById('WinStoryId').value == "") {
                        global.WinStoryIdCreated = response.data.WINSTORY_ID;

                    }
                    else {
                        global.WinStoryIdCreated = document.getElementById('WinStoryId').value;
                    }

                    if (response.data.status != 'failed') {
                        alert('Your win story has been created. Kindly check in "My Win stories", for further updates.');
                        // window.location.href = "/MyAssets";
                        this.setState({
                            LoginSuccessRedirect: true
                        });
                    }
                    else {
                        alert('Error Occured');
                        document.getElementById('loader').classList.add('hide');
                        document.getElementById('createForm').classList.remove('hide');
                    }
                },
                    error => {
                        console.log(error);
                        alert(error);
                        document.getElementById('loader').classList.add('hide');
                        document.getElementById('createForm').classList.remove('hide');
                    });

        }
        else {

            url = global.Ip + global.Port + '/winstory/save';
            document.getElementById('loader').classList.remove('hide');
            document.getElementById('createForm').classList.add('hide');
            // console.log(reqParms)
            axios.put(url, reqParms, {
                headers: {
                    "user_email": sessionStorage.getItem("user_email")

                }
            })
                .then(response => {
                    console.log(response)
                    if (document.getElementById('WinStoryId').value == "") {
                        global.WinStoryIdCreated = response.data.WINSTORY_ID;

                    }
                    else {
                        global.WinStoryIdCreated = document.getElementById('WinStoryId').value;
                    }

                    if (response.data.status != 'failed') {

                        alert('Your win story has been updated. Kindly check in "My Win Stories" for further updates.');
                        // window.location.href = "/MyAssets";
                        this.setState({
                            LoginSuccessRedirect: true
                        });
                    }
                    else {
                        alert('Error Occured');
                        document.getElementById('loader').classList.add('hide');
                        document.getElementById('createForm').classList.remove('hide');
                    }


                },
                    error => {
                        console.log(error);
                        alert(error);
                        document.getElementById('loader').classList.add('hide');
                        document.getElementById('createForm').classList.remove('hide');
                    });
        }
        ///uncomment

        //}
    }
    formSelectionClick(id, name) {
        // alert()
        //  console.log(param);
        this.setState({
            WinFormSelection: id,
            WinFormSelectionLabel: " - " + name
        })
    }
    render() {
        if (this.state.createdDate != "") {
            var todayDate = this.state.createdDate;
        } else {
            var nowDate = new Date();
            var todayDate = nowDate.getFullYear() + "-" + (((nowDate.getMonth() + 1) < 10) ? "0" : "") + (nowDate.getMonth() + 1) + "-" + ((nowDate.getDate() < 10) ? "0" : "") + nowDate.getDate();
            // alert(todayDate);
        }

        //  console.log(((nowDate.getDate() < 10)?"0":"") + nowDate.getDate() +"/"+(((nowDate.getMonth()+1) < 10)?"0":"") + (nowDate.getMonth()+1) +"/"+ nowDate.getFullYear());
        // console.log(todayDate);
        // var todayDate="2019-09-04";
        // console.log(this.state.ImagesArch +"test");
        if (this.state.LoginSuccessRedirect) {
            return <Redirect push to="/MyWinStories" />;
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
                            <Col sm={12}>
                                <div className="text-center col-md-12 Heading">{this.state.msg}</div>
                            </Col>
                            {/* {this.state.msgbtn == 'SUBMIT' &&
                                <Col sm={4}> */}
                            {/* <Dropdown> */}
                            {/* <Dropdown.Toggle id="dropdown-basic"> */}
                            {/* Select Win Type {this.state.WinFormSelectionLabel} */}
                            {/* </Dropdown.Toggle> */}
                            {/* {this.state.ListOfWinForms.length >0 && */}
                            {/* <Dropdown.Menu  > */}
                            {/* {this.state.ListOfWinForms.map((data) =>  */}
                            {/* <Dropdown.Item onClick={() => this.formSelectionClick("fd5k53p15c7", "Consulting Wins")} > Consulting Wins</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.formSelectionClick("fd5k53p09dl", "Wins")} > Wins</Dropdown.Item> */}
                            {/* )} */}
                            {/* </Dropdown.Menu> */}
                            {/* } */}
                            {/* </Dropdown>
                                </Col>} */}

                        </Row>

                        {/* id-fd5k53p09dl====win */}
                        {this.state.WinFormSelection != "" &&

                            <Row>
                                <Col md={12}>
                                    <div className="title flex">
                                        <div class="nowrap">WIN STORY OVERVIEW</div>
                                        <div class="titleLine"></div>
                                        {this.state.msgbtn == 'SAVE' &&
                                            <div class="nowrap" style={{ marginLeft: 20 }}> {this.state.WinFormSelectionLabel}</div>
                                        }
                                    </div>
                                    <div id="loader" class="hide text-center"><img src="http://sampark.rajasthan.gov.in/dashbordimg/loading.gif" /></div>

                                    <Form id="createForm">
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Win Story Name <sup>*</sup><span title="60 characters max
                        Highlight business value, and industry or technology
                        -Avoid articles, auxiliary verbs, conjunctions, particles, prepositions, pronouns
                        Be unique (don't replicate old titles)">&#x1f6c8;</span></Form.Label>
                                                <Form.Control type="text" id="WinstoryName" name='WinstoryName'
                                                    value={this.state.WinstoryName}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Win Story Name" />
                                            </Form.Group>

                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Customer Name  <sup>*</sup><span title="Please ensure this is the Oracle standard name, not an abbreviation
                        Examples:
                        - Development Center, not DC">&#x1f6c8;</span></Form.Label>
                                                <Form.Control type="text" id="Customer" name='Customer'
                                                    value={this.state.Customer}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Customer " />
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} md={12} >
                                                <Form.Label>Win Story Owner <sup>*</sup><span title="Email Address(s)">&#x1f6c8;</span></Form.Label>
                                                <Form.Control type="text" id="WinStoryOwner" name='WinStoryOwner' maxLength="500"
                                                    value={this.state.WinStoryOwner}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Win Story Owner" /><br />
                                                <small>Hint: Only Email ID is acceptable. Please use ',' separator in case of multiple Email IDs </small>
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Rep & SE <sup>*</sup><span title="Email address">&#x1f6c8;</span></Form.Label>
                                                <Form.Control type="text" id="RepAndSE" name='RepAndSE'
                                                    value={this.state.RepAndSE}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Rep and SE" /><br />
                                                <small>hint: emailid is acceptable only. Please use ',' to separate multiple email ids </small>
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Win Fiscal Quarter <sup>*</sup></Form.Label>
                                                <br />
                                                {/* {this.state.WinFiscalQuarter + "Months"}  */}
                                                <Form.Control as="select" id="WinFiscalQuarter" name='WinFiscalQuarter' onChange={e => this.handleChange(e)} value={this.state.WinFiscalQuarter}>
                                                    <option value="FY20 Q1">FY20 Q1</option>
                                                    <option value="FY20 Q2">FY20 Q2</option>
                                                    <option value="FY20 Q3">FY20 Q3</option>
                                                    <option value="FY20 Q4">FY20 Q4</option>
                                                    <option value="FY19 Q1">FY19 Q1</option>
                                                    <option value="FY19 Q2">FY19 Q2</option>
                                                    <option value="FY19 Q3">FY19 Q3</option>
                                                    <option value="FY19 Q4">FY19 Q4</option>
                                                    <option value="FY18 Q1">FY18 Q1</option>
                                                    <option value="FY18 Q2">FY18 Q2</option>
                                                    <option value="FY18 Q3">FY18 Q3</option>
                                                    <option value="FY18 Q4">FY18 Q4</option>
                                                    {/* <option value="18">18 Months</option> */}
                                                </Form.Control>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Competitor  <sup>*</sup></Form.Label>
                                                {/* <Form.Control type="text" id="Competition" name='Competition'
                                                    value={this.state.Competition}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Competition" /> */}
                                                <Form.Control as="select" multiple id="Competitor" name='Competitor' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.CompetitorFilterdrop }}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Channel <sup>*</sup></Form.Label>
                                                <br />
                                                <Form.Control as="select" id="Channel" name='Channel' onChange={e => this.handleChange(e)} value={this.state.Channel}>
                                                    <option value="Field">Field</option>
                                                    <option value="Oracle Digital">Oracle Digital</option>

                                                    {/* <option value="18">18 Months</option> */}
                                                </Form.Control>
                                            </Form.Group>
                                        </Row>
                                        <Row>

                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Deal Size ($k)  <sup>*</sup></Form.Label>
                                                <Form.Control type="number" id="DealSize" name='DealSize'
                                                    value={this.state.DealSize}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Deal Size" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Industry <sup>*</sup><span title="All Industries this asset directly addresses should be selected">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="select" multiple id="Industry" name='Industry' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.IndustryFilterdrop }}>
                                                </Form.Control>
                                            </Form.Group>


                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Sales Initiatives <span title="All the different types of collateral that belong to this asset should be selected. this asset should be selected">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="select" multiple id="SalesPlay" name='SalesPlay' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.SalesPlaydrop }}>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Buyer Profile<span title="All customer consumers that should be targeted with this asset should be selected">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="select" multiple id="Platform" name='Platform' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.PlatformFilterdrop }}>
                                                </Form.Control>
                                            </Form.Group>
                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Solution Usecase <sup>*</sup></Form.Label>
                                                <br />
                                                <Form.Control as="select" multiple id="SolutionUsecase" name='SolutionUsecase' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.SolutionUseCaseDrop }}>
                                                </Form.Control>
                                            </Form.Group>
                                            {/* <Form.Group as={Col}  md={6} >
                     <Form.Label>Win Status <sup>*</sup></Form.Label>
                     <br/>
                     <Form.Control as="select"  id="WinStatus" name='WinStatus' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.WinStatusdrop }}> 
                     </Form.Control>
                  </Form.Group> */}
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Solution Area <span title="Select all solution areas this asset involves ">&#x1f6c8;</span></Form.Label>
                                                <div class="inlineDiv">
                                                    {/* <Form.Control as="select" multiple id="SolutionArea" name='SolutionArea' onChange={e => this.handleChangeSecondLevel(e)}  value={this.state.SolutionArea}> 
                      {
                        this.state.solutionFilterdrop.map((solArea, i) => {
                        // return <option value={JSON.stringify(lobType)}>{lobType.Type}</option>
                        return <option value={solArea.FILTER_ID}>{solArea.FILTER_NAME}</option>

                        })
                     }
                     </Form.Control> */}
                                                    <Form.Control as="select" multiple id="SolutionArea" name='SolutionArea' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.solutionFilterdrop }}>

                                                    </Form.Control>
                                                    <span className="hide">

                                                        <Form.Control as="select" multiple id="SolutionAreaL2" name='SolutionAreaL2' onChange={e => this.handleChange(e)} >
                                                            {
                                                                this.state.solutionL2Filterdrop.map((solAreal2) => {
                                                                    return <option value={solAreal2}>{solAreal2}</option>
                                                                })
                                                            }
                                                        </Form.Control>
                                                    </span>
                                                </div>
                                            </Form.Group>

                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Partner  <sup>*</sup></Form.Label>
                                                <Form.Control type="text" id="Partner" name='Partner'
                                                    value={this.state.Partner}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Partner" />
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Renewal </Form.Label>
                                                <Form.Control type="text" id="Renewal" name='Renewal'
                                                    value={this.state.Renewal}
                                                    onChange={e => this.handleChange(e)} placeholder="Enter Renewal" />
                                            </Form.Group>


                                        </Row>
                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label >LOB <sup>*</sup></Form.Label>
                                                <br />
                                                <div class="inlineDiv">
                                                    <Form.Control as="select" id="LOB" name="LOB" onChange={e => this.handleChangeSecondLevel(e)} value={this.state.LOB}>
                                                        {
                                                            this.state.LOBFilterDrop.map((lobType, i) => {
                                                                // return <option value={JSON.stringify(lobType)}>{lobType.Type}</option>
                                                                return <option value={lobType.Type}>{lobType.Type}</option>

                                                            })
                                                        }
                                                    </Form.Control>
                                                    <Form.Control as="select" multiple id="LOBSecondLevel" name="LOBSecondLevel" multiiple onChange={e => this.handleChange(e)}>
                                                        {
                                                            this.state.LOBFilterDrop2.map((lobs, i) => {
                                                                return <option value={lobs.LOB_ID}>{lobs.LOB_NAME}</option>
                                                            })
                                                        }
                                                    </Form.Control>
                                                </div>
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Imperative </Form.Label>
                                                <br />
                                                <div class="inlineDiv">
                                                    <Form.Control as="select" id="Imperative" name="Imperative" onChange={e => this.handleChangeSecondLevel(e)} value={this.state.Imperative}>
                                                        {
                                                            this.state.ImperativeFilterDrop.map((imperativeType, i) => {
                                                                return <option value={imperativeType.Type}>{imperativeType.Type}</option>

                                                            })
                                                        }
                                                    </Form.Control>
                                                    <Form.Control as="select" multiple id="ImperativeSecondLevel" name="ImperativeSecondLevel" multiiple onChange={e => this.handleChange(e)}>
                                                        {
                                                            this.state.ImperativeFilterDrop2.map((imperatives, i) => {
                                                                return <option value={imperatives.FILTER_ID}>{imperatives.FILTER_NAME}</option>
                                                            })
                                                        }
                                                    </Form.Control>
                                                </div>
                                            </Form.Group>


                                        </Row>
                                        <Row>

                                            {/* <Form.Group as={Col}  md={6} >
                     <Form.Label>Assets Type <sup>*</sup><span title="All the different types of collateral that belong to this asset should be selected. this asset should be selected">&#x1f6c8;</span></Form.Label>
                        <Form.Control as="select" multiple id="AssetType" name='AssetType' onChange={e => this.handleChange(e)} dangerouslySetInnerHTML={{ __html: this.state.AssetTypeID }}> 
                        </Form.Control>
                  </Form.Group> */}
                                        </Row>

                                        <Row>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Use Case <sup>*</sup><span title="Detailed write-up on the persona targeted, business / technology solution, and incorporated technologies.">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="textarea" name='Use_Case' id="Use_Case"
                                                    onChange={e => this.handleChange(e)} value={this.state.Use_Case}>

                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Upload Thumbnail <sup>*</sup><span title="Upload the default image that would be displayed as thumbnail for the Win.">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="file">
                                                    {/* <label for="upload-photo">Browse...</label> */}

                                                    <input type="file" encType="multipart/form-data" name="file" id="upload-cover-photo" onChange={e => this.UploadMediaFile(e)} />  {this.state.WINSTORY_THUMBNAIL != "" &&
                                                        <img src={this.state.WINSTORY_THUMBNAIL} class={this.state.class} width="60px" height="60px" />}
                                                    <br />
                                                    <small>Please upload png image upto 500 kb in size</small>
                                                </Form.Control>
                                            </Form.Group>
                                            <br /><br />

                                        </Row>
                                        {/* <hr/> */}
                                        <Row class="mt-20" >
                                            <Form.Group as={Col} md={6} >
                                                <Form.Label>Upload Logo <sup>*</sup><span title="Upload the default image that would be displayed as Logo for the Win.">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="file">
                                                    {/* <label for="upload-photo">Browse...</label> */}

                                                    <input type="file" encType="multipart/form-data" name="file" id="upload-cover-logo" onChange={e => this.UploadMediaFile(e)} />
                                                    <br />

                                                    <small>Please upload png image upto 500 kb in size</small> {this.state.WINSTORY_LOGO != "" &&
                                                        <>  <img src={this.state.WINSTORY_LOGO} class={this.state.class} width="60px" height="60px" /> </>}
                                                </Form.Control>
                                            </Form.Group>
                                            <div class="mt-20 col-md-6">
                                                <Form.Group as={Col} md={6}>
                                                    <Form.Label>Created Date<sup>*</sup> </Form.Label>
                                                    <Form.Control id="createdDate" name='createdDate' type="date" placeholder="Created Date"
                                                        onChange={e => this.handleChange(e)} value={this.state.createdDate}
                                                        defaultValue={todayDate}
                                                    />
                                                </Form.Group>
                                            </div>

                                        </Row>
                                        <hr />
                                        {this.state.WinFormSelection == "fd5k53p09dl" && <div>
                                            <Row> <Form.Group as={Col} md={12} >
                                                <Form.Label>Why the Customer Bought/ The Impact of the purchase to the customer <sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                <Form.Control as="textarea" name='CustomerImpact' id="CustomerImpact"
                                                    onChange={e => this.handleChange(e)} value={this.state.CustomerImpact}>

                                                </Form.Control>
                                            </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} md={12} >
                                                    <Form.Label>The Business Drivers<sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                    <Form.Control as="textarea" name='BusinessDriver' id="BusinessDriver"
                                                        onChange={e => this.handleChange(e)} value={this.state.BusinessDriver}>

                                                    </Form.Control>
                                                </Form.Group>

                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} md={12} >
                                                    <Form.Label>Sales Process<sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                    <Form.Control as="textarea" name='SalesProcess' id="SalesProcess"
                                                        onChange={e => this.handleChange(e)} value={this.state.SalesProcess}>

                                                    </Form.Control>
                                                </Form.Group>

                                            </Row>

                                            <Row>
                                                <Form.Group as={Col} md={12} >
                                                    <Form.Label>Lessons Learned<sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                    <Form.Control as="textarea" name='LessonsLearnt' id="LessonsLearnt"
                                                        onChange={e => this.handleChange(e)} value={this.state.LessonsLearnt}>

                                                    </Form.Control>
                                                </Form.Group>

                                            </Row>
                                        </div>}
                                        {/* code for consulting */}
                                        {this.state.WinFormSelection == "fd5k53p15c7" && <div>

                                            <Row>
                                                <Form.Group as={Col} md={12} >
                                                    <Form.Label> Why the Customer Bought/ The Impact of the purchase to the customer<sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                    <Form.Control as="textarea" name='consltQ1' id="consltQ1"
                                                        onChange={e => this.handleChange(e)} value={this.state.consltQ1}>

                                                    </Form.Control>
                                                </Form.Group>

                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} md={12} >
                                                    <Form.Label>The Business Drivers<sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                    <Form.Control as="textarea" name='consltQ2' id="consltQ2"
                                                        onChange={e => this.handleChange(e)} value={this.state.consltQ2}>

                                                    </Form.Control>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} md={12} >
                                                    <Form.Label>Sales Process<sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                    <Form.Control as="textarea" name='consltQ3' id="consltQ3"
                                                        onChange={e => this.handleChange(e)} value={this.state.consltQ3}>

                                                    </Form.Control>
                                                </Form.Group>
                                            </Row>
                                            <Row>
                                                <Form.Group as={Col} md={12} >
                                                    <Form.Label>Lessons Learned<sup>*</sup><span title="250 characters max.">&#x1f6c8;</span></Form.Label>
                                                    <Form.Control as="textarea" name='consltQ4' id="consltQ4"
                                                        onChange={e => this.handleChange(e)} value={this.state.consltQ4}>

                                                    </Form.Control>
                                                </Form.Group>
                                            </Row>
                                        </div>}
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
                                                <div class="nowrap">COLLATERAL</div>
                                                <div class="titleLine"></div>
                                            </div>
                                            <div class="flex justify">
                                                <div><strong>Add Document Link</strong> <span title="Please attach OraDocs link related to asset documentations (solution paper, demo script etc.)">&#x1f6c8;</span></div>
                                                <Button variant="outline-primary" size="sm" onClick={(e) => this.onAddNew('DocumentLink')}>+ Add New</Button>
                                            </div>

                                            <div>
                                                <Row id="DocumentLink">
                                                    <Form.Group as={Col} md={3} >
                                                        <Form.Control type="text" placeholder="Enter Document Name" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md={3} >

                                                        <Form.Control type="text" placeholder="Enter Document Link" />
                                                    </Form.Group>
                                                    <Form.Group as={Col} md={6} >

                                                        <Form.Control type="textarea" placeholder="Enter Description" />
                                                    </Form.Group>
                                                </Row>
                                                <div id="DocumentLinkAdd" />
                                            </div>
                                        </div>

                                        <div>
                                            <div class="flex justify">
                                                <div><strong>Enter Presentation Link</strong><span title="Please attach OTube link related to presentations (solution pitch, demo script etc.)">&#x1f6c8;</span></div>
                                                <Button variant="outline-primary" size="sm" data-id='DocumentLink' onClick={(e) => this.onAddNew('PresentationLink')}>+ Add New</Button>
                                            </div>
                                            <Row id="PresentationLink">
                                                <Form.Group as={Col} md={3} >
                                                    {/* <Form.Label>Enter Presentation Name</Form.Label> */}
                                                    <Form.Control type="text" placeholder="Enter Presentation Name" />
                                                </Form.Group>
                                                <Form.Group as={Col} md={3} >
                                                    {/* <Form.Label>Enter Presentation Url</Form.Label> */}
                                                    <Form.Control type="text" placeholder="Enter Presentation Link" />
                                                </Form.Group>
                                                <Form.Group as={Col} md={6} >
                                                    {/* <Form.Label>Enter Presentation Url</Form.Label> */}
                                                    <Form.Control type="textarea" placeholder="Enter Description" />
                                                </Form.Group>
                                            </Row>
                                            <div id="PresentationLinkAdd" />
                                        </div>



                                        <div>
                                            <div class="flex justify">
                                                <div><strong>Add Media Link</strong><span title="Please attach OTube link related to asset media files (demo overview, solution flow etc.)">&#x1f6c8;</span></div>
                                                <Button variant="outline-primary" size="sm" data-id='DocumentLink' onClick={(e) => this.onAddNew('MediaLink')}>+ Add New</Button>
                                            </div>
                                            <Row id="MediaLink">
                                                <Form.Group as={Col} md={3} >
                                                    {/* <Form.Label>Enter Media File Name</Form.Label> */}
                                                    <Form.Control type="text" placeholder="Enter Media Name" />
                                                </Form.Group>
                                                <Form.Group as={Col} md={3} >
                                                    {/* <Form.Label>Enter Media Url</Form.Label> */}
                                                    <Form.Control type="text" placeholder="Enter Media Link" />
                                                </Form.Group>
                                                <Form.Group as={Col} md={6} >
                                                    {/* <Form.Label>Enter Presentation Url</Form.Label> */}
                                                    <Form.Control type="textarea" placeholder="Enter Description" />
                                                </Form.Group>
                                            </Row>
                                            <div id="MediaLinkAdd" />
                                        </div>


                                        <div>
                                            <div class="flex justify">
                                                <div><strong>Enter Related Link</strong><span title="Please attach any additional links related to the asset">&#x1f6c8;</span></div>
                                                <Button variant="outline-primary" data-id='DocumentLink' size="sm" onClick={(e) => this.onAddNew('RelatedLink')}>+ Add New</Button>
                                            </div>

                                            <Row id="RelatedLink">
                                                <Form.Group as={Col} md={5} >
                                                    {/* <Form.Label>Enter Related Url</Form.Label> */}
                                                    <Form.Control type="text" placeholder="Related Link" />
                                                </Form.Group>
                                                <Form.Group as={Col} md={6} >
                                                    {/* <Form.Label>Enter Presentation Url</Form.Label> */}
                                                    <Form.Control type="text" placeholder="Enter Description" />
                                                </Form.Group>
                                            </Row>
                                            <div id="RelatedLinkAdd" />
                                        </div>


                                        <Form.Group as={Col} md={2} >

                                        </Form.Group>
                                        <Row>
                                            <input type="hidden" id="WinStoryId" name="WinStoryId" value={this.state.id} />
                                            <a variant="primary" className="text-center mb20 CreateAsset" onClick={(e) => this.onCreateClick(e)} type="submit">
                                                {this.state.msgbtn}
                                            </a>
                                        </Row>
                                    </Form>
                                </Col>
                            </Row>
                        }
                    </Container>
                </div>
                <Footer />
            </div>
        );
    }
}
export default AssetDetails;