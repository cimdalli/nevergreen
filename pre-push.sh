#!/bin/bash -e

hash npm 2>/dev/null || {
    echo >&2 "npm command not found, you need to install Node. See doc/contributing.md for a full list of required prerequisites."
    exit 1
}

hash lein 2>/dev/null || {
    echo >&2 "lein command not found, you need to install Leiningen. See doc/contributing.md for a full list of required prerequisites."
    exit 1
}

echo '[Step 1 of 6] Updating node packages...'
npm install

echo '[Step 2 of 6] Running the ui unit tests...'
npm test

echo '[Step 3 of 6] Linting the JavaScript...'
npm run lint

echo '[Step 4 of 6] Running the server unit tests...'
lein do clean, midje 'nevergreen.*'

echo '[Step 5 of 6] Running the functional tests (the server must be running!)...'
export JVM_OPTS="-Dwebdriver.chrome.driver=./node_modules/chromedriver/bin/chromedriver"
lein test functional.functional-test

echo '[Step 6 of 6] Building an uberjar...'
lein uberjar

echo 'Done! Check the output for any errors!'
