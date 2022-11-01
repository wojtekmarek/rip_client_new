import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"

class GraveQuarters extends Component{
    state={
        
    }
    
    componentDidMount= () =>{
      
        
           
        
    }
    

 
    render(){
        
        
       
        return(
            <div>
                <TopMenu/>
                <div className="kontent">
                <center>
                    <h1><i><center>Zamów usługę</center></i></h1>
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
                   <br></br>Cena: 22 zł <br></br>
                   
                <button>Zamów</button>
                   </center>
                </div>
                
            </div>
        )
    }
}



export default GraveQuarters