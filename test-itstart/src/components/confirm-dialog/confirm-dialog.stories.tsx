import type { Meta, StoryObj } from "@storybook/react";

import { ConfirmDialog } from "./confirm-dialog";
import { useState } from "react";

const Wrapper = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>открыть confirm dialog</button>
      {open && (
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => console.log("confirmed")}
          onReject={() => console.log("rejected")}
          setOpen={setOpen}
        />
      )}
    </>
  );
};

const meta = {
  title: "ConfirmDialog",
  component: Wrapper,
  args: {}
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};
