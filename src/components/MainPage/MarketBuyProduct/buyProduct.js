import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Context/UserContext"; // Token için

const { Text } = Typography;

const BuyProduct = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser(); // Kullanıcıdan token alınır
  const token = user?.token;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        message.error("Lütfen giriş yapın.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Cart/GetPaidOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200 && Array.isArray(response.data)) {
          setOrders(response.data);
        } else {
          message.error("Siparişler yüklenemedi.");
        }
      } catch (error) {
        console.error("Fetch Error:", error.response?.data || error.message);
        message.error("Siparişleri çekerken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Button type="link" onClick={() => navigate("/mainPage")}>
          ← Ana Sayfa
        </Button>
        <Card title={<Text strong>Satın Alınan Ürünler</Text>} bordered>
          <Text>Henüz satın alınmış bir ürün bulunmamaktadır.</Text>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <Button type="link" onClick={() => navigate("/mainPage")}>
        ← Ana Sayfa
      </Button>
      <Card
        title={<Text strong>Satın Alınan Ürünler</Text>}
        bordered
        style={{ marginTop: "16px" }}
      >
        <Row gutter={[16, 16]}>
          {orders.map((order) => (
            <Col key={order.orderId} span={24}>
              <Card bordered bodyStyle={{ textAlign: "left" }}>
                <div>
                  <Text strong>Sipariş Tarihi: </Text>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </div>
                <div>
                  <Text strong>Toplam Fiyat: </Text> {order.totalPrice}₺
                </div>

                <div style={{ marginTop: "16px" }}>
                  <Text strong>Ürünler:</Text>
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "8px", paddingLeft: "16px" }}
                    >
                      <Text>{item.productName}</Text> - {item.quantity} adet -{" "}
                      {item.price}₺
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
};

export default BuyProduct;
