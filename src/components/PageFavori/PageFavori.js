import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";

const { Text } = Typography;

const favoriteItems = [
  {
    id: 1,
    title: "Domates",
    details: "10₺/kg",
    icon: null,
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    title: "Elma",
    details: "15₺/kg",
    icon: null,
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    title: "Muz",
    details: "20₺/kg",
    icon: null,
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    title: "Üzüm",
    details: "25₺/kg",
    icon: null,
    image: "https://picsum.photos/300/200?random=4",
  },
];

const PageFavori = () => {
  const { user } = useUser(); // Kullanıcı bilgilerini context'ten al
  const navigate = useNavigate();

  // Kullanıcı giriş yapmadıysa yönlendir
  if (!user?.token) {
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
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: "16px" }}>
        {favoriteItems.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              cover={<img alt={item.title} src={item.image} />}
              bordered
              extra={<HeartFilled style={{ color: "red", fontSize: "20px" }} />}
              bodyStyle={{ textAlign: "center" }}
            >
              <div>
                <Text strong>{item.title}</Text>
              </div>
              <div>{item.details}</div>
              {item.icon && <div style={{ marginTop: "8px" }}>{item.icon}</div>}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PageFavori;
