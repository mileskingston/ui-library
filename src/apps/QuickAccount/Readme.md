App for quick sign in or account creation according to recognised or unrecognized email address.

**Full app with mock data:**
```jsx
const QuickAccount = require('./').default;
const initialState = {
    isOpened: false,
    saveForLater: false
};
const product = {
    image: "/products/kettle1.jpg",
    imageUrl: "https://brain-images-ssl.cdn.dixons.com/4/2/10162324/s_10162324.jpg",
    isOutOfStock: false,
    name: "BREVILLE Curve VKT118 Jug Kettle - Grey & Rose Gold",
    price: "£39.99",
    productId: "10162324",
    productName: "BREVILLE Curve VKT118 Jug Kettle - Grey & Rose Gold",
    rating: 9,
    ratingCount: 621,
    savePrice: "Save £40.00",
    wasPrice: "Was £79.99 (from 10/01/2018 to 30/01/2018)"
};

<div>
    {state.isOpened &&
        <QuickAccount
            onPopupClose={() => setState({ isOpened: false })}
            onSignInSuccess={() => setState({ isOpened: false })}
            onRegistrationSuccess={() => setState({ isOpened: false })}
            product={state.saveForLater ? product : undefined}
        />
    }
   
    <Button onClick={() => setState({ isOpened: true, saveForLater: false })} style="full">
        Init Quick Account
    </Button>
   {' '}
    
    <Button onClick={() => setState({ isOpened: true, saveForLater: true })} style="full">
        Init Quick Account with Save for later
    </Button>
</div>
```

**Individual screens:**
