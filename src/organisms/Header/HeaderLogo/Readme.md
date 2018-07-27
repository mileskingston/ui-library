Usage with path:

```jsx
<div style={{ background: '#1111' }}>
    <HeaderLogo
        desktopLogoSrc="/logo_currys.png"
        handHeldLogoSrc="/logo_currys_negative.png"
    />
</div>
```

Usage with imported file (using url-loader):

```jsx

const desktopLogo = require('../../../../docs/assets/logo_pcworld.png');
const handHeldLogo = require('../../../../docs/assets/logo_pcworld_negative.png');

<div style={{ background: '#1111' }}>
    <HeaderLogo
        desktopLogoSrc={desktopLogo}
        handHeldLogoSrc={handHeldLogo}
        forceTheme='pcworld'
    />
</div>
```
