import ReactDOM from "react-dom/client";
import { Input } from "./components/Input/Input";
import "./index.css";
import styled from "styled-components";

const App = styled.div``;

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <App>
    <Input type={"text"} label={"Почта/логин"} />
    <Input type={"checkbox"} active />
    <div style={{ width: "40px" }}>
      <Input type={"switch"} />
    </div>
  </App>
);
