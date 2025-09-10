import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import { setUserFromToken } from "../store/userSlice";

function OAuthRedirectKakaoPage() {
  const [params] = useSearchParams();
  const code = params.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/auth/kakao",
          { code },
          { withCredentials: true }
        );

        const accessToken = res.data.accessToken;
        Cookies.set("accessToken", accessToken, { expires: 0.021 });

        dispatch(setUserFromToken(accessToken));

        navigate("/");
      } catch (err) {
        alert("카카오 로그인 실패", err);

        navigate("/login");
      }
    };

    if (code) getToken();
  }, [code, dispatch, navigate]);

  return <div>카카오 로그인 처리중...</div>;
}

export default OAuthRedirectKakaoPage;
