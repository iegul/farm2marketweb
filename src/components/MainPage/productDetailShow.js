import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row, Carousel } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext"; // UserContext'i kullanarak kullanıcı bilgilerini al

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
  const { user } = useUser(); // Giriş yapan kullanıcı bilgilerini al

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

  const handleAddToCart = () => {
    navigate("/page-sepet");
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          maxWidth: "800px",
          width: "100%",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {product && (
          <Row gutter={[16, 16]} justify="center">
            {/* Carousel */}
            <Col span={24}>
              <Card>
                <Carousel autoplay>
                  {["image1", "image2", "image3"]
                    .map((key) => product[key])
                    .filter((image) => image)
                    .map((image, index) => (
                      <div key={index}>
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
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>
                  Fiyat: {product.price} {product.unitType}
                </p>
                <p>Adres: {product.address}</p>
                <p>Ağırlık/Miktar: {product.weightOrAmount}</p>
                <Button
                  type="primary"
                  icon={<HeartOutlined />}
                  style={{
                    backgroundColor: "#52c41a",
                    borderColor: "#52c41a",
                    marginRight: "10px",
                  }}
                >
                  Favorilere Ekle
                </Button>
              </Card>
            </Col>

            {/* Çiftçi Kartı 
            <Col span={24}>
              <Card title="Ekleyen Çiftçi">
                <p>Çiftçi Adı: {user.userName || "Bilinmiyor"}</p>
                <p>Adres: {product.address}</p>
              </Card>
            </Col>
*/}
            {/* Sepete Ekle Butonu */}
            <Col span={24}>
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
          </Row>
        )}
      </div>
    </div>
  );
}

export default ProductDetailShow;
