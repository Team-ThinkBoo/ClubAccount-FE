import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  console.log(`${import.meta.env.VITE_API_BASE_URL}/v1/profile`);
  const navigate = useNavigate();
  const { link } = useAuthStore();
  useEffect(() => {
    if (link) navigate(`/${link}`);
  }, [link, navigate]);

  return <div></div>;
};

export default HomePage;
