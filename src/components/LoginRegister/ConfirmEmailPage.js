import React, { useState } from "react";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/UserContext";

function ConfirmMailPage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = user?.email;
  const token = user?.token;

  const handleConfirm = async () => {
    if (!verificationCode) {
      message.warning("Lütfen doğrulama kodunu giriniz.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://farmtwomarket.com/api/Auth/ConfirmMail?number=${verificationCode}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.succeeded) {
        const updatedUser = { ...user, emailConfirmed: true };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        message.success(
          "Doğrulama başarılı! Ana sayfaya yönlendiriliyorsunuz."
        );
        navigate("/mainPage");
      } else {
        navigate("/mainPage");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        message.error("Geçersiz istek. Lütfen doğrulama kodunu kontrol edin.");
      } else if (error.response?.status === 401) {
        message.error("Yetkilendirme hatası. Lütfen tekrar giriş yapın.");
        navigate("/login");
      } else if (error.response?.data?.error) {
        message.error(error.response.data.error);
      } else {
        message.error("Doğrulama sırasında bir hata oluştu.");
      }
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
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          E-Posta Doğrulama
        </h2>
        <p style={{ marginBottom: "15px" }}>
          Lütfen doğrulama kodunu giriniz. E-posta adresiniz:{" "}
          <strong>{email}</strong>
        </p>
        <Input
          placeholder="Doğrulama Kodu"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          style={{
            marginBottom: "15px",
            borderRadius: "5px",
            padding: "10px",
            borderColor: "#7E8957",
            transition: "border-color 0.3s ease",
          }}
        />
        <Button
          type="primary"
          block
          onClick={handleConfirm}
          loading={isLoading}
          disabled={isLoading}
          style={{
            backgroundColor: "#7E8957",
            borderColor: "#7E8957",
            borderRadius: "5px",
            padding: "10px",
            transition: "background-color 0.3s ease",
          }}
        >
          Doğrula
        </Button>
        <Button type="link">Doğrulama Kodunu Tekrar Gönder</Button>
      </div>
    </div>
  );
}

export default ConfirmMailPage;
