import { createServerFn } from "@tanstack/react-start";
import { authMiddleware, optionalAuthMiddleware } from "@/lib/auth/middleware";

export type RegistrationState = {
  signedIn: boolean;
  registered: boolean;
  unavailable: boolean;
  email: string | null;
  name: string | null;
};

export const getRegistration = createServerFn({ method: "GET" })
  .middleware([optionalAuthMiddleware])
  .handler(async ({ context }): Promise<RegistrationState> => {
    const { readRegistration } = await import("./registration.server");
    return readRegistration(context.userId, context.email);
  });

export const registerOnPlatform = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name: string; consent: boolean }) => input)
  .handler(async ({ data, context }): Promise<{ ok: boolean; unavailable: boolean }> => {
    const { saveRegistration } = await import("./registration.server");
    return saveRegistration(context.userId, data);
  });
