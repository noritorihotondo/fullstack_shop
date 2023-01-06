import nodemailer from 'nodemailer';
import Config from '../../lib/utils/config';
import { Orders } from '../../entities/Orders';
import ejs from 'ejs';

export const sendMail = async (email: string, data: Orders) => {
  const ejsFile = await ejs.renderFile('./src/views/index.ejs', { data: data });
  const transporter = nodemailer.createTransport({
    host: Config.EMAIL_HOST,
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: Config.EMAIL_USER,
      pass: Config.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: Config.EMAIL_USER,
    to: email,
    html: ejsFile,
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};
