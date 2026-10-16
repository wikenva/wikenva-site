create table if not exists platform_registrations (
  user_id text primary key,
  email text not null,
  name text not null,
  consent boolean not null,
  created_at timestamptz not null default now()
);
