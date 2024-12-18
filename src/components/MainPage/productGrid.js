import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Pagination, Carousel, Input } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Base64 image formatting function
const formatBase64 = (base64String) => {
  if (!base64String || base64String.trim() === "") {
    return "https://via.placeholder.com/150"; // Default image if no base64 string
  }
  if (!base64String.startsWith("data:image")) {
    return `data:image/jpeg;base64,${base64String}`;
  }
  return base64String;
};

function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const pageSize = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory
          ? `https://farmtwomarket.com/api/Product/GetProducts?category=${selectedCategory}`
          : "https://farmtwomarket.com/api/Product/GetProducts";
        const response = await axios.get(url);
        if (response.status === 200) {
          console.log("Products:", response.data);
          setProducts(response.data);
        } else {
          setError("Error while fetching products.");
        }
      } catch (error) {
        setError("An error occurred while fetching products.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredProducts.slice(startIndex, endIndex);

  const handleCardClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Search Input */}
      <Input
        placeholder="Search for a product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: "20px", width: "100%" }}
      />

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <Row gutter={[16, 16]}>
        {currentData.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              onClick={() => handleCardClick(item.id)}
              style={{
                width: "100%",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              <Carousel autoplay style={{ height: "150px" }}>
                <div>
                  <img
                    alt={item.name}
                    src={formatBase64(
                      item.image1 || item.image2 || item.image3
                    )}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                {item.image2 && (
                  <div>
                    <img
                      alt={item.name}
                      src={formatBase64(item.image2)}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                {item.image3 && (
                  <div>
                    <img
                      alt={item.name}
                      src={formatBase64(item.image3)}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
              </Carousel>

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

      <Pagination
        current={currentPage}
        total={filteredProducts.length}
        pageSize={pageSize}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
}

export default ProductGrid;
