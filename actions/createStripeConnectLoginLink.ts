"use server";

import { stripe } from "@/lib/stripe";

// Generates a Stripe Connect login link for the specified account ID.
export const createStipeConnectLoginLink = async (stripeAccountId: string) => {
  if (!stripeAccountId) {
    throw new Error("No Stripe account ID provided.");
  }

  try {
    const loginLink = await stripe.accounts.createLoginLink(stripeAccountId);
    return loginLink.url;
  } catch (error) {
    console.error("Error creating Stripe Connect login link: ", error);
    throw new Error("Failed to create Stripe Connect login link.");
  }
};
