import Background from "../../basic/Background";
import Footer from "../Footer";
import Header from "../Header";
import HeroScreen from "../Screens/Hero";
import classnames from "./app.module.scss";

const App: React.FC = () => {
  return (
    <div className={classnames.app}>
      <Header />
      <div className={classnames.mainSection}>
        <HeroScreen />
      </div>
      <Footer />
      <Background />
    </div>
  );
};

export default App;
