import {stopReason,type SessionLimits} from "../lib/risk/session-limits";
export type SessionState={balance:number;consecutiveLosses:number;outstandingLoss:number;trades:number;wins:number;losses:number};
export function initialState(balance:number):SessionState{return{balance,consecutiveLosses:0,outstandingLoss:0,trades:0,wins:0,losses:0};}
export function settle(s:SessionState,profit:number):SessionState{return{...s,balance:s.balance+profit,trades:s.trades+1,wins:s.wins+(profit>0?1:0),losses:s.losses+(profit<0?1:0),consecutiveLosses:profit<0?s.consecutiveLosses+1:0,outstandingLoss:Math.max(0,s.outstandingLoss-profit)};}
export function sessionStop(s:SessionState,l:SessionLimits){return stopReason(s.balance,s.consecutiveLosses,l);}
