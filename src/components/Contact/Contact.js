import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"

class Contact extends Component{
    state={
      
    }
    
    componentDidMount= () =>{
      
        
           
        
    }
    

 
    render(){
        
        
       
        return(
            <div>
                <TopMenu/>
                <div className="kontent">
                    <b>
                    <h1><i><center>Kontakt</center></i></h1>
                   Adres:
<br></br>
                   05-300 Mińsk Mazowiecki
                   <br></br>
                   ul. Kościelna 30a
                   <br></br>
                   <br></br>
                   tel:
                   <br></br>
                   738 329 955
                   <br></br>
                   738 293 221
                   <br></br>
                   <br></br>
                   e-mail:
                   <br></br>
                   uduchowiony30@wp.pl

                   </b>
                   
                </div>
               
              
            </div>
        )
    }
}



export default Contact