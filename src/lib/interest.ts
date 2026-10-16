import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import type {
  ApplicationDecision,
  ApplicationLookup,
  CaptureInput,
  CaptureResult,
  InterestInput,
  InterestList,
  SubmitResult,
} from "@/lib/interest-config";

export type {
  CaptureInput,
  CaptureResult,
  CaptureRow,
  InterestInput,
  InterestKind,
  InterestList,
  InterestRow,
  SubmitResult,
} from "@/lib/interest-config";

export const submitInterest = createServerFn({ method: "POST" })
  .validator((input: InterestInput) => input)
  .handler(async ({ data }): Promise<SubmitResult> => {
    const { submitInterestRequest } = await import("./interest.server");
    return submitInterestRequest(data);
  });

export const submitCapture = createServerFn({ method: "POST" })
  .validator((input: CaptureInput) => input)
  .handler(async ({ data }): Promise<CaptureResult> => {
    const { submitCaptureRequest } = await import("./interest.server");
    return submitCaptureRequest(data);
  });

export const listInterests = createServerFn({ method: "GET" }).handler(async (): Promise<InterestList> => {
  const { listInterestRequests } = await import("./interest.server");
  return listInterestRequests();
});

export const listCaptures = createServerFn({ method: "GET" }).handler(async () => {
  const { listCaptureRequests } = await import("./interest.server");
  return listCaptureRequests();
});

export const lookupApplication = createServerFn({ method: "POST" })
  .validator((input: { id: string; email: string }) => input)
  .handler(async ({ data }): Promise<ApplicationLookup> => {
    const { lookupApplicationStatus } = await import("./interest.server");
    return lookupApplicationStatus(data);
  });

export const decideApplication = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id: string; decision: ApplicationDecision }) => input)
  .handler(async ({ data, context }): Promise<{ ok: boolean }> => {
    const { decideApplicationRequest } = await import("./interest.server");
    return decideApplicationRequest(data, context.userId);
  });