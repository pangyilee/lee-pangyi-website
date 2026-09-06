function clean(value, max = 1000) { return String(value || '').trim().slice(0, max); }

export async function onRequestPost({ request, env }) {
  let input;
  try { input = await request.json(); }
  catch (_) { return Response.json({ error: 'Invalid request' }, { status: 400 }); }
  if (input.website) return Response.json({ success: true });

  const name = clean(input.name, 120);
  const email = clean(input.email, 200).toLowerCase();
  const subject = clean(input.subject, 120);
  const message = clean(input.message, 3000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Missing or invalid fields' }, { status: 400 });
  }

  const createdAt = new Date().toISOString();
  const id = `${Date.now()}-${crypto.randomUUID()}`;
  await env.CONTENT_KV.put(`inquiry:${id}`, JSON.stringify({ id, createdAt, name, email, subject, message }));
  return Response.json({ success: true });
}
