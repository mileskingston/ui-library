    const container = document.querySelector('[data-preview="MenuDesktop"]');
    
    if (container) {
    	container.style.width = '1200px';
    }
    
    const items = require('../mocks/tree.json').payload;
    
    <MenuDesktop
    	tree={items}
    	menuItemClick={(event, ...params) => {
				event.preventDefault();
    		console.debug(...params);
    	}}
			homeLink="Home"
			homeURL="http://currys.co.uk/"
	/>
