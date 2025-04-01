import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          "",
          { refresh_token: localStorage.getItem("refresh_token") },
          { headers: { "Content-Type": "application/json" } },
          { withCredentials: true }
        );

        localStorage.clear();
        axios.defaults.headers.common["Authorization"] = null;
        navigate("/", { replace: true });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return <div></div>;
};
