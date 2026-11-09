REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.assign_admin_from_allowlist() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.assign_admin_from_allowlist() TO service_role;

REVOKE ALL ON FUNCTION public.log_application_decision() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_application_decision() TO service_role;