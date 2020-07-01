import React, { Component } from 'react'
import './index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export class Loader extends Component {
  render() {
     
      
    return (
        <div class="timeline-wrapper mt-30 hide row" id="Loaderbk">
            <div class="timeline-item col-md-3">
                <div class="animated-background facebook"><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div>
            </div>
            <div class="timeline-item col-md-3">
                <div class="animated-background facebook"><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div>
            </div>
            <div class="timeline-item col-md-3">
                <div class="animated-background facebook"><div class="background-masker content-first-end"></div><div class="background-masker content-second-line"></div><div class="background-masker content-second-end"></div><div class="background-masker content-third-line"></div><div class="background-masker content-third-end"></div></div>
            </div>
        </div>
    )
  }
}

export default Loader
