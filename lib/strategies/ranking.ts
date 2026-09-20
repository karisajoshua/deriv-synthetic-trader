import type {Candidate} from "./types";
export function breakEvenRate(ask:number,payout:number){return payout<=0?1:ask/payout;}
export function expectedValue(winRate:number,ask:number,payout:number){return winRate*(payout-ask)-(1-winRate)*ask;}
export function rank(candidates:Candidate[]){return [...candidates].sort((a,b)=>(b.setupScore-a.setupScore)||((b.expectedProfit??-Infinity)-(a.expectedProfit??-Infinity)));}
