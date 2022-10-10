import React,{Component} from "react";
import TopMenu from "../TopMenu/TopMenu";
import"./Myaccount.css"
import store from"../../reduser/store";
import axios from 'axios';
import { string } from "prop-types";
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
        ovnerrippesel:string
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
        ,ovnerripname,ovnerrippesel,userstatus}=this.state;
       
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
                        <input className="inputdata" value={ovnerripcity}/>
                        ]:[""]}

                    </div>
                </div>
               
              
            </div>
        )
    }
}
export default Myaccount