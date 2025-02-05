import React from "react";
import "./_loader.scss";

export const Loader: React.FC<{}> = () => {
  return (
    <div>
      <h4>Пожалуйста, подождите</h4>
      <span>Информация загружается</span>
    </div>
  );
};
