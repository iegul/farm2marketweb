import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Tarayıcı yenilendiğinde localStorage'dan kullanıcı bilgilerini yükle
    const savedUser = localStorage.getItem("user");
    return savedUser
      ? JSON.parse(savedUser)
      : { email: "", token: "", userId: "" };
  });

  useEffect(() => {
    // Kullanıcı güncellendiğinde localStorage'a kaydet
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
