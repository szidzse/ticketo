import { query } from "@/convex/_generated/server";
import { v } from "convex/values";
import { TICKET_STATUS, WAITING_LIST_STATUS } from "@/convex/constants";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("is_cancelled"), undefined))
      .collect();
  },
});

export const getById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    return await ctx.db.get(eventId);
  },
});

// This function calculates and returns the ticket availability for a specific event.
// For example, if there are ten tickets in total for an event,
// eight have already been purchased and two have been offered, then the event will not be available.
export const getEventAvailability = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, { eventId }) => {
    const event = await ctx.db.get(eventId);

    if (!event) {
      throw new Error("Event not found.");
    }

    // Count total purchased tickets for an event
    const purchasedCount = await ctx.db
      .query("tickets")
      .withIndex("by_event", (q) => q.eq("eventId", eventId))
      .collect()
      .then(
        (tickets) =>
          tickets.filter(
            (ticket) =>
              ticket.status === TICKET_STATUS.VALID ||
              ticket.status === TICKET_STATUS.USED,
          ).length,
      );

    // Current time
    const now = Date.now();

    // Count current valid offers for an event
    const activeOffers = await ctx.db
      .query("waitingList")
      .withIndex("by_event_status", (q) =>
        q.eq("eventId", eventId).eq("status", WAITING_LIST_STATUS.OFFERED),
      )
      .collect()
      .then(
        (entries) =>
          entries.filter((e) => (e.offerExpiresAt ?? 0) > now).length,
      );

    const totalReserved = purchasedCount + activeOffers;

    return {
      isSoldOut: totalReserved >= event.totalTickets,
      totalTickets: event.totalTickets,
      purchasedCount,
      activeOffers,
      remainingTickets: Math.max(0, event.totalTickets - totalReserved),
    };
  },
});
