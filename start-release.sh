#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PULL_REQUEST_URL="http://stash.dsg-i.com/projects/UP/repos/ui-library/pull-requests?create&targetBranch=refs%2Fheads%2Fmaster&sourceBranch=refs%2Fheads%2Frelease%2Fnext&targetRepoId=823"

###############
# Executables #
###############
BACKSTOP=${DIR}/backstop.sh
COMPOSE=/usr/local/bin/docker-compose
GIT=/usr/local/bin/git
GREP=/usr/bin/grep
NPM=/usr/local/bin/npm
RM=/bin/rm

################
# Preparations #
################
CURRENT_BRANCH=$(git branch | grep \* | cut -d ' ' -f2)

echo "Checking out and updating develop"
${GIT} reset --hard
${GIT} checkout develop
${GIT} pull --rebase

echo "Checking out and updating master"
${GIT} checkout master
${GIT} pull --rebase

set +e
${GIT} show-branch --list release/next
if [ $? -eq 0 ]
then
    while true; do
        read -p "Branch 'release/next' already exists. Do you want to recreate it from 'master'? " yn
        case ${yn} in
            [Yy]* ) ${GIT} branch -D release/next; ${GIT} checkout -b release/next; break;;
            [Nn]* ) ${GIT} checkout release/next; break;;
            * ) echo "Please answer Y or N";;
        esac
    done
else
    ${GIT} checkout -b release/next
fi
echo "Merging develop to release/next"
${GIT} merge develop
if [ $? -ne 0 ]
then
    while true; do
        read -p "Merge failed. Please, solve conflicts and continue this script by writing 'solved': " answer
        case ${answer} in
            "solved" ) echo "Thank you! Continuing release process"; break;;
        esac
    done
fi
set -e


###########
# Testing #
###########
echo "Verifying 'npm install'"
${NPM} install

set +e
RELEASE_RESULT=1
while [ ${RELEASE_RESULT} -ne 0 ]; do
    echo "Starting docker"
    ${COMPOSE} up -d
    echo "Waiting for styleguide to fully start"
    ${COMPOSE} logs -f | ${GREP} -m 1 "Compiled successfully" || true
    echo "Docker ready. Running release command"
    ${NPM} run release
    RELEASE_RESULT=$?

    if [ ${RELEASE_RESULT} -eq 0 ]
    then
        echo "Tests passed. Release prepared successfully."
        break
    fi

    while true; do
        read -p "Release failed. Please, fix problems and type 'fixed' to rerun release: " answer
        case ${answer} in
            "fixed" )
                echo "Thank you! Running tests again"
                break
            ;;
        esac
    done
done
set -e

set +e
${GIT} push origin release/next:release/next --follow-tags
if [ $? -ne 0 ]
then
    read -p "Push failed. Do you want to use the force? " answer
    case ${answer} in
        [Yy]* )
            echo "Using the force"
            ${GIT} push origin release/next:release/next --force --follow-tags
        ;;
        * ) echo "Ok. Push it on your own";;
    esac
fi
set -e

###########
# Cleanup #
###########
echo "Checking out previous branch"
${GIT} checkout ${CURRENT_BRANCH}
echo "Everything is done. Now open PR, on following URL, please:"
echo ${PULL_REQUEST_URL}
