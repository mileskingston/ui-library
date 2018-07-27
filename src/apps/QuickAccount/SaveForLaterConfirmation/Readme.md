```jsx
const { translations } = require('../../../config');
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

<Box classes="sg-quick-account-wrapper">
    <SaveForLaterConfirmation
        message={translations.saving_success}
        product={product}
        viewDetails
    />
</Box>
```
