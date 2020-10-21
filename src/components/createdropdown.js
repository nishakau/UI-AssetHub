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
      
    //   handleClick(val,e) {
    //     var sortOnChange = this.props.onClick;
    //         global.selectedSortOption= val;
    //         sortOnChange(global.selectedSortOption +"&"+ global.selectedCategory );
    //     }
       
  render() {
    //   alert(global.selectedCategory);
    // if(global.selectedCategory=="WIN"){
            
    // }
          function dropDownComponent(){
            if(sessionStorage.getItem('role') != 'vp'){
              return (
                <Dropdown icon={null}>
                        <Dropdown.Toggle   >
                            +
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                        <Link  to="/AssetManagement"><div>Create Asset</div></Link>
                             {/* <Link  to="/WinManagement"><div>Create Win</div></Link>  */}
                             {/*sessionStorage.getItem('role').indexOf('winloader')==-1 &&   <Link  to="/WinManagement"><div>Create Win</div></Link>*/}
                            {/* {sessionStorage.getItem('role')=="admin" &&   <Link  to="/WinManagement"><div>Create Win</div></Link>}  */}

                           
                    </Dropdown.Menu>
                  </Dropdown>
              );
            }else{
              return;
            } 
          }
          return (
            <>
                   {dropDownComponent()}
            </>
               
        );
    }
  }
  
  export default AssetDetails;