import axios from "axios"
import { Link } from "react-router-dom"
import "./Login.css"
import serverurl from "../../reduser/store"
import React, { Component } from "react";

class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    
    this.handleChange= this.handleChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
}
    
    //
    handleChange = (name,value) => {
      console.log("zmiana");
      console.log(value);
      console.log(name);
  
        this.setState({[name]: value });
    };
    //logowanie

    handleSubmit = async (e) =>{
        //console.log("event");
        var { email, password} = this.state;
        var self=this;
       // console.log(email+" "+password);
        
       
            const url = this.props.store.backendadress + "/auth"
            axios.post(url, {email:email,password:password})
            .then(response=>{
               // console.log(response)
                localStorage.setItem("token", response.token)
            localStorage.setItem("id", response.id)
           // console.log(response.data);
            window.location = "/"
            })            
            .catch(function (error) {
              
            if(error.response.status===401)
                 {
                    self.setState({error: error.response.data.message});
                    
                    
            }else if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) 
            {
                self.setState({error: "Coś poszło nie tak spróbój za chwile" });
            }
            
        })
        
    }

    render() {

        const { error } = this.state;





        return (
            <div className="login_container">
                <div className="login_form_container">
                    <div className="left">
                        <div className="form_container"
                            >
                            <h1>Logowanie</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => {this.handleChange(e.target.name,e.target.value)}}
                                required
                                
                                className="input"
                            />
                            <input
                                type="password"
                                placeholder="Hasło"
                                name="password"
                                onChange={(e) => {this.handleChange(e.target.name,e.target.value)}}
                                required
                                className="input"
                            />
                            {error && <div
                                className="error_msg">{error}</div>}
                            <button 
                                className="green_btn"
                                onClick={this.handleSubmit}>
                                Zaloguj się
                            </button>
                        </div>
                    </div>
                    <div className="right">
                        <h1>Nie masz konta?</h1>

                        <Link to="/signup">
                            <button type="button"
                                className="white_btn"
                                >
                                Zarejestruj się
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;