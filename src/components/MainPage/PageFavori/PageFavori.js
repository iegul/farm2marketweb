import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, message, Spin } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Context/UserContext"; // Kullanıcı bilgilerini almak için context kullanıyoruz

const { Text, Paragraph } = Typography;

const PageFavori = () => {
  const { user } = useUser(); // Kullanıcı bilgilerini almak
  const token = user?.token; // Token'ı user context'ten alıyoruz

  const navigate = useNavigate();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://farmtwomarket.com/api/Favorite/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setFavoriteItems(response.data);
        } else {
          message.error("Favori ürünler yüklenirken bir hata oluştu.");
        }
      } catch (error) {
        setLoading(false);
        if (error.response) {
          if (error.response.status === 401) {
            message.error(
              "Token geçersiz veya süresi dolmuş. Lütfen tekrar giriş yapın."
            );
            navigate("/login");
          } else {
            message.error("Favoriler alınamadı. Lütfen tekrar deneyin.");
          }
        } else {
          message.error("Favoriler alınamadı. Lütfen tekrar deneyin.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemoveFavorite = async (productId) => {
    if (!token) {
      message.error("Lütfen giriş yapın.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `https://farmtwomarket.com/api/Favorite/remove?productId=${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success("Ürün favorilerden silindi.");
        setFavoriteItems(favoriteItems.filter((item) => item.id !== productId));
      } else {
        message.error("Favoriden silme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Card
          style={{
            textAlign: "center",
            padding: "20px",
            maxWidth: "400px",
            margin: "50px auto",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
          }}
        >
          <Row justify="center" style={{ marginBottom: "16px" }}>
            <Text style={{ fontSize: "18px", fontWeight: "bold" }}>
              Favorilerinizi Görüntülemek İçin
            </Text>
          </Row>
          <Row justify="center">
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              style={{
                fontSize: "16px",
                padding: "10px 30px",
                backgroundColor: "#7E8957",
                borderColor: "#7E8957",
                borderRadius: "5px",
              }}
            >
              Giriş Yapın
            </Button>
          </Row>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: "1200px", margin: "0 auto" }}>
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" /> Favoriler yükleniyor...
        </div>
      ) : favoriteItems.length > 0 ? (
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {favoriteItems.map((item) => (
            <Col span={24} key={item.id}>
              <Card
                bordered
                extra={
                  <HeartFilled
                    style={{ color: "red", fontSize: "20px" }}
                    onClick={() => handleRemoveFavorite(item.id)}
                  />
                }
                bodyStyle={{ textAlign: "left" }} // Kart içeriği sola yaslı
              >
                <Row gutter={[16, 16]}>
                  {[item.image1, item.image2, item.image3]
                    .filter((image) => image)
                    .map((image, index) => (
                      <Col key={index} xs={8} sm={8} md={8}>
                        <img
                          src={`data:image/png;base64,${image}`}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </Col>
                    ))}
                </Row>
                <div>
                  <Text strong style={{ textAlign: "left" }}>
                    {item.name}
                  </Text>
                </div>
                <div>
                  <Paragraph style={{ margin: 0, textAlign: "left" }}>
                    {item.description || "Açıklama bulunamadı."}
                  </Paragraph>
                </div>
                <div>
                  <Text style={{ color: "#1890ff", textAlign: "left" }}>
                    {item.weightOrAmount} {item.unitType}
                  </Text>
                </div>
                <div>
                  <Text strong style={{ textAlign: "left" }}>
                    {item.price} ₺
                  </Text>
                </div>
                <div>
                  <Text type="secondary" style={{ textAlign: "left" }}>
                    {item.address}
                  </Text>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <Text type="success" style={{ textAlign: "left" }}>
                    Kalite: {item.quality}
                  </Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          Favori ürün bulunamadı.
        </div>
      )}
    </div>
  );
};

export default PageFavori;
