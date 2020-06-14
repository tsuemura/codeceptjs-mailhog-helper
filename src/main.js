const Helper = codecept_helper;
const mailhogWrapper = require("./mailhogWrapper");

class MailhogHelper extends Helper {
  constructor(config) {
    super(config);
    const endpoint = this.config.endpoint || "http://localhost:8025/api/v2";
    this.mailhog = new mailhogWrapper(endpoint);
  }

  async grabContentFromEmail(mailTo, subject) {
    return await this.mailhog.grabContentFromEmail(mailTo, subject);
  }

  async grabUrlFromEmail(mailTo, subject) {
    return await this.mailhog.grabUrlFromEmail(mailTo, subject);
  }
}

module.exports = MailhogHelper;
