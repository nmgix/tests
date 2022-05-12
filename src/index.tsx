import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import HeroView from "./components/HeroView";
import "./main.scss";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <div>
    <Header />
    <main>
      <HeroView />
    </main>
  </div>
);
