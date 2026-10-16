create table if not exists interest_requests (
  id text primary key,
  created_at timestamptz not null default now(),
  kind text not null,
  name text,
  email text not null,
  sidra_username text,
  amount_sda text,
  status text not null default 'recue',
  consent boolean not null
);
