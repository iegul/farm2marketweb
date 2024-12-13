import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const sepetItems = [
  {
    id: 1,
    title: "Domates",
    details: "10₺/kg",
    price: "100₺",
    estimatedDate: "Teslim Tarihi: 22/11/2024",
    image: "https://picsum.photos/300/200?random=1",
    icon: <CheckCircleOutlined style={{ color: "green" }} />,
  },
  {
    id: 2,
    title: "Salatalık",
    details: "10₺/kg",
    price: "200₺",
    estimatedDate: "Teslim Tarihi: 24/11/2024",
    image: "https://picsum.photos/200/100?random=2",
    icon: null,
  },
];

const PageSepet = () => {
  const navigate = useNavigate();
  const totalPrice = sepetItems.reduce(
    (sum, item) => sum + parseInt(item.price),
    0
  );

  return (
    <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto" }}>
      <Button type="link" onClick={() => navigate("/mainPage")}>
        ← Ana Sayfa
      </Button>
      <Card
        title={<Text strong>Sepetiniz</Text>}
        bordered
        style={{ marginTop: "16px" }}
      >
        <Row gutter={[16, 16]}>
          {sepetItems.map((item) => (
            <Col key={item.id} span={24}>
              <Card
                bordered
                cover={<img alt={item.title} src={item.image} />}
                bodyStyle={{ textAlign: "left" }}
              >
                <div>
                  <Text strong>{item.title}</Text>
                </div>
                <div>{item.details}</div>
                <div>
                  <Text strong>{item.price}</Text>
                </div>
                <div>{item.estimatedDate}</div>
                {item.icon && (
                  <div style={{ marginTop: "8px" }}>{item.icon}</div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <Text strong>Toplam Tutar: {totalPrice}₺</Text>
        </div>
        <Button
          type="primary"
          style={{
            display: "block",
            margin: "16px auto",
          }}
        >
          Sepeti Onayla
        </Button>
      </Card>
    </div>
  );
};

export default PageSepet;
