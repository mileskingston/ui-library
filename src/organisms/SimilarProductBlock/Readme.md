Desktop:
```jsx
<div className="dc-site-currys" style={{ width: 300 }}>
	<SimilarProductBlock
		deviceType="desktop"
		product={{
			name: 'ESSENTIALS C17JKW17 Jug Kettle - White',
			image_url: '/products/kettle1.jpg',
			reviews: '(12)',
			rating: 8,
			price: 45.7,
			link_url: 'https://www.google.com',
			details: [
				'Best kettle ever!',
				'Really! Just buy it!',
			],
			attributes: {
				HomeDelivery: ["true"],
				AvailableInStore: ["false"]
			}
		}}
		minContainerHeight={0}
	/>
</div>
```

Mobile:
```jsx
<div className="dc-site-currys" style={{ width: 300 }}>
	<SimilarProductBlock
		deviceType="mobile"
		product={{
			name: 'ESSENTIALS C17JKW17 Jug Kettle - White',
			image_url: '/products/kettle2.jpg',
			reviews: '(12)',
			rating: 8,
			price: 45.7,
			link_url: 'https://www.google.com',
			details: [
				'Best kettle ever!',
				'Really! Just buy it!',
			],
			attributes: {
				HomeDelivery: ["true"],
				AvailableInStore: ["false"]
			}
		}}
		minContainerHeight={0}
	/>
</div>
```
