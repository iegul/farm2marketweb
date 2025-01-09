import React from "react";
import { Routes, Route } from "react-router-dom";
import LogoPage from "../components/MainPage/logopage";
import MainPage from "../components/MainPage/mainPage";
import LoginPage from "../components/LoginRegister/loginPage";
import RegisterPage from "../components/LoginRegister/registerPage";
import PageSepet from "../components/MainPage/PageCart/PageSepet";
import PageFavorite from "../components/MainPage/PageFavori/PageFavori";
import ConfirmMailPage from "../components/LoginRegister/ConfirmEmailPage";
import UrunEkleForm from "../components/MainPage/RoleFarmer/productAdd";
import SaleProduct from "../components/MainPage/RoleFarmer/saleProduct";
import BuyProduct from "../components/MainPage/RoleMarket/buyProduct";
import FarmerByProduct from "../components/MainPage/RoleFarmer/farmerByProduct";
import ProductDetailShow from "../components/MainPage/productDetailShow";
import Contact from "../components/MainPage/Drawer/contect";
import CustomerService from "../components/MainPage/Drawer/customerservice";
import PrivacyPolicy from "../components/MainPage/Drawer/privacypolicy";
import AccountPage from "../components/MainPage/Drawer/accountPage";
import OrderSummary from "../components/MainPage/PageCart/OrderSummary";
import ChangePassword from "../components/MainPage/Drawer/ChangePassword";
import AddCategory from "../components/MainPage/RoleAdmin/AddCategory";
import ProductList from "../components/MainPage/RoleAdmin/ProductList";
import UserList from "../components/MainPage/RoleAdmin/UserList";
import ProductListPage from "../components/MainPage/ProductListPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LogoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/mainPage" element={<MainPage />} />
      <Route path="/addProduct" element={<UrunEkleForm />} />
      <Route path="/page-sepet" element={<PageSepet></PageSepet>}></Route>
      <Route path="/page-favori" element={<PageFavorite></PageFavorite>} />
      <Route path="/product-detail/:id" element={<ProductDetailShow />} />
      <Route path="/confirm-mail" element={<ConfirmMailPage />} />
      <Route path="/urun-ekle" element={<UrunEkleForm />} />
      <Route path="/farmersatislarim" element={<SaleProduct />} />
      <Route path="/marketalislarim" element={<BuyProduct />} />
      <Route path="/farmerurunler" element={<FarmerByProduct />} />
      <Route path="/iletisim" element={<Contact />}></Route>
      <Route path="/customerservice" element={<CustomerService />}></Route>
      <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
      <Route path="/account" element={<AccountPage />}></Route>
      <Route path="/passwordchange" element={<ChangePassword />} />
      <Route path="/ordersummary" element={<OrderSummary />} />
      <Route path="/addcatagory" element={<AddCategory />} />
      <Route path="/productList" element={<ProductList />} />
      <Route path="/userList" element={<UserList />} />
      <Route path="/product/:id" element={<ProductListPage />} />
    </Routes>
  );
}
export default AppRouter;
