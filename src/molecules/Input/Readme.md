    initialState = {
        interactive: '',
        static: '',
        password: '',
        clearIcon: ''
    };
    
    <form style={{ maxWidth: '300px' }}>
        <Input
            name="interactive"
            type="text"
            label="Interactive placeholder"
            isValid
            value={state.interactive}
            updateValue={(value) => setState({ interactive: value })}
        /><br />
        <Input
            autoComplete="off"
            name="static"
            type="text"
            placeholder="Static placeholder"
            isValid
            value={state.static}
            updateValue={(value) => setState({ static: value })}
        /><br />
        <Input
            autoComplete="off"
            name="password"
            type="password"
            label="Password with show/hide toggle"
            isValid
            passwordShowHide
            value={state.password}
            updateValue={(value) => setState({ password: value })}
        /><br />
        <Input
            name="disabled"
            type="text"
            placeholder="Disabled input"
            disabled
        /><br />
        <Input
            name="with_clear_icon"
            type="text"
            placeholder="With clear icon"
            value={state.clearIcon}
            updateValue={(value) => setState({ clearIcon: value })}
            clearIconEnabled
        />
    </form>
