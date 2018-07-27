*List:*

    <List items={['item 1', 'item 2', 'item 3']} />

*List with custom icon:*

    <List items={['item 1', 'item 2', 'item 3']} icon="Cross" />

*List with html content:*

    <List items={['item 1 is <b>great</b>', 'item 2  is <b>greater</b>', 'item 3  is the <b>greatest</b>']} />
    
*List with html content, each item has own icon:*

    <List
    	icon="Cog"
    	items={[
    		{
    			icon: 'Cross',
    			content: 'item 1 is <b>great</b>'
    		},
    		'item 2  is <b>greater</b>',
    		{
    			icon: 'Basket',
    			content: 'item 3  is the <b>greatest</b>'
    		}
    	]}
    />
