
const express = require('express');
const httpProxy = require('http-proxy');

const ProxyApp = express();
ProxyApp.set('port', 3000);

const apiProxy = httpProxy.createProxyServer();
const qnaService = 'http://localhost:3001';
const decService = 'http://localhost:3002';
const revService = 'http://localhost:3003';


// The Middle
ProxyApp.use(express.json());
ProxyApp.use((req, resp, next) => {
  console.log(`${req.method}:${req.originalUrl}`);
  next();
});

// Static
ProxyApp.use('/:id', express.static('public'));


// Proxy Routes
ProxyApp.all('/qna-service/*', (req, resp) => {
  console.log('Proxy to Review server');
  apiProxy.web(req, resp, {target: qnaService});
});

ProxyApp.all('/dec-service/*', (req, resp) => {
  console.log('Proxy to Review server');
  apiProxy.web(req, resp, {target: decService});
});

ProxyApp.all('/rev-service/*', (req, resp) => {
  console.log('Proxy to Review server');
  apiProxy.web(req, resp, {target: revService});
});


// LetLive.
ProxyApp.listen(ProxyApp.set('port'), () => {
  console.log(`Proxy Server running: ${ProxyApp.set('port')}`);
});

module.exports = {
  ProxyApp
}
