Desktop:

    const Tooltip = require('../../molecules/Tooltip/Tooltip').default;

	window.EXAMPLE_SHARE_PRODUCT = {
		shareLinks: [
			{
				name: 'facebook',
				url: 'http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fwww.currys.co.uk%2Fgbuk%2Fhousehold-appliances%2Fsmall-kitchen-appliances%2Fkettles%2Frussell-hobbs-retro-vintage-n21672-jug-kettle-cream-10148153-pdt.html'
			},
			{
				name: 'twitter',
				url: 'http://twitter.com/share?url=http%3A%2F%2Fwww.currys.co.uk%2Fgbuk%2Fhousehold-appliances%2Fsmall-kitchen-appliances%2Fkettles%2Frussell-hobbs-retro-vintage-n21672-jug-kettle-cream-10148153-pdt.html'
			},
			{
				name: 'googlePlus',
				url: '//plus.google.com/share?url=http%3A%2F%2Fwww.currys.co.uk%2Fgbuk%2Fhousehold-appliances%2Fsmall-kitchen-appliances%2Fkettles%2Frussell-hobbs-retro-vintage-n21672-jug-kettle-cream-10148153-pdt.html'
			},
			{
				name: 'pinterest',
				url: '//www.pinterest.com/pin/create/button/?url=http%3A%2F%2Fwww.currys.co.uk%2Fgbuk%2Fhousehold-appliances%2Fsmall-kitchen-appliances%2Fkettles%2Frussell-hobbs-retro-vintage-n21672-jug-kettle-cream-10148153-pdt.html&media=http%3A%2F%2Fbrain-images.cdn.dixons.com%2F3%2F5%2F10148153%2Fs_10148153.jpg&description=RUSSELL%20HOBBS%20Retro%20Vintage%20N21672%20Jug%20Kettle%20-%20Cream'
			},
			{
				name: 'hotDealsUK',
				url: 'http://social.hotukdeals.com/social/share-button?title=RUSSELL%20HOBBS%20Retro%20Vintage%20N21672%20Jug%20Kettle%20-%20Cream&url=http%3A%2F%2Fwww.currys.co.uk%2Fgbuk%2Fhousehold-appliances%2Fsmall-kitchen-appliances%2Fkettles%2Frussell-hobbs-retro-vintage-n21672-jug-kettle-cream-10148153-pdt.html&image=http%3A%2F%2Fbrain-images.cdn.dixons.com%2F3%2F5%2F10148153%2Fs_10148153.jpg&price=%26pound%3B39.99&style=vertical&v=2'
			},
			{
				name: 'mail',
				url: 'mailto:?subject=RUSSELL HOBBS Retro Vintage N21672 Jug Kettle - Cream on Currys&body=http%3A%2F%2Fwww.currys.co.uk%2Fgbuk%2Fhousehold-appliances%2Fsmall-kitchen-appliances%2Fkettles%2Frussell-hobbs-retro-vintage-n21672-jug-kettle-cream-10148153-pdt.html'
			}
		]
	};

	<div>
		<h3>Desktop</h3>
		
		<div
    		style={{
    			position: 'relative',
    			width: 396,
    			height: 280,
    			border: '1px solid #ccc',
    			background: '#ddd',
    			overflow: 'hidden'
    		}}
    	>
    		<ShareProductPanel
    			open
    			product={window.EXAMPLE_SHARE_PRODUCT}
    			viewport="desktop"
    		/>
    	</div>
    	
    	<h3>Mobile/tablet</h3>
    	
    	<Tooltip type="info">
    		Fully supported in IE 10+. Older IE versions do not support css property <code>column-count</code> and two columns list is simulated by floating links to the left - order of items is different.
    	</Tooltip>
    	
		<div
    		style={{
    			position: 'relative',
    			width: 396,
    			height: 280,
    			border: '1px solid #ccc',
    			background: '#ddd',
    			overflow: 'hidden'
    		}}
    	>
    		<ShareProductPanel
    			open
    			product={window.EXAMPLE_SHARE_PRODUCT}
    			viewport="mobile"
    		/>
    	</div>
	</div>
