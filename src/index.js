export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === '/') {
        return new Response(`<!DOCTYPE html>
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
          </html>`, {
          headers: { 'Content-Type': 'text/html' },
        });
      }

      if (path.startsWith('/api/job')) {
        if (request.method !== 'POST') {
          return new Response('Method Not Allowed', { status: 405 });
        }

        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return new Response('Unauthorized', { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const isValid = await validateToken(token, env);
        if (!isValid) {
          return new Response('Unauthorized', { status: 401 });
        }

        const body = await request.json();
        const jobId = await createJob(body, env);

        return new Response(JSON.stringify({ jobId }), {
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response('Not Found', { status: 404 });
    } catch (error) {
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};

async function validateToken(token, env) {
  // Placeholder for token validation logic
  // This could involve checking against a database or an external service
  return true;
}

async function createJob(data, env) {
  const jobId = crypto.randomUUID();
  const jobData = {
    id: jobId,
    status: 'queued',
    data,
    createdAt: new Date().toISOString(),
  };

  await env.D1.put(jobId, JSON.stringify(jobData));
  return jobId;
}