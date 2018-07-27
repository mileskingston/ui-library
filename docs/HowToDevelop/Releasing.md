### Release script

Release script can be executed by running `npm run release` command. There are two commands available:

#### Requirements

You have to have docker with docker-compose installed.
When you want to also publish styleguide during `publish` task, install also `passh` (https://github.com/clarkwang/passh) system utility.

#### Preparation

Preparation will do following:

- update local master and develop branches
- creates release/next branch
- runs jest (tests and linting)
- starts styleguide in Docker and runs BackstopJS tests
- runs standard-version
- pushes release/next to origin

Available options (do not forget to add `--` before the first option to pass it to script):

- `--dry`
    - Run only simulation of release process.
- `-v, --verbose`
    - Verbose output
- `-q, --quiet`
    - Do not output
- `--stages [stage...]`
    - Will run only certain stage. Good for retesting after failed tests.
    - default: prepare,test,build,cleanup
- `--skip [stage...]`
    - Skip stage or stages. Applied after "stages" option.
- `--user-branch [branch]`
    - Specify user branch manually. Good when running only cleanup.
- `--force-unstash`
    - Applies stashed changes. Good when running only cleanup and you know you want to unstash.
- `--force-push`
    - Uses The Force for pushing release/next branch. Use responsibly!
- `-h, --help`
    - output usage information

#### Publish

Publish will do following:

- update local master and develop branches
- publishes to Artifactory
- build and publishes styleguide
- merges master to develop
- pushes develop to origin
- removes release/next branch

Available options (do not forget to add `--` before the first option to pass it to script):

- `--dry`
    - Run only simulation of release process.
- `-v, --verbose`
    - Verbose output
- `-q, --quiet`
    - Do not output
- `--stages [stage...]`
    - Will run only certain stage. Good for retesting after failed tests.
    - default: prepare,test,build,cleanup
- `--skip [stage...]`
    - Skip stage or stages. Applied after "stages" option.
- `--user-branch [branch]`
    - Specify user branch manually. Good when running only cleanup.
- `--force-unstash`
    - Applies stashed changes. Good when running only cleanup and you know you want to unstash.
- `--force-push`
    - Uses The Force for pushing release/next branch. Use responsibly!
- `-h, --help`
    - output usage information

### Release checklist

- <label><input type="checkbox" class="sg-checkbox">Run `npm run release prepare` script</label>
- <label><input type="checkbox" class="sg-checkbox">Open PR from release/next to master</label>
- <label><input type="checkbox" class="sg-checkbox">Merge PR opened in previous step</label>
- <label><input type="checkbox" class="sg-checkbox">Run `npm run release publish` script</label>



## Other resources

- http://confluence.dixons.co.uk/display/COPUI/UI+Library+versioning
- http://confluence.dixons.co.uk/display/TDT/Artifactory+npm+registry+setup
