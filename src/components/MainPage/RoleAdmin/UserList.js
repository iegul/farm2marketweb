import React, { useEffect, useState } from "react";
import { Table, message, Spin } from "antd";
import axios from "axios";
import { useUser } from "../../Context/UserContext"; // Token'in UserContext'ten geldiğini varsayıyoruz.

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser(); // Kullanıcının giriş yaparken aldığı token
  const token = user?.token; // Token burada saklanıyor

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        message.error("Lütfen giriş yapın.");
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          "https://farmtwomarket.com/api/Auth/GetUsers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUsers(response.data);
          message.success("Kullanıcılar başarıyla yüklendi!");
        }
      } catch (error) {
        console.error("Kullanıcıları alırken hata oluştu:", error);
        message.error(
          "Kullanıcıları yüklerken bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const columns = [
    {
      title: "Ad",
      dataIndex: "firstname",
      key: "firstname",
    },

    {
      title: "Soyad",
      dataIndex: "lastname",
      key: "lastname",
    },

    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Kullanıcı Listesi</h1>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Table
          columns={columns}
          dataSource={users.map((user) => ({
            key: user.id,
            firstname: `${user.firstName}`,
            lastname: `${user.lastName}`,
            role: user.userRole,
          }))}
          pagination={{ pageSize: 8 }}
        />
      )}
    </div>
  );
};

export default UserList;
