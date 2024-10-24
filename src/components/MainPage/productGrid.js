import React, { useState } from "react";
import { Row, Col, Card, Button, Pagination } from "antd";
import { HeartOutlined } from "@ant-design/icons";

// Ürün verileri
const data = [
  {
    title: "Domates",
    price: "10$/kg",
    tag: "#domates",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Salatalık",
    price: "8$/kg",
    tag: "#salatalık",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Biber",
    price: "12$/kg",
    tag: "#biber",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Patlıcan",
    price: "14$/kg",
    tag: "#patlıcan",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Kabak",
    price: "9$/kg",
    tag: "#kabak",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Marul",
    price: "6$/kg",
    tag: "#marul",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Havuç",
    price: "7$/kg",
    tag: "#havuç",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Patates",
    price: "5$/kg",
    tag: "#patates",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Domates",
    price: "10$/kg",
    tag: "#domates",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Salatalık",
    price: "8$/kg",
    tag: "#salatalık",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Biber",
    price: "12$/kg",
    tag: "#biber",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Patlıcan",
    price: "14$/kg",
    tag: "#patlıcan",
    imageUrl: "https://picsum.photos/200/300",
  },
  {
    title: "Kabak",
    price: "9$/kg",
    tag: "#kabak",
    imageUrl: "https://picsum.photos/200/300",
  },

  // Daha fazla ürün ekleyin...
];

function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Sayfa başına gösterilecek ürün sayısı

  // Mevcut sayfada gösterilecek ürünleri hesaplama
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      {/* Ürün Grid */}
      <Row gutter={[10, 20]}>
        {currentData.map((item, index) => (
          <Col key={index} span={6} style={{ padding: "5px 10px" }}>
            <Card
              cover={
                <img
                  alt={item.title}
                  src={item.imageUrl}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
              style={{ width: "100%", height: "300px", textAlign: "left" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: 0, fontSize: "16px" }}>{item.title}</h3>
                <Button
                  type="text"
                  icon={
                    <HeartOutlined
                      style={{ fontSize: "20px", color: "#2F4F2F" }}
                    />
                  }
                />
              </div>
              <p style={{ margin: "5px 0", fontSize: "14px" }}>{item.price}</p>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "5px",
                  display: "inline-block",
                  fontSize: "12px",
                }}
              >
                {item.tag}
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Sayfalama */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
}

export default ProductGrid;
