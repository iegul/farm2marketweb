import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Pagination,
  Carousel,
  Input,
  message,
} from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext";

const formatBase64 = (base64String) => {
  if (!base64String || base64String.trim() === "") {
    return "https://via.placeholder.com/150";
  }
  if (!base64String.startsWith("data:image")) {
    return `data:image/jpeg;base64,${base64String}`;
  }
  return base64String;
};
function ProductGrid({ selectedCategory }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 8;
  const navigate = useNavigate();
  const { user } = useUser();
  const token = user?.token;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = selectedCategory
          ? `https://farmtwomarket.com/api/Product/GetProducts?category=${selectedCategory}`
          : "https://farmtwomarket.com/api/Product/GetProducts";
        const response = await axios.get(url);
        if (response.status === 200) {
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

    const fetchFavorites = async () => {
      if (!token) return;
      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Favorite/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setFavorites(response.data.map((item) => item.id));
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchProducts();
    fetchFavorites();
  }, [selectedCategory, token]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = filteredProducts.slice(startIndex, endIndex);

  const handleCardClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const toggleFavorite = async (productId) => {
    if (!token) {
      message.error("You need to log in to manage favorites.");
      return;
    }

    const isCurrentlyFavorite = favorites.includes(productId);

    try {
      if (isCurrentlyFavorite) {
        await axios.delete(
          `https://farmtwomarket.com/api/Favorite/remove?productId=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites(favorites.filter((id) => id !== productId));
        message.success("Product removed from favorites.");
      } else {
        await axios.post(
          `https://farmtwomarket.com/api/Favorite/Add?productId=${productId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFavorites([...favorites, productId]);
        message.success("Product added to favorites.");
      }
    } catch (error) {
      console.error("Error managing favorite:", error);
      message.error("An error occurred while managing favorites.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
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
                {user?.userRole === "MarketReceiver" && (
                  <Button
                    type="text"
                    icon={
                      favorites.includes(item.id) ? (
                        <HeartFilled
                          style={{ fontSize: "20px", color: "#f5222d" }}
                        />
                      ) : (
                        <HeartOutlined
                          style={{ fontSize: "20px", color: "#f5222d" }}
                        />
                      )
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  />
                )}
              </div>

              <p style={{ margin: 0, fontSize: "14px", color: "#4CAF50" }}>
                {item.price.toFixed(2)}₺
              </p>
              <p style={{ margin: 0, fontSize: "14px", color: "#333" }}>
                {item.weightOrAmount && item.unitType
                  ? `${item.weightOrAmount} ${item.unitType}`
                  : "Bilgi yok"}
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
