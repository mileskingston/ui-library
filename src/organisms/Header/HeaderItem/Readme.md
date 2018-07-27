Single item:

```jsx
<HeaderItem icon="Bell" label="Alerts" />
```

Single item with badge:

```jsx
<HeaderItem
    badge={{
        count: 1,
        color: '#c90404'
    }}
    icon="Bell"
    label="Alerts"
/>
```

Single item with badge (dynamic color):

```jsx
<HeaderItem
    badge={{
        count: 1,
        color: props => props.badge.count > 0 ? '#c90404' : '#999',
        displayZero: true
    }}
    icon="Bell"
    label="Alerts"
/>
```

Multiple items (automatic margin):

```jsx
<div style={{ display: 'flex', alignItems: 'center' }}>
    <HeaderItem icon="Stores" label="Stores" />
    <HeaderItem icon="Bell" label="Alerts" />
</div>
```
