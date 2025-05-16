import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { link } = useAuthStore();
  useEffect(() => {
    if (link) navigate(`/${link}`);
  }, [link, navigate]);

  return <div></div>;
};

export default HomePage;
