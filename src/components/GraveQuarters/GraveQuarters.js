import TopMenu from "../TopMenu/TopMenu"
import React,{Component} from "react";
import "./styles.css"

class GraveQuarters extends Component{
    state={
        lightservice: Boolean,
        cleanservice: Boolean
    }
    
    componentDidMount= () =>{
      
        
           
        
    }
    

 
    render(){
        
        const{lightservice,cleanservice}=this.state;
       
        return(
            <div>
                <TopMenu/>
                <div className="kontent">
                   Zamów wybraną usługę cmentarną. Możesz zamówić zapalenie znicza lub czyszczenie grobu.
                   <label>Wybierz grób</label>
                   <div className="userdata">
                   
                    <div className="userdatacolumn">
                        
                        
                            <label>Usługa czyszczenia grobu</label>
                            <input type="checkbox" className="inputdata" value={cleanservice}/>
                           
                      
                        <input type="submit"></input>
                        
                    </div>
                    <div className="userdatacolumn">
                        
                        
                            <label>Usługa zapalenia znicza</label>
                            <input type="checkbox" className="inputdata" value={lightservice}/>
                           
                      
                        <input type="submit"></input>
                        
                    </div>
                  
                </div>



                   
                </div>
            </div>
        )
    }
}



export default GraveQuarters