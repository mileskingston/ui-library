**Live example** (edit code below):

	const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

	<Rollup
		initialCount={3}
		items={allItems}
		step={10}
	>
		{({ items, totalItems, toDisplay, toHide, displayMore, displayLess }) => (
			<ul>
				<li>Total items: {totalItems}</li>
				<li>To display: {toDisplay}</li>
				<li>To hide: {toHide}</li>
				<hr />
				{items.map((item) => (
            		<li key={item}>{item}</li>
            	))}
            	<hr />
            	{toDisplay > 0 &&
            		<li><a href="#" onClick={displayMore}>Display more ({toDisplay})</a></li>
            	}
            	{toHide > 0 && toDisplay === 0 &&
            		<li><a href="#" onClick={displayLess}>Display less ({toHide})</a></li>
            	}
			</ul>
		)}
	</Rollup>

**Live example of ensureVisibleItemIndex usage** (edit code below):

	const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

	<Rollup
		initialCount={2}
		items={allItems}
		step={3}
		ensureVisibleItemIndex={8}
	>
		{({ items, totalItems, toDisplay, toHide, displayMore, displayLess }) => (
			<ul>
				<li>Total items: {totalItems}</li>
				<li>To display: {toDisplay}</li>
				<li>To hide: {toHide}</li>
				<hr />
				{items.map((item) => (
            		<li key={item}>{item}</li>
            	))}
            	<hr />
            	{toDisplay > 0 &&
            		<li><a href="#" onClick={displayMore}>Display more ({toDisplay})</a></li>
            	}
            	{toHide > 0 && toDisplay === 0 &&
            		<li><a href="#" onClick={displayLess}>Display less ({toHide})</a></li>
            	}
			</ul>
		)}
	</Rollup>
