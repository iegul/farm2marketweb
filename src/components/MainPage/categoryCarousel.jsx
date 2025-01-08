import React, { useRef, useState, useEffect } from "react";
import { Carousel, Row, Col, Button, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import axios from "axios";
import "./CategoryCarousel.css";

function CategoryCarousel({ onCategorySelect }) {
  const carouselRef = useRef();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const next = () => carouselRef.current.next();
  const prev = () => carouselRef.current.prev();

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId); // Parent bileşene kategori id'sini gönder.
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="carousel-container">
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
