import ReactDOM from "react-dom/client";
import { Input } from "./components/Input/Input";
import "./index.css";
import styled from "styled-components";
import { Button } from "./components/Button";
import { SqueezeText } from "./components/SqueezeText";

const App = styled.div``;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <App>
    <div>
      <Input type={"text"} label={"Почта/логин"} />
      <Input type={"checkbox"} active />
      <div style={{ width: "40px" }}>
        <Input type={"switch"} />
      </div>
    </div>
    <div style={{ width: "300px", margin: "30px 0" }}>
      <Button fullWidth rounded>
        Зарегистрироваться
      </Button>
      <Button asLink>Открыть фильтры</Button>
      <Button>
        <span>Новая ссылка</span>
        <div>-&gt;</div>
      </Button>

      <div style={{ margin: "40px 0" }}>
        <Button asLink disabled>
          Отключить
        </Button>
      </div>
    </div>
    <div style={{ width: "300px", margin: "30px 0" }}>
      <SqueezeText squeezeMultiplier={1.5} fontSizePX={36}>
        Squeeze
      </SqueezeText>
    </div>
  </App>
);
