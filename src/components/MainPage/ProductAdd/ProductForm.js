import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  Select,
  InputNumber,
  message,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

const ProductForm = ({
  categories,
  images,
  setImages,
  isLoading,
  handleImageUpload,
  handleImageRemove,
  onFinish,
}) => {
  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      validateMessages={{
        required: "${label} gereklidir!",
      }}
    >
      <Form.Item
        label="Ürün Adı"
        name="productName"
        rules={[{ required: true, message: "Ürün adı gereklidir!" }]}
      >
        <Input placeholder="Ürünün adını girin" />
      </Form.Item>

      <Form.Item
        label="Ürün Açıklaması"
        name="productDescription"
        rules={[{ required: true, message: "Ürün açıklaması gereklidir!" }]}
      >
        <TextArea rows={3} placeholder="Ürün hakkında kısa açıklama" />
      </Form.Item>

      <Form.Item
        label="Ağırlık / Miktar"
        name="productWeightOrAmount"
        rules={[{ required: true, message: "Ağırlık veya miktar gereklidir!" }]}
      >
        <InputNumber style={{ width: "100%" }} min={0} placeholder="Ör: 10" />
      </Form.Item>

      <Form.Item
        label="Adres"
        name="productAddress"
        rules={[{ required: true, message: "Adres gereklidir!" }]}
      >
        <Input placeholder="Ürünün gönderileceği adres" />
      </Form.Item>

      <Form.Item
        label="Kategori"
        name="productCategory"
        rules={[{ required: true, message: "Kategori seçin!" }]}
      >
        <Select placeholder="Kategori seçin">
          {categories.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Kalite"
        name="productQuality"
        rules={[{ required: true, message: "Kalite seçin!" }]}
      >
        <Select placeholder="Kalite seçin">
          {["A (En iyi)", "B", "C"].map((quality) => (
            <Select.Option key={quality} value={quality}>
              {quality}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Fiyat" required>
        <Input.Group compact>
          <Form.Item
            name="productPrice"
            rules={[{ required: true, message: "Fiyat gereklidir!" }]}
            noStyle
          >
            <InputNumber
              style={{ width: "70%" }}
              placeholder="Ör: 15"
              min={0}
            />
          </Form.Item>
          <Form.Item
            name="priceUnit"
            rules={[{ required: true, message: "Birim seçilmelidir!" }]}
            noStyle
          >
            <Select style={{ width: "30%" }} placeholder="Birim">
              {["₺/kg", "₺/adet", "₺/paket", "₺/litre"].map((unit) => (
                <Select.Option key={unit} value={unit}>
                  {unit}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Input.Group>
      </Form.Item>

      <Form.Item label="Ürün Görselleri">
        <Upload
          listType="picture-card"
          showUploadList={false}
          customRequest={handleImageUpload}
        >
          {images.length < 3 && (
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Görsel Ekle</div>
            </div>
          )}
        </Upload>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {images.map((image, index) => (
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
          ))}
        </div>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={isLoading}
        >
          {isLoading ? "Ekleniyor..." : "Ürünü Ekle"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
