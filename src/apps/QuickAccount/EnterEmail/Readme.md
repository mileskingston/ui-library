```jsx
const Benefits = require('../../../organisms/Benefits/Benefits').default;
const list = [
    '<b>Get what you want</b> – save items for later, so they’re to hand when you’re ready to buy',
    '<b>Get it at the best price</b> – we’ll email you if the stuff you love drops in price',
    '<b>Get it easier</b> – check out faster, and track the status of your orders'
];

<Box classes="sg-quick-account-wrapper">
    <EnterEmail>
        <Benefits arrow="top" list={list} title="Why create account?" viewInTooltip />
    </EnterEmail>
</Box>
```
