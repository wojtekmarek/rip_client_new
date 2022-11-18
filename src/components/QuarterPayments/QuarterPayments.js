import TopMenu from "../TopMenu/TopMenu"
import React, { Component } from "react";
import "./styles.css"
import { string } from "prop-types";
import { int } from "prop-types";

class QuarterPayments extends Component {
    state = {
        useremail: string,
        balance: int,
        lightservice: Boolean,
        cleanservice: Boolean
    }

    componentDidMount = () => {




    }



    render() {

        const { useremail, balance, lightservice, cleanservice } = this.state;

        return (
            <div>
                <TopMenu />

                <div className="userdata">


                    <div className="saldo">
                        <center>Saldo: 17 504 zł</center>
                    </div>



                </div>

                <div className="userdata">
                    <div className="divtabela">
                        <table className="tabela"><thead><tr><th>Login<br></br></th><th>Imię<br></br></th><th>Nazwisko</th><th>Płatność</th></tr></thead><tbody><tr><td>Zosssss92</td><td>Zofia</td><td>Piórkowska</td><td>+150zł</td></tr><tr><td>Kuuuddsss</td><td>Katarzyna</td><td>Ostrowska</td><td>+50zł</td></tr><tr><td>Ostry</td><td>Piotr</td><td>Kwaśny</td><td>+99zł</td></tr></tbody></table>

                    </div>
                </div>


            </div>
        )
    }
}



export default QuarterPayments