import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";
import { UserProvider } from "./components/Context/UserContext";

function App() {
  return (
<<<<<<< HEAD
    <UserProvider className="App">
=======
    <UserProvider>
>>>>>>> d292096cccdb58142f4bfd499bdfca9b68b3bc6c
      <Router>
        <div>
          <AppRouter />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
