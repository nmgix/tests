import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

export const ProtectedPage: React.FC<{ children: React.ReactNode; redirectTo: string }> = ({
  children,
  redirectTo,
}) => {
  const authState = useTypedSelector((state) => state.auth);

  //   useEffect(() => {
  //   }, [authState])
  if (
    // !authState.state ||
    // (authState.state && !authState.state.id) ||
    // !userState.state ||
    // authState.error !== null ||
    // userState.error !== null
    !authState.state.id
  ) {
    return <Navigate to={redirectTo} replace={true} />;
  } else {
    return <>{children}</>;
  }
};
