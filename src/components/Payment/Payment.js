import React, { Component } from "react";
import "./Payment.css";
import TopMenu from "../TopMenu/TopMenu";
import Loaderspiner from "../Loaderspiner/Loaderspiner";

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isprocecing: false,
      wronglink: false,
      statuspayment: false,
      payfor: "płatność",
      checknumer:0,
      dofetch:true


    };

    this.checkstatuspayment = this.checkstatuspayment.bind(this);
    this.setoverpay = this.setoverpay.bind(this);
    this.seterror=this.seterror.bind(this);
  }

  componentDidMount = async () => {
    //console.log(this.props.store.backendadress);
    // console.log(window.location.search.split("=")[1]);
    var tid = window.location.search.split("=")[1];
    if (tid === undefined) {
      this.setState({
        wronglink: true,
        isprocecing: true
      });
    } else {
      await fetch(this.props.store.backendadress + '/payment/checkpaymenbytid?' + new URLSearchParams({
        tid: tid
      })).then(res => res.json())
        .then(json => {
          console.log(json.Status);
          if (json.Status === "Opłacona") {
            this.setState({
              payfor: json.Title,
            });
           
            this.setoverpay();

          } else if (json.Status === "Oczekująca na płatność") {
            this.setState({checknumer:0});
            this.checkstatuspayment(json._id);

          } else { }


        }).catch(function () {
          this.seterror();
        })
    }

  }
  seterror=()=>{
    this.setState({
      wronglink: true,
      isprocecing: true
    });
  }
  setoverpay = () => {
    localStorage.removeItem("Payment_id");
                    localStorage.removeItem("Intention");
                    localStorage.removeItem("Amount");
                    localStorage.removeItem("Mass");
                    localStorage.removeItem("MassScribe");
                    localStorage.removeItem("Textintens");
    this.setState({

      isprocecing: true,
      statuspayment: true,
      statuspaymentdiv: "Posiada status oplacona"

    })
  }

  checkstatuspayment = (id) => {
    const{checknumer,dofetch}=this.state;
    console.log("in");
    this.setState({checknumer:(checknumer+1)})
    if(checknumer<10&&dofetch){
      console.log("in1");
      
      setTimeout(async () => {
        await fetch(this.props.store.backendadress + '/payment/checkstatuspaymenbytid?' + new URLSearchParams({
          id: id
        }))
          .then(res => {
             if(res.status===201){
              this.checkstatuspayment(id);
             }else if(res.status===200){
              this.setoverpay();
             }else{
              this.seterror();
             }
            })
    }, 10000)
    }else{
      this.setState({dofetch:false});
      this.seterror();
    }
    

  }







  render() {
    const { isprocecing, statuspayment, statuspaymentdiv, wronglink, payfor } = this.state;
    return (
      <div key={"paymentdiv"}>
        <TopMenu></TopMenu>
        <div className="kontentpayment" key="kontentpayment">
          <div className="kontentpaymenttitle" key="kontentpaymenttitle">Status twojej płatności</div>
          {!isprocecing ? [

            <div className="paymentprocesing" key="paymentprocesing">
              <Loaderspiner />
              Oczekujemy na potwierdzenie płatności od dostawcy płatności

            </div>

          ] : [
            <div key="paymentprocesingno" >Twoja {payfor}:
            </div>

          ]}
          {wronglink ? <div className="paymentwronglink" key="paymentwronglink">Niestety adres przekierowania jest błędny sprawdź status swojej płatności w zakładce moje konto</div> : ""}
          {statuspayment ? statuspaymentdiv : ""}


        </div>

      </div>


    )
  }
}
export default Payment