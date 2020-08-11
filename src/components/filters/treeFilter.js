import React from "react";
class TreeMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  filterBox=(event)=> {
    var j = "";

    if (global.selectedcheckbox != undefined) {
      j += global.selectedcheckbox + "," + event.target.getAttribute("id");

      if (
        global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1
      ) {
        var array = global.selectedcheckbox.split(",");
        for (var i = array.length - 1; i >= 0; i--) {
          if (array[i] === event.target.getAttribute("id")) {
            array.splice(i, 1);
            j = array.toString();
          }
        }
      } else {
      }
    } else {
      j = event.target.getAttribute("id");
    }
    var TrimmedVar = j.replace(/^,|,$/g, "");

    global.selectedcheckbox = TrimmedVar;
    this.props.ListOnChange(global.selectedcheckbox);
  }

  handleClick(val, e) {
    var inputval = document.getElementById(val + "val").value;
    if (inputval == "true") {
      document.getElementById(val).classList.add("show");
      document.getElementById(val + "val").value = "false";
      document.getElementById(val + "expand").innerHTML = "-";
    } else {
      document.getElementById(val).classList.remove("show");
      document.getElementById(val + "val").value = "true";
      document.getElementById(val + "expand").innerHTML = "+";
    }
  }

  

  render() {
    if (
      this.props.Filters.SECONDARY != undefined &&
      this.props.Filters.SECONDARY.length > 0
    ) {
      return (
        <div>
          <span onClick={this.handleClick.bind(this, this.props.Filters.FILTER_ID)}>
            <span
              className="expand_left"
              id={this.props.Filters.FILTER_ID + "expand"}
            >
              +
            </span>
            {this.props.Filters.FILTER_NAME}
          </span>

          <div className="hide" id={this.props.Filters.FILTER_ID}>
            <ul>
              {this.props.Filters.SECONDARY.map((second) => (
                <li key={second.FILTER_ID} className="mt-5px">
                  <input
                    type="checkbox"
                    onClick={this.filterBox}
                    id={second.FILTER_ID}
                    name="filterData"
                  ></input>
                  <span style={{ "margin-left": "5px" }}>{second.SEC_FILTER_NAME}</span>
                </li>
              ))}
            </ul>
            <input
              type="hidden"
              id={this.props.Filters.FILTER_ID + "val"}
              value="true"
            />
          </div>
        </div>
      );
    } else {
      return (
        <div key={this.props.Filters.FILTER_ID}>
          <input
            type="checkbox"
            onClick={this.filterBox}
            id={this.props.Filters.FILTER_ID}
            name="filterData"
          ></input>
          <span style={{ "margin-left": "5px" }}>
            {this.props.Filters.FILTER_NAME}
          </span>
        </div>
      );
    }
  }
}

export default TreeMenu;

