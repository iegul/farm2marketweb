import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import axios from "axios";
import { useUser } from "../../Context/UserContext";

const { Title } = Typography;

const ChangePassword = () => {
  const { user } = useUser(); // Kullanıcı bilgisini almak için context
  const [loading, setLoading] = useState(false);

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
            Authorization: `Bearer ${user?.token}`, // Kullanıcının token bilgisini ekle
          },
        }
      );

      if (response.status === 200) {
        message.success("Şifre başarıyla değiştirildi.");
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
    <div style={{ maxWidth: 400, margin: "50px auto", padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Şifre Değiştir
      </Title>
      <Form
        name="changePasswordForm"
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
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
          <Button type="primary" htmlType="submit" block loading={loading}>
            Şifre Değiştir
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
