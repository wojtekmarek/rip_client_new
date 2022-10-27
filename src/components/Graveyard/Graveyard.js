import TopMenu from "../TopMenu/TopMenu"
import React, { Component } from "react";
import "./styles.css"

class Graveyard extends Component {
    state = {

    }

    componentDidMount = () => {




    }



    render() {



        return (
            <div>
                <TopMenu />
                <div className="kontent">
                    <table className="graveyard-map">
                        <tr>
                            <td>A1</td>
                            <td>B1</td>
                            <td>C1</td>
                        </tr>
                        <tr>
                            <td>A2</td>
                            <td>B2</td>
                            <td>C2</td>
                        </tr>
                        <tr>
                            <td>A3</td>
                            <td>B3</td>
                            <td>C3</td>
                        </tr>
                        <tr>
                            <td>A4</td>
                            <td>B4</td>
                            <td>C4</td>
                        </tr>
                        <tr>
                            <td>A5</td>
                            <td>B5</td>
                            <td>C5</td>
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}



export default Graveyard