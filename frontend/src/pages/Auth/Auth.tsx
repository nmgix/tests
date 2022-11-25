import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuth = async () => {
      return await axios
        .get("http://localhost:5000/auth/validate", { withCredentials: true })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            navigate("/list");
          }
        })
        .catch((err) => {
          if (location.pathname === "/auth" || location.pathname === "/auth/") {
            navigate("/auth/login");
          }
        });
    };

    fetchAuth();
  }, [location.pathname, navigate]);
  return <Outlet />;
};

export default Auth;
