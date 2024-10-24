import React, { useRef } from "react";
import { Carousel, Row, Col, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import "./CategoryCarousel.css"; // CSS dosyasını ekledik

function CategoryCarousel() {
  const carouselRef = useRef();

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

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
        <div>
          <Row className="carousel-row" gutter={[16, 16]}>
            <Col span={8}>
              <div className="carousel-card">
                <Button type="link">Sebze</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="carousel-card">
                <Button type="link">Meyve</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="carousel-card">
                <Button type="link">Hayvansal Ürünler</Button>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <Row className="carousel-row" gutter={[16, 16]}>
            <Col span={8}>
              <div className="carousel-card">
                <Button type="link">Ev Yapımı Ürünler</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="carousel-card">
                <Button type="link">Dondurulmuş Ürünler</Button>
              </div>
            </Col>
            <Col span={8}>
              <div className="carousel-card">
                <Button type="link">Süt Ürünleri</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
