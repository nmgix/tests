import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

import "./_homePage.scss";

export const HomePage: React.FC<{
  /*id: string*/
}> = (/*{ id }*/) => {
  const user = useTypedSelector((state) => state.user);
  const { getUser } = useAction();

  useEffect(() => {
    if (!user.state) {
      getUser();
    }
  }, []);

  return user.state ? (
    <div>
      {user.state.nick}
      <Outlet />
    </div>
  ) : (
    <Loader />
  );
};
