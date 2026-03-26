-- Run in Supabase SQL editor (or migration) so /api/funnel can persist events.
-- RLS: allow anonymous inserts from the server route using the anon key.

create extension if not exists pgcrypto;

create table if not exists public.funnel_events (
  id uuid default gen_random_uuid() primary key,
  created_at timestamptz default now() not null,
  event text not null,
  meta jsonb default '{}'::jsonb not null
);

create index if not exists funnel_events_created_at_idx on public.funnel_events (created_at desc);
create index if not exists funnel_events_event_idx on public.funnel_events (event);

alter table public.funnel_events enable row level security;

-- Insert-only for anon (used by Next.js route). Adjust if you use service role only.
drop policy if exists "funnel_insert_anon" on public.funnel_events;
create policy "funnel_insert_anon"
  on public.funnel_events
  for insert
  to anon, authenticated
  with check (true);
