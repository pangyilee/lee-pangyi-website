export async function onRequestGet({ request, env }) {
  try {
    const value = await env.CONTENT_KV.get('website-content');
    if (value) return new Response(value, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });
  } catch (_) {}
  return env.ASSETS.fetch(new URL('/content.json', request.url));
}
