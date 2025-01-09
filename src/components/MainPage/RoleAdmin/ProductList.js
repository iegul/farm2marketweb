import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import axios from "axios";
import { useUser } from "../../Context/UserContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const token = user?.token;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://farmtwomarket.com/api/Product/GetProducts"
      );
      setProducts(response.data);
    } catch (error) {
      message.error("Ürünler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!token) {
      message.error("Lütfen giriş yapın.");
      return;
    }

    try {
      console.log("Silme için Token:", token);

      const response = await axios.delete(
        `https://farmtwomarket.com/api/Product/PermaDeleteProduct/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Ürün başarıyla silindi!");
        fetchProducts();
      } else {
        message.error("Ürün silinemedi.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        message.error("Yetkilendirme başarısız. Lütfen yeniden giriş yapın.");
      } else {
        message.error("Ürün silinirken bir hata oluştu.");
      }
      console.error("Hata Detayları:", error.response?.data || error.message);
    }
  };

  const columns = [
    {
      title: "Ürün ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price} ₺`,
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Bu ürünü silmek istediğinize emin misiniz?"
          onConfirm={() => deleteProduct(record.id)}
          okText="Evet"
          cancelText="Hayır"
        >
          <Button type="danger">Sil</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ürünler</h2>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductList;
