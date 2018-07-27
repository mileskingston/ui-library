#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PULL_REQUEST_URL="http://stash.dsg-i.com/projects/UP/repos/ui-library/pull-requests?create&targetBranch=refs%2Fheads%2Fmaster&sourceBranch=refs%2Fheads%2Frelease%2Fnext&targetRepoId=823"

###############
# Executables #
###############
GIT=/usr/local/bin/git
NPM=/usr/local/bin/npm

################
# Preparations #
################
echo "Checking out and updating master"
CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)
${GIT} reset --hard
${GIT} checkout master
${GIT} pull --rebase


######################
# Publishing release #
######################
echo "Publishing release to Artifactory"
${NPM} publish
echo "Building styleguide"
${NPM} run build
echo "Publishing styleguide"
${NPM} run deploy:dev -- --user common
echo "Merging master to develop"
${GIT} checkout develop
${GIT} pull --rebase
set +e
${GIT} merge master
${GIT} push origin develop:develop

if [ $? -ne 0 ]
then
    echo "Cannot push to develop. Please update origin/develop manually."
fi
set -e

###########
# Cleanup #
###########
echo "Removing branch release/next"
${GIT} branch -D release/next
echo "Checking out previous branch"
${GIT} checkout ${CURRENT_BRANCH}
echo "Everything is done."
