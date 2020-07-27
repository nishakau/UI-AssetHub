import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import './index.css';
import TreeMenu from './treeFilter';
export class FiltersList extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            class: 'section',
            FilterData: [],
            buttonParam: '+',
            selectFilter: []
        };
    }

    handleClick(val, e) {
        var inputval = document.getElementById(val + 'val').value;
        if (inputval == "true") {
            document.getElementById(val).classList.add('show');
            document.getElementById(val + 'val').value = 'false';
            document.getElementById(val + 'expand').innerHTML = '-';
        } else {
            document.getElementById(val).classList.remove('show');
            document.getElementById(val + 'val').value = 'true';
            document.getElementById(val + 'expand').innerHTML = '+';

        }
    }
    getInitialState() {
        return {};
    }
    componentDidMount() {
        global.selectedcheckbox = '';
        document.getElementById('Loader').classList.remove('hide');
        //  return false;
        //this.state.selectFilter = global.selectedcheckbox.split(',');
        if ((sessionStorage.getItem('user_email') != "") && (sessionStorage.getItem('user_email') != null) && (sessionStorage.getItem('user_email') != undefined)) {
            axios.get(global.Ip + global.Port + '/asset/allfilters', {
                headers: {
                    "user_email": sessionStorage.getItem('user_email')

                }
            })
                .then(res => {

                   // console.log(res.data);
                    // document.getElementById('Loader').classList.add('hide');
                    const FilterData = res.data.allFilters;
                  //  console.log(FilterData)
                    FilterData.splice(1, 0, res.data.allFilters[res.data.allFilters.length - 1]);
                  //  console.log(FilterData)
                    FilterData.pop();
                  //  console.log(FilterData)
                    global.SuggesForYouFilter = res.data.suggestions;
                    this.setState({ FilterData });
                    setTimeout(function () { document.getElementById('Loader').classList.add('hide'); }, 5000);


                })
        }
    }
    render() {
        var ListOnChange = this.props.onChange;
        const { open } = this.state;
        function filterBox(event) {
          /*var j = "";
            console.log("called from child into parent");
            //alert(global.selectedcheckbox);
            if (global.selectedcheckbox != undefined) {
                // alert('1111');
                j += global.selectedcheckbox + ',' + event.target.getAttribute("id");
                // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
                if (global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1) {
                    var array = global.selectedcheckbox.split(',');
                    for (var i = array.length - 1; i >= 0; i--) {
                        if (array[i] === event.target.getAttribute("id")) {
                            array.splice(i, 1);
                            j = array.toString();
                        }
                    }

                } else { }
            } else {
                j = event.target.getAttribute("id");
                // alert('1');
                // if(global.selectedcheckbox!=undefined){

                //     if(global.selectedcheckbox.indexOf(event.target.getAttribute("id")) != -1 ){
                //         var array=global.selectedcheckbox.split(',');
                //         for (var i=array.length-1; i>=0; i--) {
                //             if (array[i] === event.target.getAttribute("id")) {
                //                 array.splice(i, 1);
                //                 j=  array.toString();
                //             }
                //         }

                //     }else{ j=event.target.getAttribute("id");}
                // }
            }
            var TrimmedVar = j.replace(/^,|,$/g, '');
            // alert(TrimmedVar);
            global.selectedcheckbox = TrimmedVar;
            // //   alert(global.selectedcheckbox);
            //  var n = global.selectedcheckbox.search("14983ddhswcdol");
            // //   alert(n);

            // if(n!=-1){
            //     global.selectedCategory="WIN";
            //     // alert('Win story is coming soon');
            //     // return false;
            //     document.getElementById("CategoryBox").value = "WIN";
            //     // document.getElementById('WinStory').style.display='block';

            // }
            // else{
            //     global.selectedCategory="ASSET";
            //     document.getElementById("CategoryBox").value = "ASSET";
            //     // document.getElementById('WinStory').style.display='block';
            // }*/
            ListOnChange(global.selectedcheckbox);
        }
        //   function  UncheckAllFilters(event){
        //     global.selectedcheckbox= "";
        //     ListOnChange(global.selectedcheckbox);
        //     var items=document.getElementsByName('filterData');
        //         for(var i=0; i<items.length; i++){
        //             if(items[i].type=='checkbox')
        //                 items[i].checked=false;
        //         }
        //   }{this.state.ASSET_THUMBNAIL!="" && 
        // <img src={this.state.ASSET_THUMBNAIL} class={this.state.class} width="60px" height="60px"/>}
        return (
            <div class="collaps">
                
                {this.state.FilterData.map((FilterData, index) =>
                <>
                <div className={this.state.class}>
                <h6 onClick={this.handleClick.bind(this, FilterData.Type)}>{FilterData.Type}<span className="expand" id={FilterData.Type + 'expand'}>-</span></h6>
                <div id={FilterData.Type} className="hide show">
                <ul style={{listStyleType:'none',paddingLeft: '0px'}}>
                {FilterData.filters.map((Filters, index) =>
                    
                    <li>
                        <TreeMenu selectedcheckbox={global.selectedcheckbox} Filters={Filters} ListOnChange={filterBox}></TreeMenu>
                    </li>
                    
                )}
                </ul>
                <input type="hidden" id={FilterData.Type + 'val'} value="false" />
                </div>
                </div>
                </>
                )}
                        </div>
        )
    }
}

export default FiltersList
