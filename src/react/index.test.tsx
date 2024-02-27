import { render } from "@testing-library/react";
import React from "react";
import { useEvent } from ".";
import { dispatchCustomEvent } from "..";

declare global {
  interface CustomEvents {
    test: {
      message: string;
    };
  }
}

it("should add/remove listener using the hook", () => {
  const listener = jest.fn();

  function Component() {
    useEvent("test", listener);

    return null;
  }

  const { unmount } = render(<Component />);

  dispatchCustomEvent("test", {
    message: "it works",
  });

  expect(listener).toBeCalledTimes(1);

  unmount();

  dispatchCustomEvent("test", {
    message: "it works",
  });

  expect(listener).toBeCalledTimes(1);
});
