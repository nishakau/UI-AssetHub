import React, { Component } from 'react';
import { Header } from './Header';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Search } from './search/Search';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import ImageCard from './imageCard/FavCard';
import Form from 'react-bootstrap/Form';
import FiltersList from './filters/filterList';
import Loader from './loader/loader';
import Footer from './Footer/Footer';
import ClearFilter from './clearFilters';
import Button from 'react-bootstrap/Button'
import { Link, Redirect } from "react-router-dom";
import SORTBY from "./sortBy";
import DIALOG from './dialog';
import CREATEDD from './createdropdown';
class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 'assetTitle': 'Asset', componentMange: '', assetData: '', errorMsg: '', assetCount: '', filterData: '', searchParamResult: "", classClear: 'hide clearall small pull-right', disabledUI: false };
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="App">
                <Header />
                <DIALOG />
                {/* <Search onChange={this.searchOnChange.bind(this)}/> */}
                <div className="BodyContainer">
                    <div class="createLink">
                        {/* <CREATEDD/> */}
                        {/* <Link to="/AssetManagement">  
                    <Button version="primary" size="lg" title="Create Asset">+</Button>
                    CREATEDD
                </Link> */}
                    </div>
                    <Container fluid={true}>
                        <Row>
                            <Col className="pr-0">
                                {/* <Filters onChange={this.ListOnChange.bind(this)}/> */}
                                {/* <div>
                        <h5>Filters(s) <ClearFilter  onClick={this.ListOnChange.bind(this)}/></h5>
                        
                        <div className="filters" id="SortFilterSection">
                            <Form>
                                <FiltersList  onChange={this.ListOnChange.bind(this)}/>
                            </Form>
                        </div>
                    </div> */}
                            </Col>
                            <Col sm={12}>
                                <div class="d-flex justify-content-between sortBy">
                                    {/* {this.state.assetTitle} */}
                                    {/* <h5> {this.state.assetDataCount} </h5> */}
                                    {/* <SORTBY onClick={this.sortOnChange.bind(this)}/> */}
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