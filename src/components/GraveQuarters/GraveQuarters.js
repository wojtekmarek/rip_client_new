import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"
import { Link } from "react-router-dom";

class GraveQuarters extends Component{
    state={
        
    }
    
    componentDidMount= () =>{
      
        
           
        
    }
    

 
    render(){
        
        
       
        return(
            <div>
                <TopMenu/>
                <div className="kwaterykontent">
                
                    <h1>Zamów usługę</h1>
                    <div className="wyborUslugi">
                   <button>Sprzątanie grobów</button>
                   <br></br><br></br>
                   <button>Podlewanie kwiatów</button>
                   <br></br><br></br>
                   <button>Zapalenie małego znicza</button>
                   <br></br><br></br>
                   <button>Zapalenie średniego znicza</button>
                   <br></br><br></br>
                   <button>Zapalenie dużego znicza</button>
                   <br></br><br></br>
                   <button>Położenie kwiatów</button>
                   <br></br>
                   </div>
                   <p class="priceName"><br></br>Cena: 22 zł <br></br></p>
                   
                <button className="insidebutton">Zamów</button>
                   
                </div>
                
            </div>
        )
    }
}



export default GraveQuarters