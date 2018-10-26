'use strict';

const functions = require('firebase-functions');
const util = require('util');
const cors = require('cors')({
  origin: 'https://qiwi.tech',
  optionsSuccessStatus: 200
});
const rp = require('request-promise');

function postToSlack(payload) {
  return rp({
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
  });
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
      await postToSlack(req.body);
      return res.status(200).send('OK');
    } catch(error) {
      console.error(error);
      return res.status(500).send('Something went wrong while posting the message to Slack.');
    }
  });
});
