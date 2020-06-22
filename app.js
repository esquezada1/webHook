const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
 
const assistant = new AssistantV2({
    authenticator: new IamAuthenticator({ apikey: '8g2CZaIM8jNEL_4gXenz-o8833J742WTWsYcSYshTto7' }),
    url: 'https://gateway.watsonplatform.net/assistant/api',
    version: '2018-09-19',
    disableSslVerification: true
  });

let assitanceId = '6d1f978e-c4c1-4f2a-a588-37efd2ac7038';
assistant.createSession({
    assistantId: assitanceId
  })
    .then(res => {
      console.log(JSON.stringify(res.result, null, 2));
      assistant.message(
            {
                input: { text: "argos" },
                assistantId: assitanceId,
                sessionId: res.result.session_id
            })
            .then(response => {
                console.log(JSON.stringify(response.result, null, 2));
            })
            .catch(err => {
                console.log(err);
            });
        })
    .catch(err => {
      console.log(err);
    });
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});