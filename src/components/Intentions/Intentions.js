import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"
import { string } from "prop-types";
import { int } from "prop-types";
import { Link } from "react-router-dom";

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
                <div className="intentionskontent">
               
               <h1>Zamów mszę</h1>

               <div className="wyborUslugiintenions">
                <form id="formularzintencji">
                   Intencja<br></br>
              <input type="text" maxlength="50" pattern="[A-Za-z]"></input>

              <br></br><br></br>
              Data<br></br>
              <select>

            <option></option>
            <option></option>

              </select>
              <br></br><br></br>

              Godzina<br></br>
              <select>

              <option></option>
              <option></option>

              </select>
              <br></br><br></br>

              Ofiara: <br></br>
              <input type="number" min="1"></input> zł
              <br></br>
              <br></br>
              </form>
              </div>
       
              <br></br>
              <button className="insidebutton">Zamów</button>
              
           </div>
           
       </div>
        )
    }
}



export default Intentions