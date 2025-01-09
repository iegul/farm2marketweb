import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ChangePassword = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(
        "https://farmtwomarket.com/api/Auth/ChangePassword",
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Şifre başarıyla değiştirildi.");
        navigate("/mainPage");
      } else {
        message.error("Şifre değiştirilemedi. Lütfen tekrar deneyiniz.");
      }
    } catch (error) {
      message.error(
        "Bir hata oluştu: " + error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "50px auto",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Title level={3} style={{ textAlign: "center", color: "#4caf50" }}>
        Şifre Değiştir
      </Title>
      <Form
        name="changePasswordForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        colon={false}
      >
        <Form.Item
          label="Mevcut Şifre"
          name="currentPassword"
          rules={[
            { required: true, message: "Mevcut şifrenizi giriniz!" },
            { min: 6, message: "Şifreniz en az 6 karakter olmalıdır!" },
          ]}
        >
          <Input.Password placeholder="Mevcut şifreniz" />
        </Form.Item>

        <Form.Item
          label="Yeni Şifre"
          name="newPassword"
          rules={[
            { required: true, message: "Yeni şifrenizi giriniz!" },
            { min: 6, message: "Yeni şifre en az 6 karakter olmalıdır!" },
            {
              pattern:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])[A-Za-z\d.!@#$%^&*]{6,}$/,
              message:
                "Şifre en az bir büyük harf, bir rakam ve bir özel karakter içermelidir!",
            },
          ]}
        >
          <Input.Password placeholder="Yeni şifreniz" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            style={{
              backgroundColor: "#4caf50",
              borderColor: "#4caf50",
              fontWeight: "bold",
            }}
          >
            Şifre Değiştir
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
