import React, { Component } from "react";
import "./Myintencion.css"
import axios from "axios";
import { Link } from "react-router-dom";





class Myintencion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listintension: [],
            listintensionjson: [],
            clienthaveintecion: false,
            paymentnotyficacion: false,
            notyficatecode204: false,
            notyficatecode205: false
        }
        this.handlepayforintencion = this.handlepayforintencion.bind(this);
        this.payforintecion = this.payforintecion.bind(this);
        this.cancel = this.cancel.bind(this)


    }

    componentDidMount = () => {
        axios.get(this.props.store.backendadress + '/inten/myintecion', { params: { Ovner: localStorage.getItem("id") } })
            .then(res => {
                if (res.data[0] !== undefined) {
                    let list = [];
                    console.log(res.data)
                    res.data.forEach(element => {
                        //console.log(element.massdate[0].Date_Of_even);
                        let date = element.massdate[0].Date_Of_even.slice(0, 10).split("-").reverse().join("-");
                        let time = element.massdate[0].Date_Of_even.slice(11, 16);
                        let pay = "";
                        let akcepted = "";


                        if (element.Accepted) {
                            akcepted = "Zakceptowana"
                        } else {
                            akcepted = "Nie zaakceptowana"

                        }
                        if (element.Paid_Off) {
                            pay = "Opłacona"
                        } else {
                            pay = "Nie opłacona"

                        }

                        list.push(
                            <div className="inteciondate" key={element._id + "date"}><span className="intecionspan">Data Mszy:</span> {date}</div>,
                            <div className="inteciontime" key={element._id + "time"}><span className="intecionspan">Godzina Mszy:</span>{time}</div>,
                            <div className="intecionscribe" key={element._id + "scribe"}><span className="intecionspan">Treść twojej intencji:</span>{element.Textintens}</div>,
                            <div className="intecionakcept" key={element._id + "akcepted"}><span className="intecionspan">Czy została zaakceptowana:</span> {akcepted}</div>,
                            <div className="intecionpayment" key={element._id + "payment"}><span className="intecionspan">Status płatności:</span> {pay}</div>,

                        )
                        if (!element.Paid_Off) {
                            list.push(
                                <button className="buttonorderinencion" onClick={() => { this.handlepayforintencion(element._id) }} key={element._id + 999}>Dokonaj ofiary za intencje</button>
                            )
                        }
                        this.setState({
                            listintension: list,
                            listintensionjson: res.data,
                            clienthaveintecion: true
                        })

                    });
                }

            }
            )
    }
    payforintecion = (id) => {
        const { listintensionjson } = this.state;
        var index = listintensionjson.findIndex(object => {
            return object._id === id;
        })
        //console.log(index);
        let massscribe = "Msza z dnia  " + listintensionjson[index].massdate[0].Date_Of_even.slice(0, 10).split("-").reverse().join("-") + " godzina " + listintensionjson[index].massdate[0].Date_Of_even.slice(11, 16);


        localStorage.setItem("Mass", listintensionjson[index].Mass);
        localStorage.setItem("MassScribe", massscribe);
        localStorage.setItem("Textintens", listintensionjson[index].Textintens);
        window.location = "/paymentsummary"
    }
    cancel = (e) => {
        switch (e) {
            case "notyficatecode204":
                console.log(204);
                this.setState({
                    paymentnotyficacion: false,
                    notyficatecode204: false,
                });
                break;
            case "notyficatecode205":
                console.log(205);
                this.setState({
                    paymentnotyficacion: false,
                    notyficatecode205: false,
                });
                break;
            default: { 
                console.log(500);
                this.setState({
                    paymentnotyficacion: false,
                    notyficatecode205: false,
                    notyficatecode204: false,
                });
            }
               
        }

    }
    handlepayforintencion = (id) => {

        //get payment and save i local
        console.log(id);
        axios.get(this.props.store.backendadress + '/payment/checkpaymentid', { params: { Intention: id } })
            .then(res => {
                console.log(res.data);
                switch (res.status) {
                    case 200:
                        localStorage.setItem("Intention", id);
                        localStorage.setItem("Payment_id", res.data._id);
                        localStorage.setItem("Amount", res.data.Amount);
                        this.payforintecion(id);
                        this.setState({ paymentnotyficacion: true,notyficatecode205: true });
                        break;
                    case 204:
                        //platnosć anulowana 
                        localStorage.setItem("Intention", id);
                        localStorage.setItem("Payment_id", res.data._id);
                        localStorage.setItem("Amount", res.data.Amount);
                        this.setState({  paymentnotyficacion: true,notyficatecode204: true });
                        break;
                    case 205:

                        break;
                    default: this.setState({  paymentnotyficacion: true,});
                }
            })
    }

    render() {
        const { clienthaveintecion, listintension, paymentnotyficacion, notyficatecode204, notyficatecode205 } = this.state;

        return (
            <div key={301}>
                {clienthaveintecion ? [<div className="intencionconteiner" key={305}>{listintension}</div>] : [<div className="nullintecion" key={302}>
                    <div className="scribenullintecion" >Nie posiadasz żadnych intencji </div>
                    <Link to="/intencja" className="buttonorderinencion" key={304}>
                        Klikni by zamówić intencje mszalną
                    </Link></div>]}
                {paymentnotyficacion ? [
                    <div key="paymentnotyficacion" className="paymentnotyficacion">

                        {notyficatecode204 ? [
                            <div key={"notyficatecode204header"} className="notyficatecode204header">
                                Płatność za intencje jest anulowana.
                            </div>,
                            <div key={"notyficatecode204scribe"} className="notyficatecode204scribe" > Jeżeli chcesz jeszcze raz dokonać ofiary kliknij w przycisk dokonaj ofiary znajdujący
                                się poniżej. Pamietaj instncja anulowana nie zostanie odczytana</div>,
                            <div key={"notyficatecode204rowdisplay"} className="notyficatecode204rowdisplay">
                                <button key={"notyficatecode204paybuton"} className="notyficatecode204paybuton" onClick={() => { this.payforintecion() }}>Dokonaj ofiary</button>,
                                <button key={"notyficatecode204cancel"} className="notyficatecode204paybuton" onClick={() => { this.cancel("notyficatecode204") }}>Powróć do kokpitu</button>  </div>

                        ] : []}
                        {notyficatecode205 ? [
                            <div key={"notyficatecode205header"} className="notyficatecode204header">
                                Intencja opłacona.
                            </div>,
                            <div key={"notyficatecode205scribe"} className="notyficatecode204scribe" > Intencja opłacona, jes status zostanie zmieniony automatycznie.</div>,
                            <div key={"notyficatecode205rowdisplay"} className="notyficatecode204rowdisplay">

                                <button key={"notyficatecode205cancel"} className="notyficatecode204paybuton" onClick={() => { this.cancel("notyficatecode205") }}>Powróć do kokpitu</button>  </div>

                        ] : [
                            <div key={"notyficatecodeelseheader"} className="notyficatecode204header">
                                Nieznany bład.
                            </div>,
                            <div key={"notyficatecodeelsescribe"} className="notyficatecode204scribe" > Coś poszło nie tak sprubój za chwile jeszcze raz.</div>,
                            <div key={"notyficatecodeelserowdisplay"} className="notyficatecode204rowdisplay">

                                <button key={"notyficatecodeelsecancel"} className="notyficatecode204paybuton" onClick={() => { this.cancel("") }}>Powróć do kokpitu</button>  </div>

  
                        ]}
                    </div>
                ] : []}


            </div>
        )


    }

}

export default Myintencion