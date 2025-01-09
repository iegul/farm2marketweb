import React, { useState } from "react";
import { Row, Col, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext";
import f2mImage from "../../images/f2m-Photoroom.png";

const { Text } = Typography;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const isValidForm = () => email && password;

  const handleSubmit = async () => {
    if (!isValidForm()) {
      message.warning("Lütfen tüm alanları doldurun.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://farmtwomarket.com/api/Auth/Login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { emailConfirmed, token, userName, userRole, confirmationNumber } =
        response.data.data;

      const userData = {
        email,
        token,
        userName,
        userRole,
        emailConfirmed,
        confirmationNumber,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if (!emailConfirmed) {
        message.info(
          "E-posta doğrulamanız gerekiyor. Doğrulama sayfasına yönlendiriliyorsunuz."
        );
        navigate("/confirm-mail");
      } else {
        message.success("Başarıyla giriş yaptınız!");
        navigate("/mainPage");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Giriş sırasında bir hata oluştu.";
      message.error(errorMessage);
    } finally {
      setIsLoading(false);
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
        <Col span={24} style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src={f2mImage} alt="Logo" style={{ maxWidth: "100%" }} />
        </Col>

        <Col span={24}>
          <Input
            placeholder="E-Posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "15px", borderRadius: "5px" }}
          />
          <Input.Password
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "15px", borderRadius: "5px" }}
          />
          <Button
            type="primary"
            block
            style={{ backgroundColor: "#7E8957", borderRadius: "5px" }}
            onClick={handleSubmit}
            loading={isLoading}
          >
            Giriş Yap
          </Button>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Text>Hesabınız yok mu? </Text>
            <Link to="/register">Kayıt Ol</Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default LoginPage;
