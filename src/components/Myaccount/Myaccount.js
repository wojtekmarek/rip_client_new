import React, { Component } from "react";
import TopMenu from "../TopMenu/TopMenu";
import Myquater from "../Myquater/Myquater";
import Myintencion from "../Myintencion/Myintencion";
import "./Myaccount.css"
import Mydata from "../Mydata/Mydata";



class Myaccount extends Component {
    constructor(props) {
        super(props);
        this.changedata = React.createRef();
        this.state = {

            showgrave: false,
            showmydata: true,
            showmyintencion: false,
            alertchangshow: false,
            nrfield: 2

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleshowgrave = this.handleshowgrave.bind(this);
        this.handlemydata = this.handlemydata.bind(this);
        this.handlemyintencion = this.handlemyintencion.bind(this);



    }

    componentDidMount = () => {





    }
    handleshowgrave = () => {
        this.setState({
            showgrave: true,
            showmydata: false,
            showmyintencion: false,
            nrfield: 1

        });


    }
    cancelalert = () => {
        const { nrfield } = this.state;
        this.changedata.current.setState({ changedata: false });
        this.setState({alertchangshow:false});
        switch (nrfield) {
            case 1:
                this.handleshowgrave();
                break;
            case 2:
                this.handlemydata();
                break;
            case 3:
                this.handlemyintencion();
                break;
            default: console.log("Somthing wrong funcion cansel")
        }

    }


    handlemydata = () => {
        const { nrfield } = this.state;
        //console.log(this.changedata.current);


        // console.log(!this.changedata.current.state.changedata);
        if (nrfield === 2) {
            if (!this.changedata.current.state.changedata) {
                this.setState({
                    showgrave: false,
                    showmydata: true,
                    showmyintencion: false,
                    nrfield: 2
                });

            } else {
                this.setState({ alertchangshow: true });

            }
        } else {
            this.setState({
                showgrave: false,
                showmydata: true,
                showmyintencion: false,
                nrfield: 2
            });
        }

    }
    handlemyintencion = () => {

        this.setState({
            showgrave: false,
            showmydata: false,
            showmyintencion: true,
            nrfield: 3
        });

    }
    handleChange = (name, value) => {

        // console.log("zmiana");
        // console.log(value);
        // console.log(name);

        this.setState({ [name]: value });
    }

    render() {

        const { showgrave, showmydata, showmyintencion, alertchangshow } = this.state;
        const { store } = this.props;



        return (
            <div>
                <TopMenu key={76} />
                <div className="userdata" key={77}>
                    <div key={101} className="menuuser">
                        <button key={102} className="menuuserbutton" onClick={this.handleshowgrave}>Pokaż moje kwatery</button>
                        <button key={103} className="menuuserbutton" onClick={this.handlemydata}>Pokaż moje dane</button>
                        <button key={104} className="menuuserbutton" onClick={this.handlemyintencion}>Pokaż moje Intencje</button>

                    </div>
                    {showmydata ? [<Mydata key={"mydata"} store={store} ref={this.changedata} />] : []}
                    {(showgrave) ? [<Myquater key={200} store={store} email={"useremail"} />] : []}
                    {(showmyintencion) ? [<Myintencion key={300} store={store} email={"useremail"} />] : []}
                    {alertchangshow ? [
                        <div key="paymentnotyficacion" className="paymentnotyficacion">
                            <div key={"notyficatecodeelseheader"} className="notyficatecode204header">
                                W zakładce moje dane są nie zapisane zmiany.
                            </div>,
                            <div key={"notyficatecodeelsescribe"} className="notyficatecode204scribe" > By zachować zmiany wciśnij przycisk zapisz zmiany , by je anulować wciśnij przycisk anuluj.</div>,
                            <div key={"notyficatecodeelserowdisplay"} className="notyficatecode204rowdisplay">
                                <button key={"alertsavedate"} className="notyficatecode204paybuton"
                                    onClick={() => {
                                        this.changedata.current.savedate();
                                        this.cancelalert();
                                    }}>Zapisz zmiany</button>
                                <button key={"notyficatecodeelsecancel"} onClick={() => { this.cancelalert(); }} className="notyficatecode204paybuton" >Anuluj zmiany</button>
                            </div>
                        </div>
                    ] : []}
                </div>

            </div>
        )
    }
}
export default Myaccount