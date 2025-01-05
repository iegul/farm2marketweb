import React, { useState, useEffect } from "react";
import { Form, Input, Button, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";
import axios from "axios";

const { Title } = Typography;

const AccountPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
  useEffect(() => {
    if (!user) {
      message.warning("Lütfen giriş yapınız.");
      navigate("/login");
    }
  }, [user, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Kullanıcı bilgilerini güncellemek için API çağrısı
      const response = await axios.put(
        "https://farmtwomarket.com/api/User/UpdateUser",
        {
          userId: user.userId,
          ...values,
        }
      );

      // Başarı mesajı ve kullanıcı bilgisinin güncellenmesi
      if (response.status === 200) {
        message.success("Bilgileriniz başarıyla güncellendi.");
        setUser({ ...user, ...values });
      } else {
        message.error("Bilgiler güncellenemedi, lütfen tekrar deneyiniz.");
      }
    } catch (error) {
      message.error("Bir hata oluştu: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Hesap Bilgilerini Güncelle
      </Title>
      <Form
        name="accountForm"
        layout="vertical"
        initialValues={{
          name: user?.name,
          email: user?.email,
          password: "",
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Ad"
          name="name"
          rules={[{ required: true, message: "Adınızı giriniz!" }]}
        >
          <Input placeholder="Adınız" />
        </Form.Item>

        <Form.Item
          label="E-posta"
          name="email"
          rules={[
            { required: true, message: "E-posta adresinizi giriniz!" },
            { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
          ]}
        >
          <Input placeholder="E-posta adresiniz" />
        </Form.Item>

        <Form.Item
          label="Şifre"
          name="password"
          rules={[
            { required: true, message: "Şifrenizi giriniz!" },
            { min: 6, message: "Şifreniz en az 6 karakter olmalıdır!" },
          ]}
        >
          <Input.Password placeholder="Yeni şifreniz" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountPage;
