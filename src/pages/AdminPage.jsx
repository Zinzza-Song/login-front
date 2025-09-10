import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axiosInstance from "../api/axiosInstance";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/users");
      setUsers(res.data);
    } catch (err) {
      alert("사용자 정보를 불러오는데 실패했습니다." + err.message);

      navigate("/");
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home">
      <h2>Admin 페이지 입니다.</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
