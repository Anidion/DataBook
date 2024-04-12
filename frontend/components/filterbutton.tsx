import React from "react";
import { Button } from "@nextui-org/react";

const ButtonGroup = () => {
  return (
    <div className="bg-tokens-colors-layout-background relative mb-10 inline-flex items-center justify-center overflow-hidden rounded-[12px]">
      <Button
        className="!flex-[0_0_auto] !rounded-[12px_0px_0px_12px]"
        color="danger"
        size="md"
        variant="light"
      >
        {"One"}
      </Button>
      <Button
        className="!flex-[0_0_auto] !rounded-[unset]"
        color="danger"
        isIconOnly={false}
        size="md"
        variant="light"
      >
        {"Two"}
      </Button>
      <Button
        className="!flex-[0_0_auto] !rounded-[0px_12px_12px_0px]"
        color="danger"
        isIconOnly={false}
        size="md"
        variant="light"
      >
        {"Three"}
      </Button>
    </div>
  );
};

export default ButtonGroup;
