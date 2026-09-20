export type ContractKind="MATCH"|"ODD"|"EVEN"|"OVER"|"UNDER";
export type Candidate={symbol:string;kind:ContractKind;barrier?:number;setupScore:number;askPrice?:number;payout?:number;expectedProfit?:number};
