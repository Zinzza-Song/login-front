import { useEffect } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import Cookies from "js-cookie";

import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import OAuthRedirectKakaoPage from "./pages/OAuthRedirectPage";

import { setUserFromToken } from "./store/userSlice";

import "./css/App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      dispatch(setUserFromToken(token));
    }
  }, [dispatch]);

  return (
    <Router>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route
            path="/oauth2/redirect/kakao"
            element={<OAuthRedirectKakaoPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
