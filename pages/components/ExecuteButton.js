import React from "react";
import ExecuteButton from "common-library-components/execute-button/ExecuteButton";

export default {
  title: "Execute Button",
  component: ExecuteButton,
  decorators: [withKnobs],
};

export const executeButton = () => {
  return (
    <ExecuteButton
      onClick={action("onClick")}
      caption={text("caption", "DEPOSIT")}
      currency={text("currency", "USD")}
      rate={number("rate", 1.3)}
    />
  );
};
