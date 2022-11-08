import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"
import { Link } from "react-router-dom";

class Order extends Component{
    state={
        
    }
    
    componentDidMount= () =>{
      
        
           
        
    }
    

 
    render(){
        
        
       
        return(
            <div>
                <TopMenu/>
                <div className="kontent">
               
                    <h1><i><center>Zamów mszę</center></i></h1>
                    <div className="wyborUslugi">
                        Intencja<br></br>
                   <input type="text"></input>
                   <br></br><br></br>
                   Data<br></br>
                   <input type="date"></input>
                   <br></br><br></br>
                   Godzina<br></br>
                   <input type="time"></input>
                   <br></br><br></br>
                   Ofiara: <br></br>
                   <input type="number"></input> zł
                   <br></br>
                   <br></br>
                   </div>
            
                   <br></br>
                   <button>Zamów</button>
                   
                </div>
                
            </div>
        )
    }
}



export default Order