import { Link, useRouteError } from "react-router-dom";
import { RouteError } from "../../types/error";
import { IconMemo } from "src/shared/ui/icon";

export const Fallback = () => {
  const error = useRouteError() as RouteError;

  return (
    <div role='alert' className='fallback'>
      <IconMemo icon='error-sign' />
      <h2 className='fallback__header'>Произошла ошибка на сайте!</h2>
      <span className='fallback__description'>
        {error?.messageError} {error?.status}
      </span>
      <Link to='/' className='fallback__link'>
        Домой
      </Link>
    </div>
  );
};
