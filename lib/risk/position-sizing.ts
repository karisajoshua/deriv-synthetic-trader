export type RiskProfile="conservative"|"moderate"|"aggressive"|"custom";
const fractions:Record<Exclude<RiskProfile,"custom">,number>={conservative:.005,moderate:.01,aggressive:.02};
export function recommendedStake(balance:number,profile:RiskProfile,customFraction?:number){const f=profile==="custom"?(customFraction??.01):fractions[profile];return Math.max(0,Number((balance*f).toFixed(2)));}
