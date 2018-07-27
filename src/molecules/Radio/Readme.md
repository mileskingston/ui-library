*Currys:*
    
    initialState = { first: true };
    
    <div className="dc-site-currys">
        <Radio
            value="first"
            name="groupName"
            checked={state.first}
            onChange={() => setState({ first: true }) }
        >First option</Radio>
        <Radio
            value="second"
            name="groupName"
            checked={!state.first}
            onChange={() => setState({ first: false }) }
        >Second option</Radio>
    </div>

*PC World:*

    <div className="dc-site-pcworld">
        <Radio
            name="groupName"
            checked={state.first}
            onChange={() => setState({ first: true }) }
        >First option</Radio>
        <Radio
            name="groupName"
            checked={!state.first}
            onChange={() => setState({ first: false }) }
        >Second option</Radio>
    </div>

*No specific site:*

    <div>
        <Radio
            name="groupName"
            checked={state.first}
            onChange={() => setState({ first: true }) }
        >First option</Radio>
        <Radio
            name="groupName"
            checked={!state.first}
            onChange={() => setState({ first: false }) }
        >Second option</Radio>
    </div>
    
    
*Button look:*

    <div>
        <Radio
            style="button"
            name="groupName"
            checked={state.first}
            onChange={() => setState({ first: true }) }
        >First option</Radio>        
        <Radio
            style="button"
            name="groupName"
            checked={!state.first}
            onChange={() => setState({ first: false }) }
        >Second option</Radio>
    </div>
    
*With icon:*

```jsx
const Icon = require('../Icon/Icon').default;

 <div>
    <Radio
        name="groupName"
        checked={state.first}
        onChange={() => setState({ first: true }) }
    ><Icon icon="Mail" />First option</Radio>
    <Radio
        name="groupName"
        checked={!state.first}
        onChange={() => setState({ first: false }) }
    ><Icon icon="Heart" />Second option</Radio>
</div>
```
