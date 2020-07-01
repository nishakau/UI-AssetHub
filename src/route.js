import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Header } from './components/Header';

// import { Link, Redirect, Route, HashRouter as Router } from "react-router-dom"
import INDEXPANEL from "./components/indexComp";
import PARENTCOMPONENT from './components/ParentComponent';
import REPORTCOMPONENT from './components/ReportComponent';
import MOBREPORTCOMPONENT from './components/MobReportComponent';
import ASSETDETAILS from './components/assetDetails';
import FAVDETAILS from './components/ParentFavComponent';
import WinAssetDetails from './components/winAssetDetails';
import AHERROR from './components/error';

import CREATEASSET from './components/createAsset';
// import WINCREATEASSET from './components/winCreateAsset';
import DEPLOYDETAILS from './components/deployDetails';
import MYASSETS from './components/myAssetParent';
import GOVERNANCE from './components/governance';
import LOGIN from './components/Login';
import DIALOG from './components/dialog';
// import WINCREATEASSET from './components/winCreateAsset';
import MYWINSTORIES from './components/myWinStoryParent';
import CREATEWIN from './components/createWin';
import HELP from './components/helpSupport';
import PREFERENCES from './components/Preferences';

import FILTERPANEL from "./components/filterManagementPanel";
function RouteFile() {
  return (
    <Router >
      <div>

        {/* <Header /> */}
        {/* <Route  exact path="/" component={indexComponent} /> */}

        {/* <Route  exact path="/web/" component={Login} /> */}
        <Route exact path="/" component={Login} />

        <Route exact path="/home" component={Home} />
        <Route path="/AssetManagement" component={CreateComponent} />
        <Route path="/details" component={DetailsComponent} />
        <Route path="/WSdetails" component={WinDetailsComponent} />
        <Route path="/deploy" component={DeployComponent} />
        <Route path="/MyAssets" component={MyAssets} />
        <Route path="/Governance" component={Governance} />
        {/* <Route path="/login" component={Login} /> */}
        <Route path="/MyWinStories" component={MyWinStories} />
        <Route path="/WinManagement" component={CreateWinComponent} />
        <Route path="/myFavourite" component={favComponent} />
        <Route path="/helpSupport" component={helpSuppComponent} />
        <Route path="/error" component={ERROR} />
        <Route path="/FilterManagement" component={FilterMgmntPanel} />
        <Route path="/Reports" component={Reports} />
        <Route path="/MobReports" component={MobReports} />

        <Route path="/userPreference" component={Preferences} />

      </div>
    </Router>
  );
}
function indexComponent() {
  return (
    <INDEXPANEL />
  );
}
function Home() {
  return (
    <PARENTCOMPONENT />
  );
}
function Reports() {
  return (<REPORTCOMPONENT />
  );
}
function MobReports() {
  return (
    <><MOBREPORTCOMPONENT /></>
  );
}
function favComponent() {
  return (
    <FAVDETAILS />
  );
}
function FilterMgmntPanel() {
  return (
    <FILTERPANEL />
  );
}
function DetailsComponent() {
  return (
    <ASSETDETAILS />
  );
}
function helpSuppComponent() {
  return (
    <HELP />
  );
}
function Preferences() {
  return (
    <>
      <PREFERENCES />
    </>
  );
}
function WinDetailsComponent() {
  return (
    <WinAssetDetails />
  );
}
function ERROR() {
  return (
    <AHERROR />
  );
}
function Login() {
  return (
    <>
      <LOGIN />
      <DIALOG />
    </>
  );
}
function DeployComponent() {
  return (
    <DEPLOYDETAILS />
  );
}
function CreateComponent() {
  return (
    <div>
      <CREATEASSET />
    </div>
  );
}
function CreateWinComponent() {
  return (
    <div>
      <CREATEWIN />
    </div>
  );
}
function MyWinStories() {
  return (
    <MYWINSTORIES />
  );
}
function MyAssets() {
  return (
    <MYASSETS />
  );
}
function Governance() {
  return (
    <GOVERNANCE />
  );
}



export default RouteFile;