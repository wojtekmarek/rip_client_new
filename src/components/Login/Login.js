import axios from "axios"
import { Link } from "react-router-dom"
import "./Login.css"
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
    this.handleBluremail=this.handleBluremail.bind(this);
    this.handleBlurpassword=this.handleBlurpassword.bind(this);
}
    
    //
    handleChange = (name,value) => {
      //console.log("zmiana");
      //console.log(value);
      //console.log(name);
  
        this.setState({[name]: value });
    };
    handleBluremail =(email) => {
        var regemail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        if (regemail.test(email)) {  
            this.setState({
                showerror: false,
                error: ""
            });          
                    
        }else{
            this.setState({error:"Nieporawny format adresu email",showerror:true});   
        }
    }
    handleBlurpassword = (password) => {
        let errortoshow=""
        if(password!==""){
            if (password.length < 8) {
                errortoshow=errortoshow+"Hasło musi zawierać co najmniej 8 znaków"; 
            }
            if (password.search(/[a-z]/i) < 0) {
                errortoshow=errortoshow+"Hasło musi zawierać małą literę"; 
            }
            if (password.search(/[A-Z]/i) < 0) {
                errortoshow=errortoshow+"Hasło musi zawierać dużą literę"; 
            }
            if (password.search(/[0-9]/) < 0) {
                errortoshow=errortoshow+"Hasło musi zawierać cyfrę"; 
            }
            if (password.search(/\W/) < 0) {
                errortoshow=errortoshow+"Hasło musi zawierać znak specjalnego"; 
            }
        }else{
            errortoshow=errortoshow+"Hasło jest wymagane"; 
        }
        
    
    if (errortoshow==="") {
       
            this.setState({
                showerror: false,
                error: ""
            });
        }
        else {
            this.setState({error:errortoshow,showerror:true});
        } 
    }
    
    
    validate = (email, password) => {
        //dopisać walidacje
        let errortoshow = "Hasło musi zawierać"
        var regemail = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        if (regemail.test(email)) {            

        }else{
            errortoshow="Nieporawny format adresu email";
            if(password!==""){
                if (password.length < 8) {
                    errortoshow=errortoshow+" co najmniej 8 znaków, "; 
                }
                if (password.search(/[a-z]/i) < 0) {
                    errortoshow=errortoshow+" małą literę, "; 
                }
                if (password.search(/[A-Z]/i) < 0) {
                    errortoshow=errortoshow+"zawierać dużą literę, "; 
                }
                if (password.search(/[0-9]/) < 0) {
                    errortoshow=errortoshow+" cyfrę, "; 
                }
                if (password.search(/\W/) < 0) {
                    errortoshow=errortoshow+" znak specjalnego, "; 
                }
            }else{
                errortoshow=errortoshow+"Hasło jest wymagane"; 
            }
            
        }
        if (errortoshow==="Hasło musi zawierać") {
                return true;
            }
            else {

                
                this.setState({error:errortoshow,showerror:true});
                setTimeout(() => {
                    this.setState({
                        showerror: false,
                        error: ""
                    });
    
                }, "3000");
                return false;
            } 

    }
    errorshow(msg) {
        if (msg === 200) {
            
           
           
            this.setState({
                showerror: true,
                doneregister:true,
                error: "Zostałeś zarejestrowany za chwile nastąpi przekierowanie do strony logowania"
            });
            setTimeout(() => {
                 window.location = "/login";

            }, "2000");
        } else {
            this.setState({
                showerror: true,
                error: msg
            });

            setTimeout(() => {
                this.setState({
                    showerror: false,
                    error: ""
                });

            }, "1000")
        }

    }

    handleSubmit = async (e) =>{
        //console.log("event");
        var { email, password} = this.state;
        var self=this;
       // console.log(email+" "+password);
        
       
            const url = this.props.store.backendadress + "/auth"
            await axios.post(url, {email:email,password:password})
            .then(response=>{
              //  console.log(response.data.data)
                localStorage.setItem("token", response.data.data.token)
                localStorage.setItem("id", response.data.data.id)
                localStorage.setItem("emailrip_app", email)
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
                                onBlur={(e) => { this.handleBluremail(e.target.value) }}
                                required
                                
                                className="input"
                            />
                            <input
                                type="password"
                                placeholder="Hasło"
                                name="password"
                                onChange={(e) => {this.handleChange(e.target.name,e.target.value)}}
                                onBlur={(e) => { this.handleBlurpassword(e.target.value) }}
                                required
                                className="input"
                            />
                           
                            <button 
                                className="green_btn"
                                onClick={this.handleSubmit}>
                                Zaloguj się
                            </button>
                            {error && <div
                                className="error_msg">{error}</div>}
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