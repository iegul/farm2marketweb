import React, { useState } from "react";
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
import { useUser } from "../../Context/UserContext";

const { TextArea } = Input;

const UrunEkleForm = () => {
  const { user } = useUser();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Meyve",
    "Sebze",
    "Hayvansal Ürünler",
    "Tahıllar ve Baklagiller",
    "Ev Yapımı Ürünler",
  ];

  const qualityOptions = ["A (En iyi)", "B", "C"];
  const priceUnits = ["₺/kg", "₺/adet", "₺/paket"];

  const handleImageUpload = async ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
      setBase64Image(reader.result.split(",")[1]);
      message.success("Fotoğraf başarıyla yüklendi.");
    };
    reader.onerror = () => {
      message.error("Fotoğraf yüklenirken bir hata oluştu.");
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = () => {
    setImageUrl(null);
    setBase64Image("");
    message.info("Fotoğraf kaldırıldı.");
  };

  const onFinish = async (values) => {
    if (!base64Image) {
      message.error("Lütfen bir görsel yükleyin!");
      return;
    }

    const formData = {
      id: 0,
      name: values.productName,
      description: values.productDescription,
      weightOrAmount: values.productWeightOrAmount,
      address: values.productAddress,
      fullAddress: values.productAddress,
      category: values.productCategory,
      quality: values.productQuality,
      quantity: 1,
      price: values.productPrice,
      image: base64Image,
      unitType: values.priceUnit,
    };

    setIsLoading(true);

    try {
      if (!user || !user.token) {
        throw new Error("Lütfen giriş yapınız.");
      }

      const response = await axios.post(
        "https://farmtwomarket.com/api/Product/AddProduct",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.data.succeeded) {
        message.success("Ürün başarıyla eklendi!");
        form.resetFields();
        setImageUrl(null);
        setBase64Image("");
      } else {
        throw new Error(
          response.data.error || "Ürün eklenirken bir hata oluştu."
        );
      }
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Ürün eklenemedi. Lütfen tekrar deneyin."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Ürün Ekle</h2>
      <Form
        form={form}
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
          rules={[
            { required: true, message: "Ağırlık veya miktar gereklidir!" },
          ]}
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
              <Select.Option key={category} value={category}>
                {category}
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
            {qualityOptions.map((quality) => (
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
                {priceUnits.map((unit) => (
                  <Select.Option key={unit} value={unit}>
                    {unit}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item label="Ürün Görseli">
          <Upload
            listType="picture-card"
            showUploadList={false}
            customRequest={handleImageUpload}
          >
            {imageUrl ? (
              <div>
                <img
                  src={imageUrl}
                  alt="Ürün Görseli"
                  style={{ width: "100%", marginBottom: 10 }}
                />
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={handleImageRemove}
                >
                  Sil
                </Button>
              </div>
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Görsel Ekle</div>
              </div>
            )}
          </Upload>
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
    </div>
  );
};

export default UrunEkleForm;
