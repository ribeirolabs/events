import { useEffect } from "react";

declare global {
  interface Events {}
}

type EventName = keyof Events | keyof WindowEventMap;

type EventHandler<E extends string> = (
  event: E extends keyof Events
    ? CustomEvent<Events[E]>
    : E extends keyof WindowEventMap
    ? WindowEventMap[E]
    : Event
) => void;

export function listenEvent<E extends string>(
  event: EventName | E,
  handler: EventHandler<E>
): () => void {
  window.addEventListener(event, handler);

  return () => unlistenEvent(event, handler);
}

export function unlistenEvent<E extends string>(
  event: EventName | E,
  handler: EventHandler<E>
): void {
  window.removeEventListener(event, handler);
}

export function dispatchCustomEvent<E extends keyof Events>(
  event: E,
  detail: CustomEventInit<Events[E]>["detail"]
) {
  window.dispatchEvent(new CustomEvent(event, { detail }));
}

export function useEvent<E extends string>(
  event: EventName | E,
  handler: EventHandler<E>
): void {
  useEffect(() => {
    return listenEvent(event, handler);
  }, [event, handler]);
}
