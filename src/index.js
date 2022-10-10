import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import{initialState} from "./reduser/store"
ReactDOM.render(
 <React.StrictMode>
 <BrowserRouter>
 <App store={initialState} />
 </BrowserRouter>
 </React.StrictMode>,
 document.getElementById('root')
)