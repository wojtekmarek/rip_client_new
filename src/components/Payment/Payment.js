import React,{ Component}from "react";
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import "./Payment.css";
import initialState from "../../reduser/store"

class Payment extends Component{
    constructor(props) {
        super(props);
        
        this.state={
      
    };
    
    
}

    componentDidMount = () => {
      
        



    }
   
  
  pay=(par)=>  
   { console.log("plać");
        
           
            var config = {
              method: 'post',
              url: initialState.backendadress+'/payment/paypaymant',
              headers: { 
                'Content-Type': 'application/json'
              },
            
              data: {
                "Amount":22.2,
                "Payment_id":"6371f86cfa36d8df65eaec1f",
                "User_id":"629d0fc9b6c92e615e470878"
            }
            };
            
            axios(config);
          
        }
       
              
   
             
   
         
   
    
    render(){
        return(
        <div onClick={()=>{this.pay("par")}} className="topmenubutton">zaplac</div>
       
        )
}
}
export default Payment