import { isAuthorized } from '../../lib/auth.js';
export async function onRequestGet({request,env}) { return Response.json({authenticated:await isAuthorized(request,env)},{headers:{'Cache-Control':'no-store'}}); }
