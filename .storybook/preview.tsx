import React from "react";
import type { Preview } from "@storybook/react";
import { ToastContainer } from "react-toastify";
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
      <>
        <ToastContainer hideProgressBar stacked />
        <Story />
      </>
    )
  ]
};

export default preview;
