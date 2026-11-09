create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can read their own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);
grant all on public.admin_allowlist to service_role;
alter table public.admin_allowlist enable row level security;

create or replace function public.assign_admin_from_allowlist()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if exists (select 1 from public.admin_allowlist where email = lower(new.email)) then
    insert into public.user_roles (user_id, role) values (new.id, 'admin')
    on conflict (user_id, role) do nothing;
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_assign_admin
  after insert on auth.users
  for each row execute function public.assign_admin_from_allowlist();

create type public.application_status as enum ('nouvelle', 'en_examen', 'acceptee', 'refusee');

create table public.partner_applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  country text not null,
  tx_hash text,
  sidrastart_username text,
  whatsapp text,
  motivation text,
  accepted_terms boolean not null default false,
  accepted_privacy boolean not null default false,
  status public.application_status not null default 'nouvelle',
  admin_notes text,
  ip_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  tx_check_status text not null default 'non_verifiee',
  tx_checked_at timestamptz,
  tx_value_sda numeric,
  tx_from text,
  tx_to text,
  tx_block bigint,
  tracking_code_hash text,
  email_key text GENERATED ALWAYS AS (
    CASE
      WHEN split_part(lower(btrim(email)), '@', 2) IN ('gmail.com', 'googlemail.com')
        THEN replace(split_part(split_part(lower(btrim(email)), '@', 1), '+', 1), '.', '') || '@gmail.com'
      ELSE lower(btrim(email))
    END
  ) STORED
);
create unique index partner_applications_tx_hash_unique on public.partner_applications (lower(tx_hash));
create index partner_applications_email_idx on public.partner_applications (lower(email));
create index partner_applications_ip_created_idx on public.partner_applications (ip_hash, created_at);
create unique index partner_applications_email_key_unique on public.partner_applications (email_key);
create unique index partner_applications_tracking_code_hash_key on public.partner_applications(tracking_code_hash);

grant select, update on public.partner_applications to authenticated;
grant all on public.partner_applications to service_role;
alter table public.partner_applications enable row level security;

create policy "Admins can read applications"
  on public.partner_applications for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create policy "Admins can update applications"
  on public.partner_applications for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create or replace function public.touch_updated_at()
returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end; $$;

create trigger partner_applications_touch
  before update on public.partner_applications
  for each row execute function public.touch_updated_at();

insert into public.admin_allowlist (email) values ('contact.wikenva@gmail.com') on conflict (email) do nothing;

create table public.application_decisions (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.partner_applications(id) on delete cascade,
  from_status public.application_status,
  to_status public.application_status not null,
  admin_id uuid,
  admin_email text,
  created_at timestamptz not null default now()
);
grant select on public.application_decisions to authenticated;
grant all on public.application_decisions to service_role;
alter table public.application_decisions enable row level security;
create policy "Admins read decisions" on public.application_decisions for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));
create index application_decisions_app_idx on public.application_decisions(application_id, created_at);

create or replace function public.log_application_decision()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status is distinct from old.status then
    insert into public.application_decisions(application_id, from_status, to_status, admin_id, admin_email)
    values (new.id, old.status, new.status, auth.uid(), auth.jwt() ->> 'email');
  end if;
  return new;
end $$;
create trigger partner_applications_log_decision after update of status on public.partner_applications
  for each row execute function public.log_application_decision();

create table public.verification_attempts (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);
grant all on public.verification_attempts to service_role;
alter table public.verification_attempts enable row level security;
create index verification_attempts_ip_idx on public.verification_attempts(ip_hash, created_at);