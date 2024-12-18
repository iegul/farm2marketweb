import React, { useEffect, useState } from "react";
import { Modal, Input, InputNumber, Select, Upload, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

const UpdateProductModal = ({
  visible,
  onCancel,
  onOk,
  images = [], // Ensure images is always an array
  setImages,
  updateFields,
  setUpdateFields,
}) => {
  const [categories, setCategories] = useState([]); // Ensure categories is initialized as an empty array

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetCategory"
        );
        setCategories(response.data || []); // Set empty array if no data is returned
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set empty array in case of error
      }
    };

    fetchCategories();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleInputChange = (field, value) => {
    setUpdateFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Modal
      title="Ürün Güncelle"
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <div>
        <label>Ürün Adı</label>
        <Input
          value={updateFields.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Ürünün adını girin"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Ürün Açıklaması</label>
        <TextArea
          rows={3}
          value={updateFields.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Ürün hakkında kısa açıklama"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Ağırlık / Miktar</label>
        <InputNumber
          style={{ width: "100%" }}
          value={updateFields.weightOrAmount}
          onChange={(value) => handleInputChange("weightOrAmount", value)}
          placeholder="Ör: 10"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Adres</label>
        <Input
          value={updateFields.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Ürünün gönderileceği adres"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Kategori</label>
        <Select
          value={updateFields.category}
          onChange={(value) => handleInputChange("category", value)}
          placeholder="Kategori seçin"
          style={{ width: "100%" }}
        >
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))
          ) : (
            <Select.Option disabled>Loading categories...</Select.Option>
          )}
        </Select>
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Kalite</label>
        <Select
          value={updateFields.quality}
          onChange={(value) => handleInputChange("quality", value)}
          placeholder="Kalite seçin"
          style={{ width: "100%" }}
        >
          {["A (En iyi)", "B", "C"].map((quality) => (
            <Select.Option key={quality} value={quality}>
              {quality}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Fiyat</label>
        <InputNumber
          style={{ width: "100%" }}
          value={updateFields.price}
          onChange={(value) => handleInputChange("price", value)}
          placeholder="Ürün fiyatını girin"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Birim Tipi</label>
        <Select
          value={updateFields.priceUnit}
          onChange={(value) => handleInputChange("priceUnit", value)}
          placeholder="Birim seçin"
          style={{ width: "100%" }}
        >
          {["₺/kg", "₺/adet", "₺/paket"].map((unit) => (
            <Select.Option key={unit} value={unit}>
              {unit}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Ürün Görselleri</label>
        <Upload
          listType="picture-card"
          showUploadList={false}
          customRequest={(file) => {
            // Handle image upload here
          }}
        >
          {images.length < 3 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Görsel Ekle</div>
            </div>
          )}
        </Upload>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {images.length > 0 ? (
            images.map((image, index) => (
              <div key={index} style={{ position: "relative" }}>
                <img
                  src={`data:image/png;base64,${image}`}
                  alt="Ürün Görseli"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleImageRemove(index)}
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                  }}
                />
              </div>
            ))
          ) : (
            <span>Henüz görsel eklenmedi.</span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateProductModal;
