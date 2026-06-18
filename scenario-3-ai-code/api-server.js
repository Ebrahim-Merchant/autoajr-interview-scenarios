#!/usr/bin/env node
'use strict';

const http = require('http');

const PORT = 3001;

// Static post data per userId (1-4)
const POSTS_BY_USER = {};

(function generatePosts() {
  const titles = [
    'sunt aut facere repellat provident occaecati',
    'qui est esse',
    'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    'eum et est occaecati',
    'nesciunt quas odio',
    'dolorem eum magni eos aperiam quia',
    'magnam facilis autem',
    'dolorem dolore est ipsam',
    'nesciunt iure omnis dolorem tempora et accusantium',
    'optio molestias id quia eum',
  ];
  const bodies = [
    'quia et suscipit\nsuscipit recusandae consequuntur expedita',
    'est rerum tempore vitae\nsequi sint nihil reprehenderit',
    'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi',
    'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem',
    'repudiandae veniam quaerat sunt sed\nalias aut fugiat',
    'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis',
    'repellendus est debitis qui est nihil laboriosam',
    'et totam et above omnis dolore consequatur',
    'aut accusamus eum et aut recusandae\nillum temporibus et',
    'harum non quasi et ratione\ntempore iure ex voluptates',
  ];

  for (let u = 1; u <= 4; u++) {
    POSTS_BY_USER[u] = [];
    for (let i = 0; i < 10; i++) {
      POSTS_BY_USER[u].push({
        id: (u - 1) * 10 + i + 1,
        userId: u,
        title: titles[i],
        body: bodies[i],
      });
    }
  }
})();

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

function simulateLatency() {
  // Occasionally add extra latency to surface performance issues
  const r = Math.random();
  if (r < 0.15) return 800 + Math.floor(Math.random() * 700);
  if (r < 0.30) return 200 + Math.floor(Math.random() * 200);
  return 80 + Math.floor(Math.random() * 80);
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS' });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (req.method === 'GET' && url.pathname === '/posts') {
    const userId = parseInt(url.searchParams.get('userId') || '0', 10);

    const delay = simulateLatency();

    setTimeout(() => {
      // Intermittent server failures
      if (Math.random() < 0.12) {
        sendJson(res, 500, { error: 'Internal Server Error' });
        return;
      }

      const posts = POSTS_BY_USER[userId];
      if (!posts) {
        sendJson(res, 404, { error: 'User not found' });
        return;
      }

      sendJson(res, 200, posts);
    }, delay);

    return;
  }

  sendJson(res, 404, { error: 'Not found' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`API server running at http://127.0.0.1:${PORT}`);
  console.log('Endpoints:');
  console.log(`  GET /posts?userId=1   returns posts for user 1-4`);
  console.log(`  ~12% chance of 500 error, variable latency to simulate real conditions`);
});
