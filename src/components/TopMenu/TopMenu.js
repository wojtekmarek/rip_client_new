import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./TopMenu.css";
import Avatar from 'react-avatar';





class TopMenu extends Component {
    state = {
        islogin: Boolean,
    }
    componentDidMount = () => {
        let log = localStorage.getItem("token");
        console.log(log)
        if (log !== null) {
            this.setState({ islogin: true })
        } else {
            this.setState({ islogin: false })
        }

    }
    handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("id")

        window.location = "/"
    }
    handleLogin = () => {

        window.location = "/login"
    }



    render() {
        const { islogin } = this.state

        return (
            <div className="topmenuconteiner">
                <div className="usersection">

                    {islogin ?
                        [
                            <Link to="/mojekonto">
                                <Avatar color={Avatar.getRandomColor('sitebase', ['#c5c5d5', '#acacb3', '#c5c5c5'])}
                                    name="Konto" size={60} round="30px" />
                            </Link>,
                            <button className="topmenubuttonlog" onClick={this.handleLogout}>Wyloguj się  </button>]
                        : [<button className="topmenubuttonlog" onClick={this.handleLogin}>Zaloguj się </button>]}
                </div>

             

                <div className="topmenurip">
                    <Link to="/cmentarz">
                        <div className="topmenubutton" >
                            Cmentarz
                        </div>
                    </Link>
                    {islogin ?
                    [
                        <Link to="/pochowek">
                            <div className="topmenubutton" >
                                Pochówek
                            </div>
                        </Link>,
                        <Link to="/ekshumacja">
                            <div className="topmenubutton" >
                                Ekshumacja
                            </div>
                        </Link>,
                        <Link to="/platnoscikwatery">
                            <div className="topmenubutton" >
                                Płatności kwatery
                            </div>
                        </Link>
                        ]
                    : []}
                    <Link to="/anonse">
                        <div className="topmenubutton" >
                            Ogłoszenia Parafialne
                        </div>
                    </Link>
                    <Link to="/kontakt">
                        <div className="topmenubutton" >
                            Kontakt
                        </div>
                    </Link>



                </div>
            </div>
        )
    }
}
export default TopMenu