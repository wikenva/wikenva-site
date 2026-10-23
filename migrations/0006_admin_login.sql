create table if not exists admin_codes (
  email text primary key,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts integer not null default 0
);

create table if not exists admin_sessions (
  token_hash text primary key,
  email text not null,
  expires_at timestamptz not null
);
