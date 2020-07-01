import React, { Component } from 'react'
import './index.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class Search extends Component {
  constructor() {
    super();
    this.state = { filterdropdown: '', SuggesForYouFilter: [], classClearSearch: 'ClearSearch clearall small pull-right hide' };
  }
  componentDidMount() {
    // document.getElementById('Loader').classList.remove('hide');
    //  return false;

    if ((sessionStorage.getItem('user_email') != "") && (sessionStorage.getItem('user_email') != null) && (sessionStorage.getItem('user_email') != undefined)) {
      axios.get(global.Ip + global.Port + '/asset/allfilters', {
        headers: {
          "user_email": sessionStorage.getItem('user_email')

        }
      })
        .then(res => {
          const SuggesForYouFilter = res.data.suggestions;
          //  console.log(res.data.suggestions);
          //  global.SuggesForYouFilter=res.data.suggestions;
          this.setState({ SuggesForYouFilter });
          console.log(this.state.SuggesForYouFilter);
          //  document.getElementById('Loader').classList.add('hide');

        })
    }
  }
  // handleClick(val,e) {
  //   var d = document.getElementById("CategoryBox").value;
  // }
  handleClick(val, e) {
    // alert(e);
    var searchbox = document.getElementById("selectBox");
    searchbox.value = val;
    document.getElementById("selectBox").focus();
    var ul = document.getElementById("myUL");
    ul.classList.add('hide');



  }
  render() {
    // alert(global.selectedcheckbox);
    var SuggesForYouFilternew;
    // console.log(global.SuggesForYouFilter);

    // console(SuggesForYouFilternew);
    let searchOnChange = this.props.onChange;
    var strUser;
    global.filterdropdown = this.state.filterdropdown;

    function selectBox() {
      var e = document.getElementById("selectBox");
      strUser = e.value;
      if (strUser == "") {
        //alert("You have to add some text to search");
        return false;
      }
      global.selectedDropdownContract = strUser;

      searchOnChange(global.selectedDropdownContract);
    }
    function hashSearch() {
      document.getElementById("selectBox").value = "#oracleinaction";
      var element = document.getElementById("clrsrch");
      element.classList.remove("hide");
      selectBox();
      // strUser = '#oracleinaction';
      // global.selectedDropdownContract = strUser;
      // searchOnChange(global.selectedDropdownContract);
    }
    function hashcovidSearch() {
      document.getElementById("selectBox").value = "#covid19";
      var element = document.getElementById("clrsrch");
      element.classList.remove("hide");
      selectBox();
      // strUser = '#covid19';
      // global.selectedDropdownContract = strUser;
      // searchOnChange(global.selectedDropdownContract);
    }
    function clearSearch() {
      document.getElementById("selectBox").value = "";
      // setState({
      //   classClearSearch: 'ClearSearch clearall small pull-right hide';
      // });
      selectBox();
    }
    function myFunction() {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("selectBox");
      // alert(input.value)
      filter = input.value.toUpperCase();
      // document.getElement
      ul = document.getElementById("myUL");
      var element = document.getElementById("clrsrch");
      if (input.value == "") {
        ul.classList.add('hide');
        element.classList.add("hide");
      } else {
        ul.classList.remove('hide');
        element.classList.remove("hide");
      }
      li = ul.getElementsByTagName("li");
      for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
    if ((global.SuggesForYouFilter != "") && (global.SuggesForYouFilter != null) && (global.SuggesForYouFilter != undefined)) {
      SuggesForYouFilternew = global.SuggesForYouFilter;
    }
    else if ((this.state.SuggesForYouFilter != "") && (this.state.SuggesForYouFilter != null) && (this.state.SuggesForYouFilter != undefined)) {
      SuggesForYouFilternew = this.state.SuggesForYouFilter;
    } else {
      SuggesForYouFilternew = [];
    }


    return (
      <div className="ml-auto mr-auto search">
        {/* <Form inline > */}
        <input type="text" id="selectBox" onKeyUp={(ev) => {
          // console.log(`Pressed keyCode ${ev.key}`);

          if (ev.key === 'Enter') {
            selectBox();
            ev.preventDefault();
          } else {
            myFunction();
          }
        }} onChange={() => {
          this.setState({
            classClearSearch: 'ClearSearch clearall small pull-right'
          })
        }} placeholder="Search" className="" autoComplete="off" />  <Button variant="primary btn-lg" onClick={selectBox}><img src="../img/Icon_Search.png" /></Button>
        <a id="clrsrch" class={this.state.classClearSearch} href="javascript:void(0)" onClick={() => {
          document.getElementById("selectBox").value = "";
          this.setState({
            classClearSearch: 'ClearSearch clearall small pull-right hide'
          });
          var element = document.getElementById("clrsrch");
          element.classList.add("hide");
          global.selectedDropdownContract = '';
          searchOnChange(global.selectedDropdownContract);
        }}>Clear All</a>

        <div style={{ textAlign: "center", fontSize: "16px", fontWeight: "600", textDecoration: "underline", color: "#F3921F" }}>
          <a style={{ marginRight: "10px" }} onClick={hashcovidSearch}>#covid19</a>
          <a onClick={hashSearch}>#oracleinaction</a>
        </div>
        <ul id="myUL" class="hide">
          {SuggesForYouFilternew.map((SuggesForYouFilter) =>
            <>
              {(SuggesForYouFilter.ACTIVITY_TYPE == "FILTER") ? (

                <li onClick={this.handleClick.bind(this, SuggesForYouFilter.FILTER_NAME)}><a href="javascript:void(0)">{SuggesForYouFilter.FILTER_NAME}</a></li>
              ) : (
                  <li onClick={this.handleClick.bind(this, SuggesForYouFilter.ACTIVITY_FILTER)}><a href="javascript:void(0)">{SuggesForYouFilter.ACTIVITY_FILTER}</a></li>


                )}
            </>
          )}
        </ul>
        {/* </Form> */}
      </div>
    )
  }
}

export default Search
