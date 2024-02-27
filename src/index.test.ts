import { dispatchCustomEvent, listenEvent } from ".";

declare global {
  interface CustomEvents {
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
