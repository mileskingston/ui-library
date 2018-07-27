
    const items = require('../mocks/tree.json').payload;
    
    <MenuMobile
    	tree={items}
    	menuItemClick={(event, ...params) => {
				event.preventDefault();
    		console.debug(...params);
    	}}
			homeLink="Home"
			homeURL="http://currys.co.uk/"
	/>
