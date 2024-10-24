import React, { useState } from "react";
import { Input, Row, Col, Button, Drawer, List } from "antd";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
  InfoCircleOutlined,
  DollarOutlined,
  TagOutlined,
  ShoppingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import f2myazı from "../../images/f2myazı.png";
import "./MainPage.css"; // CSS dosyasını ekledik
import CategoryCarousel from "./categoryCarousel";
import ProductGrid from "./productGrid";
import FooterComponent from "../footer";

function MainPage() {
  const navigate = useNavigate();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userDrawerVisible, setUserDrawerVisible] = useState(false);

  // Menü drawer açma
  const showDrawer = () => {
    setDrawerVisible(true);
  };

  // Menü drawer kapatma
  const onClose = () => {
    setDrawerVisible(false);
  };

  // User Drawer açma
  const showUserDrawer = () => {
    setUserDrawerVisible(true);
  };

  // User Drawer kapatma
  const onUserDrawerClose = () => {
    setUserDrawerVisible(false);
  };

  // Kategori Listesi
  const categories = [
    "Sebze",
    "Meyve",
    "Hayvansal Ürünler",
    "Ev Yapımı Ürünler",
    "Dondurulmuş Ürünler",
    "Süt Ürünleri",
  ];

  const userOptions = [
    {
      label: "Profilim",
      action: () => navigate("/login"),
      icon: <UserOutlined />,
    },
    {
      label: "Aldıklarım",
      icon: <DollarOutlined />,
    },
    {
      label: "Sattıklarım",
      icon: <TagOutlined />,
    },
    {
      label: "Ürünlerim",
      icon: <ShoppingOutlined />,
    },
    {
      label: "Farm2Market Müşteri Hizmetleri",
      icon: <InfoCircleOutlined />,
    },
    {
      label: "Çıkış Yap",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <div className="main-page-container">
      <Row align="middle" justify="space-between" className="main-page-header">
        {/* Sol taraftaki Menü İkonu */}
        <Col>
          <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
        </Col>

        {/* Ortadaki Başlık */}
        <Col>
          <img src={f2myazı} alt="Logo" className="logo-image" />
        </Col>

        {/* Sağdaki İkonlar */}
        <Col>
          <Button type="text" icon={<ShoppingCartOutlined />} />
          <Button type="text" icon={<HeartOutlined />} />
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={showUserDrawer}
          />
        </Col>
      </Row>

      {/* Alttaki Arama Çubuğu */}
      <div className="search-bar">
        <Input.Search
          placeholder="Arama"
          allowClear
          style={{ width: "100%" }}
        />
      </div>

      {/* Kategoriler Carousel'i */}
      <CategoryCarousel />
      <div>
        <ProductGrid />
      </div>
      <FooterComponent />

      {/* Menü Drawer */}
      <Drawer
        title="Kategoriler"
        placement="left"
        onClose={onClose}
        visible={drawerVisible}
      >
        <List
          dataSource={categories}
          renderItem={(item) => (
            <List.Item>
              <Button type="link" style={{ padding: 0 }}>
                {item}
              </Button>
            </List.Item>
          )}
        />
      </Drawer>

      {/* User Drawer Seçenek */}
      <Drawer
        title="Kullanıcı Seçenekleri"
        placement="right"
        onClose={onUserDrawerClose}
        visible={userDrawerVisible}
      >
        <List
          dataSource={userOptions}
          renderItem={({ label, action, icon }) => (
            <List.Item>
              <Button type="link" style={{ padding: 0 }} onClick={action}>
                {icon}
                <span style={{ marginLeft: 8 }}>{label}</span>
              </Button>
            </List.Item>
          )}
        />
      </Drawer>
    </div>
  );
}

export default MainPage;
