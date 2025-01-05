import React from "react";
import { Layout, Row, Col, Button } from "antd";
import {
  InstagramOutlined,
  GithubOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Footer } = Layout;

const FooterComponent = () => {
  const navigate = useNavigate();

  return (
    <Footer
      style={{
        backgroundColor: "#ffffff",
        color: "#342E20",
        padding: "40px 20px",
      }}
    >
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        {/* Sol Kısım - Sosyal Medya İkonları */}
        <Col xs={24} md={8}>
          <h3 style={{ color: "#342E20", marginBottom: "10px" }}>
            Bizi Takip Edin
          </h3>
          <div style={{ fontSize: "24px", display: "flex", gap: "15px" }}>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#E1306C" }}
            >
              <InstagramOutlined />
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0077B5" }}
            >
              <LinkedinOutlined />
            </a>
            <a
              href="https://www.github.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#342E20" }}
            >
              <GithubOutlined />
            </a>
          </div>
        </Col>

        {/* Orta Kısım - Şirket Bilgileri */}
        <Col xs={24} md={8}>
          <h3 style={{ color: "#342E20", marginBottom: "10px" }}>Biz Kimiz?</h3>
          <p style={{ margin: 0, color: "#342E20" }}>
            Şirketimiz, çiftçi ve tüketiciyi bir araya getirerek doğal ve taze
            ürünlerin güvenilir bir şekilde ulaşmasını sağlar.
          </p>
          <p style={{ margin: 0, color: "#342E20" }}>
            <strong>Email:</strong> info@farmtwomarket.com
          </p>
        </Col>

        {/* Sağ Kısım - İletişim Butonu */}
        <Col xs={24} md={8} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            style={{
              backgroundColor: "#342E20",
              borderColor: "#342E20",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#ffffff",
              padding: "10px 20px",
            }}
            onClick={() => navigate("/iletisim")}
          >
            Bizimle İletişime Geçin
          </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "30px" }}>
        <Col>
          <p style={{ margin: 0, textAlign: "center", color: "#342E20" }}>
            © 2024 Farm To Market. Tüm Hakları Saklıdır.
          </p>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
