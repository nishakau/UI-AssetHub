import React, { Component } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import axios from 'axios';
import './index.css';

export class Sorting extends Component {
    
  render() {
   
    return (
           <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Sort By:
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Asc</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Desc</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
    )
  }
}

export default Sorting
