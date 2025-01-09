import React, { useState } from "react";
import { List, Button } from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DollarOutlined,
  ReconciliationOutlined,
  CustomerServiceOutlined,
  TeamOutlined,
  FileProtectOutlined,
  LogoutOutlined,
  TagsOutlined,
  ContainerOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const UserOptions = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [accountInfoVisible, setAccountInfoVisible] = useState(false); // State to toggle sub-options

  let userOptions = [
    {
      label: user ? user.userName : "Giriş Yap",
      action: () => navigate(user ? "/profile" : "/login"),
      icon: <UserOutlined />,
    },
  ];

  if (user) {
    if (user.userRole === "Farmer") {
      userOptions = [
        ...userOptions,
        {
          label: "Hesap Bilgileri",
          icon: <ProfileOutlined />,
          action: () => setAccountInfoVisible(!accountInfoVisible), // Toggle sub-options visibility
        },
        {
          label: "Ürün Ekle",
          icon: <PlusOutlined />,
          action: () => navigate("/addProduct"),
        },
        {
          label: "Satışlarım",
          icon: <DollarOutlined />,
          action: () => navigate("/farmersatislarim"),
        },
        {
          label: "Ürünlerim",
          icon: <ReconciliationOutlined />,
          action: () => navigate("/farmerurunler"),
        },
        {
          label: "Farm2Market Müşteri Hizmetleri",
          icon: <CustomerServiceOutlined />,
          action: () => navigate("/customerservice"),
        },
        {
          label: "Bizi Tanıyın",
          icon: <TeamOutlined />,
          action: () => navigate("/iletisim"),
        },
        {
          label: "Gizlilik Politikası",
          icon: <FileProtectOutlined />,
          action: () => navigate("/privacypolicy"),
        },
      ];
    } else if (user.userRole === "MarketReceiver") {
      userOptions = [
        ...userOptions,
        {
          label: "Hesap Bilgileri",
          icon: <ProfileOutlined />,
          action: () => setAccountInfoVisible(!accountInfoVisible), // Toggle sub-options visibility
        },
        {
          label: "Siparişlerim",
          icon: <DollarOutlined />,
          action: () => navigate("/marketalislarim"),
        },
        {
          label: "Farm2Market Müşteri Hizmetleri",
          icon: <CustomerServiceOutlined />,
          action: () => navigate("/customerservice"),
        },
        {
          label: "Bizi Tanıyın",
          icon: <TeamOutlined />,
          action: () => navigate("/iletisim"),
        },
        {
          label: "Gizlilik Politikası",
          icon: <FileProtectOutlined />,
          action: () => navigate("/privacypolicy"),
        },
      ];
    } else if (user.userRole === "Admin") {
      userOptions = [
        ...userOptions,
        {
          label: "Kategoriler",
          icon: <TagsOutlined />,
          action: () => navigate("/addcatagory"),
        },
        {
          label: "Ürünler",
          icon: <ContainerOutlined />,
          action: () => navigate("/productList"),
        },
        {
          label: "Kullanıcılar",
          icon: <TeamOutlined />,
          action: () => navigate("/userList"),
        },
      ];
    }
  } else {
    userOptions = [
      ...userOptions,
      {
        label: "Farm2Market Müşteri Hizmetleri",
        icon: <CustomerServiceOutlined />,
        action: () => navigate("/customerservice"),
      },
      {
        label: "Bizi Tanıyın",
        icon: <TeamOutlined />,
        action: () => navigate("/iletisim"),
      },
      {
        label: "Gizlilik Politikası",
        icon: <FileProtectOutlined />,
        action: () => navigate("/privacypolicy"),
      },
    ];
  }

  userOptions.push({
    label: "Çıkış Yap",
    action: () => {
      setUser(null);
    },
    icon: <LogoutOutlined />,
  });

  return (
    <List
      dataSource={userOptions}
      renderItem={({ label, action, icon }) => (
        <List.Item>
          <Button
            type="link"
            style={{ padding: 0, color: "green" }} // Renk burada yeşil olarak ayarlandı
            onClick={action}
          >
            {icon}
            <span style={{ marginLeft: 8 }}>{label}</span>
          </Button>
          {/* Sub-options for 'Hesap Bilgileri' */}
          {label === "Hesap Bilgileri" && accountInfoVisible && (
            <List
              size="small"
              dataSource={[
                {
                  label: "Şifre Değiştir",
                  action: () => navigate("/passwordchange"),
                },
                {
                  label: "Kullanıcı Bilgilerini Değiştir",
                  action: () => navigate("/account"),
                },
              ]}
              renderItem={({ label, action }) => (
                <List.Item>
                  <Button
                    type="link"
                    style={{ padding: 0, color: "#3D692A" }} // Alt seçeneklerin rengi de yeşil yapıldı
                    onClick={action}
                  >
                    <span style={{ marginLeft: 8 }}>{label}</span>
                  </Button>
                </List.Item>
              )}
            />
          )}
        </List.Item>
      )}
    />
  );
};

export default UserOptions;
