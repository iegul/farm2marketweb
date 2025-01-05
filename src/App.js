import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes";
import { UserProvider } from "./components/Context/UserContext";
import { CartProvider } from "./components/Context/CartContext";

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <div>
            <AppRouter />
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
