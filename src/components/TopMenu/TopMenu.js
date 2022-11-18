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
            <div className="topmenuconteiner"key={1}>
                <div className="usersection"key={2}>

                    {islogin ?
                        [
                            <Link to="/mojekonto" key={3}>
                                <Avatar color={Avatar.getRandomColor('sitebase', ['#c5c5d5', '#acacb3', '#c5c5c5'])}
                                    name="Konto" size={60} round="30px"  key={4}/>
                            </Link>,
                            <button className="topmenubuttonlog" onClick={this.handleLogout} key={5}>Wyloguj się  </button>]
                        : [<button className="topmenubuttonlog" onClick={this.handleLogin} key={6}>Zaloguj się </button>]}
                </div>

             

                <div className="topmenurip" key={7}>
                    <Link to="/cmentarz" key={8}>
                        <div className="topmenubutton" key={9}>
                            Cmentarz
                        </div>
                    </Link>
                    {islogin ?
                    [
                        <Link to="/pochowek" key={10}>
                            <div className="topmenubutton" key={11}>
                                Pochówek
                            </div>
                        </Link>,

                        <Link to="/ekshumacja" key={12}>
                            <div className="topmenubutton"  key={13}>
                                Ekshumacja
                            </div>
                        </Link>,
                        <Link to="/platnoscikwatery" key={14}>
                            <div className="topmenubutton" key={15}>
                                Płatności kwatery
                            </div>
                        </Link>,

                       <><Link to="/intencja">
                            <div className="topmenubutton">
                                Intencja mszy
                            </div>
                        </Link><Link to="/kwatery">
                                <div className="topmenubutton">
                                    Kwatery
                                </div>
                            </Link></>

                        ]
                    : []}
                    <Link to="/anonse" key={16}>
                        <div className="topmenubutton" key={17} >
                            Ogłoszenia Parafialne
                        </div>
                    </Link>
                    <Link to="/kontakt" key={18}>
                        <div className="topmenubutton" key={19} >
                            Kontakt
                        </div>
                    </Link>
                    



                </div>
            </div>
        )
    }
}
export default TopMenu