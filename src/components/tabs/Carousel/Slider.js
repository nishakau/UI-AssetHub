import React, { Component } from 'react'
import './index.css';
import Carousel from 'react-bootstrap/Carousel';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import axios from 'axios';

export class Slider extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleSelect = this.handleSelect.bind(this);
    
        this.state = {
          index: 0,
          direction: null,
         
        };
      }
    
      handleSelect(selectedIndex, e) {
        this.setState({
          index: selectedIndex,
          direction: e.direction,
        });
      }
      
    
  render() {
    // alert(this.state.Details);
    //     if(this.state.invalidUrl){
    //         return <Redirect push to={"/"} />; 
    //     }
        const { index, direction } = this.state;
    
        return (
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
          >
         
           {this.state.Details.map((DetailsArch,index)=> 
           
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_169769eb36d%20text%20%7B%20fill%3A%23ffffff%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_169769eb36d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23282c34%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3046875%22%20y%3D%22217.7984375%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>{DetailsArch.ASSET_ID}.</p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
          </Carousel>
        );
      }
}

export default Slider