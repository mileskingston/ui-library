    initialState = {
        value: '',
        focussed: false,
        processing: false,
        disabled: false,
        isValid: undefined,
        keyPressed: null
    };
    
    <div className="dc-site-currys" style={{ maxWidth: '300px' }}>
        <SearchInput
            icon={'Search'}
            inputRef={() => {}}
            isValid={state.isValid}
            label={'Postcode or town'}
            onClear={() => setState({ value: '' })}
            onBlur={() => setState({ focussed: false })}
            onChange={(event) => setState({ value: event.target.value, processing: false })}
            onFocus={() => setState({ focussed: true })}
            onKeyDown={ (event) => setState({ keyPressed: event.keyCode }) }
            onSearch={() => state.value && setState({ processing: true, isValid: true })}
            processing={state.processing}
            value={state.value}
        />
    </div>
