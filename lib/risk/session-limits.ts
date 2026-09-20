export type SessionLimits={startingBalance:number;profitTarget:number;maxDrawdown:number;maxConsecutiveLosses:number};
export function stopReason(balance:number,losses:number,l:SessionLimits){if(balance>=l.startingBalance+l.profitTarget)return"TARGET_REACHED";if(balance<=l.startingBalance-l.maxDrawdown)return"MAX_DRAWDOWN";if(losses>=l.maxConsecutiveLosses)return"LOSS_LIMIT";return null;}
