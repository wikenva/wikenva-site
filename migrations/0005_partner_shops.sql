create table if not exists partner_shops (
  id text primary key,
  created_at timestamptz not null default now(),
  partner_id text not null,
  email text not null,
  shop_name text not null,
  description text not null,
  status text not null default 'en_attente',
  decided_at timestamptz,
  decided_by text
);
