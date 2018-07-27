Sometimes testing of unfinished feature/bugfix in integration with a project is needed.

There are few ways how to use work-in-progress ui-library changes in a project.

### Local build and deploy

The easiest way is to link ui-library to your project. Build project locally and deploy it to the server. This way is most suitable to be used on personal dev environment.

To link ui-library use either [npm link](https://docs.npmjs.com/cli/link) feature or use simple symlink command on your system (`ln -s ~/path/to/ui-library ~/path/to/project/node_modules/@dc/ui-library`).

### Publishing special version

In case of need of testing on test environments, the first option is usually not possible.

To be able to test WIP changes on test environments you can publish a new ui-library package to Artifactory.

1. Update `version` in the package.json - for example, add some suffix after current version number - you will use this version name in your project (e.g. `2.13.3-fix-header`).
2. Run `npm publish --tag SOME_TAG` (tag is needed to avoid overwriting "latest" tag).
3. Use the new package in your project.

When updating your WIP package, either unpublish (e.g. `npm unpublish @dc/ui-library:2.13.3-fix-header`) old package or add number suffix to your package (e.g. `2.13.3-fix-header-2`).
