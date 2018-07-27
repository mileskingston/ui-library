    initialState = {
        firstSelected: 0,
        secondSelected: 0,
        thirdSelected: 0
    };
    
    const options = [
        { "id": 1, "label": "Czech Republic" },
        { "id": 2, "label": "United Kingdom" },
        { "id": 3, "label": "France", "disabled": true },
        { "id": 4, "label": "Ireland" }
    ];
    
    <div className="dc-site-currys" style={{ maxWidth: '300px' }}>
        <h3>Non-mandatory</h3>
        <Select 
            label="Country"
            name="selectName"
            options={options}
            selected={state.firstSelected}
            onSelect={(id) => setState({ firstSelected: id })}
            isValid
        />
        
        <h3>Clear option</h3>
        <Select 
            label="Country"
            name="selectName"
            options={options}
            selected={state.secondSelected}
            onSelect={(id) => setState({ secondSelected: id })}
            isValid
            isClearable
        />
        
        <h3>Mandatory with default option</h3>
        <Select 
            label="Country"
            name="selectName"
            options={options}
            selected={state.thirdSelected}
            onSelect={(id) => setState({ thirdSelected: id })}
            isValid
            isRequired
        />
    </div>
