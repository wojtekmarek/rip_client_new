import TopMenu from "../TopMenu/TopMenu"
import React, { Component } from "react";
import "./styles.css"
import { Link } from "react-router-dom";

class Burial extends Component {
    state = {

    }

    componentDidMount = () => {




    }



    render() {



        return (
            <div>
                <TopMenu />
                <div className="kontent">
                    <h3>Lista dostępnych pochówków</h3>
                    <div className="columnContent">
                    <div className="actions">
                    <button id="lista" className="primaryButton">Dodaj nowy pochówek</button>
                    </div>

                    <div className="searcher">
                        <input type="text"></input>
                        <button id="lista" className="primaryButton">Wyszukaj pochówek</button>

                    </div>
                    </div>
                    <Link to="/ekshumacja">
                            <div className="insidebutton" >
                                Ekshumacja
                            </div>
                        </Link>,
                        <Link to="/platnoscikwatery">
                            <div className="insidebutton" >
                                Płatności kwatery
                            </div>
                        </Link>
                </div>

                

            </div>
        )
    }
}



export default Burial