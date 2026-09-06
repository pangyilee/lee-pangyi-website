import { isAuthorized } from '../../lib/auth.js';

export async function onRequestGet({ request, env }) {
  if (!(await isAuthorized(request, env))) return Response.json({ error: 'Unauthorized' }, { status: 401 });
  const listed = await env.CONTENT_KV.list({ prefix: 'inquiry:', limit: 100 });
  const items = (await Promise.all(listed.keys.map(({ name }) => env.CONTENT_KV.get(name, 'json')))).filter(Boolean);
  items.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  return Response.json({ items }, { headers: { 'cache-control': 'no-store' } });
}
