# codeceptjs-mailhog-helper

codeceptjs-mailhog-helper is a [CodeceptJS](https://codecept.io) helper to add integrations for [MailHog](https://github.com/mailhog/MailHog).

## Installation

```bash
$ npm i codeceptjs-mailhog-helper --save
```

## Configuration

`codecept.conf.js`

```javascript

helpers: {
    MailHog: {
        require: 'codeceptjs-mailhog-helper',
        endpoint: 'http://localhost:8025/api/v2
    }
},
```

Options:

- `endpoint`: Endpoint URL of mailhog API v2 (default to 'http://localhost:8025/api/v2)

## Usage

```javascript
// Get latest EMail content by recipient address and subject
let content = await I.grabContentFromEmail(mailto, subject)

// get latest EMail content by recipient address, subject, body
let content = await I.grabContentFromEmail(mailto, subject, body)

// find URL string from latest EMail content
let url = await I.grabUrlFromEmail(mailto, subject)
let url = await I.grabUrlFromEmail(mailto, subject, body)
```