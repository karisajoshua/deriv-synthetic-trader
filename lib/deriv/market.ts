import {DerivPublicClient} from "./ws";
export type ActiveSymbol={underlying_symbol:string;underlying_symbol_name?:string;underlying_symbol_type?:string;pip_size?:number;market?:string;submarket?:string;subgroup?:string};
export async function activeSymbols(appId:string){const c=new DerivPublicClient(appId);await c.connect();try{const r:any=await c.request({active_symbols:"brief"});return (r.active_symbols??[]) as ActiveSymbol[];}finally{c.close();}}
export function likelySynthetic(s:ActiveSymbol){const text=[s.market,s.submarket,s.subgroup,s.underlying_symbol_type,s.underlying_symbol_name].filter(Boolean).join(" ").toLowerCase();return /synthetic|derived|volatility|boom|crash|jump|step|range break/.test(text);}
