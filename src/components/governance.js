import React, { Component } from 'react';
import { Header } from './Header';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import GovernanceCard from './imageCard/governanceCard';
import Loader from './loader/loader';
import Footer from './Footer/Footer';

class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }


    render() {
        return (
            <div className="App">
                <Header />
                <div className="BodyContainer">
                    <Container fluid={true}>
                        <Row>
                            <Col sm={12}>
                                <h5 class="col-sm-6 mt10">Governance</h5>
                                <Row className="errorMSG">
                                    <Col md={12} className="mb-12 text-center"> <strong >{this.state.errorMsg}</strong></Col>
                                </Row>
                                <Loader />
                                <GovernanceCard errorMSG={this.state.errorMsg} />
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