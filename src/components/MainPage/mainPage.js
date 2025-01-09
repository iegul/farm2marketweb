import React, { useState, useEffect } from "react";
import { Row, Col, Button, Drawer, Modal, Spin, List } from "antd";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import f2myazı from "../../images/f2myazı.png";
import "./MainPage.css";
import CategoryCarousel from "./categoryCarousel";
import ProductGrid from "./productGrid";
import FooterComponent from "./footercomponent";
import { useUser } from "../Context/UserContext";
import UrunEkleForm from "./RoleFarmer/productAdd";
import UserOptions from "./UserOptions";
import axios from "axios";

function MainPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [userDrawerVisible, setUserDrawerVisible] = useState(false);
  const [urunEkleVisible, setUrunEkleVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Seçilen kategori
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]); // Ürünlerin state'i
  const [error, setError] = useState(null); // Hatalar için state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetCategory"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://farmtwomarket.com/api/Product/GetProducts"
      );
      if (response.status === 200) {
        // Eğer bir kategori seçildiyse ürünleri ön tarafta filtrele
        const filteredProducts = selectedCategory
          ? response.data.filter(
              (product) => product.categoryId === selectedCategory
            )
          : response.data;

        setProducts(filteredProducts);
      } else {
        setError("Ürünler alınırken bir hata oluştu.");
      }
    } catch (error) {
      setError("Ürünler alınırken bir hata oluştu.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showDrawer = () => setDrawerVisible(true);
  const onClose = () => setDrawerVisible(false);
  const showUserDrawer = () => setUserDrawerVisible(true);
  const onUserDrawerClose = () => setUserDrawerVisible(false);
  const showUrunEkle = () => setUrunEkleVisible(true);
  const onUrunEkleClose = () => setUrunEkleVisible(false);

  // Kategori seçildiğinde yönlendirme işlemi
  const handleCategorySelect = (categoryId) => {
    navigate(`/product/${categoryId}`); // Kategori ID'si ile yönlendirme yap
  };

  return (
    <div className="main-page-container">
      <Row align="middle" justify="space-between" className="main-page-header">
        <Col>
          <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} />
        </Col>
        <Col>
          <img src={f2myazı} alt="Logo" className="logo-image" />
        </Col>
        <Col>
          {(!user ||
            (user.userRole !== "Farmer" && user.userRole !== "Admin")) && (
            <>
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
            </>
          )}
          <Button
            type="text"
            icon={<UserOutlined />}
            onClick={showUserDrawer}
          />
        </Col>
      </Row>
      <CategoryCarousel onCategorySelect={handleCategorySelect} />
      <div>
        <ProductGrid selectedCategory={selectedCategory} />
      </div>
      <FooterComponent />
      <Drawer
        title="Kategoriler"
        placement="left"
        onClose={onClose}
        visible={drawerVisible}
      >
        {loading ? (
          <Spin />
        ) : (
          <List
            dataSource={categories}
            renderItem={(item) => (
              <List.Item>
                <Button
                  type="link"
                  style={{ padding: 0, color: "#4caf50" }}
                  onClick={() => handleCategorySelect(item.id)}
                >
                  {item.name}
                </Button>
              </List.Item>
            )}
          />
        )}
      </Drawer>
      <Drawer
        title="Kullanıcı Seçenekleri"
        placement="right"
        onClose={onUserDrawerClose}
        visible={userDrawerVisible}
      >
        <UserOptions user={user} setUser={setUser} />
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
