# node-orb
A nodeJS Orb for CircleCI that encapsulates some common tasks associated with nodeJS and CircleCI

## Usage
Example
```
version: 2.1

orbs:
  node-orb: circleci/node@0.0.1

jobs:
  build:
    executor:
      name: node-orb/node # put executor in the name
      tag: "6"
    parallelism: 3
    steps:
      - checkout
      - node-orb/install_package_manager:
          npm: true
          npm_version: 6.0.1
      - node-orb/with_cache:
          steps:
            - run: 
                command: npm install
      - run: mkdir -p ~/project/junit
      - node-orb/with_splitting:
          glob-path: "test/**/*.spec.js"
          steps:
            - run: env
            - run: 
                command: npm test --glob ${TESTFILES}
                environment:
                  MOCHA_FILE: ~/project/junit/test-results.xml
                when: always
      - store_test_results:
          path: ~/project/junit
      - store_artifacts:
          path: ~/project/junit
      - run: env

workflows:
  build-test-deploy:
    jobs:
      - build
```

## Executors
| Executor | Default |
| --- | --- |
| default | node:latest |
| node | latest |
| postgres | latest |
| mysql | latest |

## Commands
### install-package-manager
##### Install a specific version of yarn or npm.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| npm | boolean | false | Install specific version of npm. If `npm_version` is not specified, the latest stable will be installed. |
| yarn | boolean | false | Install specific version of yarn. If `yarn_version` is not specified, the latest stable will be installed. |
| npm_version | string | "latest" | Version of npm to be installed. |
| yarn_version | string | "" | Version of yarn to be installed.  |


### with-cache
##### Run a set of steps with project dependencies cached.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| steps | steps | None | The steps to be executed between restoring from the cache and saving to cache. |
| dir | string | "~/node_modules" | The directory(ies) where project dependencies reside. |
| cache-key | string | "package.json" | Version of npm to be installed. |


### with-splitting
##### Run a testing command (`test-command`) with CircleCI's built-in test splitting feature enabled. `$TESTFILES` is an environemnt variable that is set via this command with a list of files to be tested by container. This command requires that the `parallelism` key be set to a value greater than 1. Only one of `test-file`, `test-path`, or `glob-path` should be used to determine test-splitting. Visit https://circleci.com/docs/2.0/parallelism-faster-jobs for more details on CircleCI's test-splitting feature.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| steps | steps | None | The steps to be executed after test-splitting. |
| test-file | string | "" | Provide a text file with a list of test filenames. |
| test-path | string | "" | Provide a path to test files. |
| glob-path | string | "" | Provide a glob of test files.  |
| split-by | string | "timings" | On each successful run of a test suite, CircleCI saves timings data to a directory specified by the path in the store_test_results step. If you do not use store_test_results, there will be no timing data available for splitting your tests. `filesize` is also available as a test-splitting method. |
| timings-type | string | "filename" | CircleCI expectes both filenames and classnames to be present in the timing data produced. By default, splitting defaults to `filename`, but you can specify `classname` to split by class. |
