# @ribeirolabs/events

Type safe listener for custom/native events and dispatcher for custom events

## Usage

### listenEvent `(event, handler) => unlistenEvent`

```js
import { listenEvent } from '@ribeirolabs/events';

// adds event listener
const unlisten = listenEvent('hashchange', (e) => console.log(e.name));

// removes event listener
unlisten();
```

### unlistenEvent `(event) => void`

You can also use it to unlisten a specific event.

```js
import { unlistenEvent } from '@ribeirolabs/events';

// removes event listener
unlistenEvent('hashchange');
```

### dispatchCustomEvent `(name, detail) => void`

```js
import { listenEvent, dispatchCustomEvent } from '@ribeirolabs/events';

listenEvent('my-event', (event) => {
  console.log(event.detail.message); // it works
});

dispatchCustomEvent('my-event', {
  message: 'it works',
});
```

## React

### useEvent `(event, handler) => void`

This hook automatically adds the listener on mount and removes it on unmount.

```js
import { useEvent } from '@ribeirolabs/events/react';

function Component() {
  const listener = useCallback((event) => {
    console.log(event.name);
  }, []);

  useEvent('hashchange', listener);
}
```

## Browser

### index.browser.js

It adds a global `ribeirolabs.events` with all the methods.

```html
<script src="https://unpkg.com/@ribeirolabs/events/index.browser.js"></script>

<script>
  ribeirolabs.events.listenEvent('my-event', (event) => {
    console.log(event.detail.message) // it works!
  });

  ribeirolabs.events.dispatchCustomEvent('my-event', {
    message: 'it works!',
  });

  ribeirolabs.events.unlistenEvent();
</script>
```

### index.mjs

To work with modules.

```html
<script type="module">
  import { listenEvent, dispatchCustomEvent, unlistenEvent } from "https://unpkg.com/@ribeirolabs/events/index.mjs";

  listenEvent('my-event', (event) => {
    console.log(event.detail.message) // it works!
  });

  dispatchCustomEvent('my-event', {
    message: 'it works!',
  });

  unlistenEvent();
</script>
```


## Typescript

You can type your custom events, just declare a global `Events` interface. We
suggest that you create an `events.d.ts` file inside the root folder.

```ts
interface Events {
  'my-event': {
    message: string;
  };
};
```

Now `dispatchCustomEvent` will be typed based on that interface, and the other
methods will also consider these events.
