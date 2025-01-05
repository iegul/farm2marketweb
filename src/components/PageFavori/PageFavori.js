import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, message, Spin } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext"; // Kullanıcı bilgilerini almak için context kullanıyoruz

const { Text, Paragraph } = Typography;

const PageFavori = () => {
  const { user } = useUser(); // Kullanıcı bilgilerini almak
  const token = user?.token; // Token'ı user context'ten alıyoruz

  const navigate = useNavigate();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Token yoksa login sayfasına yönlendiriyoruz
    if (!token) {
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true); // Yükleniyor durumu başlatılıyor
        const response = await axios.get(
          "https://farmtwomarket.com/api/Favorite/favorites", // API URL
          {
            headers: {
              Authorization: `Bearer ${token}`, // Token gönderimi
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setFavoriteItems(response.data); // Favori ürünleri state'e set et
        } else {
          message.error("Favori ürünler yüklenirken bir hata oluştu.");
        }
      } catch (error) {
        setLoading(false); // Yükleme bitiyor
        if (error.response) {
          if (error.response.status === 401) {
            message.error(
              "Token geçersiz veya süresi dolmuş. Lütfen tekrar giriş yapın."
            );
            navigate("/login"); // Kullanıcıyı login sayfasına yönlendir
          } else {
            message.error("Favoriler alınamadı. Lütfen tekrar deneyin.");
          }
        } else {
          message.error("Favoriler alınamadı. Lütfen tekrar deneyin.");
        }
      } finally {
        setLoading(false); // Yükleme tamamlandı
      }
    };

    fetchFavorites();
  }, [token]); // Token değiştiğinde tekrar çalıştırılır

  // Favori ürünleri silmek için fonksiyon
  const handleRemoveFavorite = async (productId) => {
    if (!token) {
      message.error("Lütfen giriş yapın.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `https://farmtwomarket.com/api/Favorite/remove?productId=${productId}`, // DELETE isteği
        {
          headers: {
            Authorization: `Bearer ${token}`, // Token gönderimi
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success("Ürün favorilerden silindi.");
        setFavoriteItems(favoriteItems.filter((item) => item.id !== productId)); // Favorilerden silinen öğeyi state'den çıkar
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

  // Eğer token yoksa, login yapılması için kullanıcıyı yönlendiriyoruz
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
      <Button type="link" onClick={() => navigate("/mainPage")}>
        ← Ana Sayfa
      </Button>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <Spin size="large" /> Favoriler yükleniyor...
        </div>
      ) : favoriteItems.length > 0 ? (
        <Row gutter={[16, 16]} justify="center" style={{ marginTop: "16px" }}>
          {favoriteItems.map((item) => (
            <Col span={24} key={item.id}>
              <Card
                bordered
                extra={
                  <HeartFilled
                    style={{ color: "red", fontSize: "20px" }}
                    onClick={() => handleRemoveFavorite(item.id)} // Favoriden silme işlemi
                  />
                }
                bodyStyle={{ textAlign: "center" }}
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
                  <Text strong>{item.name}</Text>
                </div>
                <div>
                  <Paragraph style={{ margin: 0 }}>
                    {item.description || "Açıklama bulunamadı."}
                  </Paragraph>
                </div>
                <div>
                  <Text style={{ color: "#1890ff" }}>
                    {item.weightOrAmount} {item.unitType}
                  </Text>
                </div>
                <div>
                  <Text strong>{item.price} ₺</Text>
                </div>
                <div>
                  <Text type="secondary">{item.address}</Text>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <Text type="success">Kalite: {item.quality}</Text>
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
