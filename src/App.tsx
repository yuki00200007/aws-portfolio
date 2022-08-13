import logo from "./main.png";
import "./App.css";

function App() {
  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <i className="fa-solid fa-person-digging"></i>
      <span>工事中です。</span>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
}

export default App;
