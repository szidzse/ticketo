"use server";

import { auth } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";
import { stripe } from "@/lib/stripe";
import { getConvexClient } from "@/lib/convex";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set.");
}

// A Convex client that runs queries and mutations over HTTP.
const convex = getConvexClient();

// Creates or retrieves a Stripe Connect account for the authenticated user.
export const createStripeConnectCustomer = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not authenticated.");
  }

  // Check if user already has a Stripe Connect account
  const existingStripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    { userId },
  );

  if (existingStripeConnectId) {
    return { account: existingStripeConnectId };
  }

  // Create new Stripe Connect Account
  const account = await stripe.accounts.create({
    type: "express",
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });

  // Update user with Stripe Connect ID
  await convex.mutation(api.users.updateOrCreateUserStripeConnectId, {
    userId,
    stripeConnectId: account.id,
  });

  return { account: account.id };
};
