Default (inline renderer):

```jsx
<div className="dc-site-currys">
    <ExpandableText
        textLess="Less"
        textMore="More"
    >
        Expanded text.
    </ExpandableText>
</div>
```

Block renderer:

```jsx

const Fragment = require('react').Fragment;
const Icon = require('../Icon/Icon').default;

<div className="dc-site-currys">
    <ExpandableText
        textLess={(
            <Fragment>
                <span>What this means</span>
                <Icon icon="ChevronRight" rotate={270} />
            </Fragment>
        )}
        textMore={(
            <Fragment>
                <span>What this means</span>
                <Icon icon="ChevronRight" rotate={90} />
            </Fragment>
        )}
        renderer={ExpandableText.blockRenderer}
    >
        Expanded text.
    </ExpandableText>
</div>
```
