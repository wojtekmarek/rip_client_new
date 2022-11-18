import React,{Component} from "react";
import TopMenu from "../TopMenu/TopMenu";
import"./Myaccount.css"
import store from"../../reduser/store";
import axios from 'axios';
import { string } from "prop-types";
import serverurl from "../../reduser/store"
const backendadress=store.backendadress;


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
         this.setState({useremail: email,
                        userpassword: res.data.password,
                        userstatus:statususer});
       
         //console.log(serverurl.backendadress);
         fetch(serverurl.backendadress+'/burial/list')
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
        })

         //console.log(serverurl.backendadress);
         fetch(serverurl.backendadress+'/gravequarters/listgrave')
         .then(response => response.json())
         .then(json =>{
              this.setState({listgrave: json})
         })
       
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
                    }      
        })
        
           
        
    }
    

 
    render(){
        
    const{useremail,userpassword,ovnerripadress,ovnerripapartmentnr,ovnerripcity,ovnerriphousenr,ovnerriplastname
    ,ovnerripname,ovnerrippesel,userstatus,listburial,burialdata}=this.state;
       
        
        
        
        const list = []
        console.log(listburial);
        
    // console.log(listburial);

    // const{listgrave}=this.state;
    
    // console.log(listgrave);

    // const{listexumation}=this.state;
    
    // console.log(listexumation);


        if(listburial[0]!==undefined){
            listburial.forEach((burial) => {
                console.log(burial);
                console.log("aaa");
                let burialdata=burial.time_event.toString().slice(0,10).split("-").reverse().join("-");
                console.log(burialdata);
                list.push(<div className="listburial">
                    <div className="anonsetitle">
                        {burial.title}
                    </div>
                    <div className="anonsedate">
                        {burialdata}
                    </div>
                    <div className="anonsscribe">
                        {burial.annonse}
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
                <TopMenu/>
                <div className="userdata">
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
                {(listburial[0]!==undefined) ? [<div className="listburial">{list}</div>]:[]}
                
                {/* {(listexumation[0]!==undefined) ? [<div className="listexumation">{list}</div>]:[]}
                {(listgrave[0]!==undefined) ? [<div className="listgrave">{list}</div>]:[]}
               */}
            </div>
        )
    }
}
export default Myaccount