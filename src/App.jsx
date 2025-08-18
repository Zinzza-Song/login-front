import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import "./css/App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />

      <div style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
