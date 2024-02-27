declare global {
  interface CustomEvents {}
}

export type EventName = keyof CustomEvents | keyof WindowEventMap;

export type EventHandler<E extends string> = (
  event: E extends keyof CustomEvents
    ? CustomEvent<CustomEvents[E]>
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

export function dispatchCustomEvent<E extends keyof CustomEvents>(
  event: E,
  detail: CustomEventInit<CustomEvents[E]>["detail"]
) {
  window.dispatchEvent(new CustomEvent(event, { detail }));
}
