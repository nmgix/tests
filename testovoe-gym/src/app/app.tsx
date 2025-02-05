import { Providers } from "./providers";
import { AppRouter } from "./router";

import "./styles/index.scss";

export const App: React.FC = () => {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
};
