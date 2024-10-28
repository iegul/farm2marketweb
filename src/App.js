import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";
import { UserProvider } from "./components/Context/UserContext";

function App() {
  return (
    <UserProvider className="App">
      <Router>
        <div>
          <AppRouter />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
