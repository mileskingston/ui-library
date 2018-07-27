```jsx noeditor
<Tooltip type="warning">
    Warning: Parent element of the AlertController needs to have <code>position: relative;</code> for the floating Alert to display properly.
</Tooltip>
```

```jsx
<div style={{ position: 'relative', minHeight: 140 }}>
    <AlertController isFloating showArrow
        alert={
            <Alert header="Notifications" dropShadow>
                <div style={{ padding: '15px', textAlign: 'center' }}>You’re up to date!</div>
            </Alert>
        }
    >
        <Icon icon="Bell" />
    </AlertController>
</div>
```
