import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Spin, Input, Carousel, Button } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";

const formatBase64 = (base64String) => {
  if (!base64String || base64String.trim() === "") {
    return "https://via.placeholder.com/150";
  }
  if (!base64String.startsWith("data:image")) {
    return `data:image/jpeg;base64,${base64String}`;
  }
  return base64String;
};

function ProductListPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetProducts"
        );
        if (response.status === 200) {
          setProducts(response.data);

          const filtered = response.data.filter(
            (product) => product.categoryId.toString() === id
          );
          setFilteredProducts(filtered);
        } else {
          setError("Ürünler alınırken bir hata oluştu.");
        }
      } catch (err) {
        setError("Ürünler alınırken bir hata oluştu.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products
      .filter((product) => product.categoryId.toString() === id)
      .filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    setFilteredProducts(filtered);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kategoriye Ait Ürünler</h1>

      <Input
        placeholder="Ürün ara"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div>{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div>Bu kategoriye ait ürün bulunamadı.</div>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <Carousel autoplay style={{ height: "150px" }}>
                    <div>
                      <img
                        alt={product.name}
                        src={formatBase64(
                          product.image1 || product.image2 || product.image3
                        )}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    {product.image2 && (
                      <div>
                        <img
                          alt={product.name}
                          src={formatBase64(product.image2)}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                    {product.image3 && (
                      <div>
                        <img
                          alt={product.name}
                          src={formatBase64(product.image3)}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    )}
                  </Carousel>
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h3 style={{ margin: 0, fontSize: "16px" }}>
                    {product.name}
                  </h3>
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
                  {product.price} ₺
                </p>
                <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                  {product.weightOrAmount && product.unitType
                    ? `${product.weightOrAmount} ${product.unitType}`
                    : "Bilgi yok"}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ProductListPage;
