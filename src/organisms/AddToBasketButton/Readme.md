Wishlist placement (note 'saved on' line):

```jsx
const Icon = require('../../molecules/Icon/Icon').default;

<div className="dc-site-currys" style={{ width: 200 }}>
	<AddToBasketButton
		productId="10148159"
		postUrl="http://www.currys.co.uk/gbuk/household-appliances/small-kitchen-appliances/kettles/breville-curve-vkt018-jug-kettle-white-rose-gold-10148159-pdt.html"
		savedOn="24/06/2017"
	>
		<Icon icon="AddToBasket" />
		Add to basket
	</AddToBasketButton>
</div>
```


Similar product placement:

```jsx
const Icon = require('../../molecules/Icon/Icon').default;

<div className="dc-site-currys" style={{ width: 200 }}>
	<AddToBasketButton
		productId="10148159"
		postUrl="http://www.currys.co.uk/gbuk/household-appliances/small-kitchen-appliances/kettles/breville-curve-vkt018-jug-kettle-white-rose-gold-10148159-pdt.html"
		placement={AddToBasketButton.placements.SIMILAR_PRODUCT}
		isDownload
	>
		<Icon icon="Download" />
		Buy it and download
	</AddToBasketButton>
</div>
```
