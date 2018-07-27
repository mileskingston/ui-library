    const options = [
        {
            "id": 0,
            "value": "",
            "selected": true,
            "label": "Please select",
            "disabled": true
        },
        {
            "id": 1,
            "value": "#Relevance",
            "selected": false,
            "label": "Relevance"
        },
        {
            "id": 3,
            "value": "#BrandAtoZ",
            "selected": false,
            "label": "Brand - A to Z"
        },
        {
            "id": 4,
            "value": "#BrandZtoA",
            "selected": false,
            "label": "Brand - Z to A"
        }
    ];  

    <div style={{ maxWidth: '300px' }}>
        <form id="sortForm">
            <SortBy title="Sort by:" options={options} selected={0} />
        </form>
    </div>
