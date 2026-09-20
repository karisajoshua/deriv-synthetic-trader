# Architecture

## Control plane
Next.js on Vercel serves the private dashboard and short-lived API requests.

## Data plane
A persistent Node worker maintains Deriv WebSocket subscriptions and the autonomous session state. It is not implemented as a long-lived Vercel Function.

## Persistence
Supabase stores user-owned sessions and trades under RLS. No Deriv password is stored. Tokens must be server-side secrets.

## Trading pipeline
ticks → rolling digit buffers → multi-window features → setup score → live proposal → payout/EV gate → risk gate → demo buy → settlement → persistence → rescan.

## Hard rule
The initial release cannot execute real-money contracts. Promotion to real trading requires explicit code/config changes after demo validation.
