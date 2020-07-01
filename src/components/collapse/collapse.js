import React, { Component } from 'react'
import './index.css';
import Collapse from 'react-bootstrap/Collapse'
// import Fade from 'react-bootstrap/Fade'
import Button from 'react-bootstrap/Button';
class CollapseExpand extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
          open: false,
        };
      }
    
    componentDidMount() {
        
    }
  render() {
    const { open } = this.state;
        return (
            <>
            <Button
              onClick={() => this.setState({ open: !open })}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              click
            </Button>
           
          </>
        );
    }
  }
  
  export default CollapseExpand;