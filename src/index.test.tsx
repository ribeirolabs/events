import { render } from "@testing-library/react";
import React from "react";
import { dispatchCustomEvent, listenEvent, useEvent } from ".";

declare global {
  interface Events {
    test: {
      message: string;
    };
  }
}

it("should listen native events", () => {
  const listener = jest.fn();

  listenEvent("hash", listener);

  const event = new Event("hash");

  window.dispatchEvent(event);

  expect(listener).toBeCalledTimes(1);
  expect(listener).toBeCalledWith(event);
});

it("should listen/dispatch custom events", () => {
  const listener = jest.fn();

  listenEvent("test", listener);

  dispatchCustomEvent("test", {
    message: "it works",
  });

  expect(listener).toBeCalledTimes(1);
  expect(listener).toBeCalledWith(
    new CustomEvent("test", { detail: { message: "it works" } })
  );
});

it("should remove listener", () => {
  const listener = jest.fn();

  const unlisten = listenEvent("test", listener);

  dispatchCustomEvent("test", {
    message: "it works",
  });

  expect(listener).toBeCalledTimes(1);

  unlisten();

  dispatchCustomEvent("test", {
    message: "it works",
  });

  expect(listener).toBeCalledTimes(1);
});

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
