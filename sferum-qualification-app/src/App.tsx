import "./_app.scss";

import { Cart } from "./components/Cart/Cart";
import { Header } from "./components/Header/Header";
import { Showcase } from "./components/Showcase/Showcase";

function App() {
  return (
    <div className='app'>
      <Header />
      <main>
        <Showcase />
        <Cart />
      </main>
    </div>
  );
}

export default App;
