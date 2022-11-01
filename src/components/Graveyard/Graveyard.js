import TopMenu from "../TopMenu/TopMenu"
import React, { Component } from "react";
import "./styles.css"
import RipMap from "../RipMap/RipMap";

class Graveyard extends Component {
    state = {

    }

    componentDidMount = () => {




    }



    render() {
/* tabela maks cmentarza do usuniecia lub poprawy 

<div className="kontent" key={1}>
                    <table className="graveyard-map" key={15}>
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
*/


        return (
            <div>
                <TopMenu key={0}/>
                
                <div className="kontent" key={2}>
                    <RipMap key={3}/>
                </div>
            </div>
        )
    }
}



export default Graveyard