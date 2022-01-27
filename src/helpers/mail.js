import { createTransport, createTestAccount, getTestMessageUrl } from 'nodemailer';

const {
  NODE_ENV, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, DEFAULT_MAIL_SENDER,
} = process.env;

async function getTransporter() {
  let transporter;
  if (NODE_ENV !== 'production') {
    transporter = createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '158a89e1379abe',
        pass: '9c933821185ed0',
      },
    });
  } else {
    transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'tokorev.kir@gmail.com',
        pass: '6f4t1q4lcj9o',
      },
    });
  }
  return transporter;
}

// eslint-disable-next-line import/prefer-default-export
export async function sendMail(mail) {
  // If there is no sender in payload, set default sender
  const payload = mail;
  if (!payload.from) {
    payload.from = DEFAULT_MAIL_SENDER;
  }

  // Create transporter
  const transporter = await getTransporter();
  console.log('sendMail');
  // Send mail
  const mailInfo = await transporter.sendMail(payload);

  // If in development mode, console.log the preview url.
  if (NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`Mail Preview URL is ${getTestMessageUrl(mailInfo)}`);
  }

  // Return mail response
  return mailInfo;
}
