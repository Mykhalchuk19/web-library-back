const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

class MailService {
  constructor () {
    const options = {
      viewEngine: {
        partialsDir: `${__dirname}/../../../views/partials`,
        layoutsDir: `${__dirname}/../../../views/layouts`,
        extname: '.hbs',
      },
      viewPath: 'views',
      extName: '.hbs',
    };

    this._transporter = nodemailer.createTransport({
      service: process.env.GMAIL_SERVICE_NAME,
      host: process.env.GMAIL_SERVICE_HOST,
      auth: {
        user: process.env.GMAIL_USER_NAME,
        pass: process.env.GMAIL_USER_PASSWORD,
      },
    });

    this._transporter.use('compile', hbs(options));
  }

  sendMail ({ to, subject, template, context, attachments }) {
    return this._transporter.sendMail({
      to,
      from: process.env.FROM_EMAIL,
      subject,
      template,
      context,
      attachments,
    });
  }
}

module.exports = MailService;
