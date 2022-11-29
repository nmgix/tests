import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { useAppSelector } from "../../store/helpers/useAppHooks";
import axios from "axios";

const Auth: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { authed } = useAppSelector((state) => state.settingsControl);
  useLayoutEffect(() => {
    // if (!authed && location.pathname.indexOf("auth") === -1) {
    //   navigate("/auth/login");
    // }

    const fetchAuth = async () => {
      return await axios
        .get(`${process.env.SERVER_ADDRESS}/auth/validate`, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            navigate("/todo/list");
          }
        })
        .catch((err) => {
          if (location.pathname === "/auth" || location.pathname === "/auth/") {
            navigate("/auth/login");
          }
        });
    };

    fetchAuth();
  }, [
    location.pathname,
    navigate,
    // authed
  ]);
  return <Outlet />;
};

export default Auth;
