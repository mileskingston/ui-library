    const items = [
        { name: 'orange' },
        { name: 'apple' },
        { name: 'pineapple' },
        { name: 'banana' }
    ];
    
    initialState = { items };
    
    function filterItems(keyword) {
        setState({
            items: keyword === ''
                ? items
                : state.items.filter((item) => item.name.indexOf(keyword) > -1)
        });
    }
    
    <div className="dc-site-currys">
        <Filter
            visibleItemsCount={state.items.length}
            label="Type to filter fruit..."
            resultsLabel="found items for"
            filterHandler={filterItems}
        />
        <ul>
        {state.items.map((item) => {
            return <li key={item.name}>{item.name}</li>;
        })}
        </ul>
    </div>
    