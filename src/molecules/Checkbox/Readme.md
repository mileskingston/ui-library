*Single checkbox:*

    initialState = {
        isChecked: true
    };
    
    <Checkbox
        label="Label can contain <b>formatting<b/>"
        checked={state.isChecked}
        onCheck={() => setState({ isChecked: !state.isChecked }) }
    />
    
*Single small checkbox:*

    initialState = {
        isChecked: true
    };
    
    <Checkbox
    	small
        label="Label can contain <b>formatting<b/>"
        checked={state.isChecked}
        onCheck={() => setState({ isChecked: !state.isChecked }) }
    />

*Checkbox list:*
    
    initialState = {
        isFirstChecked: true,
        isThirdChecked: false,
        isThirdChecked: false,
        isFourthChecked: false,
        positiveMessage: '',
        negativeMessage: ''
    };
    
    <div>
        <Checkbox
            label="First item checked"
            checked={state.isFirstChecked}
            onCheck={() => setState({ isFirstChecked: !state.isFirstChecked }) }
        />
        <Checkbox
            label="Second item not checked"
            checked={state.isSecondChecked}
            onCheck={() => setState({ isSecondChecked: !state.isSecondChecked }) }
        />
        <Checkbox
            label="Third item with positive message"
            message={state.positiveMessage}
            messageType="positive"
            checked={state.isThirdChecked}
            onCheck={() => {
                setState({
                    isThirdChecked: !state.isThirdChecked,
                    positiveMessage: 'Item saved!'
                });
                setTimeout(() => setState({ positiveMessage: '' }), 3000);
            }}
        />
        <Checkbox
            label="Fourth item with negative message"
            message={state.negativeMessage}
            messageType="negative"
            checked={state.isFourthChecked}
            onCheck={() => {
                setState({
                    isFourthChecked: !state.isFourthChecked,
                    negativeMessage: 'Item saving error! Please try again later.'
                });
                setTimeout(() => setState({ negativeMessage: '' }), 3000);
            }}
        />
    </div>
