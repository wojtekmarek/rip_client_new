import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"
import serverurl from "../../reduser/store"

class Exhumation extends Component{
    state={
        exhumationlist: JSON,
    }
    
    componentDidMount= () =>{
        //console.log(serverurl.backendadress);
        fetch(serverurl.backendadress+'/exhumation/listexumation')
        .then(response => response.json())
        .then(json =>{
             this.setState({exhumationlist: json})
        })
        
    }
    

 
    render(){
        
        const{exhumationlist}=this.state;
        const list = []
        console.log(exhumationlist);
       
        return(
            <div>
                <TopMenu/>
                <div className="kontent">
                   Przykladowy kontent
                </div>
               
              
            </div>
        )
    }
}



export default Exhumation