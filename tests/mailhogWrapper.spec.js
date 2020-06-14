const assert = require('assert')
const mailer = require('./misc/mailer')
const mailhogWrapper = require('../src/mailhogWrapper')
const mailhog = new mailhogWrapper('http://localhost:8025/api/v2')
const sleep = require('sleep-promise')
const uuid = require('uuid')

describe('fetch', function() {
    this.retries(4)
    it('can get an email by address', async function() {
        const from = 'sender@example.com'
        const to = `${uuid.v4()}@example.com`
        const subject = `Test ${uuid.v4()}`
        const text = 'This is a sample email'
        mailer(from, to, subject, text)

        await sleep(3000)

        const mailContent = await mailhog._fetch(to, subject)
        assert.equal(mailContent.text, text)
    })
    it('can get an email by text', async function () {
        const from = 'sender@example.com'
        const to = `${uuid.v4()}@example.com`
        const subject = `Test ${uuid.v4()}`
        const text = `This is a sample email ${uuid.v4()}`
        mailer(from, to, subject, text)

        await sleep(3000)

        const mailContent = await mailhog._fetch(to, null, text)
        assert.equal(mailContent.text, text)
    })
    it('can get latest email by mailto', async function() {
        const from = 'sender@example.com'
        const to = `${uuid.v4()}@example.com`
        const subject1 = `Test`
        const text1 = 'This is a sample email1'
        mailer(from, to, subject1, text1)

        const subject2 = `Test`
        const text2 = 'This is a sample email2'
        mailer(from, to, subject2, text2)

        await sleep(3000)

        const mailContent = await mailhog._fetch(to)
        assert.equal(mailContent.text, text2)
    })
})

describe('grabContentFromUrl', function() {
    it('can get content', async function () {
        const from = 'sender@example.com'
        const to = `${uuid.v4()}@example.com`
        const subject = `Test ${uuid.v4()}`
        const text = 'This is a sample email'
        mailer(from, to, subject, text)

        await sleep(3000)

        const mailContent = await mailhog.grabContentFromEmail(to, subject)
        assert.equal(mailContent, text)
    })
})

describe('grabUrlFromEmail', function() {
    it('can extract URL from mail content', async () => {
        const from = 'sender@example.com'
        const to = `${uuid.v4()}@example.com`
        const subject = `Test ${uuid.v4()}`
        const text = 'This is a sample. Go To http://example.com '
        mailer(from, to, subject, text)

        await sleep(3000)

        const url = await mailhog.grabUrlFromEmail(to, subject)
        assert.equal(url, 'http://example.com')
    })
})