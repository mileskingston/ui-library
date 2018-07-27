Each color can be used as css class which affects only `color` attribute or as Stylus variable.
Only colors defined bellow should be used in components.

### Referencing to theme variables from JS

UI library uses [foovar](https://github.com/all-user/foovar) stylus plugin to generate importable JS variables from stylus variables.

Usage:

- import prepared file which gives you correct variables according to theme: 'src/themes/variables.js'
- use it (check more examples here: https://github.com/all-user/foovar#examples):
<pre>
themeVariables.dcColorPrimary()
themeVariables.dcColorPrimary.css
themeVariables.dcColorPrimary.type
</pre>

```jsx noeditor
const palettes = require('./palettes.json');

<div>
	{palettes.map(({ title, colors }, i) => {
		return (
			<section key={i}>
				<h2>{title}</h2>
				<div className="sg-palette">
					{colors.map(({ class: className, variants }, j) => (
						<div key={j} className="sg-palette__item">
							<div className={`sg-color ${className}`} />
							<div>
								<ul className="sg-palette__item-variants">
									{variants.map((variant, k) => (
										<li key={k}>{variant}</li>
									))}
								</ul>
							</div>
						</div>
					))}
					{Array.apply(null, Array(4 - (colors.length % 4))).map((undef, x) => (
						<div key={x} className="sg-palette__empty-item" />
					))}
				</div>
			</section>
		);
	})}
</div>
```

### Refactoring matrix

To replace old colors with new themed colors, use following table:

| Old color name              |     | New color name           |
|-----------------------------|-----|--------------------------|
| $**{$site}**-color          |  ➡  | $dc-color-link           |
| $**{$site}**-color-empty    |  ➡  | $dc-color-gs-7           |
| $**{$site}**-color-dark     |  ➡  | $dc-color-primary-hover  |
| $**{$site}**-color-info     |  ➡  | $dc-color-message-hover  |
| $**{$site}**-color-light    |  ➡  | $dc-color-light          |
| $color-primary-c-1          |     |                          |
| $color-primary-c-2          |  ➡  | $dc-color-positive       |
| $color-primary-c-3          |     |                          |
| $color-primary-c-4          |  ➡  | $dc-color-positive-hover |
| $color-primary-d-1          |  ➡  | $dc-color-gs-0           |
| $color-primary-d-1-5        |  ➡  | $dc-color-gs-1           |
| $color-primary-d-2          |  ➡  | $dc-color-gs-2           |
| $color-primary-d-3          |  ➡  | $dc-color-gs-3           |
| $color-primary-d-4          |  ➡  | $dc-color-gs-4           |
| $color-primary-d-5          |     |                          |
| $color-primary-d-6          |  ➡  | $dc-color-gs-5           |
| $color-primary-d-6-5        |     |                          |
| $color-primary-d-7          |  ➡  | $dc-color-gs-6           |
| $color-primary-d-8          |  ➡  | $dc-color-gs-7           |
| $color-primary-d-9          |     |                          |
| $color-secondary-a-1        |     |                          |
| $color-secondary-a-2        |     |                          |
| $color-secondary-a-3        |     |                          |
| $color-secondary-a-4        |     |                          |
| $color-secondary-a-5        |  ➡  | $dc-color-positive-hover |
| $color-secondary-b-1        |     |                          |
| $color-secondary-b-3        |     |                          |
| $color-secondary-b-5        |     |                          |
| $color-secondary-b-6        |  ➡  | $dc-color-message-hover  |
| $color-secondary-c-1        |     |                          |
| $color-secondary-c-2        |  ➡  | $dc-color-alert          |
| $color-secondary-c-3        |     |                          |
| $color-secondary-c-4        |  ➡  | $dc-color-alert-hover    |
| $color-secondary-c-5        |  ➡  | $dc-color-dirty-yellow   |
| $color-secondary-d-1        |     |                          |
| $color-secondary-d-2        |  ➡  | $dc-color-price          |
| $color-secondary-d-3        |     |                          |
| $color-secondary-d-4        |     |                          |
| $color-secondary-e-1        |     |                          |
| $color-secondary-e-2        |     |                          |
| $color-secondary-e-3        |     |                          |
| $color-secondary-e-4        |     |                          |
| $color-secondary-f-1        |     |                          |
| $color-secondary-f-2        |     |                          |
| $color-secondary-f-3        |     |                          |
| $color-secondary-f-4        |     |                          |
| $color-secondary-f-5        |     |                          |
| $color-secondary-g-1        |     |                          |
| $color-secondary-g-2        |     |                          |
| $tooltip-positive-1         |  ➡  | $dc-color-positive       |
| $tooltip-positive-2         |  ➡  | $dc-color-positive-hover |
| $tooltip-negative-1         |  ➡  | $dc-color-price          |
| $tooltip-negative-2         |     |                          |
| $tooltip-neutral-1          |  ➡  | $dc-color-message        |
| $tooltip-neutral-2          |  ➡  | $dc-color-gs-7           |
| $tooltip-info-1             |  ➡  | $dc-color-message        |
| $tooltip-info-2             |  ➡  | $dc-color-message-hover  |
| $tooltip-warning-1          |  ➡  | $dc-color-alert          |
| $tooltip-warning-2          |     |                          |
| $status-positive-color      |     |                          |
| $status-positive-background |  ➡  | $dc-color-positive-hover |
| $status-negative-color      |  ➡  | $dc-color-alert          |
| $status-negative-background |  ➡  | $dc-color-alert-hover    |
