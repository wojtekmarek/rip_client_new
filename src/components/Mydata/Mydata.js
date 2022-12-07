import React, { Component } from "react";
import "./Mydata.css"
import axios from "axios";


class Mydata extends Component {
    constructor(props) {
        super(props);

        this.state = {
            useremail: localStorage.getItem("emailrip_app"),
            userpassword: "",
            userstatus: false,
            changedata: false,
            Namefalse: false,
            LastNamefalse: false,
            Peselfalse:false,
            HomeNumberfalse:false,
            ovnerrip: {
                HomeNumber: 0,
                HometwoNumber: 0,
                LastName: "",
                Name: "",
                Pesel: 0,
                Street: "",
                city: "",
                email: "",
                ovner: "",
                _id: ""
            },
        }



    }

    componentDidMount = () => {

        axios.get(this.props.store.backendadress + '/userdb/userdata', { params: { id: localStorage.getItem('id') } })
            .then(res => {
                //   console.log(res.data);
                const email = res.data.email;
                const statususer = res.data.status;
                //console.log(statususer);
                this.setState({
                    useremail: email,
                    userpassword: res.data.password,
                    userstatus: statususer
                });

                if (statususer) {

                    //console.log("pobracovnerripa"+email)
                    axios.get(this.props.store.backendadress + '/ovnerrip/getdataovnerrip', { params: { email: email } })
                        .then(res => {
                            // console.log(res.data);

                            let ovner = res.data[0];
                            // console.log(ovner);
                            this.setState({ ovnerrip: ovner });

                        })


                }
            })
    }
    savedate = () => {
        alert("is work");
    }
    handleChange = (name, value) => {
        // console.log(value);
        console.log(name);

        if (name !== "userpassword") {

            this.setState(prevState => ({ ovnerrip: { ...prevState.ovnerrip, [name]: value } }));

        } else {
            this.setState({ [name]: value });
        }


    }
    alertfield = (name) => {
        alert("zle uzupalnione pole " + name);
        this.setState({ [name + "false"]: true });

    }
    peselvalidator=(pesel)=>{
        console.log(typeof pesel);
        console.log(pesel);
         var dzien = parseInt(pesel.substring(4, 6), 10);
         var wagi = [1, 3,7, 9, 1, 3, 7, 9, 1,3];
         var suma = 0;
       
         for (var i = 0; i < wagi.length; i++) {
           suma += (parseInt(pesel.substring(i, i + 1), 10) * wagi[i]);
         }
         suma = 10-(suma % 10);

         /*console.log(dzien);        
         console.log(suma);
         console.log(parseInt(pesel.substring(10, 11), 10));
         console.log(dzien!==0&&dzien<=31&&suma===parseInt(pesel.substring(10, 11), 10));
         console.log(dzien!==0);
         console.log(dzien<=31);
         console.log(suma===parseInt(pesel.substring(10, 11), 10));
         */
         if(dzien!==0&&dzien<=31&&suma===parseInt(pesel.substring(10, 11), 10))
         {
            return true;
         }else{
            return false;
         }
        
    }
    handleBlur = async (name, value) => {
        console.log("blur");

        await this.validinput(name, value)
            .then((rezult) => {
                //console.log("rezult");
                //console.log(rezult);

                if (!rezult) {
                    this.alertfield(name);
                } else {
                    this.setState({ [name + "false"]: false });
                }

            }).catch(console.log);




    }
    validinput = async (name, value) => {
        return new Promise((resolve, reject) => {

            switch (name) {
                case "Name":
                    let rexname = new RegExp('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$');
                    console.log("check name");
                    resolve(rexname.test(value));
                    break;
                case "userpassword":
                    let rex = new RegExp('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$');
                    resolve(rex.test(value));
                    break;
                case "HomeNumber":
                    let rexNumber = new RegExp('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$');
                    resolve(rexNumber.test(value));
                    break;
                case "HometwoNumber":
                    let rexNumbertwo = new RegExp('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$');
                    resolve(rexNumbertwo.test(value));
                    break;
                case "LastName":
                    let rexLastName = new RegExp('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$');
                    resolve(rexLastName.test(value));
                    break;
                case "Pesel":
                    
                    resolve(this.peselvalidator(value));
                    break;
                case "Street":
                    let rexStreet = new RegExp('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$');
                    resolve(rexStreet.test(value));
                    break;
                case "city":
                    let rexcity = new RegExp('^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$');
                    resolve(rexcity.test(value));
                    break;
                default: {
                    console.log("Something wrong switch validataor");
                    resolve(false);
                }

            }

        });

    }


