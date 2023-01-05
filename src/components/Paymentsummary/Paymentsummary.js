import TopMenu from "../TopMenu/TopMenu"
import React, { Component } from "react";
import "./paymentsummary.css"
import axios from "axios";

class Paymentsummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intencion: String,
            Payment_id: String,
            amount: Number,
            mass: String,
            massscribe: String,
            textintens: String,
            notyficacion: ""
        }
        this.handleOrder = this.handleOrder.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }
    //ReactDOM.render()
    componentDidMount = async () => {

        var intencion = localStorage.getItem("Intention");
        var Payment_id = localStorage.getItem("Payment_id");
        var amount = localStorage.getItem("Amount");
        var mass = localStorage.getItem("Mass");
        var massscribe = localStorage.getItem("MassScribe").replace("Msza", "mszę").replace("godzina", "godzinę");
        var textintens = localStorage.getItem("Textintens");
        if (intencion != null && Payment_id != null && amount != null && mass != null && massscribe != null && textintens != null) {
            this.setState({
                intencion: intencion,
                Payment_id: Payment_id,
                amount: amount,
                mass: mass,
                massscribe: massscribe,
                textintens: textintens
            })
        }
    }
    handleEdit = async () => {
        window.location="/intencja";
    }
    handleCancel = async () => {
        var { mass, intencion, Payment_id } = this.state;
        //dodać potwierdzenie
        var config = {
            method: 'post',
            url: this.props.store.backendadress + '/inten/cancel',
            headers: {
                'Content-Type': 'application/json'
            },

            data: {
                "Payment_id": Payment_id,
                "Intencion_id": intencion,
                "Mass": mass

            }
        };
        // console.log(config.data);

        await axios(config)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ notyficacion: response.data });
                    document.getElementById("notyfication").style.background ="#88e988";
                    document.getElementById("notyfication").style.visibility = "visible";
                    console.log(response.data);
                    localStorage.removeItem("Payment_id");
                    localStorage.removeItem("Intention");
                    localStorage.removeItem("Amount");
                    localStorage.removeItem("Mass");
                    localStorage.removeItem("MassScribe");
                    localStorage.removeItem("Textintens");
                    setTimeout(() => {
                        console.log("Delayed for 1 second.");
                        window.location = "/";
                    }, 2000)


                } else {
                    document.getElementById("notyfication").style.background = "#e38989";
                    document.getElementById("notyfication").style.visibility = "visible";
                    this.setState({ notyficacion: "Coś poszło spróbuj za chwile." + response.data + "Jeżeli się nie uda skontaktuj sie z administartorem aplikacji" });
                }


            })
    }
    handleOrder = async () => {

        var { amount, Payment_id } = this.state;
        var User_id = localStorage.getItem("id");


        var config = {
            method: 'post',
            url: this.props.store.backendadress + '/payment/paypaymant',
            headers: {
                'Content-Type': 'application/json'
            },

            data: {
                "Payment_id": Payment_id,
                "User_id": User_id,
                "Amount": amount
            }
        };
        console.log(config.data);

        await axios(config)
            .then(response => {
                //console.log(response.data);
                localStorage.removeItem("Amount");
                localStorage.removeItem("Mass");
                localStorage.removeItem("MassScribe");
                localStorage.removeItem("Textintens");
                window.location = response.data;

            })
    }
    render() {
        var { amount, massscribe, textintens, notyficacion } = this.state
        return (
            <>
                <TopMenu />
                <div className="kontentpaymentsummary" >
                    <div className="headersummary">Podsumowanie zgłaszanej intencji</div>
                    <div className="fieldsummary">Intencja zamawiana na {massscribe}</div>
                    <div className="fieldsummary">Treść Twojej intencji: {textintens}</div>
                    <div className="fieldsummary">Twoja ofiara:{amount}zł.</div>
                    <button className="intencionbutton " onClick={this.handleOrder}>Zgłoś swoją intencję i dokonaj ofiary</button>
                    <button className="intencionbutton " onClick={this.handleEdit}>Edytuj swoją intencję</button>
                    <button className="intencionbutton " onClick={this.handleCancel}>Anuluj zgłaszanie swojej intencji</button>
                    <div id="notyfication" className="notyfication">{notyficacion}</div>
                </div>
            </>

        )

    }

}
export default Paymentsummary