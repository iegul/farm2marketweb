import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import f2mImage from "../images/f2m-Photoroom.png";
import { Row, Col } from "antd";

function LogoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/mainPage");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <img
        src={f2mImage}
        alt="Logo"
        style={{
          maxWidth: "60%",
          animation: "spin 4s linear infinite",
        }}
      />
    </div>
  );
}

export default LogoPage;
