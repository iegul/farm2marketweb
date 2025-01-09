import React from "react";
import { Card, Row, Col, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Context/UserContext";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  const token = user?.token;
  const order = location.state?.order;

  const handlePayment = async () => {
    if (!order) {
      message.error("Sipariş bilgisi bulunamadı.");
      return;
    }

    if (!token) {
      message.error("Lütfen giriş yapın.");
      return;
    }

    try {
      const response = await axios.post(
        "https://farmtwomarket.com/api/Payment/CreateCheckoutSession",
        { orderId: order.orderId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data?.url) {
        const paymentWindow = window.open(response.data.url, "_blank");

        setTimeout(() => {
          if (paymentWindow && !paymentWindow.closed) {
            paymentWindow.close();
          }
          message.success("Ödemeniz tamamlanmıştır!");
          navigate("/marketalislarim");
        }, 20000);
      } else {
        message.error("Ödeme için yönlendirme yapılamadı.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        message.error("Yetkilendirme başarısız. Lütfen yeniden giriş yapın.");
        console.error("Token expired or invalid:", error.response?.data);
      } else {
        message.error("Ödeme işlemi sırasında bir hata oluştu.");
        console.error("Payment Error:", error.response?.data || error.message);
      }
    }
  };

  if (!order) {
    return <div>Sipariş bilgisi bulunamadı.</div>;
  }

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <Card title="Sipariş Özeti" bordered>
        <div>
          <strong>Sipariş Tarihi:</strong>{" "}
          {new Date(order.orderDate).toLocaleString()}
        </div>
        <div>
          <strong>Genel Toplam:</strong> {order.totalPrice}₺
        </div>
        <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
          {order.items.map((item, index) => (
            <Col key={index} span={24}>
              <Card bordered>
                <div>
                  {" "}
                  <strong>Ürün Adı :</strong>
                  {item.productName}
                </div>
                <div>
                  <strong>Miktar :</strong> {item.quantity}
                </div>
                <div>
                  <strong>Birim Fiyat: </strong>
                  {item.price}₺
                </div>
                <div>
                  <strong>Toplam: </strong>
                  {item.total}₺
                </div>
              </Card>
            </Col>
          ))}
        </Row>
        <div
          style={{
            marginTop: "16px",
            textAlign: "right",
          }}
        >
          <Button
            type="primary"
            onClick={handlePayment}
            style={{
              backgroundColor: "#4CAF50",
              color: "#FFFFFF",
            }}
          >
            Ödemeye Geç
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OrderSummary;
