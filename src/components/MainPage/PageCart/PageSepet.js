import React, { useState, useEffect } from "react";
import { Card, Row, Col, message, Spin, Button } from "antd";
import { useUser } from "../../Context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageSepet = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = user?.token;

  const fetchCartItems = async () => {
    if (!token) {
      message.error("Lütfen giriş yapın.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        "https://farmtwomarket.com/api/Cart/GetCart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { cartItems, totalPrice } = response.data;

      setCartItems(cartItems);
      setTotalPrice(totalPrice);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };
  const handleCreateOrder = async () => {
    if (!token) {
      message.error("Lütfen giriş yapın.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://farmtwomarket.com/api/Cart/CreateOrderFromCart",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Sipariş başarıyla oluşturuldu!");
        const order = response.data;
        navigate("/orderSummary", { state: { order } });
      }
    } catch (error) {
      console.error(
        "Error creating order:",
        error.response?.data || error.message
      );
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      fetchCartItems();
    }
  }, [token]);

  const handleRemoveItem = async (cartItemId) => {
    if (!token) {
      message.error("Lütfen giriş yapın.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.delete(
        `https://farmtwomarket.com/api/Cart/RemoveCartItem/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Ürün sepetten silindi.");
        fetchCartItems();
      } else {
        message.error("Sepetten silme işlemi başarısız oldu.");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <Card title="Sepetiniz" bordered>
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <Row gutter={[16, 16]}>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <Col key={item.cartItemId} span={24}>
                    <Card bordered>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <strong>{item.productName}</strong>
                        </div>
                        <Button
                          type="danger"
                          onClick={() => handleRemoveItem(item.cartItemId)}
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#F5222D",
                            color: "#FFFFFF",
                          }}
                        >
                          Sil
                        </Button>
                      </div>
                      <div>
                        <strong>Fiyat:</strong> {item.unitPrice}₺
                      </div>
                      <div>
                        <strong>Miktar:</strong> {item.weightOrAmount}
                      </div>
                      <div>
                        <strong>Ürün Toplam Fiyatı:</strong> {item.totalPrice}₺
                      </div>
                    </Card>
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Card bordered>
                    <div>Sepetinizde ürün bulunmamaktadır.</div>
                  </Card>
                </Col>
              )}
            </Row>

            {/* Sepet Toplam */}
            <div
              style={{
                marginTop: "16px",
                textAlign: "right",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>Genel Toplam Tutar: {totalPrice}₺</strong>
              </div>
              <Button
                type="primary"
                onClick={handleCreateOrder}
                style={{ backgroundColor: "#4CAF50" }}
              >
                Sepeti Onayla
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default PageSepet;