    render() {
        const { useremail, userpassword, ovnerrip, userstatus, changedata, Namefalse, LastNamefalse,Peselfalse,HomeNumberfalse} = this.state;


        return (
            <div className="userdatafield" key={178}>
                <div className="userdatacolumn" key={78}>
                    <div key={"781a"} className={"displeyrow"}>
                        <label className={"labeldata"} key={781}>Email:</label>
                        <input key={782} className="inputdatamydata" disabled="disabled" value={useremail} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }} />
                    </div>
                    {userstatus ? [
                        <div key={"782a"} className={"displeyrow"}>
                            <label className={"labeldata"} key={783}>Imię:</label>
                            <input key={784}
                                className={Namefalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="Name"
                                value={ovnerrip.Name || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                            {Namefalse ? <div className="errorfield" key={"784error"}>Imie musi składać się z  liter</div> : ""}
                        </div>,
                        <div key={"782b"} className={"displeyrow"}>
                            <label className={"labeldata"} key={785}>Nazwisko:</label>
                            <input key={786} className={LastNamefalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="LastName" 
                            value={ovnerrip.LastName || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }} 
                            onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }}/>
                            {LastNamefalse ? <div className="errorfield" key={"785error"}>Nazwisko musi składać się z liter</div> : ""}
                        </div>,
                        <div key={"782c"} className={"displeyrow"}>
                            <label className={"labeldata"} key={787} >Pesel:</label>
                            <input key={788} className={Peselfalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="Pesel" value={ovnerrip.Pesel || ''} 
                            onChange={(e) => { this.handleChange(e.target.name, e.target.value) }} 
                            onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }}/>
                            {Peselfalse ? <div className="errorfield" key={"788error"}>Numer Pesel jest błedny</div> : ""}
                        </div>,
                    ] : ['']}

                </div>
                <div className="userdatacolumn" key={79}>
                    <div key={"791a"} className={"displeyrow"}>
                        <label className={"labeldata"} key={791}>Hasło:</label>
                        <input key={792} className="inputdatamydata" value={userpassword || ''} name="userpassword" onChange={(e) => { this.handleChange(e.target.name, e.target.value) }} />
                    </div>
                    {userstatus ? [
                        <div key={"793a"} className={"displeyrow"}>
                            <label className={"labeldata"} key={793}>Ulica:</label>
                            <input key={794} className="inputdatamydata" name="Street" value={ovnerrip.Street || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }} />
                        </div>,
                        <div key={"794a"} className={"displeyrow"}>
                            <label className={"labeldata"} key={795}>Nr domu:</label>
                            <input key={796} className={HomeNumberfalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="HomeNumber" 
                            value={ovnerrip.HomeNumber || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                            onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                            {HomeNumberfalse ? <div className="errorfield" key={"788error"}>Numer domu jest błedny </div> : ""}
                        </div>,
                        <div key={"795a"} className={"displeyrow"}>
                            <label className={"labeldata"} key={797}>Nr mieszkania:</label>
                            <input key={798} className="inputdatamydata" name="HometwoNumber" value={ovnerrip.HometwoNumber || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }} />
                        </div>,
                        <div key={"796a"} className={"displeyrow"}>
                            <label className={"labeldata"} key={799}>Miasto:</label>
                            <input key={7910} className="inputdatamydata" name="city" value={ovnerrip.city || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }} />
                        </div>,

                    ] : [""]}
                    {changedata ? <button className={"buttonsavechange"} key={"butonsavechange"}>Zapisz zmiany</button> : ""}
                </div>





            </div>
        )


    }

}

export default Mydata