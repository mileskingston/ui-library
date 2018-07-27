    const Input = require('../../molecules/Input/Input').default

    initialState = {
        password: ''
    };
    
    <div className="dc-site-currys" style={{ maxWidth: '300px' }}>
         <Input
            name="password"
            type="password"
            label="Enter password"
            passwordShowHide
            value={state.password}
            updateValue={(value) => setState({ password: value })}
        />
        <PasswordStrengthIndicator
            settings={{ weakMin: 6, goodMin: 8, strongMin: 10 }}
            isValid
            password={state.password}
        />
    </div>
