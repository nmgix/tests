import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import axios, { AxiosError } from "axios";
import "./_login.scss";

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [authData, setAuthData] = useState<LoginData>({
    email: state && state.email ? state.email : "1wow123@wow.com",
    password: "some-password",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(authData);
    // тест код
    await axios
      .post("http://localhost:5000/auth/login", authData, { withCredentials: true })
      .then(async (res) => {
        console.log(res.data);

        navigate("/list");
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
