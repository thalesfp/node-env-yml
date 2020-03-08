# Node Env YML
[![Build Status](https://travis-ci.org/thalesfp/node-env-yml.svg?branch=master)](https://travis-ci.org/thalesfp/node-env-yml)

Environment variable loader using yml files.

## Installation

```bash
npm install env-yml
```

## Usage

Declaring variables in a file (eg. .app.yml):

```yaml
# Variables available in any environment
DATABASE_HOST: '127.0.0.1'
DATABASE_PORT: '5432'

# Variables available in development environment
development:
  DATABASE_USER: 'user-dev'

# Variables available in test environment
test:
  DATABASE_USER: 'user-test'
```

Reading the file:

```javascript
const env = require('env-yml');

env.load();

console.log(process.env.DATABASE_HOST)
console.log(process.env.DATABASE_PORT)
console.log(process.env.DATABASE_USER)
```

## Parameters

Optional configuration params:

| name | description | default value |
|---|---|---|
| path | path to yml file | .app.yml |
| encoding | encoding of yml file | utf8 |
| env | force environment section | development |

Usage:

```javascript
const env = require('env-yml');

env.load({
  path: 'myapp.yml',
  encoding: 'latin1',
  env: 'staging',
});
```

