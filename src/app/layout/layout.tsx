import { Outlet } from "react-router-dom";
import { Header } from "src/widgets/Header";

export const Layout = () => {
  return (
    <div className='layout__wrapper'>
      <Header />
      <main className='layout__content'>
        <Outlet />
      </main>
    </div>
  );
};
