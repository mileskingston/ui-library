#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

RESULT=0
BACKSTOPJS_ARGUMENTS_FROM_NPM=$1
COMMAND=${2:--h}

FILTER_ARG=""
THEME_ARG="all"
for ((i=1;i<=$#;i++));
do
    if [ ${!i} = "--theme" ]
    then ((i++))
        THEME_ARG=${!i}
    fi
    if [[ ${!i} == *"--filter="* ]]
    then
        FILTER_ARG=${!i}
    fi
done

openBackstopReport() {
    export THEME=$1
    echo "Opening report"
    if hash backstop 2>/dev/null; then
        backstop openReport $BACKSTOPJS_ARGUMENTS_FROM_NPM
    else
        echo "Using npx to openReport."
        echo "Install BackstopJS globally to speed this up! (npm i -g backstopjs)"
        npx backstop openReport $BACKSTOPJS_ARGUMENTS_FROM_NPM
    fi
}

runBackstop() {
    docker run \
        --env THEME=$1 \
        --network host \
        --shm-size 1g \
        --rm \
        -v $DIR:/src \
        vysinm01/backstopjs $BACKSTOPJS_ARGUMENTS_FROM_NPM $FILTER_ARG $COMMAND
    RETURN_CODE=$?

    if [ $COMMAND == "test" ] && [ $RETURN_CODE -ne 0 ]; then
        openBackstopReport $1
    fi

    return $RETURN_CODE
}

echo "Themes: $THEME_ARG"

if [ "$THEME_ARG" == "all" ] || [ "$THEME_ARG" == "currys" ]
then
    if [[ $COMMAND == "openReport" ]]; then
        echo "Opening report for theme 'Currys'"
        openBackstopReport currys
    else
        echo "Starting BackstopJS for theme 'Currys'"
        set +e
        runBackstop currys
        RESULT=$((RESULT + $?))
        set -e
    fi
fi

if [ "$THEME_ARG" == "all" ] || [ "$THEME_ARG" == "pcworld" ]
then
    if [[ $COMMAND == "openReport" ]]; then
        echo "Opening report for theme 'PCWorld'"
        openBackstopReport pcworld
    else
        echo "Starting BackstopJS for theme 'PCWorld'"
        set +e
        runBackstop pcworld
        RESULT=$((RESULT + $?))
        set -e
    fi
fi

exit $RESULT
