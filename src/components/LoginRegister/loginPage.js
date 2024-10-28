import React, { useState } from "react";
import { Row, Col, Input, Button, Typography, message } from "antd"; // message eklendi
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // axios eklendi
import f2mImage from "../../images/f2m-Photoroom.png";
import { useUser } from "../Context/UserContext";

const { Text } = Typography;

function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Basic validation
  const isValidForm = () => {
    return userName && password; // Tanımlanmamış alanlar kaldırıldı
  };

  // Form Submit
  const handleSubmit = async () => {
    if (!isValidForm()) {
      message.warning("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      console.log("Kayıt isteği gönderiliyor...");
      const response = await axios.post(
        "https://farmtwomarket.com/api/Auth/Login",
        {
          userName,
          password,
        }
      );
      console.log("Kayıt işlemi başarılı:", response.data);
      if (response.status === 200) {
        message.success("Kayıt Başarılı!");
        setUser({ userName });
        navigate("/mainPage");
      }
    } catch (error) {
      console.error("Kayıt İşlemi Başarısız: ", error);
      message.error("Kayıt sırasında bir hata oluştu");
    }
  };

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
            placeholder="Kullanıcı Adı"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            style={{
              marginBottom: "15px",
              borderRadius: "5px",
              padding: "10px",
              borderColor: "#7E8957",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#7E8957")}
            onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
          />
          <Input.Password
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              marginBottom: "15px",
              borderRadius: "5px",
              padding: "10px",
              borderColor: "#7E8957",
              transition: "border-color 0.3s ease",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#7E8957")}
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
            onClick={handleSubmit}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#98a77a";
              e.target.style.borderColor = "#98a77a";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#7E8957";
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
            onMouseEnter={(e) => {
              e.target.style.borderColor = "#98a77a";
              e.target.style.color = "#98a77a";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#7E8957";
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
