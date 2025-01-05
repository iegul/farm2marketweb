import React from "react";
import { Layout, Typography, Divider } from "antd";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const PrivacyPolicy = () => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      <Header
        style={{
          color: "#FFFFFF",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Title
          level={3}
          style={{
            margin: 0,
            color: "white",
            fontSize: 24,
            fontFamily: "Font",
          }}
        >
          Gizlilik Politikası
        </Title>
      </Header>
      <Content style={{ padding: "16px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <Text style={{ fontSize: 16, display: "block", marginBottom: 16 }}>
            Farm2Market olarak, kullanıcılarımızın gizliliğine büyük önem
            veriyoruz. Bu gizlilik politikası, kişisel bilgilerinizin nasıl
            toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
          </Text>

          <Title level={4} style={{ marginTop: 16 }}>
            Toplanan Bilgiler:
          </Title>
          <Text style={{ fontSize: 16, display: "block", marginBottom: 16 }}>
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              <li>
                Ad, soyad, e-posta adresi, telefon numarası gibi kişisel
                bilgiler.
              </li>
              <li>Satın alma işlemleri ve sipariş bilgileri.</li>
              <li>Uygulama kullanımınıza ilişkin analiz verileri.</li>
            </ul>
          </Text>

          <Divider />

          <Title level={4} style={{ marginTop: 16 }}>
            Bilgilerinizin Korunması:
          </Title>
          <Text style={{ fontSize: 16, display: "block", marginBottom: 16 }}>
            Bilgileriniz, yetkisiz erişimlere karşı korunmaktadır.
          </Text>
        </div>
      </Content>
    </Layout>
  );
};

export default PrivacyPolicy;
