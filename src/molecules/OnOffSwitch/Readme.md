    initialState = {
        active: false
    };
    
    <div className="dc-site-currys">
        <OnOffSwitch
            label={state.active ? 'On' : 'Off'}
            description="Click to switch the toggle"
            active={state.active}
            onSwitch={() => setState({ active: !state.active })}
        />
    </div>
    