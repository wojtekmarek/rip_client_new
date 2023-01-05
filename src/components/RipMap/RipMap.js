import React,{ Component}from "react";
import * as ReactDOM from 'react-dom';
import"./RipMap.css"
import axios from 'axios';


class RipMap extends Component{
    constructor(props) {
        super(props);
        
        this.state={
        visiblelist: [],
        ripdetail:[{"e":1}],
        showripdetail:false,
        findresult:"",
        namesearch:"",
        lastnamesearch:"",
        datedethsearch:"",
        namesearchfalse:false,
        lastnamesearchfalse:false,
        datedethsearchfalse:false,
        searchResult:[]
    };
    
    this.clikgrave= this.clikgrave.bind(this);
    this.startSearching = this.startSearching.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.handleBlur=this.handleBlur.bind(this);
    this.mousunhoverhandler=this.mousunhoverhandler.bind(this);
    this.moushoverhandler=this.moushoverhandler.bind(this);
}

    componentDidMount = () => {
      
       
        fetch(this.props.urlback+'/gravequarters/check')
        .then(response => response.json())
        .then(json =>{
            this.setState({visiblelist: json})
        })



    }
    moushoverhandler=(id)=>{
       // alert("najechane"+id);
        document.getElementById(id).style.background="rgb(124, 123, 32)";
    }
    mousunhoverhandler=(id)=>{
       // alert("zjechane"+id);
        document.getElementById(id).style.background="rgb(238, 230, 178)";
    }
    handleBlur = (name, value) => {
 
        var regstring = new RegExp(/[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]/);
        if(regstring.test(value)){
            this.setState({[name+"false"]:false})
        }else{
            this.setState({[name+"false"]:true})
        }
    }
    handleChange = (name, value) => {
        
        this.setState({[name]:value})
    }

    //funkcja wyszukiwania
    startSearching = () => {
        const{namesearchfalse,lastnamesearchfalse,datedethsearchfalse}=this.state;
        if(namesearchfalse&&lastnamesearchfalse&&datedethsearchfalse)
        {
            alert("niepoprawne dane wyszukiwania");
            
        }else{
           //wysukiwanie
           this.sendSearchRequest();
        }
        

    
    }

    sendSearchRequest = async () => {
        const{namesearch,lastnamesearch,datedethsearch}=this.state;
        var namesearchpreper=namesearch.trim();
        namesearchpreper=namesearchpreper.charAt(0).toUpperCase() + namesearchpreper.slice(1);
       
        var lastnamesearchpreper=lastnamesearch.trim();
        lastnamesearchpreper=lastnamesearchpreper.charAt(0).toUpperCase() + lastnamesearchpreper.slice(1);
     
    
        const config = {
            method: 'get',
            url: this.props.urlback + '/burial/serchforclient',
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                "Name": namesearchpreper,
                "LastName": lastnamesearchpreper,
                "Date":datedethsearch
            }
        };
        console.log(config);

