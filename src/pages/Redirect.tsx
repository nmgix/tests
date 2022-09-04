import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const RedirectPage: React.FC = () => {
  const params = useParams();

  useEffect(() => {
    let url = `${process.env.REACT_APP_SERVER_ADRESS}/s/${params.key}`;
    window.location.href = url;
  }, [params.key]);

  return <div>redirecting...</div>;
};
