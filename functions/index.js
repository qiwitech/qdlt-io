'use strict';

const functions = require('firebase-functions');
const rp = require('request-promise');
const mailgun = require('mailgun-js')({
  apiKey: functions.config().qdlt.mailgun, 
  domain: "qiwi.tech"
});
const cors = require('cors')({
  origin: 'https://qiwi.tech',
  optionsSuccessStatus: 200
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

function getSlackCareerPayload(payload) {
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
                  title: "Linkedin",
                  value: payload.linkedin,
                  short: false
                },
                {
                  title: "CV",
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

function getMailCareerPayload(payload) {
  if(payload.email !== undefined) {
    return {
      from: 'Qiwi Tech Feedback Bot <info@qiwi.tech>',
      to: payload.email,
      subject: 'Спасибо, мы получили вашу информацию',
      html: "<html><body><p>Привет,</p><p>Мы полчили от вас такую информацию:</p><ul><li><b>ФИО:</b> " + payload.name + " " + payload.surname + "</li><li><b>Email:</b> " + payload.email + "</li><li><b>Телефон:</b> " + payload.phone + "</li><li><b>LinkedIn:</b> " + payload.linkedin + "</li><li><b>CV Link:</b> " + payload.cv + "</li></ul><p>И передали её в HR отел. Они с вами обязательно свяжутся.</p><p>Спасибо!</p></body></html>"
    }
  }
  return undefined;
}

exports.feedback = functions.https.onRequest((req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method not allowed');
  }

  if(req.body === undefined) {
    return res.status(200).send('OK');
  }

  return cors(req, res, async () => {
    try {
      await rp(getSlackFeedbackPayload(req.body));
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

  if(req.body === undefined) {
    return res.status(200).send('OK');
  }

  return cors(req, res, async () => {
    try {
      await rp(getSlackCareerPayload(req.body));
      await mailgun.messages().send(getMailCareerPayload(re.body));
      return res.status(200).send('OK');
    } catch(error) {
      console.error(error);
      return res.status(500).send('Something went wrong while posting the message to Slack.');
    }
  });
});
