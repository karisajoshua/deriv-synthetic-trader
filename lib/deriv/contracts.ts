import type {ContractKind} from "../strategies/types";
export function contractType(kind:ContractKind){return({MATCH:"DIGITMATCH",ODD:"DIGITODD",EVEN:"DIGITEVEN",OVER:"DIGITOVER",UNDER:"DIGITUNDER"} as const)[kind];}
export function proposalRequest(args:{symbol:string;kind:ContractKind;stake:number;barrier?:number;currency?:string}){return{proposal:1,amount:args.stake,basis:"stake",contract_type:contractType(args.kind),currency:args.currency??"USD",duration:1,duration_unit:"t",symbol:args.symbol,...(args.barrier===undefined?{}:{barrier:String(args.barrier)})};}
