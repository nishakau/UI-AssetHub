import React, { Component } from 'react';
import { Header } from './Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import MyAsseTCard from './imageCard/MyAssetsCard';
import MyWinStoryCard from './imageCard/MyWinStoryCard';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Loader from './loader/loader';
import Footer from './Footer/Footer';

class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 'assetTitle': 'My Win Story', componentMange: '', assetData: '', errorMsg: '', assetCount: '', filterData: '', searchParamResult: "", classClear: 'hide clearall small pull-right' };
    }

    componentDidMount() { }


    render() {
        global.classClear = this.state.classClear;
        return (
            <div className="App">
                <Header />
                <div className="BodyContainer">
                    <Container fluid={true}>
                        <Row>
                            <Col sm={12}>
                                <h5 class="col-sm-12 mt10">My Wins <Link to="/WinManagement"><button type="button" class="btn btn-primary pull-right mb-20 btn-sm">Create Win</button></Link></h5>


                                <Row className="errorMSG">
                                    <Col md={12} className="mb-12 text-center"> <strong >{this.state.errorMsg}</strong></Col>
                                </Row>
                                <Loader />
                                <MyWinStoryCard errorMSG={this.state.errorMsg} />
                            </Col>
                        </Row>
                    </Container>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default ParentComponent;