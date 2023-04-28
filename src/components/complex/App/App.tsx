import Background from "../../basic/Background";
import classnames from "./app.module.scss";

const App: React.FC = () => {
  return (
    <div className={classnames.app}>
      <Background />
    </div>
  );
};

export default App;
