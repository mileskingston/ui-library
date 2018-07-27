## Default renderer

It expects each item to be an object with `href`, `icon`, `onClick` and `label` properties.

```jsx
<ListMenu
    style={{ width: 120, margin: 10 }}
    items={[
        {
            icon: "EnvelopeOpen",
            label: "Mark as read",
            onClick: e => e.preventDefault(),
            interaction: "Alerts list: Mark as read"
        },
        {
            icon: "Bin",
            label: "Delete",
            onClick: e => e.preventDefault()
        }
    ]}
/>
```

## Custom renderer

Items can have any structure because application handles rendering on its own.
Renderer is provided by styled components `Item` and `Link`.

```jsx
const Icon = require('../Icon/Icon').IconStyled;

const icons = ['Cross', 'Cog', 'Basket'];

<ListMenu
    style={{ width: 200, margin: 10 }}
    items={['item 1 is <b>great</b>', 'item 2  is <b>greater</b>', 'item 3  is the <b>greatest</b>']}
>
    {(item, index, Item, Link) => (
        <Item key={index}>
            <Link href="#" onClick={e => e.preventDefault()}>
                <Icon icon={icons[index]}/><span dangerouslySetInnerHTML={{ __html: item }} />
            </Link>
        </Item>
    )}
</ListMenu>
```
