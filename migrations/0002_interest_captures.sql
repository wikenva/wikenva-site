create table if not exists interest_captures (
  id text primary key,
  created_at timestamptz not null default now(),
  email text not null,
  name text,
  content_type text not null,
  image_data text not null,
  status text not null default 'recue'
);
