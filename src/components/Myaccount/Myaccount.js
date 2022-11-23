import React,{Component} from "react";
import TopMenu from "../TopMenu/TopMenu";
import"./Myaccount.css"
import store from"../../reduser/store";
import axios from 'axios';
import { string } from "prop-types";
import serverurl from "../../reduser/store"
const backendadress="sa";


class Myaccount extends Component{
    state={
        useremail: string,
        userpassword:string,
        userstatus:Boolean,
        ovnerripname:string,
        ovnerriplastname:string,
        ovnerripadress:string,
        ovnerriphousenr:string,
        ovnerripapartmentnr:string,
        ovnerripcity:string,
        ovnerrippesel:string,
        listburial: JSON,
        listexumation: JSON,
        listgrave: JSON
    }
    
    componentDidMount= () =>{
      
        axios.get(backendadress+'/userdb/userdata',{params:{id:localStorage.getItem('id')}} )
        .then(res => {
         //   console.log(res.data);
         const email=res.data.email;
         const statususer=res.data.status;
         console.log(statususer);
         this.setState({useremail: email,
                        userpassword: res.data.password,
                        userstatus:statususer});
       
         //console.log(serverurl.backendadress);
        /* fetch(serverurl.backendadress+'/burial/list')
         .then(response => response.json())
         .then(json =>{
               this.setState({listburial: JSON,
            //     Namedeceased: string,
            // LastNamedeceased: string,
            // DateOfDeath: Date,
            // DateBurial: Date,
            // // GraveQuaters: GraveQuartersSchema,
            // GraveQuartersnumber: Number
        })
         })

          //console.log(serverurl.backendadress);
        fetch(serverurl.backendadress+'/exhumation/listexumation')
        .then(response => response.json())
        .then(json =>{
             this.setState({listexumation: json})
             console.log("listexumation");
              console.log(json);
        })

         //console.log(serverurl.backendadress);
         fetch(serverurl.backendadress+'/gravequarters/listgrave')
         .then(response => response.json())
         .then(json =>{
              this.setState({listgrave: json})
              console.log("listgrave");
              console.log(json);
         })
       */
                if(statususer)
                {
               
                console.log("pobracovnerripa"+email)
                axios.get(backendadress+'/ovnerrip/getdataovnerrip',{params:{email:email}} )
                    .then(res => {
                      console.log(res.data);
                      console.log(res.data[0]);
                        let ovner=res.data[0];
                    this.setState({ ovnerriplastname:ovner.LastName,
                                    ovnerripname:ovner.Name,
                                    ovnerripadress:ovner.Street,
                                    ovnerriphousenr:ovner.HomeNumber,
                                    ovnerripapartmentnr:ovner.HometwoNumber,
                                    ovnerripcity:ovner.city,
                                    ovnerrippesel:ovner.Pesel});
                    
                     })
                     console.log("listgrave"+email)
                axios.get(backendadress+'/ovnerrip/getdataovnerripburial',{params:{email:email}} )
                    .then(res => {
                      console.log(res.data);
                      console.log(res.data[0]);
                        let burial=res.data[0];
                    this.setState({ ovnerriplastname:burial.LastName,
                                    ovnerripname:burial.Name,
                                    ovnerripadress:burial.Street,
                                    ovnerriphousenr:burial.HomeNumber,
                                    ovnerripapartmentnr:burial.HometwoNumber,
                                    ovnerripcity:burial.city,
                                    ovnerrippesel:burial.Pesel});
                    
                     })
                    }      
        })
        
           
        
    }
    

 
    render(){
        
    const{useremail,userpassword,ovnerripadress,ovnerripapartmentnr,ovnerripcity,ovnerriphousenr,ovnerriplastname
    ,ovnerripname,ovnerrippesel,userstatus,listgrave,gravedata}=this.state;
       
        
        
        
        const list = []
        console.log(listgrave);
        
    // console.log(listburial);

    // const{listgrave}=this.state;
    
    // console.log(listgrave);

    // const{listexumation}=this.state;
    
    // console.log(listexumation);


        if(listgrave[0]!==undefined){
            listgrave.forEach((gravequarters) => {
                console.log(gravequarters);
                console.log("aaa");
                let gravedata=gravequarters.time_event.toString().slice(0,10).split("-").reverse().join("-");
                console.log(gravedata);
                list.push(<div className="listgrave">
                    <div className="anonsetitle">
                        {gravequarters.IdGraveQuaters}
                    </div>
                    <div className="anonsedate">
                        {gravequarters.DatePayment}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.Payment}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.ovnerripid}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.NumberenableTraditionalBurials}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.NumberenableUrnBurials}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.NumberTraditionalBurials}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.NumberUrnBurials}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.MethodOfPayment}
                    </div>
                    <div className="anonsscribe">
                        {gravequarters.TypeOF}
                    </div>
                </div>
            );
            });
        }
    // if(listgrave[0]!==undefined){
    //     listgrave.forEach((grave) => {
    //         console.log(grave);
    //         let gravedata=grave.time_event.toString().slice(0,10).split("-").reverse().join("-");
    //         console.log(gravedata);
    //         list.push(<div className="anonse">
    //             <div className="anonsetitle">
    //                 {grave.title}
    //             </div>
    //             <div className="anonsedate">
    //                 {gravedata}
    //             </div>
    //             <div className="anonsscribe">
    //                 {grave.annonse}
    //             </div>
    //         </div>
    //     );
    //     });
    // }
    // if(listexumation[0]!==undefined){
    //     listexumation.forEach((exumation) => {
    //         
    //         console.log(exumation);
    //         let exumationdata=exumation.time_event.toString().slice(0,10).split("-").reverse().join("-");
    //         console.log(exumationdata);
    //         list.push(<div className="anonse">
    //             <div className="anonsetitle">
    //                 {exumation.PurposeExhumation}
    //             </div>
    //             <div className="anonsedate">
    //                 {exumation.DateExhumation}
    //             </div>
    //             <div className="anonsscribe">
    //                 {exumation.Datereburial}
    //             </div>
    //             <div className="anonsscribe">
    //                 {exumation.ChangeOfBurialPlace}
    //             </div>
    //             <div className="anonsscribe">
    //                 {exumation.Visible}
    //             </div>
    //             <div className="anonsscribe">
    //                 {exumation.Scribe}
    //             </div>
    //             <div className="anonsscribe">
    //                 {exumation.Burial}
    //             </div>
    //         </div>
    //     );
    //     });
    // }
