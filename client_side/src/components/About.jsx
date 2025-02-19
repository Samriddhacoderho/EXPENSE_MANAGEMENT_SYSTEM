import React, { useContext } from "react";
import "../css_files/About.css"
import {context} from "../contexts/Context"

//This is an About Component
const About = () => {
  const contexts=useContext(context)
  contexts.mode==="Enable Dark Mode"?document.body.style.backgroundColor="#f5f5f5":document.body.style.backgroundColor="rgb(22, 21, 21)"
  return (
    <div className="my-3">
      <div className="accordion" id="accordionExample" style={contexts.mode==="Disable Dark Mode"?{border:"3px solid red"}:{}}>
        <div className="accordion-item">
          <h2 className="accordion-header" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#4caf50"}:{backgroundColor:"#282323"}}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Samriddha Raj Satyal
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
            
          >
            <div className="accordion-body" style={contexts.mode==="Enable Dark Mode"?{borderLeft:"4 px solid #4caf50"}:{borderLeft:" 4 px solid #282323"}} >
            Samriddha Raj Satyal is a backend developer who can make requests from client side and handle requests and send responses from back-end to database to client side again.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#4caf50"}:{backgroundColor:"#282323"}}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Keshab Bhattarai
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
            Keshab Bhattarai is a front-end developer who has a lot of skills in the world of technology and programming. 
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#4caf50"}:{backgroundColor:"#282323"}}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Sandip Bhandari
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Sandip Bhandari is a programmer who has a lot of skills in handling Data Statistics and Quantum Physics. 
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#4caf50"}:{backgroundColor:"#282323"}}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Samuel Basnet
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              Samuel Basnet is a programmer who has a lot of skills in handling Data Statistics and Quantum Chemistry. 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
