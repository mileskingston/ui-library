UI library is hosted on private npm repository powered by [Artifactory](https://artifactory.dsg-i.com).
To install ui-library into your project follow these steps:

1. add artifactory registry to project .npmrc file
    ```html
    registry=https://artifactory.dsg-i.com/api/npm/npm-virtual/
    ```

2. require ui-library by running npm install or updating package.json
    ```bash
    npm install @dc/ui-library
    ```

3. to use correct theme include or import theme definition stylus file: `src/themes/{THEME}.styl`

**Note: to use Artifactory registry, you have to be inside DSG network**
