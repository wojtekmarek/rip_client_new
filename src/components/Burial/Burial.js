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
                <h2><i><center>Jaką czynność chcesz wykonać?</center></i></h2>

                

            </div>
        )
    }
}



export default Burial