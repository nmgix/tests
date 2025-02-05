import { createHashRouter, RouterProvider } from "react-router-dom";
import { Fallback } from "src/shared/ui/fallback";
import { Layout } from "src/app/layout";
import { PromoPage } from "src/pages/promo";

export const AppRouter = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Fallback />,
      children: [
        {
          index: true,
          element: <PromoPage />
        }
      ]
    },
    {
      path: "*",
      element: <Fallback /> // можно not found страницу сделать
    }
  ]);

  return <RouterProvider router={router} />;
};
