import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Context/UserContext";

const { Text } = Typography;

const SaleProduct = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useUser();
  const token = user?.token;

  useEffect(() => {
    const fetchSales = async () => {
      if (!token) {
        message.error("Lütfen giriş yapın.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Cart/GetSoldOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200 && Array.isArray(response.data)) {
          setSales(response.data);
        } else {
          message.error("Satış verileri yüklenemedi.");
        }
      } catch (error) {
        console.error("API Hatası:", error.response?.data || error.message);
        message.error("Satış verilerini çekerken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, [token]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Button type="link" onClick={() => navigate("/mainPage")}>
          ← Ana Sayfa
        </Button>
        <Card title={<Text strong>Satış Yapılan Ürünler</Text>} bordered>
          <Text>Henüz satış yapılmış bir ürün bulunmamaktadır.</Text>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <Card
        title={<Text strong>Satış Yapılan Ürünler</Text>}
        bordered
        style={{ marginTop: "16px" }}
      >
        <Row gutter={[16, 16]}>
          {sales.map((sale) => (
            <Col key={sale.orderId} span={24}>
              <Card bordered bodyStyle={{ textAlign: "left" }}>
                <div>
                  <Text strong>Sipariş Tarihi: </Text>{" "}
                  {new Date(sale.orderDate).toLocaleDateString()}
                </div>
                <div>
                  <Text strong>Market: </Text> {sale.marketReceiverName}
                </div>

                <div style={{ marginTop: "16px" }}>
                  <Text strong>Ürünler:</Text>
                  {sale.products.map((product, index) => (
                    <div
                      key={index}
                      style={{ marginTop: "8px", paddingLeft: "16px" }}
                    >
                      <Text>
                        {product.name} - {product.quantity} adet -{" "}
                        {(product.price * product.quantity).toFixed(2)}₺
                      </Text>
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

export default SaleProduct;
