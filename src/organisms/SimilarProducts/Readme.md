```jsx

const { default: SimilarProductBlock } = require('../SimilarProductBlock/SimilarProductBlock');

<SimilarProducts
	currentProductIds={["10158596"]}
	deviceType="desktop"
	numberOfItems={6}
>
	{({ deviceType, detectMinTitleHeight, detectMinFeaturesListHeight, minFeaturesListHeight, minTitleHeight, similarProducts }) => (
		<div className="dc-similar-products dc-site-currys">
			{similarProducts.length > 0 && similarProducts.map((product) => (
				<SimilarProductBlock
					deviceType={deviceType}
					onFeaturesListRender={detectMinFeaturesListHeight}
					onTitleRender={detectMinTitleHeight}
					minFeaturesListHeight={minFeaturesListHeight}
					minTitleHeight={minTitleHeight}
					className="dc-similar-products__item"
					key={product.id}
					product={product}
				/>
			))}
		</div>
	)}
</SimilarProducts>
```
