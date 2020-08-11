import React, { Component } from 'react'
import Form  from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import './index.css';
export class FiltersList extends Component {
    constructor(props, context) {
        super(props, context);
    
        this.state = {
            class: 'section',
            FilterData: [],
            buttonParam:'+'
        };
      }
      
	handleClick(val,e) {
        var inputval=document.getElementById(val+'val').value;
        if(inputval=="true"){
            document.getElementById(val).classList.add('show');
            document.getElementById(val+'val').value='false';
            document.getElementById(val+'expand').innerHTML='-';
        }else{
            document.getElementById(val).classList.remove('show');
            document.getElementById(val+'val').value='true';
            document.getElementById(val+'expand').innerHTML='+';

        }
	}
	getInitialState() {
		return {};
    }
    componentDidMount() {
        global.selectedcheckboxUnMap = undefined;
        if((sessionStorage.getItem('user_email')!="") && (sessionStorage.getItem('user_email')!=null) && (sessionStorage.getItem('user_email')!=undefined))
        {
        axios.get(global.Ip + global.Port + '/asset/allfilters',{
            headers: {
                "user_email":sessionStorage.getItem('user_email')  ,
                "platform":"w"
       
    
            }
        })
          .then(res => {
            const FilterData = res.data.allFilters;
            this.setState({ FilterData });
          })
        }
      }
  render() {
    var ListOnUnMapChange = this.props.onChange;
    const { open } = this.state;  
    function filterBox(event) {
        var j="";
        // alert(global.selectedcheckbox);
        if(global.selectedcheckboxUnMap!=undefined){
            // alert('1111');
           
            // alert(global.selectedcheckbox.indexOf(event.target.getAttribute("id")));
            if(global.selectedcheckboxUnMap.indexOf(event.target.getAttribute("id")) != -1 ){
                var array=global.selectedcheckboxUnMap.split(',');
                for (var i=array.length-1; i>=0; i--) {
                    if (array[i] === event.target.getAttribute("id")) {
                        array.splice(i, 1);
                        j=  array.toString();
                    }
                }

            }else{
                j+=global.selectedcheckboxUnMap +','+event.target.getAttribute("id");
                    
                }
                
            
        }else{
            j=event.target.getAttribute("id");
           
        }
        var TrimmedVar=  j.replace(/^,|,$/g, '');
        // alert(TrimmedVar);
        global.selectedcheckboxUnMap= TrimmedVar;
       
        ListOnUnMapChange(global.selectedcheckboxUnMap);
    }

    if(global.FilterDataUnMapList!=undefined){
      var  FilterDataListnew=global.FilterDataUnMapList;  
      }else{
       var FilterDataListnew=this.state.FilterData;
      }
  

      function filterContentUnMapFilter(fdata){
        if(fdata.SECONDARY.length >0){
            return (
                <div>
                    
                   <span> - {fdata.FILTER_NAME}</span>
                        <ul>
                            {fdata.SECONDARY.map((secondary)=>(
                                <li key={secondary.FILTER_ID}>
		                            <input  type="checkbox" id={secondary.FILTER_ID} name="filterData" onClick={filterBox} defaultChecked={false}/>
						           
						            <span className="ml-2px"> {secondary.SEC_FILTER_NAME + ' ('+(secondary.ASSET_COUNT + secondary.WINSTORY_COUNT)+')'}</span> 
                                </li>
                            ))}
                        </ul>
                    
                        </div>
                

            );

        }else{
            return (
                <>
		
				        <input  type="checkbox" id={fdata.FILTER_ID} name="filterData" onClick={filterBox} defaultChecked={false}/>
						<span className="ml-2px">{fdata.FILTER_NAME + ' ('+(fdata.ASSET_COUNT + fdata.WINSTORY_COUNT)+')'}</span>
						
                </> 
            );
        }
    }


    return (
            <div class="collaps">

                {FilterDataListnew.map((FilterData,index)=> 
                 <>
                 {/* {FilterData.Type !="Assets Type" && <> */}
                    <div className={this.state.class}>
                        <h6 onClick={this.handleClick.bind(this,FilterData.Type)}>{FilterData.Type}<span className="expand" id={FilterData.Type+'expand'}>-</span></h6>
                        <div  id={FilterData.Type} className="hide show">
                        {FilterData.filters.map((Filters,index) => 

                                <div key={Filters.FILTER_ID}>

                                {filterContentUnMapFilter(Filters)}

                                </div>
                        
                        )}
                            <input type="hidden" id={FilterData.Type+'val'} value="false"/>
                        </div>

                </div>
                {/* </>
                 } */}
                 </>
                )}
            </div>
         )
    }
}

export default FiltersList
