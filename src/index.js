import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter,Routes, Route, Navigate  } from 'react-router-dom'
import { initialState } from "./reduser/store"
import Main from "./components/Main/Main"
import Signup from "./components/Singnup/Singnup"
import Login from "./components/Login/Login"
import Anonse from "./components/Anonse/Anonse"
import Myaccount from "./components/Myaccount/Myaccount"
import Graveyard from "./components/Graveyard/Graveyard"
import Kontakt from "./components/Contact/Contact"
import Intentions from "./components/Intentions/Intentions"
import Paymentsummary from './components/Paymentsummary/Paymentsummary'
import GraveQuarters from "./components/GraveQuarters/GraveQuarters"
import Payment from "./components/Payment/Payment"
import{user,id} from"./reduser/store"
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
                    <Routes>
                    <Route exact path="/"  element={<Main/>} />
                    <Route exact path="/login" element={<Login store={initialState}/>} />
                    <Route exact path="/signup" element={<Signup store={initialState}/>} />
                    <Route exact path="/anonse" element={<Anonse store={initialState}/>} />
                    <Route exact path="/kontakt" element={<Kontakt />} />
                    <Route exact path="/cmentarz" element={<Graveyard store={initialState}/>} />
                    {user && id && <Route path="/intencja"  element={<Intentions store={initialState} />} />}
                    {user && id && <Route path="/mojekonto"  element={<Myaccount store={initialState} />} />}
                    {user && id && <Route path="/paymentsummary"  element={<Paymentsummary store={initialState} />} />}
                    <Route exact path="*"  element={<Main/>} />
                    


    

                  </Routes>
           
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)