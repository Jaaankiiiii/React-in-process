import React from "react";
import ReactDOM from "react-dom/client";

// added css file;
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App(){
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = {color: 'red', fontSize: '48px', textTransform: 'uppercase'};

  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
  </header>

  );

  // return <h1 style={{color: 'red', fontSize: '48px', textTransform: 'uppercase'}} >Fast React Pizza Co.</h1>
}

function Menu() {
  const pizzas=pizzaData;
  const numPizzas=pizzas.length;
  return(
    <main className="menu">
      <h2>Our Menu</h2>

      {numPizzas > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzas.map(pizza=>
              (<Pizza pizzaObj={pizza} key={pizza.name} />) //key is unique id/ thing of each element;
            )}
          </ul>
        </>): (
          <p>We're still working on our mennu.</p>
      )}
      

      {/* <Pizza name='Pizza Spinaci' ingredients='Tomato, mozarella, spinach, and ricotta cheese'  price={12} photoName='pizzas/spinaci.jpg'/>
      <Pizza name='Pizza funghi' ingredients="Tomato, mozarella, mushrooms, and onion"  price={12} photoName='pizzas/funghi.jpg' />
      <Pizza name='Pizza Margherita' ingredients="Tomato and mozarella" price={10}  photoName='pizzas/margherita.jpg' />
      <Pizza name='Pizza Prosciutto' ingredients="Tomato, mozarella, mushrooms, and onion"  price={18} photoName='pizzas/prosciutto.jpg' />
      <Pizza name='Pizza Salamino' ingredients="Tomato, mozarella, and pepperoni"  price={15} photoName='pizzas/salamino.jpg' />
      <Pizza name='Pizza Focaccia' ingredients="Bread with italian olive oil and rosemary" price={6} photoName='pizzas/focaccia.jpg' /> */}
    </main>
  );
    
}

function Pizza(props){
  // if(props.pizzaObj.soldOut) return null;
  return ( 
      <li className={`pizza ${props.pizzaObj.soldOut ? "sold-out":""}`}>
        <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name}/>
        <div>
          <h3>{props.pizzaObj.name}</h3>
          <p>{props.pizzaObj.ingredients}</p>
          <span>{props.pizzaObj.soldOut ? "SOLD OUT" : props.pizzaObj.price}</span>
        </div>
      </li>
  );
}

function Footer() {
  // return React.createElement('footer',null, "We're currently open.");

  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  
  // console.log(isOpen);
  // if(hour>=openHour && hour<=closeHour){
  //   alert("we're currently open.");
  // }else alert("sorry we are closed");

  return <footer className="footer">
    {isOpen ? (
      <Order closeHour={closeHour}/>
    ): 
    <p>We're closed. come back later</p>}
  </footer>
}

function Order(props){
  return(
    <div className="order">
        <p>We're Open till {props.closeHour}:00. Come visit us or Order online.</p>
        <button className="btn"> Order </button>
    </div>
  )
}



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);