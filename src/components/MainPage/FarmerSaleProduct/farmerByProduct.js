import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, Typography, Spin, message } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import UpdateProductModal from "./UpdateProductModal"; // Yeni modal bileşeni

const { Text } = Typography;

const FarmerByProduct = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [updateFields, setUpdateFields] = useState({});

  useEffect(() => {
    const fetchFarmerProducts = async () => {
      try {
        const token = user.token;

        if (!token) {
          message.error("Token bulunamadı. Lütfen giriş yapın.");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetProductsByFarmer",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          message.error(
            "Oturumunuzun süresi dolmuş. Lütfen tekrar giriş yapın."
          );
          navigate("/login");
        } else {
          message.error(
            "Ürünler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerProducts();
  }, [user.token, navigate]);

  const handleUpdate = async () => {
    try {
      const token = user.token;

      if (!token) {
        message.error("Token bulunamadı. Lütfen giriş yapın.");
        navigate("/login");
        return;
      }

      const response = await axios.put(
        `https://farmtwomarket.com/api/Product/UpdateProduct?id=${updatingProduct.id}`,
        { ...updateFields, id: updatingProduct.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatingProduct.id ? response.data : product
        )
      );

      message.success("Ürün başarıyla güncellendi.");
      setUpdatingProduct(null); // Güncelleme modali kapat
    } catch (error) {
      console.error("API Response Error:", error.response);
      message.error("Ürün güncellenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      const token = user.token;

      if (!token) {
        message.error("Token bulunamadı. Lütfen giriş yapın.");
        navigate("/login");
        return;
      }

      await axios.delete(
        `https://farmtwomarket.com/api/Product/SoftDeleteProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Silinen ürünü listeden kaldır
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      message.success("Ürün başarıyla silindi.");
    } catch (error) {
      console.error("Soft Delete Hatası:", error);
      message.error("Ürün silinirken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const openUpdateModal = (product) => {
    setUpdatingProduct(product);
    setUpdateFields(product); // Modal için mevcut ürün bilgilerini set et
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "16px", maxWidth: "900px", margin: "0 auto" }}>
      <Button type="link" onClick={() => navigate("/mainPage")}>
        ← Ana Sayfa
      </Button>
      <Card
        title={<Text strong>Eklenen Ürünler</Text>}
        bordered
        style={{ marginTop: "16px" }}
      >
        {products.length === 0 ? (
          <Text>Kullanıcıya ait ürün bulunamadı.</Text>
        ) : (
          <Row gutter={[16, 16]}>
            {products.map((product) => (
              <Col key={product.id} span={24}>
                <Card
                  bordered
                  bodyStyle={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column", // Stack the card content vertically
                    alignItems: "flex-start", // Align the content to the left
                  }}
                >
                  {product.image1 || product.image2 || product.image3 ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px", // Add spacing below the images
                        justifyContent: "flex-start", // Align images to the left
                      }}
                    >
                      {[product.image1, product.image2, product.image3].map(
                        (image, index) =>
                          image ? (
                            <img
                              key={index}
                              src={`data:image/png;base64,${image}`}
                              alt={`product-${index}`}
                              style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "5px",
                                border: "1px solid #ddd",
                              }}
                            />
                          ) : null
                      )}
                    </div>
                  ) : null}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column", // Stack text and buttons vertically
                      alignItems: "flex-start", // Align text and buttons to the left
                    }}
                  >
                    <Text strong>{product.name}</Text>
                    <Text>{product.price}₺</Text>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "flex-end", // Align buttons to the right
                      }}
                    >
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => openUpdateModal(product)}
                        style={{
                          backgroundColor: "#4CAF50", // Green
                          color: "white",
                        }}
                      >
                        Düzenle
                      </Button>
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(product.id)}
                        style={{
                          backgroundColor: "#f44336", // Red
                          color: "white",
                        }}
                      >
                        Sil
                      </Button>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card>

      <UpdateProductModal
        visible={!!updatingProduct}
        onCancel={() => setUpdatingProduct(null)}
        onOk={handleUpdate}
        product={updatingProduct}
        updateFields={updateFields}
        setUpdateFields={setUpdateFields}
      />
    </div>
  );
};

export default FarmerByProduct;
