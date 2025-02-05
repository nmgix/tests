import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

export const ProtectedPage: React.FC<{ children: React.ReactNode; redirectTo: string }> = ({
  children,
  redirectTo,
}) => {
  const userState = useTypedSelector((state) => state.user);

  if (userState.state === null && !userState.loading) {
    return <Navigate to={redirectTo} replace={true} />;
  } else {
    return <>{children}</>;
  }
};
