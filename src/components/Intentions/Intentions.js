import TopMenu from "../TopMenu/TopMenu"
import React, { Component } from "react";
import "./Intentions.css"
import Select from 'react-select';
import axios from "axios";

class Intentions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intencionscribe: "",
            offering: -1,
            masslist: [],
            mass: String,
            massscribe: "",
            erroreez: "",
            errorofering: false,
            intencionrez: false,
            intencion: String,
            notyficacion: ""

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.validoffering = this.validoffering.bind(this);
    }
    componentDidMount = async () => {
        // sprawdzic czy zostala rospoczeta rezerwacja intencji 
        var check = localStorage.getItem("Intention");
        console.log(check);
        if (check == null) {
            var data = await (
                await fetch(this.props.store.backendadress + '/mass/availablemass')
            ).json();
            var list = [];
            data.forEach(element => {
                //console.log(element);
                let label = "Msza z dnia  " + element.Date_Of_even.slice(0, 10).split("-").reverse().join("-") + " godzina " + element.Date_Of_even.slice(11, 16);
                list.push({ value: element._id, label: label })

            });
            this.setState({ masslist: list });

        } else {
            // sprawdzic czy oplacona i dopiero przekierowac
            //window.location = "/paymentsummary"
            console.log("edit");

            var Payment_id = localStorage.getItem("Payment_id");
            var amount = localStorage.getItem("Amount");
            var mass = localStorage.getItem("Mass");
            var massscribe = localStorage.getItem("MassScribe");
            var textintens = localStorage.getItem("Textintens");
            if (Payment_id != null && amount != null && mass != null && massscribe != null && textintens != null) {

                massscribe = massscribe.replace("mszę", "Msza").replace("godzinę", "godzina");
                data = await (
                    await fetch(this.props.store.backendadress + '/mass/availablemass')
                ).json();
                list = [{ value: mass, label: massscribe }];
                data.forEach(element => {
                    //console.log(element);
                    let label = "Msza z dnia  " + element.Date_Of_even.slice(0, 10).split("-").reverse().join("-") + " godzina " + element.Date_Of_even.slice(11, 16);
                    list.push({ value: element._id, label: label })

                });
                this.setState({
                    intencion: check,
                    Payment_id: Payment_id,
                    offering: amount,
                    mass: mass,
                    massscribe: massscribe,
                    intencionscribe: textintens,
                    intencionrez: true,

                })
            }
        }


    }
    handleChange = (name, value) => {
        var { masslist } = this.state;
        // console.log("zmiana");
        // console.log(value);
        // console.log(name);

        this.setState({ [name]: value });
        if (name === "mass") {
            //console.log(value);
            // console.log(masslist);
            for (let i = 0; i < masslist.length; i++) {
                if (masslist[i].value === value) {  // console.log("in"+masslist[i]);
                    this.setState({ massscribe: masslist[i].label });
                    i = masslist.length;
                }
            }
        }
    };
    handleEdit = async () => {
        var { intencionscribe, offering, mass, massscribe, intencion } = this.state;
        //dopisac walidacje
        //alert("wyslij" + intencionscribe+offering+mass+ "   "+localStorage.getItem("id"));
        //console.log(this.props.store.backendadress);

        var config = {
            method: 'post',
            url: this.props.store.backendadress + '/inten/editintencion',
            headers: {
                'Content-Type': 'application/json'
            },

            data: {
                "Intencion": intencion,
                "Textintens": intencionscribe,
                "Mass": mass,
                "Amount": offering
            }
        };

        await axios(config)
            .then(async response => {
                if (response.status === 200) {
                    //edycja intencja

                    localStorage.setItem("Amount", offering);
                    localStorage.setItem("Mass", mass);
                    localStorage.setItem("MassScribe", massscribe);
                    localStorage.setItem("Textintens", intencionscribe);

                    window.location = "/paymentsummary"


                } else {

                }

            })

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
                    document.getElementById("notyfication").style.background = "#88e988";
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
    validoffering = (value) => {
        if (parseInt(value, 10) < 0) {
            this.setState({ errorofering: true });
            return false

        } else {
            this.setState({ errorofering: false });
            return true
        }
    }
    handleSubmit = async () => {
        var { intencionscribe, offering, mass, massscribe } = this.state;
        /*console.log(intencionscribe !== "");
        console.log(this.validoffering(offering));
        console.log(massscribe !== "");

        console.log(intencionscribe !== "" && this.validoffering(offering) && massscribe !== "");*/
        if (intencionscribe !== "" && this.validoffering(offering) && massscribe !== "") {
            console.log("poszło");
            var config = {
                method: 'post',
                url: this.props.store.backendadress + '/mass/checkavailableaddinstans',
                headers: {
                    'Content-Type': 'application/json'
                },

                data: {
                    "Paid_Off": false,
                    "Textintens": intencionscribe,
                    "Mass": mass,
                    "Ovner": localStorage.getItem("id"),
                    "Amount": offering
                }
            };

            await axios(config)
                .then(async response => {
                    if (response.data.Intention && response.data.Payment_id) {

                        localStorage.setItem("Payment_id", response.data.Payment_id);
                        localStorage.setItem("Intention", response.data.Intention);
                        localStorage.setItem("Amount", offering);
                        localStorage.setItem("Mass", mass);
                        localStorage.setItem("MassScribe", massscribe);
                        localStorage.setItem("Textintens", intencionscribe);

                        window.location = "/paymentsummary"

                    } else {
                        alert("Coś poszlo nie tak spróbuj ponownie za chwile")
                    }
                })
        } else {
            console.log("walidacja");
            document.getElementById("notyfication").style.background = "#e38989";
            document.getElementById("notyfication").style.visibility = "visible";
            this.setState({ notyficacion: "Wszystkie pola formularza muszą być uzupełnione" });
            setTimeout(() => {
                this.setState({ notyficacion: "" });
                document.getElementById("notyfication").style.background = "#e38989";

                document.getElementById("notyfication").style.visibility = "hidden";

            }, "3000");
        }

    }

    render() {



        const { masslist, erroreez, intencionrez, errorofering, offering, massscribe, notyficacion, intencionscribe } = this.state;

        return (



            <div>
                <TopMenu />
                <div className="kontent intecionkontent" >


                    <div key="headerformintencion" className="headerformintencion">Zgłoś Swoją intecję mszalną</div>
                    <label key="intencionformfield" className="intencionformfield">
                        Proponowany termin odprawienia Mszy
                        <Select
                            key="select"
                            className="basic-single widthselect"
                            classNamePrefix="select"
                            placeholder={intencionrez ? massscribe : "Wybierz"}
                            name="mass"
                            onChange={(e) => { this.handleChange("mass", e.value) }}
                            getOptionLabel={option => option.label}
                            getOptionValue={option => option.value}
                            options={masslist}
                        />

                    </label>
                    <label key="intencionformfieldtwo" className="intencionformfield">
                        Twoja intencja
                        <textarea
                            key="intencionscribe"
                            type="textarea"
                            name="intencionscribe"
                            className="intencionscribe"
                            placeholder={intencionrez ? "" : "Wpisz treść Swojęj intencji"}
                            value={intencionscribe || ''}
                            pattern=""
                            onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                            rows={5}
                            cols={5}
                        />

                    </label>

                    <label key="intencionformfieldthree" className="intencionformfield">
                        Zadeklaruj Ofiarę
                        <input
                            key="offering"
                            type="number"
                            name="offering"
                            id="offeringinput"
                            className="offeringinput"
                            placeholder={intencionrez ? offering : "100"}
                            pattern=""
                            onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}

                            onBlur={(e) => { this.validoffering(e.target.value) }}

                        />
                        {errorofering ? [<div key="erroroffering" className="errorofering">Ofiara nie moze być mniejsza niż zero</div>] : ""}
                    </label>
                    {(!intencionrez) ? [
                        <button key="intencionbuttonsubmit" className="intencionbutton" onClick={this.handleSubmit}>Zgłoś swoją intencję i dokonaj ofiary</button>
                        , (erroreez !== "") ? <div key="errormesage" className="errormesage">erroreez</div> : ""


                    ] : [

                        <button key="intencionbuttonedit" className="intencionbutton " onClick={this.handleEdit}> Edytuj swoją intencję i dokonaj ofiary</button>
                        , <button key="intencionbuttoncancel" className="intencionbutton " onClick={this.handleCancel}>Chce anulować zgłaszanie intencji </button>
                    ]}
                    <div key="notyfication" id="notyfication" className="notyfication">{notyficacion}</div>

                </div>

            </div>
        )
    }
}



export default Intentions;