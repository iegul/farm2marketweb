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
  const [categories, setCategories] = useState([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://farmtwomarket.com/api/Product/GetCategory"
        );
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setUpdateFields((prevFields) => ({
      ...prevFields,
      [field]: value,
    }));
  };

  // Handle removing images
  const handleImageRemove = async (index) => {
    const imageFields = ["image1", "image2", "image3"];

    if (index < imageFields.length) {
      const fieldToClear = imageFields[index];

      // Clear the image field in the frontend
      const updatedFields = {
        ...updateFields,
        [fieldToClear]: "", // Clear the specific field
      };
      setUpdateFields(updatedFields); // Update state with cleared field

      try {
        // Send the updated data (with cleared image) to the backend
        const response = await axios.put(
          `https://farmtwomarket.com/api/Product/UpdateProduct?id=${updatedFields.id}`,
          updatedFields
        );
        if (response.status === 200) {
          console.log("Image removed and updated successfully!");
        } else {
          console.error("Unexpected response from the API:", response);
        }
      } catch (error) {
        console.error("Error removing image:", error);
      }
    }
  };

  // Handle image upload
  const handleImageUpload = (file, fieldName) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdateFields((prevFields) => ({
        ...prevFields,
        [fieldName]: reader.result.split(",")[1], // Convert image to base64 and get the string part
      }));
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  // Handle save
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://farmtwomarket.com/api/Product/UpdateProduct?id=${updateFields.id}`,
        updateFields // Send updated data
      );
      if (response.status === 200) {
        console.log("Product updated successfully!");
        onOk(); // Close the modal
      } else {
        console.error("Unexpected response from the API:", response);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Render images
  const renderImages = () => {
    const productImages = [
      updateFields.image1,
      updateFields.image2,
      updateFields.image3,
    ].filter((img) => img); // Filter out empty images

    return productImages.map((base64Image, index) => {
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;
      return (
        <div key={index} style={{ position: "relative", margin: "5px" }}>
          <img
            src={imageUrl}
            alt={`Product Image ${index + 1}`}
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
      );
    });
  };

  return (
    <Modal
      title="Update Product"
      visible={visible}
      onCancel={onCancel}
      onOk={handleSave}
    >
      {/* Input Fields */}
      <div>
        <label>Product Name</label>
        <Input
          value={updateFields.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          placeholder="Enter product name"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Description</label>
        <TextArea
          rows={3}
          value={updateFields.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Short product description"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Weight / Quantity</label>
        <InputNumber
          style={{ width: "100%" }}
          value={updateFields.weightOrAmount}
          onChange={(value) => handleInputChange("weightOrAmount", value)}
          placeholder="Example: 10"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Address</label>
        <TextArea
          rows={3}
          value={updateFields.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
          placeholder="Product address"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Quality</label>
        <Select
          value={updateFields.quality}
          onChange={(value) => handleInputChange("quality", value)}
          placeholder="Select quality"
          style={{ width: "100%" }}
        >
          {["A (Best)", "B", "C"].map((quality) => (
            <Select.Option key={quality} value={quality}>
              {quality}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Price</label>
        <InputNumber
          style={{ width: "100%" }}
          value={updateFields.price}
          onChange={(value) => handleInputChange("price", value)}
          placeholder="Enter product price"
        />
      </div>
      <div style={{ marginTop: "16px" }}>
        <label>Unit Type</label>
        <Select
          value={updateFields.priceUnit}
          onChange={(value) => handleInputChange("priceUnit", value)}
          placeholder="Select unit"
          style={{ width: "100%" }}
        >
          {["Kilogram", "Adet", "Litre", "Diğer"].map((unit) => (
            <Select.Option key={unit} value={unit}>
              {unit}
            </Select.Option>
          ))}
        </Select>
      </div>
      {/* Category Dropdown */}
      <div style={{ marginTop: "16px" }}>
        <label>Category</label>
        <Select
          value={updateFields.categoryId}
          onChange={(value) => handleInputChange("categoryId", value)}
          placeholder="Select category"
          style={{ width: "100%" }}
        >
          {categories.length > 0 ? (
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

      {/* Image Section */}
      <div style={{ marginTop: "16px" }}>
        <label>Product Images</label>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          {renderImages()}
        </div>
      </div>
      <Upload
        beforeUpload={(file) => {
          const index = images.length; // Calculate the image index
          handleImageUpload(file, `image${index + 1}`); // Pass the correct image index
          return false; // Prevent default upload behavior
        }}
        showUploadList={false}
      >
        <Button icon={<PlusOutlined />}>Upload Image</Button>
      </Upload>
    </Modal>
  );
};

export default UpdateProductModal;
