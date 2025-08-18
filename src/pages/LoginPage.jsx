import axios from "axios";
import { useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {};

  return (
    <div className="auth-container">
      <h2>로그인</h2>

      <form onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디"
        />

        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
