import React from "react";
import { Routes, Route } from "react-router-dom";
import LogoPage from "../components/logopage";

import MainPage from "../components/MainPage/mainPage";
import LoginPage from "../components/LoginRegister/loginPage";
import RegisterPage from "../components/LoginRegister/registerPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LogoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/mainPage" element={<MainPage />} />
    </Routes>
  );
}

export default AppRouter;
