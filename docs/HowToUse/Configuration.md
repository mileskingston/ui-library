### Country

UI library currently supports Great Britain and Ireland validation rules and specifics of these countries. Great Britain preset is used by default. To build and use ui-library with Ireland settings configure your build to setup environment variable `COUNTRY` to `IE`. For webpack use example bellow:

```js static noeditor
{
    plugins: [
        new webpack.DefinePlugin({
            COUNTRY: JSON.stringify('IE')
        })
    ]
}
```

Use `GB` as `country` to explicitly set Great Britain specifics.

Country setting currently affects:

- postcode validation and formatting/normalization
- phone number validation
- link paths

### Theme

Theme is setup by including correct `src/themes/{THEME}.styl` file in the project. Setup `THEME` variable to setup completely (some components include conditions based on THEME).

```js static noeditor
{
    plugins: [
        new webpack.DefinePlugin({
            THEME: JSON.stringify('currys') // or pcworld
        })
    ]
}
```
