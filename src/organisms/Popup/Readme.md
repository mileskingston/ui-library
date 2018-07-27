```jsx
const Tooltip = require('../../molecules/Tooltip/Tooltip').default;

<Tooltip type="info">
  Not fully supported in IE 9. For IE9 and older versions use <a href="https://www.npmjs.com/package/classlist-polyfill" target="_blank">classlist-polyfill</a>, just import it next to other polyfills.
</Tooltip>
```


*Default:*

    initialState = {
        opened: false
    };

    <div className="dc-site-currys">
        <a className="dc-link" onClick={(e) => setState({ opened: true })}>Open popup</a>

        {state.opened &&
            <Popup
                title="Title of the popup"
                isVisible={state.opened}
                onClose={() => setState({ opened: false })}
            >
                To close the popup press ESC, click on the cross icon or click on the overlay.
            </Popup>
        }
    </div>
    
*Alert:* 

    initialState = {
        opened: false
    };
    
    <div className="dc-site-currys">
        <a className="dc-link" onClick={(e) => setState({ opened: true })}>Open alert</a>
        
        {state.opened &&
            <Popup
                title="Title of the popup"
                isVisible={state.opened}
                hideHeaderBar={true}
                optionalClasses="dc-popup-warning"
                onClose={() => setState({ opened: false })}
            >
                To close the popup press ESC, click on the cross icon or click on the overlay.
            </Popup>
        }
    </div>
