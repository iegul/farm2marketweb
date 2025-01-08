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
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    if (!user) {
      message.warning("Lütfen giriş yapınız.");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        let url = "";
        if (user.userRole === "Farmer") {
          url = "https://farmtwomarket.com/api/Auth/GetFarmerProfile";
        } else if (user.userRole === "MarketReceiver") {
          url = "https://farmtwomarket.com/api/Auth/GetMarketProfile";
        }

        if (url) {
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (response.status === 200) {
            setProfileData(response.data);
          } else {
            message.error("Profil bilgileri alınamadı.");
          }
        }
      } catch (error) {
        message.error("Bir hata oluştu: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let url = "";
      const updatedData = {
        firstName: values.name,
        lastName: values.lastname,
        userName: values.username,
        email: values.email,
        adress: values.address,
      };

      if (user.userRole === "Farmer") {
        url = "https://farmtwomarket.com/api/Auth/UpdateFarmerProfile";
      } else if (user.userRole === "MarketReceiver") {
        url = "https://farmtwomarket.com/api/Auth/UpdateMarketProfile";
        updatedData.marketName = values.marketName;
        updatedData.companyType = values.companyType;
      }

      if (url) {
        const response = await axios.put(url, updatedData, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (response.status === 200) {
          message.success("Profil başarıyla güncellendi.");
          setUser({ ...user, ...updatedData }); // Kullanıcı bilgisini güncelle
        } else {
          message.error("Profil güncellenemedi. Lütfen tekrar deneyiniz.");
        }
      }
    } catch (error) {
      message.error(
        "Bir hata oluştu: " + error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (!profileData) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: "20px" }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Hesap Bilgilerini Güncelle
      </Title>
      <Form
        name="accountForm"
        layout="vertical"
        initialValues={{
          name: profileData.firstName,
          lastname: profileData.lastName,
          username: profileData.userName,
          email: profileData.email,
          address: profileData.adress,
          ...(user.userRole === "MarketReceiver" && {
            marketName: profileData.marketName,
            companyType: profileData.companyType,
          }),
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
          label="Soyad"
          name="lastname"
          rules={[{ required: true, message: "Soyadınızı giriniz!" }]}
        >
          <Input placeholder="Soyadınız" />
        </Form.Item>
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          rules={[{ required: true, message: "Kullanıcı adınızı giriniz!" }]}
        >
          <Input placeholder="Kullanıcı Adı" />
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
          label="Adres"
          name="address"
          rules={[{ required: true, message: "Adresinizi giriniz!" }]}
        >
          <Input placeholder="Adresiniz" />
        </Form.Item>

        {user.userRole === "MarketReceiver" && (
          <>
            <Form.Item
              label="Market Adı"
              name="marketName"
              rules={[{ required: true, message: "Market adını giriniz!" }]}
            >
              <Input placeholder="Market adı" />
            </Form.Item>
            <Form.Item
              label="Şirket Türü"
              name="companyType"
              rules={[{ required: true, message: "Şirket türünü giriniz!" }]}
            >
              <Input placeholder="Şirket türü" />
            </Form.Item>
          </>
        )}

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
