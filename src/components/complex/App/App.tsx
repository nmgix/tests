import Background from "../../basic/Background";
import Header from "../Header";
import classnames from "./app.module.scss";

const App: React.FC = () => {
  return (
    <div className={classnames.app}>
      <Header />
      <Background />
    </div>
  );
};

export default App;
