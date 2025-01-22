"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

// Creates a Stripe Connect account link for onboarding.
// This function generates a URL to the Stripe onboarding flow for a specified Stripe Connect account.
// The link allows the user to complete the onboarding process and return to the provided return URL.
// If there are any issues, the user will be redirected to the refresh URL to try again.
export const createStripeConnectAccountLink = async (account: string) => {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin") || "";

    const accountLink = await stripe.accountLinks.create({
      account,
      refresh_url: `${origin}/connect/refresh/${account}`,
      return_url: `${origin}/connect/return/${account}`,
      type: "account_onboarding",
    });

    return { url: accountLink.url };
  } catch (error) {
    console.error(
      "An error occurred when calling the Stripe API to create an account link: ",
      error,
    );
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred.");
  }
};
