import React, { useState } from "react";
import { Collapse, Typography } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const faqs = [
  {
    question: "Siparişim ne zaman teslim edilir?",
    answer: "Siparişler genellikle 3-5 iş günü içinde teslim edilmektedir.",
  },
  {
    question: "İade politikası nedir?",
    answer:
      "Ürünlerinizi teslim aldıktan sonra 14 gün içinde iade edebilirsiniz.",
  },
  {
    question: "Kargo ücreti ne kadar?",
    answer:
      "Kargo ücreti sipariş toplamınıza bağlı olarak değişmektedir. 200₺ üzeri siparişlerde ücretsizdir.",
  },
  {
    question: "Ürünler nasıl paketleniyor?",
    answer:
      "Ürünler, tazelik ve güvenlik için özel ambalajlarla paketlenmektedir.",
  },
  {
    question: "Ödeme yöntemleri nelerdir?",
    answer: "Kredi kartı, banka kartı ve kapıda ödeme seçenekleri mevcuttur.",
  },
  {
    question: "Ürün stok durumu nasıl öğrenilir?",
    answer: "Ürün detay sayfasında stok durumunu görebilirsiniz.",
  },
  {
    question: "Siparişimi nasıl takip edebilirim?",
    answer:
      "Hesabınıza giriş yaparak siparişlerim kısmından takip edebilirsiniz.",
  },
  {
    question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
    answer: "Bize 0850 123 45 67 numaralı telefondan ulaşabilirsiniz.",
  },
  {
    question: "Satış sonrası destek sunuyor musunuz?",
    answer: "Evet, satış sonrası destek ekibimiz her zaman hizmetinizdedir.",
  },
];

const CustomerService = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Farm2Market Müşteri Hizmetleri
      </Title>
      <Collapse accordion>
        {faqs.map((faq, index) => (
          <Panel header={faq.question} key={index}>
            <p>{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default CustomerService;
