<div id="portal-root">
    Portal will be here!
</div>

```jsx
<Portal domNode={document.getElementById('portal-root')}>
    <div>I render as child of #portal-root</div>
</Portal>
```

Example usage with `Popup` component - use `document.body` as `domNode`:

```jsx
const Fragment = require('react').Fragment;
const Popup = require('../../organisms/Popup/Popup').default;
const Button = require('../../molecules/Button/Button').default;

initialState = { opened: false };

<Fragment>
    <Button onClick={() => setState({ opened: true })}>Open popup</Button>

    <Portal domNode={document.body}>
        {state.opened &&
            <Popup
                title="I am children of document.body"
                isVisible={state.opened}
                onClose={() => setState({ opened: false })}
            >
                I am independent on Button's (and its parents) z-index.
            </Popup>
        }
    </Portal>
</Fragment>
```
