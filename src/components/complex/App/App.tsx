import Background from "../../basic/Background";
import Footer from "../Footer";
import Header from "../Header";
import classnames from "./app.module.scss";

const App: React.FC = () => {
  return (
    <div className={classnames.app}>
      <Header />
      <Footer />
      <Background />
    </div>
  );
};

export default App;
