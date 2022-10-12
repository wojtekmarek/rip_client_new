import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import {Alert } from "react";
import styles from "./styles.module.css";
import serverurl from "../../reduser/store";
import React from "react";

const Signup = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    })
    

    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
         setData({ ...data, [input.name]: input.value })
    }
   /* const createTwoButtonAlert = () =>{
        Alert.alert(
            //res.message,
            "dodac resmesage", 
           
            [
             
              { text: "OK", onPress: () => navigate("/login")
              }
            ]);
    }*/
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = serverurl.backendadress+"/registeruser"
            const { data: res } = await axios.post(url, data)
            if(res){
                if(res.status=200){
                    navigate("/login");
                }else alert("Coś poszlo nie tak zprobuj za chwile")

            }
            
            //createTwoButtonAlert();
    
            
        } catch (error) {
                if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
                ) {
                setError(error.response.data.message)
                }
        }
}
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
            <form className={styles.form_container}
                onSubmit={handleSubmit}>
                <h1>Zakładanie konta</h1>
            
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={data.email}
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    placeholder="Hasło"
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    required
                    className={styles.input}
                />
                {error && <div
                    className={styles.error_msg}>{error}</div>}
                <button type="submit"
                    className={styles.green_btn}>
                    Zarejestruj się
                </button>
            </form>
        </div>
        </div>
    </div>
    );
    };
export default Signup