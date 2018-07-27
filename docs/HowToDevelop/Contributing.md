Purpose of following rules is to have clean git history, readable commit messages and understandable changes.

### Keep commits small

Commit should do one change. It is easier to write commit message when commit has one purpose.

### Follow the conventions

Read: [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)

Conventions written in the linked document are linted by `commitlint` tool before each commit. There is one extra rule to not allow references to project tickets. Only allowed reference is reference to Platform Development tasks (PD). For linking JIRA issues with Pull Requests you can still use ticket reference in the branch name and/or mention ticket in open Pull Request.

<blockquote class="sg-example sg-example--bad">
[MCD-3279] Update implementation of how store finder filters are applied and removed.
</blockquote>

<blockquote class="sg-example sg-example--good">
refactor(StoreFinderSearchBar, StoreFinderFilters): props renaming and code cleanup
</blockquote>

### Describe what change does

Instead of telling "change implemented" or "bug fixed" tell, what commit does. Commit message should tell developers what was changed without looking into code changes.

<blockquote class="sg-example sg-example--bad">
QuickAccount: fixed display bug when using mobile viewport
</blockquote>

<blockquote class="sg-example sg-example--good">
QuickAccount: hide benefits block on mobile viewport
</blockquote>

Keep first line of message as short as possible. When changes are more complicated, describe change with longer description on the second line of the commit message:

<blockquote class="sg-example sg-example--bad">
Box: use flexbox instead of float because we dropped support of IE9 and flexbox is now supported in all good browsers
</blockquote>

<blockquote class="sg-example sg-example--good">
Box: use flexbox instead of float<br>
<span style="opacity: 0.2">(keep blank line)</span><br>
Support of IE9 was dropped and flexbox is now supported in all supported browsers.
</blockquote>



## Compatibility maintenance

Try to avoid causing BC breaks. In case you cause some, make sure there is easy way to change client code to make applications compatible again. Make sure code change is properly documented.

**Try to deprecate stuff first**. Thanks to deprecation developers will know about upcoming BC breaks.

### Some examples if BC compatible changes using deprecations

#### Renaming a property of React component

Keep both properties. Mark the old one as `@deprecated` and use it as value for the new one if value for the new one is not provided.

#### Renaming a public method

Keep both methods. Mark the old method as `@deprecated` and call the new method from there.

#### Changing parameters of public methods

Keep both methods. Mark the old method as `@deprecated` and call the new method from there using some "compatibility layer" which will transform arguments or call other methods needed for parameters preparation.

#### Committing a BREAKING CHANGE

In case it is difficult to maintain compatibility and it is inevitable to cause a breaking change, add information about necessary code changes in the **commit message footer**:

<blockquote class="sg-example sg-example--good">
chore: use Artifactory registry<br>
<br>
Use private npm registry hosted by Artifactory<br>
<br>
BREAKING CHANGE: you have to use Artifactory also in projects that are using ui-library
</blockquote>
