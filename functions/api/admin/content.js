const ALLOWED_EMAIL = 'piano1234560@gmail.com';
function authorized(request) {
  return (request.headers.get('Cf-Access-Authenticated-User-Email') || '').toLowerCase() === ALLOWED_EMAIL;
}
export async function onRequestPut({ request, env }) {
  if (!authorized(request)) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.text();
  try { JSON.parse(body); } catch (_) { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
  await env.CONTENT_KV.put('website-content', body);
  return Response.json({ success: true, updatedAt: new Date().toISOString() });
}
