import React from "react";
import { Card, Row, Col, Button, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const saleItems = [
  {
    id: 1,
    title: "Domates",
    details: "10₺/kg",
    price: "100₺",
    estimatedDate: "Teslim Tarihi: 22/11/2024",
    images: [
      "https://picsum.photos/300/200?random=1",
      "https://picsum.photos/300/200?random=2",
      "https://picsum.photos/300/200?random=3",
    ],
    icon: <CheckCircleOutlined style={{ color: "green" }} />,
  },
  {
    id: 2,
    title: "Salatalık",
    details: "10₺/kg",
    price: "200₺",
    estimatedDate: "Teslim Tarihi: 24/11/2024",
    images: [
      "https://picsum.photos/300/200?random=4",
      "https://picsum.photos/300/200?random=5",
      "https://picsum.photos/300/200?random=6",
    ],
    icon: null,
  },
];

const SaleProduct = () => {
  const navigate = useNavigate();

  const totalPrice = saleItems.reduce(
    (sum, item) => sum + parseInt(item.price.replace("₺", "")),
    0
  );

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <Button type="link" onClick={() => navigate("/mainPage")}>
        ← Ana Sayfa
      </Button>
      <Card
        title={<Text strong>Satış Yapılan Ürünler</Text>}
        bordered
        style={{ marginTop: "16px" }}
      >
        <Row gutter={[16, 16]}>
          {saleItems.map((item) => (
            <Col key={item.id} span={24}>
              <Card bordered bodyStyle={{ textAlign: "left" }}>
                <div>
                  <Text strong>{item.title}</Text>
                </div>
                <div>{item.details}</div>
                <div>
                  <Text strong>{item.price}</Text>
                </div>
                <div>{item.estimatedDate}</div>

                {/* Display images side by side */}
                <Row gutter={[8, 8]} style={{ marginTop: "8px" }}>
                  {item.images.map((image, index) => (
                    <Col key={index} span={8}>
                      <img
                        alt={`${item.title}-${index}`}
                        src={image}
                        style={{
                          width: "100%",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                  ))}
                </Row>

                {item.icon && (
                  <div style={{ marginTop: "8px" }}>{item.icon}</div>
                )}
              </Card>
            </Col>
          ))}
        </Row>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <Text strong>Toplam Satış: {totalPrice}₺</Text>
        </div>
      </Card>
    </div>
  );
};

export default SaleProduct;
