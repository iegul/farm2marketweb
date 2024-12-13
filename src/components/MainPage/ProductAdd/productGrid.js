import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Pagination, message } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const base64ToFile = (base64String, fileName) => {
  const byteCharacters = atob(base64String.split(",")[1]); // Base64 verisini çözüyoruz
  const byteArrays = [];

  // Base64 verisini baytlara ayırıyoruz
  for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
    const byteArray = [];
    for (
      let i = offset;
      i < Math.min(offset + 1024, byteCharacters.length);
      i++
    ) {
      byteArray.push(byteCharacters.charCodeAt(i));
    }
    byteArrays.push(new Uint8Array(byteArray));
  }

  // Baytları kullanarak bir Blob nesnesi oluşturuyoruz
  const blob = new Blob(byteArrays, { type: "image/jpeg" });
  return new File([blob], fileName, { type: "image/jpeg" });
};

// Helper function to download the base64 image as a file
const downloadBase64File = (base64String, fileName) => {
  const link = document.createElement("a"); // Yeni bir <a> etiketi oluşturuyoruz
  link.href = base64String; // Base64 verisini href'ye koyuyoruz
  link.download = fileName; // İndirilen dosyanın adı
  document.body.appendChild(link); // Linki DOM'a ekliyoruz
  link.click(); // Linki tıklatarak dosya indirmesini sağlıyoruz
  document.body.removeChild(link); // Linki DOM'dan kaldırıyoruz
};

function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetProducts"
        );

        if (response.status === 200) {
          setProducts(response.data);
        } else {
          setError("Ürünler yüklenirken bir hata oluştu.");
        }
      } catch (error) {
        setError("Veri alınırken bir hata oluştu.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = products.slice(startIndex, endIndex);

  const handleCardClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading && <div>Loading...</div>}

      {error && <div>{error}</div>}

      {/* Product Grid */}
      <Row gutter={[16, 16]}>
        {currentData.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              onClick={() => handleCardClick(item.id)}
              hoverable
              cover={
                <img
                  alt={item.name}
                  src={`data:image/jpeg;base64,${item.imageUrl}`}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
              style={{
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "16px" }}>{item.name}</h3>
                <Button
                  type="text"
                  icon={
                    <HeartOutlined
                      style={{ fontSize: "20px", color: "#f5222d" }}
                    />
                  }
                />
              </div>
              <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                {item.price} {item.unitType}
              </p>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        total={products.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
}

export default ProductGrid;
