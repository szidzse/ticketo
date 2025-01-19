import { Doc } from "@/convex/_generated/dataModel";

// Time constants in milliseconds
export const DURATIONS = {
  // 30 minutes (Minimum Stripe allows for checkout expiry)
  TICKET_OFFER: 30 * 60 * 1000,
} as const;

export const WAITING_LIST_STATUS: Record<string, Doc<"waitingList">["status"]> =
  {
    WAITING: "waiting",
    OFFERED: "offered",
    PURCHASED: "purchased",
    EXPIRED: "expired",
  } as const;

export const TICKET_STATUS: Record<string, Doc<"tickets">["status"]> = {
  VALID: "valid",
  USED: "used",
  REFUNDED: "refunded",
  CANCELLED: "cancelled",
} as const;
