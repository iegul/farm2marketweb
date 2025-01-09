import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate eklendi
import { Carousel, Row, Col, Button, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./CategoryCarousel.css";
import axios from "axios";

function CategoryCarousel() {
  const carouselRef = useRef();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Navigasyon fonksiyonu

  // Kategoriye tıklandığında yönlendirme işlemi
  const handleCategoryClick = (categoryId) => {
    navigate(`/product/${categoryId}`); // Seçilen kategoriye göre yönlendirme
  };

  // Kategorileri API'den çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetCategory"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Kategoriler yüklenirken bir hata oluştu:", error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Carousel'deki bir sonraki slayta geçiş
  const next = () => {
    carouselRef.current.next();
  };

  // Carousel'deki bir önceki slayta geçiş
  const prev = () => {
    carouselRef.current.prev();
  };

  // Kategorileri 3'erli gruplara bölen fonksiyon
  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // Yükleniyor durumu
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="carousel-container">
      {/* Ok butonları */}
      <Button
        icon={<LeftOutlined />}
        onClick={prev}
        className="carousel-arrow carousel-arrow-left"
      />
      <Button
        icon={<RightOutlined />}
        onClick={next}
        className="carousel-arrow carousel-arrow-right"
      />

      {/* Kategoriler */}
      <Carousel dots={false} ref={carouselRef}>
        {chunkArray(categories, 3).map((chunk, index) => (
          <div key={index}>
            <Row className="carousel-row" gutter={[16, 16]}>
              {chunk.map((category) => (
                <Col key={category.id} span={8}>
                  <div className="carousel-card">
                    <Button
                      type="link"
                      onClick={() => handleCategoryClick(category.id)}
                      onMouseOver={(e) => (e.target.style.color = "white")} // Hover yazı beyaz
                      onMouseOut={(e) => (e.target.style.color = "#4caf50")}
                    >
                      {category.name}
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
