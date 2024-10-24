import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <AppRouter />
        </div>
      </Router>
    </div>
  );
}

export default App;
