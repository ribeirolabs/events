import { useEffect } from "react";
import { EventHandler, EventName, listenEvent } from "./../";

export function useEvent<E extends string>(
  event: EventName | E,
  handler: EventHandler<E>
): void {
  useEffect(() => {
    return listenEvent(event, handler);
  }, [event, handler]);
}
