import React, { Component } from "react";
import axios from "axios";
import "./Myquater.css"





class Myquater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listquaters: [],
            listidburial: [],
            listburial: [],
            listexumation: [],
            exumationlist: [],
            ovnerhaveburialinquater: false,
            userhavequater: false,
            ovnerhaveburialexumation: false,
            ovnerdonthaveburialexumation:false

        }
        this.handlecheckexumation = this.handlecheckexumation.bind(this);



    }
    componentDidMount = () => {
        var { listquaters, listburial, listidburial } = this.state;
        axios.get(this.props.store.backendadress + '/ovnerrip/getdataovnerripburial', { params: { ovnerripid: localStorage.getItem("emailrip_app") } })
            .then(res => {
                //console.log(res.data);
                //console.log(typeof res.data);
                //console.log(res.data[0]);
                //console.log(Object.keys(res.data).length);
                if (Object.keys(res.data).length > 0) {
                    
                    for (let i = 0; i < Object.keys(res.data).length; i++) {
                        let numberburaial = 1;
                        // console.log(res.data[i].Burial.length);
                        if (res.data[i].Burial.length > 0) {
                            // console.log("warunek dla pochowku");
                            res.data[i].Burial.forEach(element => {
                                listidburial.push(element._id);
                                listburial.push(
                                    <div className="rowquater" key={element._id + "burial"}>
                                        <div className="columnone" key={i + "buriala"}>{numberburaial}</div>
                                        <div className="columnone" key={element._id + "buriala"}>{element.GraveQuartersnumber}</div>
                                        <div className="columntwo" key={element._id + "burialb"}>{element.Burialtype}</div>
                                        <div className="columnthree" key={element._id + "burialc"}>{element.Namedeceased}</div>
                                        <div className="columnfoure" key={element._id + "buriald"}>{element.LastNamedeceased}</div>
                                        <div className="columnfive" key={element._id + "buriale"}>{element.DateOfBirth.slice(0, 10).split("-").reverse().join("-")}</div>
                                        <div className="columnsix" key={element._id + "burialf"}>{element.DateOfDeath.slice(0, 10).split("-").reverse().join("-")}</div>
                                        <div className="columnseven" key={element._id + "burialg"}>{element.DateBurial.slice(0, 10).split("-").reverse().join("-")}</div>
                                    </div>
                                );
                                numberburaial++

                            });
                            this.setState({ ovnerhaveburialinquater: true })


                        } else {
                            console.log("warunek dla pochowku nie wszedl");
                        }


                        listquaters.push(
                            <div className="rowquater" key={i}>
                                <div className="columnone" key={i + "a"}>{res.data[i].IdGraveQuaters}</div>
                                <div className="columntwo" key={i + "b"}>{res.data[i].TypeOF}</div>
                                <div className="columnthree" key={i + "c"}>{res.data[i].DatePayment.slice(0, 10).split("-").reverse().join("-")}</div>
                                <div className="columnfoure" key={i + "d"}>{res.data[i].NumberTraditionalBurials}</div>
                                <div className="columnfive" key={i + "e"}>{res.data[i].NumberenableTraditionalBurials - res.data[i].NumberTraditionalBurials}</div>
                                <div className="columnsix" key={i + "f"}>{res.data[i].NumberUrnBurials}</div>
                                <div className="columnseven" key={i + "g"}>{res.data[i].NumberenableUrnBurials - res.data[i].NumberUrnBurials}</div>
                            </div>
                        )
                    }
                    this.setState({ userhavequater: true });
                }





            })
    }
    handlecheckexumation = () => {
        //wyswietlanie exumacji
        var { listidburial} = this.state;

        axios.get(this.props.store.backendadress + '/exhumation/getdataexhumationforclient', { params: { listidburial } })
            .then(res => {
                console.log(res);
                if (res.data[0] !== undefined) {
                    var list=[];
                    var changequater=false;
                    res.data.forEach(element => {
                        console.log(listidburial.indexOf(res.data[0].Burial));
                        
                        if(element.ChangeOfBurialPlace){changequater="Tak";}else{changequater="Nie";}
                       list.push(
                        <div className="rowquater" key={233}>
                                        <div className="columnoneexumation" key={element._id+234}>{listidburial.indexOf(element.Burial)+1}</div>
                                        <div className="columntwoexumation" key={element._id+235}>{element.PurposeExhumation}</div>
                                        <div className="columnthreeexumation" key={element._id+236}>{element.Scribe}</div>
                                        <div className="columnfoureexumation" key={element._id+237}>{changequater}</div>
                                        <div className="columnfiveexumation" key={element._id+238}>{element.DateExhumation.slice(0, 10).split("-").reverse().join("-")}</div>
                                        <div className="columnsixexumation" key={element._id+239}>{element.Datereburial.slice(0, 10).split("-").reverse().join("-")}</div>
                                       
                                    </div>
                       )
                      

                    })
                    this.setState({
                        exumationlist: list,
                        ovnerhaveburialexumation: true
                    });
                    document.getElementById("exumation").style.visibility="visible";
                }else if(res.status ===204) {
                   
                    this.setState({
                        
                        ovnerdonthaveburialexumation: true
                    });
                }


            })
    }


    render() {
        const { userhavequater, listquaters, listburial, ovnerhaveburialinquater, exumationlist, ovnerhaveburialexumation,ovnerdonthaveburialexumation } = this.state

        return (
            <div className="dataquater" key={201}>
                {userhavequater ?

                    [<div className="headerquater" key={210}>Twoje kwatery</div>,
                    <div className="tablequater" key={211}>
                        <div className="rowquater" key={212}>
                            <div className="columnone" key={213}>Numer Kwatery</div>
                            <div className="columntwo" key={214}>Typ grobu</div>
                            <div className="columnthree" key={215}>Opłacony do</div>
                            <div className="columnfoure" key={216}> Wykorzystane pochówki tradycyjne</div>
                            <div className="columnfive" key={217}> Pozostałe pochówki tradycyjne</div>
                            <div className="columnsix" key={218}> Wykorzystane pochówki urnowe</div>
                            <div className="columnseven" key={219}> Pozostałe pochówki urnowe</div>
                        </div>
                        {listquaters}
                    </div>,
                    ((ovnerhaveburialinquater) ? [
                        <div className="headerquater" key={220}>Pochówki w kwaterach</div>,
                        <div className="tablequater" key={221}>
                            <div className="rowquater" key={222}>
                                <div className="columnone" key={"223a"}>Nr</div>
                                <div className="columnone" key={223}>Numer Kwatery</div>
                                <div className="columntwo" key={214}>Rodzaj pochówku</div>
                                <div className="columnthree" key={225}>Imię zmarłego</div>
                                <div className="columnfoure" key={226}>Nazwisko zmarłego</div>
                                <div className="columnfive" key={227}> Data urodzenia</div>
                                <div className="columnsix" key={228}> Data śmierci</div>
                                <div className="columnseven" key={229}> Data pochówku</div>
                            </div>
                            {listburial}</div>
                        , <button className="exumationbutton" onClick={this.handlecheckexumation} key={230}>Sprawdz czy były dokonywane eksumacje</button>
                        ,<div>{ovnerdonthaveburialexumation ? <div className="ovnerdonthaveburialexumation" key={"ovnerdonthaveburialexumation"}>Pochówki nie posiadją eksumacji</div>:""}</div>
                        , <div id="exumation" className="exumation" key={231}>
                            
                            {ovnerhaveburialexumation ? [
                                <div className="tablequater" key={232}>
                                    <div className="rowquater" key={233}>
                                        <div className="columnoneexumation" key={234}>Nr pochowku kturego dotyczy eksumacja</div>
                                        <div className="columntwoexumation" key={235}>Cel eksumacji</div>
                                        <div className="columnthreeexumation" key={236}>Opis eksumacji</div>
                                        <div className="columnfoureexumation" key={237}>Czy zmieniono miejsce pochowku</div>
                                        <div className="columnfiveexumation" key={238}> Data eksumacji</div>
                                        <div className="columnsixexumation" key={239}> Data ponownego pochowku</div>
                                       
                                    </div>
                                    {exumationlist}</div>
                            ] : [<div key={241}>Sprawdź czy były dokonywane ekshumacje</div>]}
                            {ovnerdonthaveburialexumation ? <div className="rowquater" key={"ovnerdonthaveburialexumation"}>Pochówki nie posiadają ekshumacji</div>:""}
                             </div>

                    ] : [])




                    ] : [
                        <div key={202}>Nie posiadasz kwater przypisanych do swojego konta</div>
                    ]}
                {userhavequater ? [] : []}


            </div>
        )


    }

}

export default Myquater