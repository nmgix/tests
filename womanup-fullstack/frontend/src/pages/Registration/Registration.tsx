import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import { AxiosError } from "axios";
import { RegistrationData } from "../../types/auth";
import { registerUser } from "../../helpers/functions/auth";
import "./_registration.scss";

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<RegistrationData>({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (authData.password !== authData.passwordRepeat) {
      return console.log("Пароли не сходятся");
    }
    await registerUser(authData)
      .then(async (res) => {
        navigate("/auth/login", { state: { email: authData.email } });
      })
      .catch((err: AxiosError<{ email: string; password: string }, {}>) => {
        console.log(err.response!);
      });
  };

  const onFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setAuthData((prevState) => ({ ...prevState, [event.target.id]: value }));
  };

  return (
    <div className='registrationPage'>
      <Box>
        <Header />
        <form onSubmit={onSubmit}>
          {/* хотел сделать маску для ввода, но доступные решения не подходят и идея начинает занимать слишком много времени */}
          <TextInput id='email' value={authData.email} onChange={onFieldChange} placeholder={"email"} />
          <TextInput
            id='password'
            value={authData.password}
            onChange={onFieldChange}
            placeholder={"password"}
            type={"password"}
          />
          <div className='fieldsWrapper'>
            <TextInput
              id='passwordRepeat'
              value={authData.passwordRepeat}
              onChange={onFieldChange}
              placeholder={"password repeat"}
              type={"password"}
            />
            <Button type='submit'>регистрация</Button>
          </div>
        </form>
        <Link to={"/auth/login"}>есть аккаунт?</Link>
      </Box>
    </div>
  );
};

export default Registration;
