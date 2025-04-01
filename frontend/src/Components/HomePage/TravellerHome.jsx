import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TravllerHome = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/login", { replace: true });
    } else {
      (async () => {
        try {
          const { data } = await axios.get("http://localhost:8000/api/login", {
            headers: { "Content-Type": "application/json" },
          });
          setMessage(data.message);
        } catch {
          console.log("Unauthorized");
          //navigate("/login", { replace: true });
        }
      })();
    }
  }, []);

  return (
    <div>
      <h1>Traveller Home</h1>
      <h2>{message}</h2>
      <a href="/logout">Logout</a>
    </div>
  );
};

export default TravllerHome;
