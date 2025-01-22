"use server";

import { stripe } from "@/lib/stripe";
import { getConvexClient } from "@/lib/convex";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import baseUrl from "@/lib/baseUrl";
import { auth } from "@clerk/nextjs/server";
import { DURATIONS } from "@/convex/constants";

export type StripeCheckoutMetaData = {
  eventId: Id<"events">;
  userId: string;
  waitingListId: Id<"waitingList">;
};

// Creates a Stripe Checkout session for a ticket purchase.
// This function initiates a Stripe Checkout session for purchasing a ticket to an event.
// It first checks if the user is authenticated, then retrieves the event and waiting list details.
// If the user has a valid ticket offer, a Stripe Checkout session is created for the purchase.
// The session will allow the user to pay for the ticket, and includes metadata with event and user details.
// If any of the required conditions are not met, an error is thrown.
export const createStripeCheckoutSession = async ({
  eventId,
}: {
  eventId: Id<"events">;
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated.");

  // A Convex client that runs queries and mutations over HTTP.
  const convex = getConvexClient();

  // Get event details
  const event = await convex.query(api.events.getById, { eventId });
  if (!event) {
    throw new Error("Event not found.");
  }

  // Get waiting list entry
  const queuePosition = await convex.query(api.waitingList.getQueuePosition, {
    eventId,
    userId,
  });

  if (!queuePosition || queuePosition.status !== "offered") {
    throw new Error("No valid ticket offer found.");
  }

  // Find event owner Stripe Connect ID
  const stripeConnectId = await convex.query(
    api.users.getUsersStripeConnectId,
    {
      userId: event.userId,
    },
  );

  if (!stripeConnectId) {
    throw new Error("Stripe Connect ID not found for owner of the event!");
  }

  if (!queuePosition.offerExpiresAt) {
    throw new Error("Ticket offer has no expiration date.");
  }

  const metadata: StripeCheckoutMetaData = {
    eventId,
    userId,
    waitingListId: queuePosition._id,
  };

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create(
    {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: event.name,
              description: event.description,
            },
            unit_amount: Math.round(event.price * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: Math.round(event.price * 100 * 0.01), // 1% fee
      },
      expires_at: Math.floor(Date.now() / 1000) + DURATIONS.TICKET_OFFER / 1000, // 30 minutes (stripe checkout minimum expiration time)
      mode: "payment",
      success_url: `${baseUrl}/tickets/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/event/${eventId}`,
      metadata,
    },
    {
      stripeAccount: stripeConnectId, // Stripe Connect ID for the event owner
    },
  );

  return { sessionId: session.id, sessionUrl: session.url };
};
