import ReactDOM from "react-dom/client";
import { DefaultScene } from "./Scenes/DefaultScene";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<DefaultScene backgroundImage='/images/Pattern.png' />);
