import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import f2mImage from "../images/f2m-Photoroom.png";

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
        overflow: "hidden",
        padding: "1rem", // kenarlardan biraz boşluk bırakır
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
          maxWidth: "80%", // daha küçük hale getirilmiş
          maxHeight: "80vh", // dikey olarak ekran boyutuna uygun
          animation: "spin 4s linear infinite",
        }}
      />
    </div>
  );
}

export default LogoPage;
