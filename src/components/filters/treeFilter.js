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
      this.props.Filters.secondary != undefined &&
      this.props.Filters.secondary.length > 1
    ) {
      return (
        <div>
          <span onClick={this.handleClick.bind(this, this.props.Filters.name)}>
            <span
              className="expand_left"
              id={this.props.Filters.name + "expand"}
            >
              -
            </span>
            {this.props.Filters.name}
          </span>

          <div className="hide show" id={this.props.Filters.name}>
            <ul>
              {this.props.Filters.secondary.map((second) => (
                <li key={second.id}>
                  <input
                    type="checkbox"
                    onClick={this.filterBox}
                    id={second.id}
                    name="filterData"
                  ></input>
                  <span style={{ "margin-left": "5px" }}>{second.name}</span>
                </li>
              ))}
            </ul>
            <input
              type="hidden"
              id={this.props.Filters.name + "val"}
              value="false"
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

