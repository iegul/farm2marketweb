import React from "react";
import { Routes, Route } from "react-router-dom";
import LogoPage from "../components/logopage";

import MainPage from "../components/MainPage/mainPage";
import LoginPage from "../components/LoginRegister/loginPage";
import RegisterPage from "../components/LoginRegister/registerPage";
import PageSepet from "../components/PageSepet/PageSepet";
import PageFavorite from "../components/PageFavori/PageFavori";
import DetailPage from "../components/MainPage/DetailPage";
import ConfirmMailPage from "../components/LoginRegister/ConfirmEmailPage";
import UrunEkleForm from "../components/MainPage/ProductAdd/productAdd";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LogoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/page-sepet" element={<PageSepet></PageSepet>}></Route>
      <Route
        path="/page-favori"
        element={<PageFavorite></PageFavorite>}
      ></Route>
      <Route path="/product-detail/:id" element={<DetailPage />} />
      <Route path="/confirm-mail" element={<ConfirmMailPage />} />
      <Route path="/urun-ekle" element={<UrunEkleForm />} />
    </Routes>
  );
}

export default AppRouter;
