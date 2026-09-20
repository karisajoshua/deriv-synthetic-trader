import type {Candidate,ContractKind} from "./types";
export const WINDOWS=[25,50,100,250,500,1000] as const;
export function lastDigit(quote:number,pipSize=2){return Number(quote.toFixed(pipSize).slice(-1));}
export function frequencies(digits:number[]){const counts=Array(10).fill(0);digits.forEach(d=>counts[d]++);return counts.map(n=>n/Math.max(1,digits.length));}
const clamp=(n:number)=>Math.max(0,Math.min(100,n));
export function scoreCandidates(symbol:string,digits:number[]):Candidate[]{
 if(digits.length<25)return[];
 const short=frequencies(digits.slice(-Math.min(100,digits.length)));
 const long=frequencies(digits.slice(-Math.min(1000,digits.length)));
 const score=(observed:number,baseline:number)=>clamp(50+(observed-baseline)*180);
 const out:Candidate[]=[];
 for(let d=0;d<10;d++)out.push({symbol,kind:"MATCH",barrier:d,setupScore:score(short[d],long[d])});
 const odd=short.filter((_,i)=>i%2===1).reduce((a,b)=>a+b,0), even=1-odd;
 out.push({symbol,kind:"ODD",setupScore:score(odd,.5)},{symbol,kind:"EVEN",setupScore:score(even,.5)});
 for(let b=0;b<=8;b++){const over=short.slice(b+1).reduce((a,v)=>a+v,0);out.push({symbol,kind:"OVER",barrier:b,setupScore:score(over,(9-b)/10)});}
 for(let b=1;b<=9;b++){const under=short.slice(0,b).reduce((a,v)=>a+v,0);out.push({symbol,kind:"UNDER",barrier:b,setupScore:score(under,b/10)});}
 return out.sort((a,b)=>b.setupScore-a.setupScore);
}
