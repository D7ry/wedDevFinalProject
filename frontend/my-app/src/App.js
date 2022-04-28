import logo from './logo.svg';
import './App.css';
import ItemShown from './Components/itemShown.js'

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div class = "container">
      {/* Home Page */}
      {/* <h1 style ={{margin: "20px"}}>Home</h1>
      <div class = "homepage">
        <div>

          <h1 class = 'homeHeader'>The LOST</h1>
          <h1 class = 'homeHeader'>AND FOUND</h1>
        </div>
        <div>
          <button class = "login button"> Log In</button>
          <br/>
          <button class = "signup button"> Sign Up</button>
        </div>
      </div> */}



      <ItemShown/>
    </div>
  );
}

export default App;
