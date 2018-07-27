To add new icon place svg file into `/src/atoms/icons/svg` directory. Run `npm run build:lib:icons` to generate icons list and see it bellow during development.

To use icon inside of component use [Icon](/#!/Icon) component.

To use icon in plain html use `<image src="ui-library-path/lib/atoms/icons/Icon.svg" />`

```jsx noeditor
initialState = {
    search: '',
    large: true
};

const Icon = require('../../molecules/Icon/Icon').default;
const camelToDash = require('../../helpers').camelToDash;
const icons = require('./index').default;

<div>
    <div className="sg-flex-row">
        <div style={{ flexGrow: 90 }}>
            <label className="sg-flex-row">
                <div style={{ marginRight: 10 }}>
                    Filter icons:
                </div>

                <input
                    style={{ flexGrow: 1 }}
                    type="text"
                    onChange={(e) => { setState({ search: e.target.value }); }}
                />
            </label>
        </div>

        <div style={{ flexGrow: 10 }} style={{ marginLeft: 10 }}>
            <label className="sg-flex-row" style={{ alignItems: 'center' }}>
                <div style={{ marginRight: 10 }}>
                    Display large icons:
                </div>

                <input
                    checked={state.large}
                    type="checkbox"
                    onChange={(e) => { setState({ large: e.target.checked }); }}
                />
            </label>
        </div>
    </div>

    <div className="sg-icon-preview">
        {Object.keys(icons).filter(iconName => iconName !== 'clearSize').sort().map((iconName) => {
            const classes = [
                'sg-icon-preview__icon'
            ];

            const highlight = iconName.toLowerCase().indexOf(state.search.toLowerCase()) > -1;

            if (state.search !== '' && !highlight) {
                classes.push('sg-icon-preview__icon--hide');
            }

            return (
                <div key={iconName} className={classes.join(' ')}>
                    <Icon
                        icon={iconName}
                        size={state.large ? 'large' : 'normal'}
                    />
                    <strong>{iconName}</strong>
                </div>
            );
        })}
    </div>
</div>
```
