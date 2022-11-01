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
                
                <h1><i><center>Intencje</center></i></h1>
<br></br>

<div className="divtabela">
              
                </div>
                <center> <table className="tabela"><thead><tr><th>Login<br></br></th><th>Imię<br></br></th><th>Nazwisko</th><th>Intencja</th><th>Data mszy</th><th>Ofiara</th></tr></thead><tbody><tr><td>Zosssss92</td><td>Zofia</td><td>Piórkowska</td><td>+150zł</td><td>+99zł</td><td>+99zł</td></tr><tr><td>Kuuuddsss</td><td>Katarzyna</td><td>Ostrowska</td><td>+50zł</td><td>+99zł</td><td>+99zł</td></tr><tr><td>Ostry</td><td>Piotr</td><td>Kwaśny</td><td>+99zł</td><td>+99zł</td><td>+99zł</td></tr></tbody></table>
                
                </center>
              
            </div>
                </div>
               
              
            </div>
        )
    }
}



export default Intentions