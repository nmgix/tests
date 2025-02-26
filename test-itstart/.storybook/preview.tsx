import React from "react";
import type { Preview } from "@storybook/react";
import { ToastContainer } from "react-toastify";
import { SeminarContextProvider } from "../src/shared/seminars-context";
import "react-loading-skeleton/dist/skeleton.css";
import "../src/index.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    Story => (
      <SeminarContextProvider>
        <ToastContainer hideProgressBar stacked />
        <Story />
      </SeminarContextProvider>
    )
  ]
};

export default preview;
