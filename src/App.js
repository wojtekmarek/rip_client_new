import { Route, Routes, Navigate } from "react-router-dom"
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

function App() {
const user = localStorage.getItem("token")
const id=localStorage.getItem("id")
return (
<Routes>
<Route path="/" exact element={<Main />} />
<Route path="/signup" exact element={<Signup />} />
<Route path="/login" exact element={<Login />} />
<Route path="/anonse" element={<Anonse/>} />
<Route path="/kontakt" element={<Kontakt/>} />
<Route path="/cmentarz" element={<Graveyard/>} />
{user && id &&<Route path="/mojekonto" exact element={<Myaccount/>} />}
<Route path="/mojekonto" element={<Navigate replace to="/login" />} />
{user && id &&<Route path="/pochowek" exact element={<Burial/>} />}
{user && id &&<Route path="/order" exact element={<Order/>} />}
{user && id &&<Route path="/ekshumacja" exact element={<Exhumation/>} />}
{user && id &&<Route path="/intencja" exact element={<Intentions/>} />}
{user && id &&<Route path="/kwatery" exact element={<GraveQuarters/>} />}
{user && id &&<Route path="/platnoscikwatery" exact element={<QuarterPayments/>} />}
</Routes>
)
}
export default App