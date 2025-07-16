import { useState } from "react";

const message=[
  "Learn React *",
  "Apply for jobs :) ",
  "Invest your new income ₹",
]; 
// we wrote this data outside, because each time this app function is executed this array is created again and again
export default function App(){
  // let step = 2;
  const [step, setStep] = useState(1); 
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() { //handle is used mostly in reract to handle event listener , just to know that this function is handling some event 
    if(step>1) setStep(step-1);
    
  }

  function handleNext() {
    if(step<3) setStep(step+1);
  }

  return (
  <div>
    <button className="close" onClick={()=>setIsOpen(!isOpen)}>
      &times;</button>
{/* &times; , is html entity it writes X , that we want for close button. */}
   {isOpen && (
    <div className="steps">
    <div className="numbers">
      <div className={`${step>=1 ? "active" : ""}`}>1</div>
      <div className={`${step>=2 ? "active" : ""}`} >2</div>
      <div className={`${step>=3 ? "active" : ""}`}>3</div>
    </div>

    <p className="message">Step {step}: {message[step-1]}</p>

    <div className="buttons">
      <button style={{backgroundColor: '#7950f2', color:"#fff"}} 
      onClick={handlePrevious} // we create  function seperately and then call them here , not write the function itself here  , GOOD PRACTICE
      
      // onMouseEnter={alert("
      //   TEST")} //can write like this because jaisehi app function will execute, it will excetue too, without it being called, therefor(" WE WRITE CALLBACK FUNCTION")

      // onMouseEnter={()=>alert("TEST")}
       >
          Previous</button>
      <button style={{backgroundColor: '#7950f2', color:"#fff"}} 
      // onClick={()=>alert("Next")}

      onClick={handleNext}
      
      >Next</button>
    </div>
  </div>)
  }</div>
)
}