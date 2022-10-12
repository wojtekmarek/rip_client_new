import React,{Component} from "react";
import store from"../../reduser/store";
import TopMenu from "../TopMenu/TopMenu";
import"./Anonse.css"
import serverurl from "../../reduser/store"

class Anonse extends Component{
    state={
        anonselist: JSON,
    }
    
    componentDidMount= () =>{
        //console.log(serverurl.backendadress);
        fetch(serverurl.backendadress+'/anonse/listanonse')
        .then(response => response.json())
        .then(json =>{
             this.setState({anonselist: json})
        })
        
    }
    

 
    render(){
        
        const{anonselist}=this.state;
        const list = []
        

        if(anonselist[0]!==undefined){
            anonselist.forEach((anons) => {
                console.log(typeof anons.time_event);
                let anonsedata=anons.time_event.toString().slice(0,10).split("-").reverse().join("-");
                list.push(<div className="anonse">
                    <div className="anonsetitle">
                        {anons.title}
                    </div>
                    <div className="anonsedate">
                        {anonsedata}
                    </div>
                    <div className="anonsscribe">
                        {anons.annonse}
                    </div>
                </div>
            );
            });
        }else{}
 
        return(
            <div>
                <TopMenu/>
                {(anonselist[0]!==undefined) ? [<div className="anonselist">{list}</div>]:[]}
              
            </div>
        )
    }
}
export default Anonse