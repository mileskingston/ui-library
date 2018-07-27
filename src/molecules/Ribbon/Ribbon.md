```jsx
const boxCSS = { position: 'relative', border: '1px solid #ccc', marginBottom: 10, minHeight: 50 };
<div>
    <div style={boxCSS}>
        <Ribbon label="Default left" />
    </div>
    
    <div style={boxCSS}>
        <Ribbon label="Default right" side="right" />
    </div>
    
    <div style={boxCSS}>
        <Ribbon label="Info left" style="info" />
    </div>
    
    <div style={boxCSS}>
        <Ribbon label="Info right" side="right" style="info" />
    </div>
</div>
```
