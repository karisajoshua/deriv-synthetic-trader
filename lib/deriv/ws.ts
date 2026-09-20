export const DERIV_WS_BASE="wss://ws.derivws.com/websockets/v3";
export type DerivMessage={msg_type?:string;error?:{code:string;message:string};[key:string]:unknown};
export function derivSocketUrl(appId:string){return `${DERIV_WS_BASE}?app_id=${encodeURIComponent(appId)}`;}
export class DerivPublicClient{
 private ws?:WebSocket; private req=1; private pending=new Map<number,(v:DerivMessage)=>void>();
 constructor(private appId:string){}
 connect(){return new Promise<void>((resolve,reject)=>{this.ws=new WebSocket(derivSocketUrl(this.appId));this.ws.onopen=()=>resolve();this.ws.onerror=()=>reject(new Error("Deriv WebSocket connection failed"));this.ws.onmessage=(e)=>{const m=JSON.parse(String(e.data)) as DerivMessage;const id=m.req_id as number|undefined;if(id&&this.pending.has(id)){this.pending.get(id)!(m);this.pending.delete(id);}};});}
 request(payload:Record<string,unknown>){if(!this.ws||this.ws.readyState!==WebSocket.OPEN)throw new Error("Deriv socket is not connected");const req_id=this.req++;return new Promise<DerivMessage>((resolve,reject)=>{this.pending.set(req_id,m=>m.error?reject(new Error(m.error.message)):resolve(m));this.ws!.send(JSON.stringify({...payload,req_id}));});}
 close(){this.ws?.close();}
}
