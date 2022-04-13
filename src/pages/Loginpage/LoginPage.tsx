import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "../../components/Input/Input";
// import { authUser } from "../../redux/actionCreators/AuthActionCreator";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

export const LoginPage: React.FC<{}> = () => {
  const [userCredentials, setCredentials] = useState<{ login: string; password: string }>({ login: "", password: "" });
  const { authUser } = useAction();

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authUser(userCredentials.login, userCredentials.password);
  };

  return (
    <div>
      <form onSubmit={formHandler}>
        <Input
          params={{
            type: "text",
            name: "login",
            required: true,
          }}
          onChangeHandler={(e) => setCredentials({ ...userCredentials, login: e.currentTarget.value })}
        />
        <Input
          params={{
            type: "password",
            name: "password",
            required: true,
          }}
          onChangeHandler={(e) => setCredentials({ ...userCredentials, password: e.currentTarget.value })}
        />
        <button type='submit' className='btn btn-primary'>
          Войти
        </button>
      </form>
    </div>
  );
};
