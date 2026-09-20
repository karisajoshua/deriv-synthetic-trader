create table if not exists public.trading_sessions (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 account_type text not null default 'demo' check (account_type in ('demo')),
 starting_balance numeric not null,
 profit_target numeric not null,
 max_drawdown numeric not null,
 min_setup_score numeric not null default 85,
 status text not null default 'idle',
 created_at timestamptz not null default now(),
 ended_at timestamptz
);
create table if not exists public.trades (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade,
 session_id uuid not null references public.trading_sessions(id) on delete cascade,
 symbol text not null, contract_type text not null, barrier integer,
 setup_score numeric not null, stake numeric not null, payout numeric,
 profit numeric, deriv_contract_id text, status text not null default 'proposed',
 created_at timestamptz not null default now(), settled_at timestamptz
);
alter table public.trading_sessions enable row level security;
alter table public.trades enable row level security;
grant select,insert,update on public.trading_sessions to authenticated;
grant select,insert,update on public.trades to authenticated;
create policy "own sessions select" on public.trading_sessions for select to authenticated using ((select auth.uid())=user_id);
create policy "own sessions insert" on public.trading_sessions for insert to authenticated with check ((select auth.uid())=user_id);
create policy "own sessions update" on public.trading_sessions for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);
create policy "own trades select" on public.trades for select to authenticated using ((select auth.uid())=user_id);
create policy "own trades insert" on public.trades for insert to authenticated with check ((select auth.uid())=user_id);
create policy "own trades update" on public.trades for update to authenticated using ((select auth.uid())=user_id) with check ((select auth.uid())=user_id);


create index if not exists idx_sessions_user on public.trading_sessions(user_id);
create index if not exists idx_trades_user on public.trades(user_id);
create index if not exists idx_trades_session on public.trades(session_id);
create index if not exists idx_trades_created on public.trades(created_at desc);
