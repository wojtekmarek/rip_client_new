
import React from 'react'
import { Router, Route, Navigate  } from 'react-router'
import Main from "./components/Main/Main"
import Signup from "./components/Singnup/Singnup"
import Login from "./components/Login/Login"
import Anonse from "./components/Anonse/Anonse"
import Myaccount from "./components/Myaccount/Myaccount"
import Graveyard from "./components/Graveyard/Graveyard"
import Burial from "./components/Burial/Burial"
import Exhumation from "./components/Exhumation/Exhumation"
import QuarterPayments from "./components/QuarterPayments/QuarterPayments"
import Kontakt from "./components/Contact/Contact"
import Intentions from "./components/Intentions/Intentions"
import GraveQuarters from "./components/GraveQuarters/GraveQuarters"
import Order from "./components/Order/Order"
import Payment from "./components/Payment/Payment"



export default function App() {
    const user = localStorage.getItem("token")
    const id = localStorage.getItem("id")
    return (
        
            <Router>
                <Route exact path="/login" element={<Login/>} />      
                <Route exact path="/anonse" element={<Anonse />} />
                <Route exact path="/"  element={<Main/>} />
                <Route exact path="/signup" element={<Signup />} />
                          
                <Route exact path="/kontakt" element={<Kontakt />} />
                <Route exact path="/cmentarz" element={<Graveyard />} />
                {user && id && <Route exact path="/mojekonto" element={<Myaccount />} />}
                <Route exact path="/mojekonto" element={<Navigate replace to="/login" />} />
                {user && id && <Route path="/pochowek"  element={<Burial />} />}
                {user && id && <Route path="/order"  element={<Order />} />}
                {user && id && <Route path="/ekshumacja"  element={<Exhumation />} />}
                {user && id && <Route path="/intencja"  element={<Intentions />} />}
                {user && id && <Route path="/kwatery"  element={<GraveQuarters />} />}
                {user && id && <Route path="/platnosci"  element={<Payment />} />}
                {user && id && <Route path="/platnoscikwatery" element={<QuarterPayments />} />}
            
        

    </Router>
       
        
    );
}

