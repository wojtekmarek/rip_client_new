import React, {Component} from 'react';
import "./Loaderspiner.css";


class Loaderspiner extends Component {
  render () {
    
    
    return [
               
            <div className="ispinner" key={"spiner"}>
                <div key={"spinerblade1"} className="ispinner-blade"></div>
                <div key={"spinerblade2"}className="ispinner-blade"></div>
                <div key={"spinerblade3"}className="ispinner-blade"></div>
                <div key={"spinerblade4"}className="ispinner-blade"></div>
                <div key={"spinerblade5"}className="ispinner-blade"></div>
                <div key={"spinerblade6"}className="ispinner-blade"></div>
                <div key={"spinerblade7"}className="ispinner-blade"></div>
                <div key={"spinerblade8"}className="ispinner-blade"></div>
            </div>
         
        
     
    ]
  }
}

export default Loaderspiner;