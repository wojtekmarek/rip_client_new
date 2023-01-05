import React, { Component } from "react";
import "./Mydata.css"
import axios from "axios";
import Loaderspiner from "../Loaderspiner/Loaderspiner";




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
            Peselfalse: false,
            HomeNumberfalse: false,
            HometwoNumberfalse: false,
            Streetfalse: false,
            cityfalse: false,
            userpasswordfalse: false,
            notyficacion: false,
            errorvalidate: false,
            sendingrequest: false,
            sendrequest: false,
            sendrequesterror: false,
            ovnerquater: false,
            fieldfalse: "",
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
                 console.log(res.data);
                const email = res.data.email;
                var statususer = res.data.status;
                console.log(statususer);
                this.setState({
                    useremail: email,
                    userpassword: res.data.password,
                    userstatus: statususer
                });

                if (statususer) {

                    console.log("pobracovnerripa"+email)
                    axios.get(this.props.store.backendadress + '/ovnerrip/getdataovnerrip', { params: { email: email } })
                        .then(res => {
                            console.log(res.data[0]);
                            if (res.data[0] !== undefined) {
                                let ovner = res.data[0];
                                 console.log(ovner);
                                this.setState({
                                    ovnerrip: ovner,
                                    ovnerquater: true
                                });
                            }


                        })


                }
            })
    }
    senddatatatosave= async()=>{
        const { ovnerrip, userpassword,userstatus,useremail } = this.state;
        var config={};
        if(!userstatus){
            
             config = {
                method: 'get',
                url: this.props.store.backendadress + '/userdb/saveuserdata',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    "email":useremail,
                    "password": userpassword,
                   
                }
             
            };
        }
        else{

        
         config = {
            method: 'get',
            url: this.props.store.backendadress + '/ovnerrip/saveovnerdata',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                "email":useremail,
                "password": userpassword,
                "HomeNumber": ovnerrip.HomeNumber,
               "HometwoNumber": ovnerrip.HometwoNumber,
               "Name": ovnerrip.Name,
               "LastName": ovnerrip.LastName,
                "Pesel": ovnerrip.Pesel,
              "Street": ovnerrip.Street,
               "city": ovnerrip.city,
               "Ovner_id": localStorage.getItem("id")
             
               
            }
         
        };
    }
        console.log(config);

        await axios(config)
            .then(async response => {
                alert("Zapisano zmiany");
                this.setState({changedata:false});
               
            })
    }
    savedate = async () => {
        //alert("is work");
        const { ovnerrip, userpassword,userstatus } = this.state;

        var fieldfalsetmp = [];
        var name = [];
        if(userstatus){
            name=[{
                key: "HomeNumber",
                string: "Numer Domu ",
                value: ovnerrip.HomeNumber
            },
            {
                key: "HometwoNumber",
                string: "Numer Mieszkania ",
                value: ovnerrip.HometwoNumber
            },
            {
                key: "Name",
                string: "Imię ",
                value: ovnerrip.Name
            },
            {
                key: "LastName",
                string: "Nazwisko ",
                value: ovnerrip.LastName
            },
            {
                key: "Pesel",
                string: "Pesel ",
                value: ovnerrip.Pesel
            },
            {
                key: "Street",
                string: "Ulica ",
                value: ovnerrip.Street
            },
            {
                key: "city",
                string: "Miasto ",
                value: ovnerrip.city
            },
            {
                key: "userpassword",
                string: "Hasło ",
                value: userpassword
            }]
        }else{
            name=[
                {
                    key: "userpassword",
                    string: "Hasło ",
                    value: userpassword
                } 
            ];
        }
       
        //list.push({ value: element._id, label: label })
        /*HomeNumber:HometwoNumber:LastName:Name:Pesel Street:city: email: ovner: _id: */
        return new Promise((resolve, reject) => {
            console.log(1);
            name.forEach(async element => {

                //console.log(element);
                //console.log(element.key);
                await this.validinput(element.key, element.value)
                    .then(rez => {
                        //console.log(2);
                        //console.log(rez);
                        if (!rez) {                //komunikat ustawić
                            this.alertfield(element.key);
                            fieldfalsetmp.push(element.string);
                        }
                    })
                resolve(true);
            })
        }).then(res => {
           // console.log(3);
            //console.log(fieldfalsetmp.length);
            if (fieldfalsetmp.length === 0) {
                //console.log(fieldfalsetmp);
                console.log("zapis");
                this.senddatatatosave();
            } else {
               // console.log(32);
                let todisplay = [];
                //console.log(typeof fieldfalsetmp);
                /* console.log(fieldfalsetmp.at(0));
                 fieldfalsetmp.forEach(element => {
                     console.log(element);
                 })*/

                if (fieldfalsetmp.length === 1) {
                    todisplay.push(<div key={"uniq1"}>Usupełnij poprawnie pole   {fieldfalsetmp.at(0)} </div>);
                } else {

                    todisplay.push(<div key={"uniq1"}>Usupełnij poprawnie pole   {fieldfalsetmp} </div>);
                }
                this.setState({ fieldfalse: todisplay });
                this.setState({ notyficacion: true, errorvalidate: true });
            }
        })


    }
    handleChange = (name, value) => {
        // console.log(value);
        // console.log(name);

        if (name !== "userpassword") {

            this.setState(prevState => ({ ovnerrip: { ...prevState.ovnerrip, [name]: value } }));

        } else {
            this.setState({ [name]: value });
        }

        this.setState({ changedata: true });

    }
    alertfield = (name) => {
        //console.log("zle uzupalnione pole " + name);
        this.setState({ [name + "false"]: true });

    }


    peselvalidator = (pesel) => {
        /*console.log(pesel);
        //pesel=toString(pesel);
        console.log(typeof pesel);
        console.log(pesel);
       console.log(typeof pesel);*/
        var dzien = parseInt(pesel.substring(4, 6), 10);
        var wagi = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        var suma = 0;

        for (var i = 0; i < wagi.length; i++) {
            suma += (parseInt(pesel.substring(i, i + 1), 10) * wagi[i]);
        }
        suma = 10 - (suma % 10);
        /*console.log(dzien);        
        console.log(suma);
        console.log(parseInt(pesel.substring(10, 11), 10));
        console.log(dzien!==0&&dzien<=31&&suma===parseInt(pesel.substring(10, 11), 10));
        console.log(dzien!==0);
        console.log(dzien<=31);
        console.log(suma===parseInt(pesel.substring(10, 11), 10));
        */
        if (dzien !== 0 && dzien <= 31 && suma === parseInt(pesel.substring(10, 11), 10)) {
            return true;
        } else {
            return false;
        }

    }
    handleBlur = async (name, value) => {
        //console.log("blur");

        await this.validinput(name, value)
            .then((rezult) => {
                //console.log("rezult");
                //console.log(rezult);

                if (!rezult) {
                    this.alertfield(name);
                } else {
                    this.setState({ [name + "false"]: false,
                notyficacion:false});
                }

            }).catch(console.log);




    }
    validinput = async (name, value) => {
        return new Promise((resolve, reject) => {

            switch (name) {
                case "Name":
                    let rexname = new RegExp('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$');
                    // console.log("check name");
                    resolve(rexname.test(value));
                    break;
                case "userpassword":
                    let rex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
                    resolve(rex.test(value));
                    break;
                case "HomeNumber":
                    let rexNumber = new RegExp('^[1-9]*(?:[ -]?(?:[a-zA-Z]+|[1-9]*))?$');
                    resolve(rexNumber.test(value));
                    break;
                case "HometwoNumber":
                    let rexNumbertwo = new RegExp('^[1-9]*(?:[ -]?(?:[a-zA-Z]+|[1-9]*))?$');
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
                    let rexStreet = new RegExp('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ ]+$');
                    resolve(rexStreet.test(value));
                    break;
                case "city":
                    let rexcity = new RegExp('^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]+$');
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
        const { useremail, userpassword, ovnerrip, userstatus, changedata, Namefalse, LastNamefalse, Peselfalse, HomeNumberfalse,
            HometwoNumberfalse, Streetfalse, cityfalse, userpasswordfalse, notyficacion, errorvalidate, sendingrequest, sendrequest, fieldfalse, sendrequesterror } = this.state;


        return (
            <div className="userdatafield" key={178}>
                <div key={"mydatadisplayinrow"} className="datadisplayrow">
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
                                    onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                                {LastNamefalse ? <div className="errorfield" key={"785error"}>Nazwisko musi składać się z liter</div> : ""}
                            </div>,
                            <div key={"782c"} className={"displeyrow"}>
                                <label className={"labeldata"} key={787} >Pesel:</label>
                                <input key={788} className={Peselfalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="Pesel" value={ovnerrip.Pesel || ''}
                                    onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                    onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                                {Peselfalse ? <div className="errorfield" key={"788error"}>Numer Pesel jest błedny</div> : ""}
                            </div>,
                        ] : ['']}

                    </div>
                    <div className="userdatacolumn" key={79}>
                        <div key={"791a"} className={"displeyrow"}>
                            <label className={"labeldata"} key={791}>Hasło:</label>
                            <input key={792} className={userpasswordfalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'}
                                value={userpassword || ''} name="userpassword" onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                            {userpasswordfalse ? <div className="errorfield" key={"791error"}>Hasło wymaga 8 znaków litery cyfy i znaku specjanego</div> : ""}
                        </div>
                        {userstatus ? [
                            <div key={"793a"} className={"displeyrow"}>
                                <label className={"labeldata"} key={793}>Ulica:</label>
                                <input key={794} className={Streetfalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="Street"
                                    value={ovnerrip.Street || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                    onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                                {Streetfalse ? <div className="errorfield" key={"794error"}>Nazwa ulicy jest błedna </div> : ""}
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
                                <input key={798} className={HometwoNumberfalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="HometwoNumber"
                                    value={ovnerrip.HometwoNumber || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                    onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                                {HometwoNumberfalse ? <div className="errorfield" key={"798error"}>Numer mieszkania jest błedny </div> : ""}
                            </div>,
                            <div key={"796a"} className={"displeyrow"}>
                                <label className={"labeldata"} key={799}>Miasto:</label>
                                <input key={7910} className={cityfalse ? ["inputdatamydata namefielderror"] : 'inputdatamydata'} name="city"
                                    value={ovnerrip.city || ''} onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                                    onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                                {cityfalse ? <div className="errorfield" key={"7910error"}>Nazwa miasta jest błedna </div> : ""}
                            </div>,

                        ] : [""]}

                    </div>



                </div>

                {changedata ? <button className={"buttonsavechange"} key={"butonsavechange"} onClick={() => { this.savedate() }}>Zapisz zmiany</button> : ""}
                {notyficacion ? <div key={"datasavenotyficacion"} className={"datasavenotyficacion"} >
                    {errorvalidate ? [<div key={"datasavenotyficacionerror"} className={"datasavenotyficacionerror"} >{fieldfalse}</div>] : []}
                    {sendingrequest ? <Loaderspiner key={"Loderspiner"} /> : ""}
                    {sendrequest ? [<div key={"datasavenotyficacionsave"} className={"datasavenotyficacione"} >Zapisano</div>] : []}
                    {sendrequesterror ? [<div key={"datasavenotyficacionsave"} className={"datasavenotyficacione"} >Bład poczas zapisu, spróbuj ponownie zapisać zmiany </div>] : []}
                </div> : ""}



            </div>
        )


    }

}

export default Mydata