import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import { AxiosError } from "axios";
import "./_login.scss";
import { LoginData } from "../../types/auth";
import { loginUser } from "../../helpers/functions/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [authData, setAuthData] = useState<LoginData>({
    email: state && state.email ? state.email : "",
    password: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginUser(authData)
      .then(async (res) => {
        navigate("/todo/list");
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
    <div className='loginPage'>
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
          <Button type='submit'>войти</Button>
        </form>
        <Link to={"/auth/registration"}>нет аккаунта?</Link>
      </Box>
    </div>
  );
};

export default Login;
