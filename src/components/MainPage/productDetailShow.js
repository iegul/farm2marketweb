import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row, Carousel, InputNumber, message } from "antd";
import { HeartOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import FooterComponent from "../footercomponent";
import { useUser } from "../Context/UserContext";

const formatBase64 = (base64String) => {
  if (!base64String) {
    return "https://via.placeholder.com/150"; // Varsayılan bir görsel
  }
  if (!base64String.startsWith("data:image")) {
    return `data:image/jpeg;base64,${base64String}`;
  }
  return base64String;
};

function ProductDetailShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const { addToCart } = useCart(); // Sepet yönetimi için context
  const { user } = useUser();
  const token = user?.token;

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetProducts"
        );

        if (response.status === 200) {
          const productDetail = response.data.find(
            (item) => item.id === parseInt(id)
          );

          if (productDetail) {
            setProduct(productDetail);
          } else {
            setError("Ürün bulunamadı.");
          }
        } else {
          setError("Ürünler yüklenirken bir hata oluştu.");
        }
      } catch (error) {
        console.error("Error occurred: ", error);
        setError("Veri alınırken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleAddToCart = async () => {
    try {
      // Token kontrolü
      if (!token) {
        message.error("Sepete ürün eklemek için giriş yapmalısınız.");
        return; // Token yoksa işlemi durdur
      }

      // Payload verisini oluşturuyoruz
      const payload = {
        productId: product.id,
        weightOrAmount: quantity,
      };

      console.log("Gönderilen payload:", payload);

      // API'ye POST isteği gönderiyoruz
      const response = await axios.post(
        "https://farmtwomarket.com/api/Cart/AddToCart",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Başarılı işlem sonrası
      if (response.status === 200) {
        console.log("Ürün başarıyla sepete eklendi:", response.data);
        message.success("Ürün sepete başarıyla eklendi!");
        navigate("/page-sepet"); // Sepet sayfasına yönlendirme
      } else {
        console.error("Sepete eklerken bir hata oluştu:", response.status);
        message.error("Sepete eklerken bir hata oluştu.");
      }
    } catch (error) {
      console.error("API hatası:", error.response || error.message);
      message.error("Sepete eklerken bir hata oluştu.");
    }
  };

  const handleAddToFavorites = async () => {
    try {
      if (!token) {
        message.error("Favorilere eklemek için giriş yapmalısınız.");
        return;
      }

      console.log("Adding to favorites:", product.id);
      const response = await axios.post(
        `https://farmtwomarket.com/api/Favorite/Add?productId=${product.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      if (response.status === 200) {
        message.success("Ürün favorilere başarıyla eklendi!");
      } else {
        message.error("Favorilere ekleme başarısız oldu.");
      }
    } catch (error) {
      console.error(
        "Error while adding to favorites:",
        error.response?.data || error.message
      );
      message.error(
        error.response?.data?.message || "Favorilere eklerken bir hata oluştu."
      );
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button
        icon={<ArrowLeftOutlined />}
        style={{
          marginBottom: "20px",
          backgroundColor: "#342E20",
          color: "#fff",
          border: "none",
        }}
        onClick={() => navigate("/mainPage")}
      >
        Geri
      </Button>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {product && (
          <Row gutter={[16, 16]} justify="center">
            <Col span={24}>
              <Card>
                <Carousel autoplay>
                  {["image1", "image2", "image3"]
                    .map((key) => product[key])
                    .filter((image) => image)
                    .map((image, index) => (
                      <div key={index} style={{ position: "relative" }}>
                        <img
                          alt={`Ürün Resmi ${index + 1}`}
                          src={formatBase64(image)}
                          style={{
                            height: "300px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                </Carousel>
                {/* Favorilere Ekle Butonu */}
                {user?.userRole === "MarketReceiver" && (
                  <Button
                    icon={<HeartOutlined />}
                    shape="circle"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#f5222d",
                      color: "#fff",
                      border: "none",
                      zIndex: 1,
                    }}
                    onClick={handleAddToFavorites}
                  />
                )}

                <h2>{product.name}</h2>
                <p>
                  <strong>Açıklama:</strong> {product.description}
                </p>
                <p>
                  <strong>Fiyat:</strong> {product.price} ₺
                </p>
                <p>
                  <strong>Adres:</strong> {product.address}
                </p>
                <p>
                  <strong>Ağırlık/Miktar:</strong> {product.weightOrAmount}{" "}
                  {product.unitType}
                </p>
                <Row align="middle" gutter={[16, 16]}>
                  {user?.userRole === "MarketReceiver" && (
                    <>
                      <Col span={12}>
                        <InputNumber
                          min={1}
                          max={product.stockAmount} // Ürün stok miktarına göre max değeri ayarlıyoruz
                          value={quantity}
                          onChange={(value) => setQuantity(value)}
                          style={{ width: "100%" }}
                        />
                      </Col>
                      <Col span={12}>
                        <Button
                          type="primary"
                          style={{
                            width: "100%",
                            backgroundColor: "#52c41a",
                            borderColor: "#52c41a",
                          }}
                          onClick={handleAddToCart}
                        >
                          Sepete Ekle
                        </Button>
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>
        )}
        <FooterComponent />
      </div>
    </div>
  );
}

export default ProductDetailShow;
