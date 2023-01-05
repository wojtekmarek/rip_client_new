import React,{Component} from "react";
import TopMenu from "../TopMenu/TopMenu";
import"./Anonse.css"


class Anonse extends Component{
    constructor(props) {
        super(props)
        this.state={
            
            anonselist: JSON,
        }
}
    componentDidMount= () =>{
       
        fetch(this.props.store.backendadress+'/anonse/listanonse')
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
                console.log(anons);
                var anonsedata="";
                if(anons.time_event != null)
                    {
                         anonsedata=anons.time_event.toString().slice(0,10).split("-").reverse().join("-");

                    }
                
                console.log(anonsedata);
                list.push(
                <div className="anonse">
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