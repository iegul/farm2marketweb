import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import axios from "axios";
import { useUser } from "../../Context/UserContext";

const AddCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { user } = useUser();
  const token = user?.token;

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://farmtwomarket.com/api/Product/GetCategory"
      );
      setCategories(response.data);
    } catch (error) {
      message.error("Kategoriler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (values) => {
    if (!token) {
      message.error("Lütfen giriş yapın. Token bulunamadı.");
      return;
    }

    try {
      const response = await axios.post(
        "https://farmtwomarket.com/api/Product/AddCategory",
        { name: values.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        message.success("Kategori başarıyla eklendi!");
        fetchCategories();
        setIsModalOpen(false);
        form.resetFields();
      } else {
        message.error("Kategori eklenemedi.");
      }
    } catch (error) {
      console.error(
        "API Hata Detayları:",
        error.response?.data || error.message
      );

      if (error.response?.status === 401) {
        message.error("Yetkilendirme başarısız. Lütfen yeniden giriş yapın.");
      } else {
        message.error("Kategori eklenirken bir hata oluştu.");
      }
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const columns = [
    {
      title: "Kategori ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Kategori Adı",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Kategoriler</h2>
      <Table
        dataSource={categories}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
      />
      <Button type="primary" style={{ marginTop: "20px" }} onClick={showModal}>
        Yeni Kategori Ekle
      </Button>
      <Modal
        title="Yeni Kategori Ekle"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={addCategory}>
          <Form.Item
            name="name"
            label="Kategori Adı"
            rules={[{ required: true, message: "Kategori adı gerekli!" }]}
          >
            <Input placeholder="Kategori adı girin" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Ekle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCategory;
