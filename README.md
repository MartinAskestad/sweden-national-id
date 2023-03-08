[![Build Status](https://travis-ci.com/MartinAskestad/sweden-national-id.svg?branch=master)](https://travis-ci.com/MartinAskestad/sweden-national-id)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

# sweden-national-id

Validation and parsing of the Swedish national identification number as well as co-ordination numbers for foreign citizens.

Install with npm

`npm i sweden-national-id`

## Examples

### JavaScript

```js
var swedenNationalId = require("sweden-national-id");

// National id number
swedenNationalId.parse("850823-6463"); // { dateOfBirth: 1985-08-23T00:00:00.000Z, gender: 0, nationalIdNumber: '850823-6463', isFutureDate: false, isUnder18: false }

// Co-ordination number
swedenNationalId.parse("850863-6464"); // { dateOfBirth: 1985-08-23T00:00:00.000Z, gender: 0, nationalIdNumber: '850823-6460', isFutureDate: false, isUnder18: false }

// Corporate id number
swedenNationalId.parse("556036-0793"); // { nationalIdNumber: "556036-0793", numberType: 5 }

// Invalid number
swedenNationalId.parse("850823-6464"); // null
```

[Test on runkit](https://runkit.com/martinaskestad/sweden-national-id)

### TypeScript

```ts
const { parse } from 'sweden-national-id';

// National id number
parse('850823-6463'); // { dateOfBirth: 1985-08-23T00:00:00.000Z, gender: 0, nationalIdNumber: '850823-6463', isFutureDate: false, isUnder18: false }

// Co-ordination number
parse('850863-6464'); // { dateOfBirth: 1985-08-23T00:00:00.000Z, gender: 0, nationalIdNumber: '850863-6460', isFutureDate: false, isUnder18: false }

// Person over 100 years
parse('850863+6464'); // { dateOfBirth: 1885-08-23T00:00:00.000Z, gender: 0, nationalIdNumber: '850823+6460', isFutureDate: false, isUnder18: false }

// 12-digit format of id number
parse('198508636460'); // { dateOfBirth: 1985-08-23T00:00:00.000Z, gender: 0, nationalIdNumber: '850823-6460', isFutureDate: false, isUnder18: false }

// Corporate id number
parse('556036-0793'); // { nationalIdNumber: "556036-0793", numberType: 5 }

// Invalid number
parse('850823-6464'); // null
```
