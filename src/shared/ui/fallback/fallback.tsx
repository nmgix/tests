import { useRouteError } from "react-router-dom";
import { RouteError } from "../../types/error";

export const Fallback = () => {
  const error = useRouteError() as RouteError;

  return <div role='alert' className='fallback'></div>;
};
