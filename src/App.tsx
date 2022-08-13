import logo from "./main.png";
import "./App.css";
import { List, ListItem } from "@mui/material";

function App() {
  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <div className="todo">
        <List>
          <ListItem>
            <i className="fa-solid fa-person-digging"></i>
            <span>工事中です。</span>
          </ListItem>
          <ListItem button>
            <i className="fa-solid fa-pen-clip"></i>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </ListItem>
        </List>
      </div>
    </div>
  );
}

export default App;