else{}

        return(
            <div>
                <TopMenu key={76}/>
                <div className="userdata" key={77}>
                    <div className="userdatacolumn">
                        <label>Email</label>
                        <input className="inputdata" disabled="disabled" value={useremail}/>
                        {userstatus ?[
                            <label>Imię</label>,
                            <input className="inputdata" value={ovnerripname}/>,
                            <label>Nazwisko</label>,
                            <input className="inputdata" value={ovnerriplastname}/>,
                            <label>Pesel</label>,
                            <input className="inputdata" disabled="disabled" value={ovnerrippesel}/>,
                        ]:['']}
                        
                    </div>
                    <div className="userdatacolumn">
                        <label>Hasło</label>
                        <input className="inputdata" value={userpassword}/>
                        {userstatus ?[
                        <label>Ulica</label>,
                        <input className="inputdata" value={ovnerripadress}/>,
                        <label>Numer domu</label>,
                        <input className="inputdata" value={ovnerriphousenr}/>,
                        <label>Numer mieszkania</label>,
                        <input className="inputdata" value={ovnerripapartmentnr}/>,
                        <label>Miasto</label>,
                        <input className="inputdata" value={ovnerripcity}/>,
                        
                        ]:[""]}

                    </div>
                    
                
                   
                   

                    
                </div>
                <div className="userdatacolumn">
                    {(listgrave[0]!==undefined) ? [<div className="listgrave">{list}</div>]:[]}

                    </div>
                
                {/* {(listexumation[0]!==undefined) ? [<div className="listexumation">{list}</div>]:[]}
                {(listgrave[0]!==undefined) ? [<div className="listgrave">{list}</div>]:[]}
               */}
            </div>
        )
    }
}
export default Myaccount