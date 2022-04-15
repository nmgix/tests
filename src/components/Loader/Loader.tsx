import React from "react";
import "./_loader.scss";

export const Loader: React.FC<{}> = () => {
  return (
    <p>
      <h4>Пожалуйста, подождите</h4>
      <span>Информация загружается</span>
    </p>
  );
};
