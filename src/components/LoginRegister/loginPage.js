import React from "react";
import { Row, Col, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import f2mImage from "../../images/f2m-Photoroom.png";

const { Text } = Typography;

function LoginPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Row
        justify="center"
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* Hesabım Butonu */}
        <Col span={24} style={{ textAlign: "left", paddingBottom: "20px" }}>
          <Button
            type="link"
            icon={<i className="fas fa-arrow-left"></i>}
            style={{
              color: "#7E8957",
              transition: "color 0.3s ease",
            }}
            // Hover Stili
            onMouseEnter={(e) => (e.target.style.color = "#98a77a")}
            onMouseLeave={(e) => (e.target.style.color = "#7E8957")}
          >
            Hesabım
          </Button>
        </Col>

        {/* Logo Alanı */}
        <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            <img src={f2mImage} alt="Logo" style={{ maxWidth: "100%" }}></img>
          </div>
        </Col>

        {/* Form Alanı */}
        <Col span={24}>
          <Input
            placeholder="Email"
            style={{
              marginBottom: "15px",
              borderRadius: "5px",
              padding: "10px",
              borderColor: "#7E8957", // Varsayılan sınır rengi
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#7E8957")} // Focus olduğunda sınır rengi yeşil olsun
            onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
          />
          <Input.Password
            placeholder="Şifre"
            style={{
              marginBottom: "15px",
              borderRadius: "5px",
              padding: "10px",
              borderColor: "#7E8957", // Varsayılan sınır rengi
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#7E8957")} // Focus olduğunda sınır rengi yeşil olsun
            onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
          />
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#7E8957",
              borderColor: "#7E8957",
              marginBottom: "15px",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            // Hover Stili
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#98a77a"; // Daha açık renk
              e.target.style.borderColor = "#98a77a";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#7E8957"; // Eski renk
              e.target.style.borderColor = "#7E8957";
            }}
          >
            Giriş Yap
          </Button>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <Text>Hesabınız yok mu? </Text>
            <Link
              to="/register"
              style={{ color: "#7E8957", transition: "color 0.3s ease" }}
              // Hover Stili
              onMouseEnter={(e) => (e.target.style.color = "#98a77a")}
              onMouseLeave={(e) => (e.target.style.color = "#7E8957")}
            >
              Kayıt Ol
            </Link>
          </div>
          <Button
            block
            icon={<i className="fab fa-google"></i>}
            style={{
              borderColor: "#7E8957",
              color: "#7E8957",
              borderRadius: "5px",
              transition: "border-color 0.3s ease, color 0.3s ease",
            }}
            // Hover Stili
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#98a77a"; // Daha açık renk
              e.target.style.color = "#98a77a";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#7E8957"; // Eski renk
              e.target.style.color = "#7E8957";
            }}
          >
            Google ile Giriş Yap
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
