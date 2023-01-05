import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";



class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            showerror: false,
            doneregister: false,
            error: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBluremail=this.handleBluremail.bind(this);
        this.handleBlurpassword=this.handleBlurpassword.bind(this);
    }
    handleChange = (name, value) => {
        this.setState({ [name]: value });
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
    handleSubmit = async (e) => {
        const { email, password } = this.state;
        if (this.validate(email, password)) {
            try {
                const { email, password } = this.state
                await axios.post(this.props.store.backendadress + "/user/registeruser", { email: email, password: password })
                    .then(res => {
                        console.log(res);
                        if (res) {
                            switch (res.data) {
                                case 200:
                                  
                                    this.errorshow(200);
                                    
                                    break;
                                case 204:
                                    this.errorshow("Użytkownik o takim emailu istnieje");

                                    break;
                                default: this.errorshow("Coś poszlo nie tak zprobuj za chwile");
                            }

                        }

                    })





            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    console.log(error.response.data.message);
                }
            }
        } else {
            this.setState({ error: "Uzupełnij dane do rejestracji " });
        }

    }



    render() {
        const { email, password, error, showerror, doneregister } = this.state;
        return (
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                        <h1>Witaj </h1>
                        <h1>z powrotem</h1>
                        <Link to="/registeruser">
                            <button type="button"
                                className={styles.white_btn}>
                                Zaloguj się
                            </button>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.form_container}
                        >
                            <h1>Zakładanie konta</h1>

                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                onBlur={(e) => { this.handleBluremail(e.target.value) }}
                                value={email}
                                required
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Hasło"
                                name="password"
                                onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                onBlur={(e) => { this.handleBlurpassword(e.target.value) }}
                                value={password}
                                required
                                className={styles.input}
                            />
                            
                            <button type="submit"
                                className={styles.green_btn}
                                onClick={this.handleSubmit}>
                                Zarejestruj się
                            </button>
                            {showerror && <div
                                className={doneregister ? styles.green : styles.error_msg}>{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Signup;