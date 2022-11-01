import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"
import { string } from "prop-types";
import { int } from "prop-types";

class Intentions extends Component{
    state={
        intentionname: string,
        intentionprice: int
    }
    
    componentDidMount= () =>{
      
        
           
        
    }
    

 
    render(){
        
        const{intentionname,intentionprice}=this.state;
       
        return(
            <div>
                <TopMenu/>
                <div className="kontent">
                <div>
                
                <div className="userdata">
                    <div className="userdatacolumn">
                        
                        
                            <label>Intencja</label>
                            <input className="inputdata" value={intentionname}/>
                            <label>Wysokość ofiary</label>
                            <input className="inputdata" value={intentionprice}/>
                      
                        <input type="submit"></input>
                        
                    </div>
                  
                </div>
               
              
            </div>
                </div>
               
              
            </div>
        )
    }
}



export default Intentions