        await axios(config)
            .then(async response => {
                console.log(response.data);
                if(response.data[0]!==undefined)
                {   var gravesearch=[];
                    response.data.forEach(element => {
                        let text=element.Namedeceased+" "+element.LastNamedeceased+" "+element.DateOfDeath.slice(0, 10).split("-").reverse().join("-");
                        let grave=React.createElement("div",{id:element._id,
                            className:"findresult",
                        onMouseEnter:() => {this.moushoverhandler(element.GraveQuartersnumber)},
                        onMouseLeave:() => {this.mousunhoverhandler(element.GraveQuartersnumber)}
        
                        },text
                        );
                        gravesearch.push(grave);
                     
                    });
                    ReactDOM.render(gravesearch, document.getElementById("info"));
                
                }else{
                    let graveerror=React.createElement("div",{id:"errorfind",
                    },"Nie znaleziono pochówku "
                        );
                    ReactDOM.render(graveerror, document.getElementById("info"));
                }
                this.setState({
                    searchResult: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log('SearchResult: ' + this.state.searchResult);
    }
   
  
     clikgrave = async (e) =>{  
        
        if(this.state.showripdetail){
      
                document.getElementById('detailquater').remove();
                this.setState({showripdetail:false});
              
                
        }
            this.setState({showripdetail:true});
            var config = {
              method: 'get',
              url: this.props.urlback+'/gravequarters/sendquaterdetail',
              headers: { 
                'Content-Type': 'application/json'
              },
            
              params : {
              "id": Number(e.target.id)
            }
            };
            
            await axios(config)
           .then(async response =>{
               this.setState({ripdetail:response.data});
           })
            .catch(function (error) {
              console.log(error);
              
            });

           var innerhtml='<div id="close"></div>'
           +'<div class="detailgraverow"><div class="detailgravecolumn">Imie</div><div class="detailgravecolumn">Nazwisko </div>'
           +'<div class="detailgravecolumn">Data śmierci</div> </div>';
           
           this.state.ripdetail.map(val => (              
            
                innerhtml= innerhtml + '<div class="detailgraverow"><div class="detailgravecolumn">'+val.Namedeceased+'</div>'
                +'<div class="detailgravecolumn">'+val.LastNamedeceased+'</div>'
                +'<div class="detailgravecolumn">'+val.DateOfDeath.slice(0, 10).split("-").reverse().join("-")+'</div> </div>'
           ));
           var classpozition="";
           var b;
          if(e.target.id>=119&&e.target.id<=160)
          {
            b= document.getElementById("Map");
            classpozition="transformpopup";

          }else{
             b= document.getElementById(e.target.id);
            classpozition="normalpopup";
          }
            
           var a = document.createElement("div");
            a.setAttribute('id',"detailquater");
            a.setAttribute('class',classpozition);
            a.innerHTML=innerhtml;
            b.appendChild(a);
            var close=React.createElement("div",{id:"closebutton",
                                           onClick:() => {document.getElementById('detailquater').remove();this.setState({showripdetail:false});}
                           
                                       },"X"
                                           );
           ReactDOM.render(close, document.getElementById("close"));
        }
       
             
   
    
   
    
    render(){
               const{findresult ,namesearchfalse ,lastnamesearchfalse, datedethsearchfalse,namesearch,lastnamesearch,datedethsearch}=this.state
        console.log(this, "render");

       /* ripdetail.forEach((rip) => {
            console.log(rip);
            ripdetail.push(<div className="rip">
                <div className="namedeceased">
                    {rip.Namedeceased[1]}
                </div>
                <div className="lastnamedeceased">
                    {rip.LastNamedeceased[1]}
                </div>

            </div>
            );
        });*/
           
            
       
    return(
   
       
        <div className="Containerrip">
            <div className="tlo1">
                <div className="Map"  id="Map">
                <div className="A">
                    A
                    <div className={"a1 "+ (this.state.visiblelist[0] ? 'isburial' : 'isnotburial')} id="1" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"a2 "+ (this.state.visiblelist[1] ? 'isburial' : 'isnotburial')} id="2" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"a3 "+ (this.state.visiblelist[2] ? 'isburial' : 'isnotburial')} id="3" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"a4 "+ (this.state.visiblelist[3] ? 'isburial' : 'isnotburial')} id="4" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"a5 "+ (this.state.visiblelist[4] ? 'isburial' : 'isnotburial')} id="5" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"a6 "+ (this.state.visiblelist[5] ? 'isburial' : 'isnotburial')} id="6" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"a7 "+ (this.state.visiblelist[6] ? 'isburial' : 'isnotburial')} id="7" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"a8 "+ (this.state.visiblelist[7] ? 'isburial' : 'isnotburial')} id="8" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"a9 "+ (this.state.visiblelist[8] ? 'isburial' : 'isnotburial')} id="9" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"a10 "+ (this.state.visiblelist[9] ? 'isburial' : 'isnotburial')} id="10" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"a11 "+ (this.state.visiblelist[10] ? 'isburial' : 'isnotburial')} id="11" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"a12 "+ (this.state.visiblelist[11] ? 'isburial' : 'isnotburial')} id="12" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                
                </div>
                <div className="B">
                    B
                    <div className={"a1 "+ (this.state.visiblelist[12] ? 'isburial' : 'isnotburial')} id="13" onClick={this.clikgrave}>
                        <h5>1</h5>
                    </div>
                    <div className={"a2 "+ (this.state.visiblelist[13] ? 'isburial' : 'isnotburial')} id="14" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"a3 "+ (this.state.visiblelist[14] ? 'isburial' : 'isnotburial')} id="15" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"a4 "+ (this.state.visiblelist[15] ? 'isburial' : 'isnotburial')} id="16" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"a5 "+ (this.state.visiblelist[16] ? 'isburial' : 'isnotburial')} id="17" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"a6 "+ (this.state.visiblelist[17] ? 'isburial' : 'isnotburial')} id="18" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"a7 "+ (this.state.visiblelist[18] ? 'isburial' : 'isnotburial')} id="19" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"a8 "+ (this.state.visiblelist[19] ? 'isburial' : 'isnotburial')} id="20" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"a9 "+ (this.state.visiblelist[20] ? 'isburial' : 'isnotburial')} id="21" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"a10 "+ (this.state.visiblelist[21] ? 'isburial' : 'isnotburial')} id="22" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"a11 "+ (this.state.visiblelist[22] ? 'isburial' : 'isnotburial')} id="23" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"a12 "+ (this.state.visiblelist[23] ? 'isburial' : 'isnotburial')} id="24" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                        
                </div>
                <div className="C">
                    C
                    <div className={"a1 "+ (this.state.visiblelist[24] ? 'isburial' : 'isnotburial')} id="25" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"a2 "+ (this.state.visiblelist[25] ? 'isburial' : 'isnotburial')} id="26" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"a3 "+ (this.state.visiblelist[26] ? 'isburial' : 'isnotburial')} id="27" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"a4 "+ (this.state.visiblelist[27] ? 'isburial' : 'isnotburial')} id="28" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"a5 "+ (this.state.visiblelist[28] ? 'isburial' : 'isnotburial')} id="29" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"a6 "+ (this.state.visiblelist[29] ? 'isburial' : 'isnotburial')} id="30" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"a7 "+ (this.state.visiblelist[30] ? 'isburial' : 'isnotburial')} id="31" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"a8 "+ (this.state.visiblelist[31] ? 'isburial' : 'isnotburial')} id="32" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"a9 "+ (this.state.visiblelist[32] ? 'isburial' : 'isnotburial')} id="33" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"a10 "+ (this.state.visiblelist[33] ? 'isburial' : 'isnotburial')} id="34" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"a11 "+ (this.state.visiblelist[34] ? 'isburial' : 'isnotburial')} id="35" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"a12 "+ (this.state.visiblelist[35] ? 'isburial' : 'isnotburial')} id="36" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                        
                </div>
                <div className="D">
                    D
                    <div className={"b1 "+ (this.state.visiblelist[36] ? 'isburial' : 'isnotburial')} id="37" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"b2 "+ (this.state.visiblelist[37] ? 'isburial' : 'isnotburial')} id="38" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"b3 "+ (this.state.visiblelist[38] ? 'isburial' : 'isnotburial')} id="39" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"b4 "+ (this.state.visiblelist[39] ? 'isburial' : 'isnotburial')} id="40" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"b5 "+ (this.state.visiblelist[40] ? 'isburial' : 'isnotburial')} id="41" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"b6 "+ (this.state.visiblelist[41] ? 'isburial' : 'isnotburial')} id="42" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"b7 "+ (this.state.visiblelist[42] ? 'isburial' : 'isnotburial')} id="43" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"b8 "+ (this.state.visiblelist[43] ? 'isburial' : 'isnotburial')} id="44" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"b9 "+ (this.state.visiblelist[44] ? 'isburial' : 'isnotburial')} id="45" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"b10 "+ (this.state.visiblelist[45] ? 'isburial' : 'isnotburial')} id="46" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"b11 "+ (this.state.visiblelist[46] ? 'isburial' : 'isnotburial')} id="47" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"b12 "+ (this.state.visiblelist[47] ? 'isburial' : 'isnotburial')} id="48" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                    <div className={"b13 "+ (this.state.visiblelist[48] ? 'isburial' : 'isnotburial')} id="49" onClick={this.clikgrave}>
                        <h5>13</h5>
                    </div>
                </div>  
                <div className="E">
                    E
                    <div className={"b1 "+ (this.state.visiblelist[49] ? 'isburial' : 'isnotburial')} id="50" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"b2 "+ (this.state.visiblelist[50] ? 'isburial' : 'isnotburial')} id="51" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"b3 "+ (this.state.visiblelist[51] ? 'isburial' : 'isnotburial')} id="52" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"b4 "+ (this.state.visiblelist[52] ? 'isburial' : 'isnotburial')} id="53" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"b5 "+ (this.state.visiblelist[53] ? 'isburial' : 'isnotburial')} id="54" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"b6 "+ (this.state.visiblelist[54] ? 'isburial' : 'isnotburial')} id="55" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"b7 "+ (this.state.visiblelist[55] ? 'isburial' : 'isnotburial')} id="56" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"b8 "+ (this.state.visiblelist[56] ? 'isburial' : 'isnotburial')} id="57" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"b9 "+ (this.state.visiblelist[57] ? 'isburial' : 'isnotburial')} id="58" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"b10 "+ (this.state.visiblelist[58] ? 'isburial' : 'isnotburial')} id="59" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"b11 "+ (this.state.visiblelist[59] ? 'isburial' : 'isnotburial')} id="60" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"b12 "+ (this.state.visiblelist[60] ? 'isburial' : 'isnotburial')} id="61" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                    <div className={"b13 "+ (this.state.visiblelist[61] ? 'isburial' : 'isnotburial')} id="62" onClick={this.clikgrave}>
                        <h5>13</h5>
                    </div>
                </div>
                <div className="F">
                    F
                    <div className={"b1 "+ (this.state.visiblelist[62] ? 'isburial' : 'isnotburial')} id="63" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"b2 "+ (this.state.visiblelist[63] ? 'isburial' : 'isnotburial')} id="64" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"b3 "+ (this.state.visiblelist[64] ? 'isburial' : 'isnotburial')} id="65" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"b4 "+ (this.state.visiblelist[65] ? 'isburial' : 'isnotburial')} id="66" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"b5 "+ (this.state.visiblelist[66] ? 'isburial' : 'isnotburial')} id="67" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"b6 "+ (this.state.visiblelist[67] ? 'isburial' : 'isnotburial')} id="68" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"b7 "+ (this.state.visiblelist[68] ? 'isburial' : 'isnotburial')} id="69" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"b8 "+ (this.state.visiblelist[69] ? 'isburial' : 'isnotburial')} id="70" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"b9 "+ (this.state.visiblelist[70] ? 'isburial' : 'isnotburial')} id="71" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"b10 "+ (this.state.visiblelist[71] ? 'isburial' : 'isnotburial')} id="72" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"b11 "+ (this.state.visiblelist[72] ? 'isburial' : 'isnotburial')} id="73" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"b12 "+ (this.state.visiblelist[73] ? 'isburial' : 'isnotburial')} id="74" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                    <div className={"b13 "+ (this.state.visiblelist[74] ? 'isburial' : 'isnotburial')} id="75" onClick={this.clikgrave}>
                        <h5>13</h5>
                    </div>
                        
                </div>
                <div className="G">
                    G
                    <div className={"b1 "+ (this.state.visiblelist[75] ? 'isburial' : 'isnotburial')} id="76" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"b2 "+ (this.state.visiblelist[76] ? 'isburial' : 'isnotburial')} id="77" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"b3 "+ (this.state.visiblelist[77] ? 'isburial' : 'isnotburial')} id="78" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"b4 "+ (this.state.visiblelist[78] ? 'isburial' : 'isnotburial')} id="79" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"b5 "+ (this.state.visiblelist[79] ? 'isburial' : 'isnotburial')} id="80" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"b6 "+ (this.state.visiblelist[80] ? 'isburial' : 'isnotburial')} id="81" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"b7 "+ (this.state.visiblelist[81] ? 'isburial' : 'isnotburial')} id="82" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"b8 "+ (this.state.visiblelist[82] ? 'isburial' : 'isnotburial')} id="83" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"b9 "+ (this.state.visiblelist[83] ? 'isburial' : 'isnotburial')} id="84" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"b10 "+ (this.state.visiblelist[84] ? 'isburial' : 'isnotburial')} id="85" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"b11 "+ (this.state.visiblelist[85] ? 'isburial' : 'isnotburial')} id="86" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"b12 "+ (this.state.visiblelist[86] ? 'isburial' : 'isnotburial')} id="87" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                    <div className={"b13 "+ (this.state.visiblelist[87] ? 'isburial' : 'isnotburial')} id="88" onClick={this.clikgrave}>
                        <h5>13</h5>
                    </div>
                        
                </div>
                <div className="H">
                    H
                    <div className={"c1 "+ (this.state.visiblelist[88] ? 'isburial' : 'isnotburial')} id="89" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"c2 "+ (this.state.visiblelist[89] ? 'isburial' : 'isnotburial')} id="90" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"c3 "+ (this.state.visiblelist[90] ? 'isburial' : 'isnotburial')} id="91" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"c4 "+ (this.state.visiblelist[91] ? 'isburial' : 'isnotburial')} id="92" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"c5 "+ (this.state.visiblelist[92] ? 'isburial' : 'isnotburial')} id="93" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"c6 "+ (this.state.visiblelist[93] ? 'isburial' : 'isnotburial')} id="94" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"c7 "+ (this.state.visiblelist[94] ? 'isburial' : 'isnotburial')} id="95" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"c8 "+ (this.state.visiblelist[95] ? 'isburial' : 'isnotburial')} id="96" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"c9 "+ (this.state.visiblelist[96] ? 'isburial' : 'isnotburial')} id="97" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"c10 "+ (this.state.visiblelist[97] ? 'isburial' : 'isnotburial')} id="98" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"c11 "+ (this.state.visiblelist[98] ? 'isburial' : 'isnotburial')} id="99" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"c12 "+ (this.state.visiblelist[99] ? 'isburial' : 'isnotburial')} id="100" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                    <div className={"c13 "+ (this.state.visiblelist[100] ? 'isburial' : 'isnotburial')} id="101" onClick={this.clikgrave}>
                        <h5>13</h5>
                    </div> 
                    <div className={"c14 "+ (this.state.visiblelist[101] ? 'isburial' : 'isnotburial')} id="102" onClick={this.clikgrave}>
                        <h5>14</h5>
                    </div>
                    <div className={"c15 "+ (this.state.visiblelist[102] ? 'isburial' : 'isnotburial')} id="103" onClick={this.clikgrave}>
                        <h5>15</h5>
                    </div>      
                </div>
                <div className="I">
                    I
                    <div className={"c1 "+ (this.state.visiblelist[103] ? 'isburial' : 'isnotburial')} id="104" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"c2 "+ (this.state.visiblelist[104] ? 'isburial' : 'isnotburial')} id="105" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"c3 "+ (this.state.visiblelist[105] ? 'isburial' : 'isnotburial')} id="106" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"c4 "+ (this.state.visiblelist[106] ? 'isburial' : 'isnotburial')} id="107" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"c5 "+ (this.state.visiblelist[107] ? 'isburial' : 'isnotburial')} id="108" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"c6 "+ (this.state.visiblelist[108] ? 'isburial' : 'isnotburial')} id="109" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"c7 "+ (this.state.visiblelist[109] ? 'isburial' : 'isnotburial')} id="110" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"c8 "+ (this.state.visiblelist[110] ? 'isburial' : 'isnotburial')} id="111" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"c9 "+ (this.state.visiblelist[111] ? 'isburial' : 'isnotburial')} id="112" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"c10 "+ (this.state.visiblelist[112] ? 'isburial' : 'isnotburial')} id="113" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"c11 "+ (this.state.visiblelist[113] ? 'isburial' : 'isnotburial')} id="114" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"c12 "+ (this.state.visiblelist[114] ? 'isburial' : 'isnotburial')} id="115" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                    <div className={"c13 "+ (this.state.visiblelist[115] ? 'isburial' : 'isnotburial')} id="116" onClick={this.clikgrave}>
                        <h5>13</h5>
                    </div> 
                    <div className={"c14 "+ (this.state.visiblelist[116] ? 'isburial' : 'isnotburial')} id="117" onClick={this.clikgrave}>
                        <h5>14</h5>
                    </div>
                    <div className={"c15 "+ (this.state.visiblelist[117] ? 'isburial' : 'isnotburial')} id="118" onClick={this.clikgrave}>
                        <h5>15</h5>
                    </div>   
                </div>
                <div className="J">
                    <div className={"d1 "+ (this.state.visiblelist[118] ? 'isburial' : 'isnotburial')} id="119" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"d2 "+ (this.state.visiblelist[119] ? 'isburial' : 'isnotburial')} id="120" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"d3 "+ (this.state.visiblelist[120] ? 'isburial' : 'isnotburial')} id="121" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"d4 "+ (this.state.visiblelist[121] ? 'isburial' : 'isnotburial')} id="122" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"d5 "+ (this.state.visiblelist[122] ? 'isburial' : 'isnotburial')} id="123" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"d6 "+ (this.state.visiblelist[123] ? 'isburial' : 'isnotburial')} id="124" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"d7 "+ (this.state.visiblelist[124] ? 'isburial' : 'isnotburial')} id="125" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"d8 "+ (this.state.visiblelist[125] ? 'isburial' : 'isnotburial')} id="126" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"d9 "+ (this.state.visiblelist[126] ? 'isburial' : 'isnotburial')} id="127" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"d10 "+ (this.state.visiblelist[127] ? 'isburial' : 'isnotburial')} id="128" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"d11 "+ (this.state.visiblelist[128] ? 'isburial' : 'isnotburial')} id="129" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"d12 "+ (this.state.visiblelist[129] ? 'isburial' : 'isnotburial')} id="130" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                </div>
                                  
                <div className="J2">
                    <div className={"e1 "+ (this.state.visiblelist[130] ? 'isburial' : 'isnotburial')} id="131" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"e2 "+ (this.state.visiblelist[131] ? 'isburial' : 'isnotburial')} id="132" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"e3 "+ (this.state.visiblelist[132] ? 'isburial' : 'isnotburial')} id="133" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"e4 "+ (this.state.visiblelist[133] ? 'isburial' : 'isnotburial')} id="134" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"e5 "+ (this.state.visiblelist[134] ? 'isburial' : 'isnotburial')} id="135" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"e6 "+ (this.state.visiblelist[135] ? 'isburial' : 'isnotburial')} id="136" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"e7 "+ (this.state.visiblelist[136] ? 'isburial' : 'isnotburial')} id="137" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"e8 "+ (this.state.visiblelist[137] ? 'isburial' : 'isnotburial')} id="138" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"e9 "+ (this.state.visiblelist[138] ? 'isburial' : 'isnotburial')} id="139" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"e10 "+ (this.state.visiblelist[139] ? 'isburial' : 'isnotburial')} id="140" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"e11 "+ (this.state.visiblelist[140] ? 'isburial' : 'isnotburial')} id="141" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"e12 "+ (this.state.visiblelist[141] ? 'isburial' : 'isnotburial')} id="142" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                

                </div>
                <div className="J3">
                    <div className={"e1 "+ (this.state.visiblelist[142] ? 'isburial' : 'isnotburial')} id="143" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"e2 "+ (this.state.visiblelist[143] ? 'isburial' : 'isnotburial')} id="144" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"e3 "+ (this.state.visiblelist[144] ? 'isburial' : 'isnotburial')} id="145" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"e4 "+ (this.state.visiblelist[145] ? 'isburial' : 'isnotburial')} id="146" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"e5 "+ (this.state.visiblelist[146] ? 'isburial' : 'isnotburial')} id="147" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"e6 "+ (this.state.visiblelist[147] ? 'isburial' : 'isnotburial')} id="148" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"e7 "+ (this.state.visiblelist[148] ? 'isburial' : 'isnotburial')} id="149" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"e8 "+ (this.state.visiblelist[149] ? 'isburial' : 'isnotburial')} id="150" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"e9 "+ (this.state.visiblelist[150] ? 'isburial' : 'isnotburial')} id="151" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"e10 "+ (this.state.visiblelist[151] ? 'isburial' : 'isnotburial')} id="152" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"e11 "+ (this.state.visiblelist[152] ? 'isburial' : 'isnotburial')} id="153" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"e12 "+ (this.state.visiblelist[153] ? 'isburial' : 'isnotburial')} id="154" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>
                

                </div>
                <div className="J4">
                    <div className={"d1 "+ (this.state.visiblelist[154] ? 'isburial' : 'isnotburial')} id="155" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"d2 "+ (this.state.visiblelist[155] ? 'isburial' : 'isnotburial')} id="156" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"d3 "+ (this.state.visiblelist[156] ? 'isburial' : 'isnotburial')} id="157" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"d4 "+ (this.state.visiblelist[157] ? 'isburial' : 'isnotburial')} id="158" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"d5 "+ (this.state.visiblelist[158] ? 'isburial' : 'isnotburial')} id="159" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"d6 "+ (this.state.visiblelist[159] ? 'isburial' : 'isnotburial')} id="160" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"d7 "+ (this.state.visiblelist[160] ? 'isburial' : 'isnotburial')} id="161" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"d8 "+ (this.state.visiblelist[161] ? 'isburial' : 'isnotburial')} id="162" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"d9 "+ (this.state.visiblelist[162] ? 'isburial' : 'isnotburial')} id="163" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"d10 "+ (this.state.visiblelist[163] ? 'isburial' : 'isnotburial')} id="164" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                    <div className={"d11 "+ (this.state.visiblelist[164] ? 'isburial' : 'isnotburial')} id="165" onClick={this.clikgrave}>
                        <h5>11</h5>
                    </div>
                    <div className={"d12 "+ (this.state.visiblelist[165] ? 'isburial' : 'isnotburial')} id="166" onClick={this.clikgrave}>
                        <h5>12</h5>
                    </div>

                </div>
                <div className="K">
                    <div className={"k1 "+ (this.state.visiblelist[166] ? 'isburial' : 'isnotburial')} id="167" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"k2 "+ (this.state.visiblelist[167] ? 'isburial' : 'isnotburial')} id="168" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"k3 "+ (this.state.visiblelist[168] ? 'isburial' : 'isnotburial')} id="169" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"k4 "+ (this.state.visiblelist[169] ? 'isburial' : 'isnotburial')} id="170" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"k5 "+ (this.state.visiblelist[170] ? 'isburial' : 'isnotburial')} id="171" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"k6 "+ (this.state.visiblelist[171] ? 'isburial' : 'isnotburial')} id="172" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"k7 "+ (this.state.visiblelist[172] ? 'isburial' : 'isnotburial')} id="173" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"k8 "+ (this.state.visiblelist[173] ? 'isburial' : 'isnotburial')} id="174" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"k9 "+ (this.state.visiblelist[174] ? 'isburial' : 'isnotburial')} id="175" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"k10 "+ (this.state.visiblelist[175] ? 'isburial' : 'isnotburial')} id="176" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                        
                </div>
                <div className="L">
                     <div className={"k1 "+ (this.state.visiblelist[176] ? 'isburial' : 'isnotburial')} id="177" onClick={this.clikgrave}>
                       <h5>1</h5>
                    </div>
                    <div className={"k2 "+ (this.state.visiblelist[177] ? 'isburial' : 'isnotburial')} id="178" onClick={this.clikgrave}>
                        <h5>2</h5>
                    </div>
                    <div className={"k3 "+ (this.state.visiblelist[178] ? 'isburial' : 'isnotburial')} id="179" onClick={this.clikgrave}>
                        <h5>3</h5>
                    </div>
                    <div className={"k4 "+ (this.state.visiblelist[179] ? 'isburial' : 'isnotburial')} id="180" onClick={this.clikgrave}>
                        <h5>4</h5>
                    </div>
                    <div className={"k5 "+ (this.state.visiblelist[180] ? 'isburial' : 'isnotburial')} id="181" onClick={this.clikgrave}>
                        <h5>5</h5>
                    </div>
                    <div className={"k6 "+ (this.state.visiblelist[181] ? 'isburial' : 'isnotburial')} id="182" onClick={this.clikgrave}>
                        <h5>6</h5>
                    </div>
                    <div className={"k7 "+ (this.state.visiblelist[182] ? 'isburial' : 'isnotburial')} id="183" onClick={this.clikgrave}>
                        <h5>7</h5>
                    </div>
                    <div className={"k8 "+ (this.state.visiblelist[183] ? 'isburial' : 'isnotburial')} id="184" onClick={this.clikgrave}>
                        <h5>8</h5>
                    </div>
                    <div className={"k9 "+ (this.state.visiblelist[184] ? 'isburial' : 'isnotburial')} id="185" onClick={this.clikgrave}>
                        <h5>9</h5>
                    </div>
                    <div className={"k10 "+ (this.state.visiblelist[185] ? 'isburial' : 'isnotburial')} id="186" onClick={this.clikgrave}>
                        <h5>10</h5>
                    </div>
                        
                </div>

                </div>
                </div>
                
                <div className="Boczek">
                <div className="Find">
                    <div className="RipFinderrowcenter">
                        <label id="leb">Wyszukaj</label>
                    </div>
                    <div className="RipFinderrow">
                        <label id="leb">Imię:</label>
                        <input className="RipFinderInput" 
                        name="namesearch"
                       value={namesearch || ''} 
                       onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                       onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                   {namesearchfalse ? <div className="errorfieldsearch" key={"7910error"}>Imię musi składać się tylko z liter </div> : ""}
                    </div>
                   
                    <div className="RipFinderrow">
                        <label id="leb">Nazwisko:</label>
                        <input className="RipFinderInput"  
                        name="lastnamesearch"
                       value={lastnamesearch || ''} 
                       onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                       onBlur={(e) => { this.handleBlur(e.target.name, e.target.value) }} />
                  {lastnamesearchfalse ? <div className="errorfieldsearch" key={"7911error"}>Nazwisko może składać się tylko z liter </div> : ""}
                    </div>
                    <div className="RipFinderrow">
                        <label id="leb">Data śmierci:</label>
                        <input className="RipFinderInput"
                        type="date"
                       name="datedethsearch"
                       value={datedethsearch || ''} 
                       onChange={(e) => { this.handleChange(e.target.name, e.target.value) }}
                       />
                   {datedethsearchfalse ? <div className="errorfieldsearch" key={"7912error"}>Data ma niepoprawny format </div> : ""}
                        
                    </div>
                    <div className="RipFinderrowcenter">
                    <button className="findbutton"onClick = {this.startSearching } > Szukaj </button>
                    </div>
                    
     
                </div>
                <div className="Info" id="info">
                {findresult}

                </div>
                
                </div>
        </div>
              
   
    )
    }
}
export default RipMap