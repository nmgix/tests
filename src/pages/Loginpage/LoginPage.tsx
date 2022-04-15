import React, { useEffect } from "react";
import { useState } from "react";
import { Input } from "../../components/Input/Input";
import { Toast } from "../../components/Toast/Toast";
// import { authUser } from "../../redux/actionCreators/AuthActionCreator";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

import "./_loginPage.scss";

export const LoginPage: React.FC<{}> = () => {
  const [userCredentials, setCredentials] = useState<{ login: string; password: string }>({ login: "", password: "" });
  const { authUser } = useAction();

  const auth = useTypedSelector((state) => state.auth);
  const [authToast, setAuthToast] = useState(false);
  useEffect(() => {
    if (auth.error !== (null || undefined)) {
      setAuthToast(true);
    }
  }, [auth]);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authUser(userCredentials.login, userCredentials.password);
  };

  return (
    <div className='container w-25 h-100 m-auto d-flex flex-column align-items-center position-relative component-greeting justify-content-center'>
      <form
        onSubmit={formHandler}
        className='container d-flex justify-content-center flex-column shadow-lg p-4 bg-white rounded'>
        <Input
          params={{
            type: "text",
            name: "login",
            required: true,
          }}
          extClassname='form-group'
          onChangeHandler={(e) => setCredentials({ ...userCredentials, login: e.currentTarget.value })}
        />
        <Input
          params={{
            type: "password",
            name: "password",
            required: true,
          }}
          extClassname='form-group'
          onChangeHandler={(e) => setCredentials({ ...userCredentials, password: e.currentTarget.value })}
        />
        <button type='submit' className='btn btn-primary form-control'>
          Войти
        </button>
      </form>
      {authToast && (
        <Toast
          active={authToast}
          closeFunc={setAuthToast}
          data={{ title: "Ошибка", body: String(auth.error) }}
          // closeTimeout={5000}
          extClassname='w-100 position-absolute'
          extStyles={{ flex: "0 1 auto", top: "61.5%" }}
        />
      )}
    </div>
  );
};
