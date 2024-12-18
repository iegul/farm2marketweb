import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import ProductForm from "./ProductForm"; // Yeni component'i import et

const UrunEkleForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetCategory"
        );
        setCategories(response.data);
      } catch (error) {
        message.error("Kategoriler yüklenirken hata oluştu.");
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async ({ file }) => {
    if (images.length >= 3) {
      message.error("En fazla 3 adet görsel yükleyebilirsiniz.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => [...prev, reader.result.split(",")[1]]);
      message.success("Fotoğraf başarıyla yüklendi.");
    };
    reader.onerror = () => {
      message.error("Fotoğraf yüklenirken bir hata oluştu.");
    };
    reader.readAsDataURL(file);
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    message.info("Fotoğraf kaldırıldı.");
  };

  const onFinish = async (values) => {
    if (images.length < 1) {
      message.error("Lütfen en az bir görsel yükleyin!");
      return;
    }

    const formData = {
      id: 0,
      name: values.productName,
      description: values.productDescription,
      weightOrAmount: values.productWeightOrAmount,
      address: values.productAddress,
      fullAddress: values.productAddress,
      categoryId: values.productCategory,
      quality: values.productQuality,
      quantity: 1,
      price: values.productPrice,
      image1: images[0] || "",
      image2: images[1] || "",
      image3: images[2] || "",
      unitType: values.priceUnit,
      isActive: true,
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
        setImages([]); // Yüklenen görselleri temizle
        setTimeout(() => navigate("/mainPage"), 500); // Ana sayfaya yönlendir
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
      <ProductForm
        categories={categories}
        images={images}
        setImages={setImages}
        isLoading={isLoading}
        handleImageUpload={handleImageUpload}
        handleImageRemove={handleImageRemove}
        onFinish={onFinish}
      />
    </div>
  );
};

export default UrunEkleForm;
