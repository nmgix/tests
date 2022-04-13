import React from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

export const ProtectedPage: React.FC<{ children: React.ReactNode; redirectTo: string }> = ({
  children,
  redirectTo,
}) => {
  const authState = useTypedSelector((state) => state.auth);
  const userState = useTypedSelector((state) => state.user);

  //   useEffect(() => {
  //   }, [authState])
  if (
    !authState.state ||
    !userState.state ||
    authState.error !== null ||
    userState.error !== null ||
    !authState.state.id
  ) {
    return <Navigate to={redirectTo} />;
  } else {
    return <>{children}</>;
  }
};
