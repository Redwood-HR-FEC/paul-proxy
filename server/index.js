
const express = require('express');
const httpProxy = require('http-proxy');

const ProxyApp = express();
ProxyApp.set('port', 3000);

const apiProxy = httpProxy.createProxyServer();

// Local
// const qnaService = 'http://localhost:3001';
const decService = 'http://localhost:3002';
// const revService = 'http://localhost:3003';

// EC2
const qnaService = 'http://54.218.33.175:3001';
const revService = 'http://18.236.82.217:3003';


// The Middle
ProxyApp.use(express.json());
ProxyApp.use((req, resp, next) => {
  console.log(`${req.method}:${req.originalUrl}`);
  next();
});

// Static
ProxyApp.use('/robots.txt', express.static('public/robots.txt'));
ProxyApp.use('/:id', express.static('public'));


// Q and A Proxy

ProxyApp.all('/questions-service/*', (req, resp) => {
  console.log('Proxy to Q and A server');
  apiProxy.web(req, resp, {target: qnaService});
});

ProxyApp.all('/questions/*', (req, resp) => {
  console.log('Proxy to Q and A server API');
  apiProxy.web(req, resp, {target: qnaService});
});


// Description Proxy

// ProxyApp.all('/description-service/*', (req, resp) => {
//   console.log('Proxy to Description server');
//   apiProxy.web(req, resp, {target: decService});
// });

// ProxyApp.all('/getallproducts/*', (req, resp) => {
//   console.log('Proxy to Description server API');
//   apiProxy.web(req, resp, {target: decService});
// });

// ProxyApp.all('/getsingleproduct/*', (req, resp) => {
//   console.log('Proxy to Description server API');
//   apiProxy.web(req, resp, {target: decService});
// });


// Review Proxy

ProxyApp.all('/review-service/*', (req, resp) => {
  console.log('Proxy to Review server');
  apiProxy.web(req, resp, {target: revService});
});

ProxyApp.all('/review-api/*', (req, resp) => {
  console.log('Proxy to Review server API');
  apiProxy.web(req, resp, {target: revService});
});


// LetLive.
ProxyApp.listen(ProxyApp.set('port'), () => {
  console.log(`Proxy Server running: ${ProxyApp.set('port')}`);
});

module.exports = {
  ProxyApp
}
