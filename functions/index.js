'use strict';

const functions = require('firebase-functions');
const rp = require('request-promise');
const mailgun = require('mailgun-js')({
  apiKey: functions.config().qdlt.mailgun, 
  domain: "qiwi.tech"
});

function getSlackFeedbackPayload(payload) {
  return {
    method: 'POST',
    uri: 'https://hooks.slack.com/services/' + functions.config().qdlt.slack,
    body: {
      username: "Qiwi Tech Message Bot",
      icon_emoji: ":mailbox_with_mail:",
      attachments: [
        {
            fallback: "Qiwi Tech Feedback Form",
            "color": "#FF8200",
            title: "User sent following message",
            fields: [
                {
                    title: "Name",
                    value: payload.name,
                    short: false
                },
                {
                  title: "Email",
                  value: payload.email,
                  short: false
                },
                {
                  title: "Company",
                  value: payload.company,
                  short: false
                },
                {
                  title: "Message",
                  value: payload.message,
                  short: false
                }
            ],
            footer: "Qiwi Tech",
            footer_icon: "https://qiwi.tech/images/favicon-16x16.png",
            ts: Date.now() / 1000
        }
      ]
    },
    json: true,
  };
}

function getJobFromReq(req) {
  var job = "";
  req.headers.referer !== undefined &&
  req.headers.referer.split('/')[4] !== undefined ? 
    job = req.headers.referer.split('/')[4] : 
    job = "";

  return job
}

function getSlackCareerPayload(payload, req) {
  return {
    method: 'POST',
    uri: 'https://hooks.slack.com/services/' + functions.config().qdlt.career,
    body: {
      username: "Qiwi Tech Message Bot",
      icon_emoji: ":bust_in_silhouette:",
      attachments: [
        {
            fallback: "Qiwi Tech Career Response",
            "color": "#FF8200",
            title: "User sent following message",
            fields: [
                {
                  title: "JOB",
                  value: getJobFromReq(req),
                  short: false
                },
                {
                    title: "Name",
                    value: payload.name + " " + payload.surname,
                    short: false
                },
                {
                  title: "Email",
                  value: payload.email,
                  short: false
                },
                {
                  title: "Phone",
                  value: payload.phone,
                  short: false
                },
                {
                  title: "CV Link",
                  value: payload.cv,
                  short: false
                }
            ],
            footer: "Qiwi Tech",
            footer_icon: "https://qiwi.tech/images/favicon-16x16.png",
            ts: Date.now() / 1000
        }
      ]
    },
    json: true,
  };
}

function getMailCareerPayload(payload, req) {
  if(payload.email !== undefined) {
    return {
      from: 'Qiwi Tech Message Bot <info@qiwi.tech>',
      to: [payload.email, "hr@qiwi.tech"],
      subject: 'Спасибо, мы получили вашу информацию',
      html: "<html><body><p>Привет,</p><p>Мы получили от вас такую информацию:</p><ul><li><b>Вакансия:</b> " + getJobFromReq(req) + "</li><li><b>ФИО:</b> " + payload.name + " " + payload.surname + "</li><li><b>Email:</b> " + payload.email + "</li><li><b>Телефон:</b> " + payload.phone + "</li><li><b>CV Link:</b> " + payload.cv + "</li></ul><p>И передали её в HR. Мы с вами обязательно свяжемся.</p><p>Спасибо!</p></body></html>"
    }
  }
  return undefined;
}

function getMailFeedbackPayload(payload) {
  if(payload.email !== undefined) {
    return {
      from: 'Qiwi Tech Message Bot <info@qiwi.tech>',
      to: payload.email,
      subject: 'Спасибо, мы получили ваше сообщение',
      html: "<html><body><p>Привет,</p><p>Мы получили от вас такое сообщение:</p><ul><li><b>Имя:</b> " + payload.name + "</li><li><b>Email:</b> " + payload.email + "</li><li><b>Компания:</b> " + payload.company + "</li><li><b>Сообщение:</b> " + payload.message + "</li></ul><p>Мы с вами обязательно свяжемся как можно скорее.</p><p>Спасибо!</p></body></html>"
    }
  }
  return undefined;
}

function getReCAPTCHAVerifyPayload(token) {
  return {
    method: 'POST',
    uri: 'https://www.google.com/recaptcha/api/siteverify?secret=' + functions.config().qdlt.gsecret + '&response=' + token,
    json: true,
  };
}

exports.feedback = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  if(req.body === undefined || req.body.gtoken === undefined) {
    return res.status(415).send('No payload we can work with :(');
  }

  return rp(getReCAPTCHAVerifyPayload(req.body.gtoken), async (gerr, gres, gbody) => {
    if (!gbody.success) {
      console.error(gerr);
      return res.status(415).send('You\'re a robot');
    }

    try {
      await rp(getSlackFeedbackPayload(req.body));
      mailgun.messages().send(getMailFeedbackPayload(req.body), (err, body) => {
        console.log(err);
        console.log(body);
      });
      return res.status(200).send('OK');
    } catch(error) {
      console.error(error);
      return res.status(500).send('Something went wrong while posting the message to Slack.');
    }
  });
});

exports.job = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  if(req.body === undefined || req.body.gtoken === undefined) {
    return res.status(415).send('No payload we can work with :(');
  }

  return rp(getReCAPTCHAVerifyPayload(req.body.gtoken), async (gerr, gres, gbody) => {
    if (!gbody.success) {
      console.error(gerr);
      return res.status(415).send('You\'re a robot');
    }

    try {
      await rp(getSlackCareerPayload(req.body, req));
      mailgun.messages().send(getMailCareerPayload(req.body, req), (error, body) => {
        console.log(body);
      });
      return res.status(200).send('OK');
    } catch(error) {
      console.error(error);
      return res.status(500).send('Something went wrong while posting the message to Slack.');
    }
  });
});
