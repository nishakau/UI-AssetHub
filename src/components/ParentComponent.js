import React, { Component } from 'react';
import { Header } from './Header';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import ImageCard from './imageCard/ImageCard';
import Form from 'react-bootstrap/Form';
import FiltersList from './filters/filterList';
import Loader from './loader/loader';
import Footer from './Footer/Footer';
import ClearFilter from './clearFilters';
import FilterManagement from './filterManagement';

import Button from 'react-bootstrap/Button'
import { Link, Redirect } from "react-router-dom";
import SORTBY from "./sortBy";
import DIALOG from './dialog';
import CREATEDD from './createdropdown';
import { Search } from './search/Search';

class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 'assetTitle': 'Asset', componentMange: '', assetData: '', errorMsg: '', assetCount: '', filterData: '', searchParamResult: "", classClear: 'hide clearall small pull-right', disabledUI: false, disabletabs: false };
    }

    componentDidMount() {
        //console.log('----------------**************--------------*****************--------------------')
        this.ListOnChange.bind(this);
    }


    ListOnChange = (data) => {
        this.setState({
            disabledUI: true
        })
        if (data != "") {
            this.setState({
                classClear: 'clearall small pull-right'
            })
        } else {
            this.setState({
                classClear: 'clearall small pull-right hide'
            })
        }
        document.getElementById('Loader').classList.remove('hide');

        // document.getElementById('dataAssetShow').classList.add('hide');
        // document.getElementById('dataWinShow').classList.add('hide');


        var Searchdata; var SearchedParams;
        if (global.selectedDropdownContract != undefined) {
            Searchdata = global.selectedDropdownContract;
            SearchedParams = 'Search result is For Filters: ' + data + 'Search ' + Searchdata;

        } else {
            Searchdata = '';
            SearchedParams = 'Search result is For Filters: ' + data;
        }
        var ValSortBy = "";
        if (global.sortByval != undefined) {
            ValSortBy = global.sortByval;
            var offsetLimit = 20;
        } else {
            ValSortBy = "createdDate";
            var offsetLimit = -1;

        }

        if ((data.indexOf('fd5k53p09dl') != -1) && (data.indexOf('170k5dr4xvz') == -1)) {
            //////////////////////////win selected///////////////////////////////////////////////
            var mainWinUrl = global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
            var headerWin = {
                "offset": 0,
                "limit": offsetLimit,
                "searchString": Searchdata,
                "filters": data,
                "sortBy": ValSortBy,
                order: "desc",
                "user_email": sessionStorage.getItem("user_email")
            }
            axios.get(mainWinUrl, {
                headers: headerWin
            })
                .then(resWin => {
                    document.getElementById('Loader').classList.add('hide');
                    global.winData = resWin.data.WINSTORIES;
                    this.setState({
                        winData: resWin.data.ASSETS,
                        // assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult: SearchedParams,
                        assetTitle: 'Search Result'
                    })

                    global.assetData = [];
                    axios.get(global.Ip + global.Port + '/asset/allfilters', {
                        headers: {
                            "user_email": sessionStorage.getItem('user_email')

                        }
                    })
                        .then(res => {
                            // const SuggesForYouFilter = res.data.suggestions;
                            //  console.log(res.data.suggestions);
                            global.SuggesForYouFilter = res.data.suggestions;
                            //  this.setState({ SuggesForYouFilter });
                            //  console.log(this.state.SuggesForYouFilter);
                            //  document.getElementById('Loader').classList.add('hide');

                        })
                    this.setState({
                        assetData: [],
                        // assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult: SearchedParams,
                        assetTitle: 'Search Result'
                    })
                })
        } else if ((data.indexOf('170k5dr4xvz') != -1) && (data.indexOf('fd5k53p09dl') == -1)) {
            /////////////Nothing selected/////////////////
            var mainUrl = global.Ip + global.Port + '/asset/allAssetsFilters';
            var header = {
                "offset": 0,
                "limit": offsetLimit,
                "searchString": Searchdata,
                "filters": data,
                "sortBy": ValSortBy,
                order: "desc",
                "user_email": sessionStorage.getItem("user_email")
            }
            axios.get(mainUrl, {
                headers: header
            })
                .then(res => {
                    document.getElementById('Loader').classList.add('hide');
                    global.assetData = res.data.ASSETS;
                    global.assetCount = "Asset (" + res.data.TOTALCOUNT + ")";
                    global.AssetCount = res.data.TOTALCOUNT;
                    this.setState({
                        assetData: global.assetData,
                        assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult: SearchedParams
                    })
                    global.winData = [];
                    axios.get(global.Ip + global.Port + '/asset/allfilters', {
                        headers: {
                            "user_email": sessionStorage.getItem('user_email')

                        }
                    })
                        .then(res => {
                            // const SuggesForYouFilter = res.data.suggestions;
                            //  console.log(res.data.suggestions);
                            global.SuggesForYouFilter = res.data.suggestions;
                            //  this.setState({ SuggesForYouFilter });
                            //  console.log(this.state.SuggesForYouFilter);
                            //  document.getElementById('Loader').classList.add('hide');

                        })
                    this.setState({
                        winData: [],
                        // assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult: SearchedParams,
                        assetTitle: 'Search Result'
                    })
                })

        }
        else {
            var mainUrl = global.Ip + global.Port + '/asset/allAssetsFilters';
            var header = {
                "offset": 0,
                "limit": offsetLimit,
                "searchString": Searchdata,
                "filters": data,
                "sortBy": ValSortBy,
                order: "desc",
                "user_email": sessionStorage.getItem("user_email")
            }
            axios.get(mainUrl, {
                headers: header
            })
                .then(res => {
                    document.getElementById('Loader').classList.add('hide');
                    global.assetData = res.data.ASSETS;
                    global.assetCount = "Asset (" + res.data.TOTALCOUNT + ")";
                    global.AssetCount = res.data.TOTALCOUNT;
                    this.setState({
                        assetData: global.assetData,
                        assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult: SearchedParams
                    })
                })
            var mainWinUrl = global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
            var headerWin = {
                "offset": 0,
                "limit": offsetLimit,
                "searchString": Searchdata,
                "filters": data,
                "sortBy": ValSortBy,
                order: "desc",
                "user_email": sessionStorage.getItem("user_email")
            }
            axios.get(mainWinUrl, {
                headers: headerWin
            })
                .then(resWin => {
                    document.getElementById('Loader').classList.add('hide');
                    global.winData = resWin.data.WINSTORIES;
                    axios.get(global.Ip + global.Port + '/asset/allfilters', {
                        headers: {
                            "user_email": sessionStorage.getItem('user_email')

                        }
                    })
                        .then(res => {
                            // const SuggesForYouFilter = res.data.suggestions;
                            //  console.log(res.data.suggestions);
                            global.SuggesForYouFilter = res.data.suggestions;
                            //  this.setState({ SuggesForYouFilter });
                            //  console.log(this.state.SuggesForYouFilter);
                            //  document.getElementById('Loader').classList.add('hide');

                        })
                    this.setState({
                        winData: resWin.data.ASSETS,
                        // assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult: SearchedParams,
                        assetTitle: 'Search Result'
                    })
                })
        }






        // }else{

        // }






        this.setState({
            disabledUI: false
        })



    }
    deletePrefrences = (e) => {

        axios.delete(global.Ip + global.Port + '/asset/deleteMySearchHistory', {
            headers: { "user_email": sessionStorage.getItem("user_email") }
        }).then(resPref => {
            if (resPref.data) {
                alert("Search history deleted successfully");
                window.location.href = "";
                return false;
            }

        })

    }
    searchOnChange = (data) => {

        document.getElementById('Loader').classList.remove('hide');
        var filterdata;
        var ValSortBy = "";
        if (global.sortByval != undefined) {
            ValSortBy = global.sortByval;
            var OffsetLimit = 20;
        } else {
            ValSortBy = "createdDate";
            var OffsetLimit = -1;
        }
        if (global.selectedcheckbox != undefined) {
            filterdata = global.selectedcheckbox;
        } else {
            filterdata = '';
        }


        if ((filterdata.indexOf('fd5k53p09dl') != -1) && (filterdata.indexOf('170k5dr4xvz') == -1)) {
            ///////////////////////////////////////////////////////////////////////////////////////
            var winUrl = global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
            var headerWin = {
                "offset": 0,
                "limit": OffsetLimit,
                "searchString": data,
                "filters": filterdata,
                "user_email": sessionStorage.getItem("user_email"),
                "sortBy": ValSortBy,
                order: "desc",
            }
            //}
            axios.get(winUrl, {
                headers: headerWin
            }).then(resWin => {
                document.getElementById('Loader').classList.add('hide');
                global.winData = resWin.data.WINSTORIES;

                axios.get(global.Ip + global.Port + '/asset/allfilters', {
                    headers: {
                        "user_email": sessionStorage.getItem('user_email')

                    }
                })
                    .then(res => {
                        // const SuggesForYouFilter = res.data.suggestions;
                        //  console.log(res.data.suggestions);
                        global.SuggesForYouFilter = res.data.suggestions;
                        //  this.setState({ SuggesForYouFilter });
                        //  console.log(this.state.SuggesForYouFilter);
                        //  document.getElementById('Loader').classList.add('hide');

                    })

                var msg;

                this.setState({
                    winData: resWin.data.ASSETS,
                    filterData: filterdata,
                    assetTitle: 'Search Result'
                })
                global.assetData = [];
                this.setState({
                    assetData: [],
                    // assetDataCount: global.assetCount,
                    // errorMsg:msg,
                    searchParamResult: "SearchedParams",
                    assetTitle: 'Search Result'
                })
            })




        }
        else if ((filterdata.indexOf('170k5dr4xvz') != -1) && (filterdata.indexOf('fd5k53p09dl') == -1)) {

            var mainUrl = global.Ip + global.Port + '/asset/allAssetsFilters';
            var header = {
                "offset": 0,
                "limit": OffsetLimit,
                "searchString": data,
                "filters": filterdata,
                "user_email": sessionStorage.getItem("user_email"),
                "sortBy": ValSortBy,
                order: "desc",

            }
            //}
            axios.get(mainUrl, {
                headers: header
            }).then(res => {
                document.getElementById('Loader').classList.add('hide');
                global.assetData = res.data.ASSETS;

                axios.get(global.Ip + global.Port + '/asset/allfilters', {
                    headers: {
                        "user_email": sessionStorage.getItem('user_email')

                    }
                })
                    .then(res => {
                        // const SuggesForYouFilter = res.data.suggestions;
                        //  console.log(res.data.suggestions);
                        global.SuggesForYouFilter = res.data.suggestions;
                        //  this.setState({ SuggesForYouFilter });
                        //  console.log(this.state.SuggesForYouFilter);
                        //  document.getElementById('Loader').classList.add('hide');

                    })

                global.assetCount = "Asset (" + res.data.TOTALCOUNT + ")";
                var msg;

                this.setState({
                    assetData: res.data.ASSETS,
                    assetDataCount: global.assetCount,
                    // errorMsg:msg,
                    filterData: filterdata,
                    assetTitle: 'Search Result'
                })
                global.winData = [];
                this.setState({
                    winData: [],
                    // assetDataCount: global.assetCount,
                    // errorMsg:msg,
                    searchParamResult: "SearchedParams",
                    assetTitle: 'Search Result'
                })
            })


        } else {
            var winUrl = global.Ip + global.Port + '/winstory/getAllWinStoryByFilters';
            var headerWin = {
                "offset": 0,
                "limit": OffsetLimit,
                "searchString": data,
                "filters": filterdata,
                "user_email": sessionStorage.getItem("user_email"),
                "sortBy": ValSortBy,
                order: "desc",
            }
            //}
            axios.get(winUrl, {
                headers: headerWin
            }).then(resWin => {
                document.getElementById('Loader').classList.add('hide');
                global.winData = resWin.data.WINSTORIES;
                var msg;

                this.setState({
                    winData: resWin.data.ASSETS,
                    filterData: filterdata,
                    assetTitle: 'Search Result'
                })
            })
            var mainUrl = global.Ip + global.Port + '/asset/allAssetsFilters';
            var header = {
                "offset": 0,
                "limit": OffsetLimit,
                "searchString": data,
                "filters": filterdata,
                "user_email": sessionStorage.getItem("user_email"),
                "sortBy": ValSortBy,
                order: "desc",

            }
            //}
            axios.get(mainUrl, {
                headers: header
            }).then(res => {
                document.getElementById('Loader').classList.add('hide');
                global.assetData = res.data.ASSETS;
                axios.get(global.Ip + global.Port + '/asset/allfilters', {
                    headers: {
                        "user_email": sessionStorage.getItem('user_email')

                    }
                })
                    .then(res => {
                        // const SuggesForYouFilter = res.data.suggestions;
                        //  console.log(res.data.suggestions);
                        global.SuggesForYouFilter = res.data.suggestions;
                        //  this.setState({ SuggesForYouFilter });
                        //  console.log(this.state.SuggesForYouFilter);
                        //  document.getElementById('Loader').classList.add('hide');

                    })
                global.assetCount = "Asset (" + res.data.TOTALCOUNT + ")";
                var msg;

                this.setState({
                    assetData: res.data.ASSETS,
                    assetDataCount: global.assetCount,
                    // errorMsg:msg,
                    filterData: filterdata,
                    assetTitle: 'Search Result'
                })
            })
        }









        ///////////////////////////////////////////////////////////////////////////////////////
        // }
    }
    sortOnChange = (data) => {
        this.setState({
            disabletabs: true

        })

        var Searchdata = "";
        if (global.selectedDropdownContract != undefined) {
            Searchdata = global.selectedDropdownContract;
            // SearchedParams='Search result is For Filters: ' +data + 'Search '+Searchdata;

        } else {
            Searchdata = '';
            // SearchedParams='Search result is For Filters: ' +data;
        }
        var filterdata;
        if (global.selectedcheckbox != undefined) {
            filterdata = global.selectedcheckbox;
        } else {
            filterdata = '';
        }
        if ((filterdata.indexOf('fd5k53p09dl') != -1) && (filterdata.indexOf('170k5dr4xvz') == -1)) {
            var mainWinUrl = 'winstory/getAllWinStoryByFilters';

            //}
            if (data == "Most Liked") {
                var SelectedTargetVal = "Most Liked";
                var SelectedVal = "likes";
                global.LobMsg = "";

            } else if (data == "Most Viewed") {
                var SelectedTargetVal = "Most Viewed";
                var SelectedVal = "views";
                global.LobMsg = "";
            } else if (data == "Last Updated") {
                var SelectedTargetVal = "Recently Added";
                var SelectedVal = "createdDate";
                global.LobMsg = "";
            } else if (data == "LOB") {
                var SelectedTargetVal = "LOB Recommendations";

                var SelectedVal = "LOBDATA";
                global.LobMsg = "LOB";
            }
            else {
                var SelectedVal = "Suggestions";
                var SelectedTargetVal = "Suggestions For You";

            }
            document.getElementById('dropdown-basic').innerHTML = '' + SelectedTargetVal;

            if (SelectedVal != "Suggestions" && SelectedVal != "LOBDATA") {
                var SortUrl = global.Ip + global.Port + '/' + mainWinUrl;
                var SortHeader = {
                    "offset": 0,
                    "limit": 20,
                    "order": 'desc',
                    "sortBy": SelectedVal,
                    "searchString": Searchdata,
                    "filters": filterdata,
                    "user_email": sessionStorage.getItem("user_email")
                }
                this.setState({
                    disabledUI: false,
                    disabletabs: false

                })

            } else if (SelectedVal == "LOBDATA") {//http://129.213.212.175:8001/winstory/filterWinsbylob/deepika.r@oracle.com
                var SortUrl = global.Ip + global.Port + '/winstory/filterWinsbylob';
                var SortHeader = {
                    offset: 0,
                    limit: 20,
                    sortBy: "createdDate",
                    order: "desc",
                    user_email: sessionStorage.getItem('user_email'),
                    searchString: Searchdata,
                    filters: filterdata
                }
                this.setState({
                    disabledUI: true,
                    disabletabs: false

                })
            }

            else {
                var SortUrl = global.Ip + global.Port + '/winstory/allPrefferedWins/' + sessionStorage.getItem('user_email');
                var SortHeader = {
                    offset: 0,
                    limit: 20,
                    sortBy: "createdDate",
                    order: "desc",
                    user_email: sessionStorage.getItem('user_email'),
                    searchString: Searchdata,
                    filters: filterdata
                }
                this.setState({
                    disabledUI: true,
                    disableTabs: true

                })
            }

            axios.get(SortUrl, {
                headers: SortHeader
            })
                .then(resWin => {
                    document.getElementById('Loader').classList.add('hide');
                    // document.getElementById('dataAssetShow').classList.remove('hide');

                    //   global.assetData=res.data.ASSETS;

                    // if(SplitCat[1]=="WIN"){
                    //     global.assetData=res.data.WINSTORIES;
                    //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
                    // }else{
                    global.winData = resWin.data.WINSTORIES;
                    // global.assetCount="Win Stories (" + res.data.TOTALCOUNT +")";

                    // var msg;
                    // if(global.winData.length==0){
                    //         msg='No Record found.';
                    //         document.getElementById('dataWinShow').classList.add('hide');

                    // }else{
                    //         msg=''; 
                    //         document.getElementById('dataWinShow').classList.remove('hide');

                    // }
                    // global.assetData=res.data.ASSETS;
                    // global.assetCount="Asset (" +res.data.TOTALCOUNT + ")";


                    //}

                    // var msg;
                    // if(global.assetData.length==0){
                    //     msg='No Record found.';
                    //     document.getElementById('dataAssetShow').classList.add('hide');

                    // }else{
                    //     msg=''; 
                    //     document.getElementById('dataAssetShow').classList.remove('hide');

                    // }
                    //   alert(res.data.TOTALCOUNT);
                    //     if( global.winData!="" && global.winData!=undefined){
                    //         var CountTotal=global.assetCount
                    //     }
                    //     else{
                    //     var CountTotal=0;   

                    // }
                    this.setState({
                        winData: resWin.data.ASSETS,
                        // errorMsg:msg,
                        // filterData:filterdata,
                        assetTitle: 'Search Result'
                    })
                })
            global.assetData = [];
            this.setState({
                assetData: [],
                // assetDataCount: global.assetCount,
                // errorMsg:msg,
                searchParamResult: "SearchedParams",
                assetTitle: 'Search Result'
            })

        } else if ((filterdata.indexOf('170k5dr4xvz') != -1) && (filterdata.indexOf('fd5k53p09dl') == -1)) {
            var mainUrl = 'asset/allAssetsFilters';

            //}
            var SelectedVal = "";
            if (data == "Most Liked") {
                var SelectedTargetVal = "Most Liked";
                var SelectedVal = "likes";
                global.LobMsg = "";

            } else if (data == "Most Viewed") {
                var SelectedTargetVal = "Most Viewed";
                var SelectedVal = "views";
                global.LobMsg = "";

            } else if (data == "Last Updated") {
                var SelectedTargetVal = "Recently Added";
                var SelectedVal = "createdDate";
                global.LobMsg = "";

            } else if (data == "LOB") {
                var SelectedTargetVal = "LOB Recommendations";
                global.LobMsg = "LOB";
                var SelectedVal = "LOBDATA";
            }
            else {
                var SelectedVal = "Suggestions";
                var SelectedTargetVal = "SUGGESTION For You";

            }
            document.getElementById('dropdown-basic').innerHTML = '' + SelectedTargetVal;

            if (SelectedVal != "Suggestions" && SelectedVal != "LOBDATA") {
                var SortUrl = global.Ip + global.Port + '/' + mainUrl;
                var SortHeader = {
                    "offset": 0,
                    "limit": 20,
                    "order": 'desc',
                    "sortBy": SelectedVal,
                    "searchString": Searchdata,
                    "filters": filterdata,
                    "user_email": sessionStorage.getItem("user_email")
                }
                this.setState({
                    disabledUI: false,
                    disabletabs: false

                })
                global.sortByval = SelectedVal;

            } else if (SelectedVal == "LOBDATA") {
                var SortUrl = global.Ip + global.Port + '/asset/assetbylob/' + sessionStorage.getItem('LOB');
                var SortHeader = {
                    "offset": 0,
                    "limit": 20,
                    sortBy: "createdDate",
                    order: "desc",
                    "user_email": sessionStorage.getItem("user_email"),
                    "searchString": Searchdata,
                    "filters": filterdata
                }
                this.setState({
                    disabledUI: true,
                    disabletabs: false

                })
            }

            else {
                var SortUrl = global.Ip + global.Port + '/asset/allPrefferedAssets/' + sessionStorage.getItem('user_email'); //
                var SortHeader = {
                    offset: 0,
                    limit: 20,
                    sortBy: "createdDate",
                    order: "desc",
                    user_email: sessionStorage.getItem("user_email"),
                    searchString: Searchdata,
                    filters: filterdata
                }
                this.setState({
                    disabledUI: true,
                    disableTabs: true,
                })
            }

            axios.get(SortUrl, {
                headers: SortHeader
            })
                .then(res => {
                    document.getElementById('Loader').classList.add('hide');
                    // document.getElementById('dataAssetShow').classList.remove('hide');

                    //   global.assetData=res.data.ASSETS;

                    // if(SplitCat[1]=="WIN"){
                    //     global.assetData=res.data.WINSTORIES;
                    //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
                    // }else{
                    global.assetData = res.data.ASSETS;
                    global.assetCount = "Asset (" + res.data.TOTALCOUNT + ")";


                    //}

                    // var msg;
                    // if(global.assetData.length==0){
                    //     msg='No Record found.';
                    //     document.getElementById('dataAssetShow').classList.add('hide');

                    // }else{
                    //     msg=''; 
                    //     document.getElementById('dataAssetShow').classList.remove('hide');

                    // }
                    //   alert(res.data.TOTALCOUNT);
                    if (global.assetCount != "" && global.assetCount != undefined) {
                        var CountTotal = global.assetCount
                    }
                    else {
                        var CountTotal = 0;

                    }
                    this.setState({
                        assetData: global.assetData,
                        assetDataCount: CountTotal,
                        // errorMsg:msg,
                        // filterData:filterdata,
                        assetTitle: 'Search Result'
                    })
                    global.winData = [];
                    this.setState({
                        winData: [],
                        // assetDataCount: global.assetCount,
                        // errorMsg:msg,
                        searchParamResult: "SearchedParams",
                        assetTitle: 'Search Result'
                    })
                })

            global.assetData = [];
            this.setState({
                assetData: [],
                // assetDataCount: global.assetCount,
                // errorMsg:msg,
                searchParamResult: "SearchedParams",
                assetTitle: 'Search Result'
            })
        } else {
            var mainUrl = 'asset/allAssetsFilters';

            //}
            var SelectedVal = "";
            if (data == "Most Liked") {
                var SelectedTargetVal = "Most Liked";
                var SelectedVal = "likes";
                global.LobMsg = "";

            } else if (data == "Most Viewed") {
                var SelectedTargetVal = "Most Viewed";
                var SelectedVal = "views";
                global.LobMsg = "";

            } else if (data == "Last Updated") {
                var SelectedTargetVal = "Recently Added";
                var SelectedVal = "createdDate";
                global.LobMsg = "";

            } else if (data == "LOB") {
                var SelectedTargetVal = "LOB Recommendations";
                global.LobMsg = "LOB";
                var SelectedVal = "LOBDATA";
            }
            else {
                var SelectedVal = "Suggestions";
                var SelectedTargetVal = "SUGGESTION For You";

            }
            document.getElementById('dropdown-basic').innerHTML = '' + SelectedTargetVal;

            if (SelectedVal != "Suggestions" && SelectedVal != "LOBDATA") {
                var SortUrl = global.Ip + global.Port + '/' + mainUrl;
                var SortHeader = {
                    "offset": 0,
                    "limit": 20,
                    "order": 'desc',
                    "sortBy": SelectedVal,
                    "searchString": Searchdata,
                    "filters": filterdata,
                    "user_email": sessionStorage.getItem("user_email")
                }
                this.setState({
                    disabledUI: false,
                    disabletabs: false

                })
                global.sortByval = SelectedVal;

            } else if (SelectedVal == "LOBDATA") {
                var SortUrl = global.Ip + global.Port + '/asset/assetbylob/' + sessionStorage.getItem('LOB');
                var SortHeader = {
                    "offset": 0,
                    "limit": 20,
                    "sortBy": "createdDate",
                    "order": "desc",
                    "user_email": sessionStorage.getItem("user_email"),
                    "searchString": Searchdata,
                    "filters": filterdata
                }
                this.setState({
                    disabledUI: true,
                    disabletabs: false

                })
            }

            else {
                var SortUrl = global.Ip + global.Port + '/asset/allPrefferedAssets/' + sessionStorage.getItem('user_email'); //
                var SortHeader = {
                    offset: 0,
                    limit: 20,
                    sortBy: "createdDate",
                    order: "desc",
                    user_email: sessionStorage.getItem("user_email"),
                    searchString: Searchdata,
                    filters: filterdata
                }
                this.setState({
                    disabledUI: true,
                    disableTabs: true,

                })
            }

            axios.get(SortUrl, {
                headers: SortHeader
            })
                .then(res => {
                    document.getElementById('Loader').classList.add('hide');
                    // document.getElementById('dataAssetShow').classList.remove('hide');

                    //   global.assetData=res.data.ASSETS;

                    // if(SplitCat[1]=="WIN"){
                    //     global.assetData=res.data.WINSTORIES;
                    //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
                    // }else{
                    global.assetData = res.data.ASSETS;
                    global.assetCount = "Asset (" + res.data.TOTALCOUNT + ")";


                    //}

                    // var msg;
                    // if(global.assetData.length==0){
                    //     msg='No Record found.';
                    //     document.getElementById('dataAssetShow').classList.add('hide');

                    // }else{
                    //     msg=''; 
                    //     document.getElementById('dataAssetShow').classList.remove('hide');

                    // }
                    //   alert(res.data.TOTALCOUNT);
                    if (global.assetCount != "" && global.assetCount != undefined) {
                        var CountTotal = global.assetCount
                    }
                    else {
                        var CountTotal = 0;

                    }
                    this.setState({
                        assetData: global.assetData,
                        assetDataCount: CountTotal,
                        // errorMsg:msg,
                        // filterData:filterdata,
                        assetTitle: 'Search Result'
                    })
                })
            var mainWinUrl = 'winstory/getAllWinStoryByFilters';

            //}
            if (data == "Most Liked") {
                var SelectedTargetVal = "Most Liked";
                var SelectedVal = "likes";
                global.LobMsg = "";

            } else if (data == "Most Viewed") {
                var SelectedTargetVal = "Most Viewed";
                var SelectedVal = "views";
                global.LobMsg = "";
            } else if (data == "Last Updated") {
                var SelectedTargetVal = "Recently Added";
                var SelectedVal = "createdDate";
                global.LobMsg = "";
            } else if (data == "LOB") {
                var SelectedTargetVal = "LOB Recommendations";

                var SelectedVal = "LOBDATA";
                global.LobMsg = "LOB";
            }
            else {
                var SelectedVal = "Suggestions";
                var SelectedTargetVal = "Suggestions For You";

            }
            document.getElementById('dropdown-basic').innerHTML = '' + SelectedTargetVal;

            if (SelectedVal != "Suggestions" && SelectedVal != "LOBDATA") {
                var SortUrl = global.Ip + global.Port + '/' + mainWinUrl;
                var SortHeader = {
                    "offset": 0,
                    "limit": 20,
                    "order": 'desc',
                    "sortBy": SelectedVal,
                    "searchString": Searchdata,
                    "filters": filterdata,
                    "user_email": sessionStorage.getItem("user_email")
                }
                this.setState({
                    disabledUI: false,
                    disabletabs: false

                })

            } else if (SelectedVal == "LOBDATA") {//http://129.213.212.175:8001/winstory/filterWinsbylob/deepika.r@oracle.com
                var SortUrl = global.Ip + global.Port + '/winstory/filterWinsbylob';
                var SortHeader = {
                    offset: 0,
                    limit: 20,
                    sortBy: "createdDate",
                    order: "desc",
                    user_email: sessionStorage.getItem('user_email'),
                    searchString: Searchdata,
                    filters: filterdata
                }
                this.setState({
                    disableUI: true,
                    disabletabs: false

                })
            }

            else {
                var SortUrl = global.Ip + global.Port + '/winstory/allPrefferedWins/' + sessionStorage.getItem('user_email');
                var SortHeader = {
                    offset: 0,
                    limit: 20,
                    sortBy: "createdDate",
                    order: "desc",
                    user_email: sessionStorage.getItem('user_email'),
                    searchString: Searchdata,
                    filters: filterdata
                }
                this.setState({
                    disabledUI: true,
                    disableTabs: true


                })
            }

            axios.get(SortUrl, {
                headers: SortHeader
            })
                .then(resWin => {
                    document.getElementById('Loader').classList.add('hide');
                    // document.getElementById('dataAssetShow').classList.remove('hide');

                    //   global.assetData=res.data.ASSETS;

                    // if(SplitCat[1]=="WIN"){
                    //     global.assetData=res.data.WINSTORIES;
                    //     global.assetCount="Win Stories (" +res.data.TOTALCOUNT +")";
                    // }else{
                    global.winData = resWin.data.WINSTORIES;
                    // global.assetCount="Win Stories (" + res.data.TOTALCOUNT +")";

                    // var msg;
                    // if(global.winData.length==0){
                    //         msg='No Record found.';
                    //         document.getElementById('dataWinShow').classList.add('hide');

                    // }else{
                    //         msg=''; 
                    //         document.getElementById('dataWinShow').classList.remove('hide');

                    // }
                    // global.assetData=res.data.ASSETS;
                    // global.assetCount="Asset (" +res.data.TOTALCOUNT + ")";


                    //}

                    // var msg;
                    // if(global.assetData.length==0){
                    //     msg='No Record found.';
                    //     document.getElementById('dataAssetShow').classList.add('hide');

                    // }else{
                    //     msg=''; 
                    //     document.getElementById('dataAssetShow').classList.remove('hide');

                    // }
                    //   alert(res.data.TOTALCOUNT);
                    //     if( global.winData!="" && global.winData!=undefined){
                    //         var CountTotal=global.assetCount
                    //     }
                    //     else{
                    //     var CountTotal=0;   

                    // }
                    this.setState({
                        winData: resWin.data.ASSETS,
                        // errorMsg:msg,
                        // filterData:filterdata,
                        assetTitle: 'Search Result'
                    })
                })


        }







        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }
    render() {
        // alert( global.role);


        global.classClear = this.state.classClear;
        // if(global.loginStatus==undefined){
        //     return <Redirect push to="/login" />; 
        // }
        if (global.loginStatus == "no") {
            // document.getElementById("firstTimeLogin").style.display = 'none';
        } else if (global.loginStatus == "yes") {
            // alert('1'+sessionStorage.getItem("location"));
            if ((sessionStorage.getItem("location") == "null") || (sessionStorage.getItem("pillar") == "null")) {
                // alert('2');
                // document.getElementById("firstTimeLogin").style.display = 'none';
            }
        }
        // alert(this.state.disabledUI);
        if (this.state.disabledUI == true) {
            var x = document.querySelectorAll(".filters");
            var i;

            for (i = 0; i < x.length; i++) {
                //    alert(   x[i].getElementsByTagName('input').length);
                for (var j = 0; j < x[i].getElementsByTagName('input').length; j++) {
                    // console.log(x[i].getElementsByTagName('input')[j]);
                    x[i].getElementsByTagName('input')[j].setAttribute("disabled", "disabled");
                    x[i].getElementsByTagName('input')[j].parentElement.setAttribute("title", "disabled");

                }
            }
            var input = document.querySelectorAll(".search");
            for (var k = 0; k < input.length; k++) {
                input[k].getElementsByTagName('input')[0].setAttribute("disabled", "disabled");
                input[k].getElementsByTagName('input')[0].setAttribute("title", "disabled");

            }
        } else {
            var x = document.querySelectorAll(".filters");
            var i;

            for (i = 0; i < x.length; i++) {
                //    alert(   x[i].getElementsByTagName('input').length);
                for (var j = 0; j < x[i].getElementsByTagName('input').length; j++) {
                    // console.log(x[i].getElementsByTagName('input')[j]);
                    x[i].getElementsByTagName('input')[j].removeAttribute("disabled");
                    x[i].getElementsByTagName('input')[j].parentElement.removeAttribute("title");

                }
            }
            var input = document.querySelectorAll(".search");
            for (var k = 0; k < input.length; k++) {
                input[k].getElementsByTagName('input')[0].removeAttribute("disabled");
                input[k].getElementsByTagName('input')[0].removeAttribute("title");

            }
        }
        // alert(this.state.disabletabs);
        if (this.state.disabletabs == true) {
            if (document.getElementById("sortBybtns")) {
                // setTimeout(function(){ 
                document.getElementById('sortBybtns').classList.remove('hide');

                //}, 7000);
            }

        } else {
            if (document.getElementById("sortBybtns")) {
                if (document.getElementById("sortBybtns").getAttribute("class") != "d-flex hide posAbs") {
                    document.getElementById('sortBybtns').classList.add('hide');
                }
            }
            // setTimeout(function(){ 

            //     if(document.getElementById("sortBybtns").getAttribute("class")!="d-flex hide posAbs"){
            //         document.getElementById('sortBybtns').classList.add('hide');
            //     }   

            // }, 7000);

        }

        //else{


        // }
        return (
            <div className="App">
                <Header />
                <DIALOG />
                <Search onChange={this.searchOnChange.bind(this)} />
                <div className="BodyContainer">
                    <div class="createLink">
                        <CREATEDD />
                        {/* <Link to="/AssetManagement">  
                    <Button version="primary" size="lg" title="Create Asset">+</Button>
                    CREATEDD
                </Link> */}
                    </div>
                    <Container fluid={true}>
                        <Row>
                           <Col sm={3} className="pr-0">
                                {/* <Filters onChange={this.ListOnChange.bind(this)}/> */}
                                <div>
                                    <h5>Filter by <FilterManagement /><ClearFilter onClick={this.ListOnChange.bind(this)} /></h5>

                                    <div className="filters" id="SortFilterSection">
                                        <Form>
                                            <FiltersList onChange={this.ListOnChange.bind(this)} />
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                            <Col sm={9}>
                                <div class="d-flex hide posAbs" id="sortBybtns">
                                    <a href="javascript:void(0);" onClick={e => this.deletePrefrences(e)}>Clear History</a>
                                    <Link to="/userPreference" >Update Preferences</Link>
                                </div>
                                <div class="d-flex justify-content-between sortBy">
                                    {/* {this.state.assetTitle} */}
                                    {/* <h5> {this.state.assetDataCount} </h5> */}
                                    <SORTBY onClick={this.sortOnChange.bind(this)} />
                                </div>
                                {/* <Row className="errorMSG">
                            <Col md={12} className="mb-12 text-center"> <strong >{this.state.errorMsg}</strong></Col>
                        </Row> */}
                                <Loader />
                                <ImageCard />
                            </Col>
                        </Row>
                    </Container>
                    <Footer />

                </div>

                {/* <BodyContainer onChange={this.ListOnChange.bind(this)}/> */}
            </div>
        );
    }
}

export default ParentComponent;