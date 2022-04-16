import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Toast } from "../../components/Toast/Toast";
// import { authUser } from "../../redux/actionCreators/AuthActionCreator";
import { useAction } from "../../redux/helpers/useAction";
import { useTypedSelector } from "../../redux/helpers/useTypedSelector";

import "./_loginPage.scss";

export const LoginPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [userCredentials, setCredentials] = useState<{ login: string; password: string }>({ login: "", password: "" });
  const { authUser } = useAction();

  const auth = useTypedSelector((state) => state.auth);
  const [authToast, setAuthToast] = useState(false);
  useEffect(() => {
    if (auth.state && auth.state.id && auth.state.id.length > 0) {
      return navigate("/home");
    }

    if (typeof auth.error === "string") {
      setAuthToast(true);
    } else {
      setAuthToast(false);
    }
  }, [auth, auth.error, auth.state]);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authUser(userCredentials.login, userCredentials.password);
  };

  const changeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    return setCredentials({ ...userCredentials, [e.currentTarget.name]: e.currentTarget.value });
  };

  return (
    <div className='h-100 m-auto d-flex flex-column align-items-center position-relative justify-content-center component-greeting'>
      <form
        onSubmit={formHandler}
        className='w-100 d-flex justify-content-center flex-column shadow-lg p-4 bg-white rounded'>
        <Input
          params={{
            type: "text",
            name: "login",
            required: true,
          }}
          extClassname='form-group'
          onChangeHandler={(e) => changeCredentials(e)}
        />
        <Input
          params={{
            type: "password",
            name: "password",
            required: true,
          }}
          extClassname='form-group'
          onChangeHandler={(e) => changeCredentials(e)}
        />
        <button type='submit' className='btn btn-primary form-control w-50 mx-auto'>
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
