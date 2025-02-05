import { useLayoutEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../components/Button/Button";
import "./_todoWrapper.scss";
// import { useAppSelector } from "../../../store/helpers/useAppHooks";

const TodoWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { error } = useAppSelector((state) => state.settingsControl);
  useLayoutEffect(() => {
    const fetchAuth = async () => {
      return await axios.get(`${process.env.SERVER_ADDRESS}/auth/validate`, { withCredentials: true }).catch((err) => {
        navigate("/auth/login");
      });
    };

    fetchAuth();

    if (location.pathname === "/todo/" || location.pathname === "/todo") {
      navigate("/todo/list");
    }
  }, [location.pathname, navigate]);

  // useEffect(() => {
  //   if (error === true) {
  //     navigate("/auth/login");
  //   }
  // }, [error]);

  const logout = async () => {
    await axios.get(`${process.env.SERVER_ADDRESS}/auth/logout`, { withCredentials: true }).catch((err) => {});
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

// import { useLayoutEffect, useEffect } from "react";
// import { Outlet, useLocation, useNavigate } from "react-router";
// import axios from "axios";
// import Button from "../../../components/Button/Button";
// import "./_todoWrapper.scss";
// import { useAppSelector } from "../../../store/helpers/useAppHooks";

// const TodoWrapper: React.FC = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // const { error } = useAppSelector((state) => state.settingsControl);

//   useLayoutEffect(() => {
//     if (location.pathname === "/todo/" || location.pathname === "/todo") {
//       navigate("/todo/list");
//     }
//   }, [location.pathname, navigate]);

//   // useEffect(() => {
//   //   if (error === true) {
//   //     navigate("/auth/login");
//   //   }
//   // }, [error]);

//   const logout = async () => {
//     await axios.get(`${process.env.SERVER_ADDRESS}/auth/logout`, { withCredentials: true }).catch((err) => {});
//     navigate("/auth/login");
//   };

//   return (
//     <div className='todoWrapper'>
//       <Button onClick={logout}>Выйти</Button>
//       <Outlet />
//     </div>
//   );
// };

// export default TodoWrapper;
