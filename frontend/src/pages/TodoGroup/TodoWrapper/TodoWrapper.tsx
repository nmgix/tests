import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Button/Button";
import "./_todoWrapper.scss";

const TodoWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const fetchAuth = async () => {
      return await axios.get("http://localhost:5000/auth/validate", { withCredentials: true }).catch((err) => {
        navigate("/auth/login");
      });
    };

    fetchAuth();

    if (location.pathname === "/todo/" || location.pathname === "/todo") {
      navigate("/todo/list");
    }
  }, [location.pathname, navigate]);

  const logout = async () => {
    await axios.get("http://localhost:5000/auth/logout", { withCredentials: true }).catch((err) => {});
    navigate("/auth/login");
  };

  return (
    <div className='todoWrapper'>
      <Button onClick={logout}>Выйти</Button>
      <Outlet />
    </div>
  );
};

export default TodoWrapper;
