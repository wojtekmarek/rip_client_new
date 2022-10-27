import TopMenu from "../TopMenu/TopMenu"
import React, { Component } from "react";
import "./styles.css"

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
                </div>



            </div>
        )
    }
}



export default Burial