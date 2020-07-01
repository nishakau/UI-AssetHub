import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
class AssetDetails extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        invalidUrl:''
      }
      componentDidMount() {}
      
      handleClick(val,e) {
        var sortOnChange = this.props.onClick;
            global.selectedSortOption= val;
            sortOnChange(global.selectedSortOption );
        }
       
  render() {
    //    alert(global.selectedCategory);
    //    if(global.selectedCategory==undefined){
    //     global.selectedCategory="ASSET";
    //    }
    // if(global.selectedCategory=="WIN"){
            
    // }
          return (
            <>
                   <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic" size="sm">
                            Sort By
                        </Dropdown.Toggle>
                        <Dropdown.Menu>                     
                           <Dropdown.Item onClick={this.handleClick.bind(this,'LOB')}>LOB Recommendations</Dropdown.Item>
                           <Dropdown.Item onClick={this.handleClick.bind(this,'Suggestions')}>Suggestions For You</Dropdown.Item>
                           <Dropdown.Item  onClick={this.handleClick.bind(this,'Last Updated')}>Recently Added</Dropdown.Item>
                           <Dropdown.Item onClick={this.handleClick.bind(this,'Most Viewed')}>Most Viewed</Dropdown.Item>
                       </Dropdown.Menu>
                  </Dropdown>
            </>
               
        );
    }
  }
  
  export default AssetDetails;