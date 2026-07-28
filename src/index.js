addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  try {
    if (path === '/') {
      return new Response(renderLandingPage(), {
        headers: { 'Content-Type': 'text/html' },
      });
    } else if (path.startsWith('/api/chat')) {
      return await handleChatRequest(request);
    } else {
      return new Response('Not Found', { status: 404 });
    }
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}

function renderLandingPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BinForge</title>
</head>
<body>
  <h1>Welcome to BinForge</h1>
  <p>Ship signed, reproducible TypeScript binaries from your CI in minutes.</p>
</body>
</html>`;
}

async function handleChatRequest(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const body = await request.json();
  const prompt = body.prompt;

  if (!prompt) {
    return new Response('Bad Request: Missing prompt', { status: 400 });
  }

  const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.AIMLAPI_KEY}`
    },
    body: JSON.stringify({ prompt })
  });

  if (!response.ok) {
    return new Response('Error from AIMLAPI', { status: response.status });
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}