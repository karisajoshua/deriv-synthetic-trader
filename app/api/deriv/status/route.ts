export const runtime="nodejs";
export async function GET(){
 const appId=process.env.DERIV_APP_ID, token=process.env.DERIV_PAT;
 return Response.json({configured:Boolean(appId&&token),appIdConfigured:Boolean(appId),credentialConfigured:Boolean(token),mode:"demo"});
}
