import { isAuthorized } from '../../lib/auth.js';

async function saveContent({ request, env }) {
  if (!(await isAuthorized(request, env))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await request.text();
  let content;
  try { content = JSON.parse(body); }
  catch (_) { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
  if (!content || typeof content !== 'object' || Array.isArray(content)) return Response.json({ error: 'Invalid content' }, { status: 400 });
  try {
    await env.CONTENT_KV.put('website-content', JSON.stringify(content, null, 2));
    return Response.json({ success: true, updatedAt: new Date().toISOString() });
  } catch (error) {
    console.error('Unable to save website content', error);
    return Response.json({ error: 'Storage unavailable' }, { status: 503 });
  }
}

export const onRequestPost = saveContent;
export const onRequestPut = saveContent;
