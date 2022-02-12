# @ribeirolabs/events

Type safe listener for custom/native events and dispatcher for custom events

## Usage

### Listen/Unlisten

```js
import { listenEvent } from '@ribeirolabs/events';

// adds event listener
const unlisten = listenEvent('hashchange', (e) => console.log(e.name));

// removes event listener
unlisten();
```

You can also use `unlistenEvent`.

```js
import { unlistenEvent } from '@ribeirolabs/events';

// removes event listener
unlistenEvent('hashchange');
```

### React

You can use the hook `useEvent`. It automatically adds the listener on mount and remove it on unmount.

```js
import { useEvent } from '@ribeirolabs/events/react';

function Component() {
  const listener = useCallback((event) => {
    console.log(event.name);
  }, []);

  useEvent('hashchange', listener);
}
```

### Dispath (custom events)

```js
import { listenEvent, dispatchCustomEvent } from '@ribeirolabs/events';

listenEvent('my-event', (event) => {
  console.log(event.detail.message);
});

dispatchCustomEvent('my-event', {
  message: 'it works',
});
```

### Typescript

You can type your custom events, just declare a global `Events` interface. We suggest that you create an `events.d.ts` file.

```ts
interface Events {
  'my-event': {
    message: string;
  };
};
```
