### Build

It is not concern of building ui-library. Build ui-library sources in project according to project requirements. It is also concern of projects to provide necessary polyfills.

### Themes

Themes support introduced in this version requires some changes in projects which are using ui-library:

#### Include theme definition file

1. In build process include correct theme file:

    - node_modules/@dc/ui-library/src/themes/{THEME}.styl

### Icons

Icons now have class names generated from icon name. Generator converts icon name to lowercase dashed version prefixed with `dc-icon`. Example: `AddToBasket` ➡ `dc-icon-add-to-basket`.

In case there are class selectors in projects, change class selectors accordingly (there was only `.toLowerCase()` used in previous version so old class name was `dc-icon-addtobasket`.
