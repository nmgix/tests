import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import TextInput from "../../components/TextInput/TextInput";
import axios, { AxiosError } from "axios";
import "./_registration.scss";

interface RegistrationData {
  email: string;
  password: string;
  passwordRepeat: string;
}

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState<RegistrationData>({
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(authData);
    if (authData.password !== authData.passwordRepeat) {
      return console.log("Пароли не сходятся");
      // будущий алерт
    }
    // тест код
    await axios
      .post("http://localhost:5000/auth/register", authData, { withCredentials: true })
      .then(async (res) => {
        console.log(res.data);
        navigate("/auth/login", { state: { email: authData.email } });
        // await axios
        //   .get("http://localhost:5000/todo/", { withCredentials: true })
        //   .then((res) => console.log(res))
        //   .catch((err) => console.log(err));
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
          <TextInput id='password' value={authData.password} onChange={onFieldChange} placeholder={"password"} />
          <div className='fieldsWrapper'>
            <TextInput
              id='passwordRepeat'
              value={authData.passwordRepeat}
              onChange={onFieldChange}
              placeholder={"password repeat"}
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
