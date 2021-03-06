const mailhog = require("mailhog");
const simpleParser = require("mailparser").simpleParser;

class MailhogWrapper {
  constructor(endpoint) {
    this.mailhog = mailhog({
      apiURL: endpoint,
    });
  }

  async _fetch(mailTo, subject, text) {
    const mails = await this.mailhog.search(mailTo, "to");

    const parsedMails = [];
    for (let item of mails.items) {
      const parsed = await simpleParser(item.Raw.Data);
      parsedMails.push(parsed);
    }

    if (subject) {
      parsedMails.filter((item) => {
        return item.subject === subject;
      });
    }

    if (text) {
      parsedMails.filter((item) => {
        return item.text.match(text);
      });
    }

    if (parsedMails.length > 0) {
      return parsedMails[0];
    }
  }

  async grabContentFromEmail(mailTo, subject) {
    const email = await this._fetch(mailTo, subject);
    if (!email) throw Error('No Email was found')
    return email.text;
  }

  async grabUrlFromEmail(mailTo, subject, match) {
    const email = await this._fetch(mailTo, subject);
    if (!email) throw Error("No Email was found");
    const urls = email["text"].match(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/gi);
    if (!urls) throw Error("No url was found in email");
    if (match) {
      return urls.filter((url) => match.test(url))[0];
    }
    if (!urls) throw Error("No url was found in email");
    return urls[0];
  }
}

module.exports = MailhogWrapper;
