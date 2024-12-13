import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { HeartFilled, CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const favoriteItems = [
  {
    id: 1,
    title: "Domates",
    details: "10₺/kg",
    icon: <CheckCircleOutlined style={{ color: "green" }} />,
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
  const navigate = useNavigate();

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
