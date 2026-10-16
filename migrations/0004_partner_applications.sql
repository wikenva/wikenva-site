create table if not exists partner_applications (
  id text primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  country text not null,
  whatsapp text,
  profile text not null,
  tx_ref text,
  message text,
  consent_terms boolean not null,
  consent_privacy boolean not null,
  status text not null default 'en_attente',
  decided_at timestamptz,
  decided_by text
);
