import React, { Component } from 'react';
import { Header } from './Header';
import Footer from './Footer/Footer';
class ReportComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 'assetTitle': 'Asset', componentMange: '', assetData: '', errorMsg: '', assetCount: '', filterData: '', searchParamResult: "", classClear: 'hide clearall small pull-right', disabledUI: false };
    }
    onAddNew = (e) => {
        if (e == "TopRequestedAssets") {
            document.getElementById("Reports").src = "https://assethuboac-orasenatdhubsblue02.analytics.ocp.oraclecloud.com/dv/ui?pageid=visualAnalyzer&reportmode=presentation&reportpath=%2F%40Catalog%2Fshared%2FAssethub-PROD%2FAssetsRequestedReport";

            if (document.getElementById("RA").getAttribute("class") == "tab_btn btn-default") {
                document.getElementById("RA").classList.add("btn-primary");
                document.getElementById("RA").classList.remove("btn-default");
            }
            if (document.getElementById("VA").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("VA").classList.remove("btn-primary");
                document.getElementById("VA").classList.add("btn-default");
            }
            if (document.getElementById("HM").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("HM").classList.remove("btn-primary");
                document.getElementById("HM").classList.add("btn-default");
            }
            if (document.getElementById("VC").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("VC").classList.remove("btn-primary");
                document.getElementById("VC").classList.add("btn-default");
            }
            document.getElementById('VcCountCheck').classList.add('hide');

            return false;
        }
        else if (e == "VisitorsCount") {
            document.getElementById("Reports").src = "https://assethuboac-orasenatdhubsblue02.analytics.ocp.oraclecloud.com/dv/ui?pageid=visualAnalyzer&reportmode=full&reportpath=%2F%40Catalog%2Fshared%2FAssethub-PROD%2FVisitors%20Count%20Report";
            document.getElementById('VcCountCheck').classList.remove('hide');
            if (document.getElementById("RA").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("RA").classList.remove("btn-primary");
                document.getElementById("RA").classList.add("btn-default");
            }
            if (document.getElementById("VA").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("VA").classList.remove("btn-primary");
                document.getElementById("VA").classList.add("btn-default");
            }
            if (document.getElementById("HM").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("HM").classList.remove("btn-primary");
                document.getElementById("HM").classList.add("btn-default");
            }
            if (document.getElementById("VC").getAttribute("class") == "tab_btn btn-default") {
                document.getElementById("VC").classList.add("btn-primary");
                document.getElementById("VC").classList.remove("btn-default");
            }

            return false;
        }







        else if (e == "HeatMap") {
            document.getElementById("Reports").src = "https://assethuboac-orasenatdhubsblue02.analytics.ocp.oraclecloud.com/dv/ui?pageid=visualAnalyzer&reportmode=presentation&reportpath=%2F%40Catalog%2Fshared%2FAssethub-PROD%2FHeatMap%20-%20Prod";

            if (document.getElementById("HM").getAttribute("class") == "tab_btn btn-default") {
                document.getElementById("HM").classList.add("btn-primary");
                document.getElementById("HM").classList.remove("btn-default");
            }
            if (document.getElementById("VA").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("VA").classList.remove("btn-primary");
                document.getElementById("VA").classList.add("btn-default");
            }
            if (document.getElementById("RA").getAttribute("class") == "tab_btn btn-primary") {

                document.getElementById("RA").classList.remove("btn-primary");
                document.getElementById("RA").classList.add("btn-default");
            }
            if (document.getElementById("VC").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("VC").classList.remove("btn-primary");
                document.getElementById("VC").classList.add("btn-default");
            }

            document.getElementById('VcCountCheck').classList.add('hide');

            return false;
        }


        else {

            document.getElementById("Reports").src = "https://assethuboac-orasenatdhubsblue02.analytics.ocp.oraclecloud.com/dv/ui?pageid=visualAnalyzer&reportmode=presentation&reportpath=%2F%40Catalog%2Fshared%2FAssethub-PROD%2FAssetViewsReport";

            if (document.getElementById("VA").getAttribute("class") == "tab_btn btn-default") {
                document.getElementById("VA").classList.add("btn-primary");
                document.getElementById("VA").classList.remove("btn-default");
            }
            if (document.getElementById("HM").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("HM").classList.remove("btn-primary");
                document.getElementById("HM").classList.add("btn-default");
            }
            if (document.getElementById("RA").getAttribute("class") == "tab_btn btn-primary") {

                document.getElementById("RA").classList.remove("btn-primary");
                document.getElementById("RA").classList.add("btn-default");
            }
            if (document.getElementById("VC").getAttribute("class") == "tab_btn btn-primary") {
                document.getElementById("VC").classList.remove("btn-primary");
                document.getElementById("VC").classList.add("btn-default");
            }
            document.getElementById('VcCountCheck').classList.add('hide');


            return false;
        }
    }


    render() {

        return (
            <div className="App">
                <Header />
                <div class="pd20">
                    <span class="hide_panel"></span>
                    <span id="VcCountCheck" class="bottomPanel hide"></span>

                    <h5 class="mt-30">REPORTS</h5>
                    {/* <hr/> */}
                    <div class="mt40 report_panel">
                        <button id="RA" class="tab_btn btn-primary" onClick={(e) => this.onAddNew('TopRequestedAssets')}>Top Requested Assets</button>
                        <button id="VA" class="tab_btn btn-default" onClick={(e) => this.onAddNew('TopViewedAssets')}>Top Viewed Assets</button>
                        <button id="HM" class="tab_btn btn-default" onClick={(e) => this.onAddNew('HeatMap')}>Most Searched Keywords</button>
                        <button id="VC" class="tab_btn btn-default" onClick={(e) => this.onAddNew('VisitorsCount')}>Visitors Count</button>


                    </div>

                    <p align="center">

                        <iframe id="Reports"
                            title="Reports"
                            width="100%"
                            height="800"

                            src="https://assethuboac-orasenatdhubsblue02.analytics.ocp.oraclecloud.com/dv/ui?pageid=visualAnalyzer&reportmode=presentation&reportpath=%2F%40Catalog%2Fshared%2FAssethub-PROD%2FAssetsRequestedReport">

                        </iframe>
                        {/* <style>
                .bitech_storypage_header_wrapper{
                    display:none !important;
                    }
                </style> */}
                    </p>
                    <div class="hide_panel_dwn"></div>
                    {/* <iframe /> */}
                </div>
                <Footer />

            </div>

        );
    }
}

export default ReportComponent;