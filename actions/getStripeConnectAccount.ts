"use server";

import { auth } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";
import { getConvexClient } from "@/lib/convex";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set.");
}

// A Convex client that runs queries and mutations over HTTP.
const convex = getConvexClient();

// Retrieves the Stripe Connect account ID for the authenticated user.
export const getStripeConnectAccount = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated.");
  }

  const stripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    { userId },
  );

  return { stripeConnectId: stripeConnectId || null };
};
