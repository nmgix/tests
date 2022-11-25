import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // проверять если человек авторизован, то редирект сразу на /todo/
  useEffect(() => {
    if (location.pathname === "/auth" || location.pathname === "/auth/") {
      navigate("/auth/login");
    }
  }, [location.pathname, navigate]);
  return <Outlet />;
};

export default Auth;
