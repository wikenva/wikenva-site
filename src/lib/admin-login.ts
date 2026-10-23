import { createServerFn } from "@tanstack/react-start";

export const requestAdminCode = createServerFn({ method: "POST" })
  .validator((input: { email: string }) => input)
  .handler(async ({ data }) => {
    const { requestAdminCode: send } = await import("./admin-login.server");
    return send(data.email);
  });

export const confirmAdminCode = createServerFn({ method: "POST" })
  .validator((input: { email: string; code: string }) => input)
  .handler(async ({ data }) => {
    const { confirmAdminCode: confirm } = await import("./admin-login.server");
    return confirm(data.email, data.code);
  });
