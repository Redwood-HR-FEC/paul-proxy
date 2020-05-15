
const express = require('express');
const httpProxy = require('http-proxy');
require('dotenv').config();

const ProxyApp = express();
ProxyApp.set('port', 3000);

const apiProxy = httpProxy.createProxyServer();

// Local
let qnaService = '';
let decService = '';
let revService = '';

if (process.env.SERVICE_1) qnaService = process.env.SERVICE_1;
if (process.env.SERVICE_2) decService = process.env.SERVICE_2;
if (process.env.SERVICE_3) revService = process.env.SERVICE_3;


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

ProxyApp.all('/description-service/*', (req, resp) => {
  console.log('Proxy to Description server');
  apiProxy.web(req, resp, {target: decService});
});

ProxyApp.all('/getallproducts/*', (req, resp) => {
  console.log('Proxy to Description server API');
  apiProxy.web(req, resp, {target: decService});
});

ProxyApp.all('/getsingleproduct/*', (req, resp) => {
  console.log('Proxy to Description server API');
  apiProxy.web(req, resp, {target: decService});
});


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
