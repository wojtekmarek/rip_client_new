import { Route, Routes, Navigate } from "react-router-dom"
import Main from "./components/Main/Main"
import Signup from "./components/Singnup/Singnup"
import Login from "./components/Login/Login"
import Anonse from "./components/Anonse/Anonse"
import Myaccount from "./components/Myaccount/Myaccount"
function App() {
const user = localStorage.getItem("token")
const id=localStorage.getItem("id")
return (
<Routes>
<Route path="/" exact element={<Main />} />
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
<Route path="/anonse" element={<Anonse/>} />
{user && id &&<Route path="/mojekonto" exact element={<Myaccount/>} />}
<Route path="/mojekonto" element={<Navigate replace to="/login" />} />
</Routes>
)
}
export default App