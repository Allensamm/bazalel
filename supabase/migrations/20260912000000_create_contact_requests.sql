create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 3 and 160),
  company text not null check (char_length(company) between 1 and 140),
  website text check (website is null or char_length(website) <= 300),
  industry text not null check (char_length(industry) between 1 and 100),
  timeline text not null check (char_length(timeline) between 1 and 100),
  message text not null check (char_length(message) between 30 and 2000),
  status text not null default 'new' check (status in ('new', 'handled'))
);

create index if not exists contact_requests_created_at_idx
  on public.contact_requests (created_at desc);

alter table public.contact_requests enable row level security;

revoke all on table public.contact_requests from anon, authenticated;
grant select, update on table public.contact_requests to authenticated;
grant select, insert, update on table public.contact_requests to service_role;

drop policy if exists "Administrator can read enquiries with MFA" on public.contact_requests;
create policy "Administrator can read enquiries with MFA"
  on public.contact_requests
  for select
  to authenticated
  using (
    lower(coalesce((select auth.jwt()->>'email'), '')) = 'allen@bazaleldesign.com'
    and (select auth.jwt()->>'aal') = 'aal2'
  );

drop policy if exists "Administrator can update enquiries with MFA" on public.contact_requests;
create policy "Administrator can update enquiries with MFA"
  on public.contact_requests
  for update
  to authenticated
  using (
    lower(coalesce((select auth.jwt()->>'email'), '')) = 'allen@bazaleldesign.com'
    and (select auth.jwt()->>'aal') = 'aal2'
  )
  with check (
    lower(coalesce((select auth.jwt()->>'email'), '')) = 'allen@bazaleldesign.com'
    and (select auth.jwt()->>'aal') = 'aal2'
  );

comment on table public.contact_requests is
  'Private Bazalel project enquiries. Read access requires the administrator account and AAL2 MFA.';
