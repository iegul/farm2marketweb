import React, { useState } from "react";
import { Input, Row, Col, Button, Drawer, List, Modal } from "antd";
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
import { useNavigate } from "react-router-dom";
import f2myazı from "../../images/f2myazı.png";
import "./MainPage.css";
import CategoryCarousel from "./categoryCarousel";
import ProductGrid from "./ProductAdd/productGrid";
import FooterComponent from "../footer";
import { useUser } from "../Context/UserContext";
import UrunEkleForm from "./ProductAdd/productAdd";

function MainPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userDrawerVisible, setUserDrawerVisible] = useState(false);
  const [urunEkleVisible, setUrunEkleVisible] = useState(false); //

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  const showUserDrawer = () => setUserDrawerVisible(true);
  const onUserDrawerClose = () => setUserDrawerVisible(false);

  //Ürün Ekleme
  const showUrunEkle = () => setUrunEkleVisible(true);
  const onUrunEkleClose = () => setUrunEkleVisible(false);

  // Kategori Listesi
  const categories = [
    "Sebze",
    "Meyve",
    "Hayvansal Ürünler",
    "Ev Yapımı Ürünler",
    "Dondurulmuş Ürünler",
    "Süt Ürünleri",
  ];

  let userOptions = [
    {
      label: user ? user.userName : "Giriş Yap",
      action: () => navigate(user ? "/profile" : "/login"),
      icon: <UserOutlined />,
    },
  ];

  if (user) {
    if (user.userRole === "Farmer") {
      userOptions = [
        ...userOptions,
        {
          label: "Ürün Ekle",
          icon: <TagOutlined />,
          action: showUrunEkle,
        },
        {
          label: "Satışlarım",
          icon: <TagOutlined />,
        },
      ];
    } else if (user.userRole === "MarketReceiver") {
      userOptions = [
        ...userOptions,
        {
          label: "Alışlarım",
          icon: <DollarOutlined />,
        },
        {
          label: "Ürünlerim",
          icon: <ShoppingOutlined />,
        },
      ];
    }
  } else {
    userOptions = [
      ...userOptions,
      {
        label: "Farm2Market Müşteri Hizmetleri",
        icon: <InfoCircleOutlined />,
      },
    ];
  }

  userOptions.push({
    label: "Çıkış Yap",
    action: () => {
      setUser(null);
      onUserDrawerClose();
    },
    icon: <LogoutOutlined />,
  });

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
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/page-sepet")}
          />
          <Button
            type="text"
            icon={<HeartOutlined />}
            onClick={() => navigate("/page-favori")}
          />
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
      <Modal
        title="Ürün Ekle"
        visible={urunEkleVisible}
        onCancel={onUrunEkleClose}
        footer={null}
      >
        <UrunEkleForm />
      </Modal>
    </div>
  );
}

export default MainPage;
