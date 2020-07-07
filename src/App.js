import React, { Component } from 'react';
import './App.css';
import RouteFile from './route';
class App extends Component {

  render() {
    var ip = window.location.hostname;
    var protocol = window.location.protocol + '//';
    // var ip = window.location.hostname;
    var baseDomain = protocol + ip;

    //PROD
    global.baseDom = baseDomain;
    global.Ip = baseDomain;//prod
    //  global.Port = ''; 
    //  global.baseDom="http://132.145.157.193";
    //  global.Ip = "http://132.145.157.193";
    global.Port = ':8001'; //prod
    // global.Port = ''; //dev

    //LOCAL
       global.Ip = "http://132.145.157.193";
     global.Port = ':8001'; //prod
    // global.Ip = "http://nac-assethub-dev.oracle.com";
    // global.baseDom = "http://nac-assethub-dev.oracle.com";
        // global.Ip = 'http://nac-assethub-staging.oracle.com';
        // global.baseDom="http://nac-assethub-staging.oracle.com";
    // global.baseDom="http://nac-assethub.oracle.com";

    // global.Ip = 'http://nac-assethub.oracle.com';
    //for dev
    // global.Ip = baseDomain;
    //global.Port = '';
    // }

    return (
      <div className="App">
        <RouteFile />
      </div>
    );
  }
}

export default App;
