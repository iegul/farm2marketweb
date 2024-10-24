import React, { useState } from "react";
import { Row, Col, Input, Button, Typography, message } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

const { Text } = Typography;

function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");

  // Basic validation
  const isValidForm = () => {
    return firstName && lastName && userName && email && password && adress;
  };

  //Form Submit
  const handleSubmit = async () => {
    if (!isValidForm()) {
      message.warning("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      console.log("Kayıt isteği gönderiliyor...");
      const response = await axios.post(
        "http://farmtwomarket.com/api/Auth/Register",
        {
          firstName,
          lastName,
          userName,
          email,
          password,
          adress,
        }
      );
      console.log("Kayıt işlemi başarılı:", response.data);
      if (response.status === 200) {
        message.success("Kayıt Başarılı!");
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
          <Link to="/account">
            <Button
              type="link"
              style={{
                color: "#7E8957",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#98a77a")}
              onMouseLeave={(e) => (e.target.style.color = "#7E8957")}
            >
              Hesabım
            </Button>
          </Link>
        </Col>

        {/* Form Alanı */}
        <Col span={24}>
          <Input
            placeholder="Adınız"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
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
          <Input
            placeholder="Soyadınız"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <Input
            placeholder="Adres"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
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

          {/* Kayıt Ol ve Google ile Kayıt Ol Butonları */}
          <Button
            type="primary"
            block
            style={{
              backgroundColor: "#7E8957",
              borderColor: "#7E8957",
              marginBottom: "15px",
              borderRadius: "5px",
              padding: "10px",
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
            Kayıt Ol
          </Button>

          <Button
            block
            icon={<i className="fab fa-google"></i>}
            style={{
              borderColor: "#7E8957",
              color: "#7E8957",
              borderRadius: "5px",
              padding: "10px",
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
            Google ile Kayıt Ol
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default RegisterPage;
