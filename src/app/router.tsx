import { createHashRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Fallback } from "src/shared/ui/fallback";
import { Layout } from "src/app/layout";
import { PromoPage } from "src/pages/promo";

export const AppRouter = () => {
  const routes = createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<Fallback />}>
      <Route index element={<PromoPage />} />
    </Route>
  );

  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
};
