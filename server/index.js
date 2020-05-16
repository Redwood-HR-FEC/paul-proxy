
const express = require('express');
const httpProxy = require('http-proxy');
require('dotenv').config();

const ProxyApp = express();
ProxyApp.set('port', 3000);

const apiProxy = httpProxy.createProxyServer();

// Local
let qnaService = "http://54.184.20.122:3001";
let decService = "http://34.212.75.246:3002";
let revService = "http://44.228.132.116:3003";


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
  apiProxy.on('error', function(e) {
    console.log('Proxy loading ERROR:', e);
    // resp.sendStatus(500);
  });
});

ProxyApp.all('/questions/*', (req, resp) => {
  console.log('Proxy to Q and A server API');
  apiProxy.web(req, resp, {target: qnaService});
  apiProxy.on('error', function(e) {
    resp.status(500).send(e);
  });
});


// Description Proxy

ProxyApp.all('/description-service/*', (req, resp) => {
  console.log('Proxy to Description server');
  apiProxy.web(req, resp, {target: decService});
  apiProxy.on('error', function(e) {
    resp.status(500).send(e);
  });
});

ProxyApp.all('/getallproducts/*', (req, resp) => {
  console.log('Proxy to Description server API');
  apiProxy.web(req, resp, {target: decService});
  apiProxy.on('error', function(e) {
    resp.status(500).send(e);
  });
});

ProxyApp.all('/getsingleproduct/*', (req, resp) => {
  console.log('Proxy to Description server API');
  apiProxy.web(req, resp, {target: decService});
  apiProxy.on('error', function(e) {
    resp.status(500).send(e);
  });
});


// Review Proxy

ProxyApp.all('/review-service/*', (req, resp) => {
  console.log('Proxy to Review server');
  apiProxy.web(req, resp, {target: revService});
  apiProxy.on('error', function(e) {
    resp.status(500).send(e);
  });
});

ProxyApp.all('/review-api/*', (req, resp) => {
  console.log('Proxy to Review server API');
  apiProxy.web(req, resp, {target: revService});
  apiProxy.on('error', function(e) {
    resp.status(500).send(e);
  });
});


// LetLive.
ProxyApp.listen(ProxyApp.set('port'), () => {
  console.log(`Proxy Server running: ${ProxyApp.set('port')}`);
});

module.exports = {
  ProxyApp
}
