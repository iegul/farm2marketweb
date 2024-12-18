import React, { useState, useEffect } from "react";
import { Input, Row, Col, Button, Drawer, List, Modal, Spin } from "antd";
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
import ProductGrid from "./productGrid";
import FooterComponent from "../footer";
import { useUser } from "../Context/UserContext";
import UrunEkleForm from "./ProductAdd/productAdd";
import axios from "axios";

function MainPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userDrawerVisible, setUserDrawerVisible] = useState(false);
  const [urunEkleVisible, setUrunEkleVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]); // Kategoriler için state
  const [loading, setLoading] = useState(true); // Yükleme durumu

  useEffect(() => {
    // Kategorileri API'den çek
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetCategory"
        );
        setCategories(response.data.map((category) => category.name)); // Sadece isimleri al
        setLoading(false);
      } catch (error) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  const showUserDrawer = () => setUserDrawerVisible(true);
  const onUserDrawerClose = () => setUserDrawerVisible(false);

  // Ürün Ekleme
  const showUrunEkle = () => setUrunEkleVisible(true);
  const onUrunEkleClose = () => setUrunEkleVisible(false);

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
          action: () => navigate("/addProduct"),
        },
        {
          label: "Satışlarım",
          icon: <TagOutlined />,
          action: () => navigate("/farmersatislarim"),
        },
        {
          label: "Ürünlerim",
          icon: <ShoppingOutlined />,
          action: () => navigate("/farmerurunler"),
        },
      ];
    } else if (user.userRole === "MarketReceiver") {
      userOptions = [
        ...userOptions,
        {
          label: "Alışlarım",
          icon: <DollarOutlined />,
          action: () => navigate("/marketalislarim"),
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
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    // Navigate to a page with the selected category ID in the URL
    navigate(`/category/${categoryId}`);
  };
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
          {/* Sepet İkonu - Farmer haricinde kullanıcılar için */}
          {(!user || user.userRole !== "Farmer") && (
            <Button
              type="text"
              icon={<ShoppingCartOutlined />}
              onClick={() => navigate("/page-sepet")}
            />
          )}

          {/* Favori İkonu - Farmer haricinde kullanıcılar için */}
          {(!user || user.userRole !== "Farmer") && (
            <Button
              type="text"
              icon={<HeartOutlined />}
              onClick={() => navigate("/page-favori")}
            />
          )}

          {/* Kullanıcı İkonu */}
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={showUserDrawer}
          />
        </Col>
      </Row>

      {/* Kategoriler Carousel'i */}
      <CategoryCarousel onCategorySelect={handleCategorySelect} />
      <div>
        <ProductGrid selectedCategory={selectedCategory} />
      </div>
      <FooterComponent />

      {/* Menü Drawer */}
      <Drawer
        title="Kategoriler"
        placement="left"
        onClose={onClose}
        visible={drawerVisible}
      >
        {loading ? (
          <Spin /> // Yükleniyor göstergesi
        ) : (
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
        )}
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
