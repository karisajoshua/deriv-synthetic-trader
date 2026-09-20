# Deriv Synthetic Trader

Demo-first scanner and autonomous session engine for Deriv synthetic digit contracts: Matches, Odd/Even, and Over/Under.

## Safety architecture
- Real-money execution disabled initially.
- Setup score is not presented as a guaranteed win probability.
- Percentage-of-equity sizing, session target, max drawdown, consecutive-loss cutoff, and capped recovery.
- Recovery never permits unlimited stake escalation or martingale doubling.

## Planned flow
Risk configuration → live market scan → candidate ranking → live proposal/return check → demo execution → settlement → risk recalculation → repeat until target or stop condition.

## Stack
Next.js + TypeScript, Supabase/Postgres, Deriv API, Vercel dashboard/API, and a separate persistent worker for continuous WebSocket execution.
