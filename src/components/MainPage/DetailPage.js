import React, { useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProduct = async () => {
    if (!id || id === "0") {
      setError("Geçersiz ürün ID'si.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://farmtwomarket.com/api/Product/GetProductDetails/${id}`
      );

      if (response.status === 200) {
        setProduct(response.data);
      } else {
        setError(
          `Ürün bilgisi alınırken bir hata oluştu. Statü: ${response.status}`
        );
      }
    } catch (error) {
      setError("Veri alınırken bir hata oluştu. Lütfen tekrar deneyin.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Ürün bulunamadı!</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Card
        cover={
          <img
            alt={product.name}
            src={product.imageUrl}
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />
        }
      >
        <h1 style={{ fontSize: "24px", marginBottom: "10px" }}>
          {product.name}
        </h1>
        <h2 style={{ color: "#2F4F2F", marginBottom: "10px" }}>
          {product.price} {product.unitType}
        </h2>
        <p style={{ fontSize: "14px", marginBottom: "20px" }}>
          {product.description || "Açıklama mevcut değil."}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button type="primary" style={{ backgroundColor: "#2F4F2F" }}>
            Satın Al
          </Button>
          <Button
            type="text"
            icon={
              <HeartOutlined style={{ fontSize: "20px", color: "#2F4F2F" }} />
            }
          >
            Favorilere Ekle
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default DetailPage;
