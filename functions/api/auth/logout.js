import { clearSessionCookie } from '../../lib/auth.js';
export function onRequestPost() { return new Response(JSON.stringify({success:true}),{headers:{'Content-Type':'application/json','Set-Cookie':clearSessionCookie(),'Cache-Control':'no-store'}}); }
