import React from "react";
import { RenderCodes } from "../App";

export const RenderOptions: React.FC<{
  options: { code: RenderCodes; title: string }[];
  setRenderCode: React.Dispatch<any>;
  currentRenderCode: RenderCodes;
}> = ({ options, setRenderCode, currentRenderCode }) => {
  return (
    <ul>
      {options.map((option) => (
        <li onClick={() => setRenderCode(option.code)}>
          <button className={currentRenderCode === option.code ? "active" : ""}>{option.title}</button>
        </li>
      ))}
    </ul>
  );
};
