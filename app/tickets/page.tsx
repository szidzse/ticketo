"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const MyTicketsPage = () => {
  const { user } = useUser();

  const tickets = useQuery(api.events.getUserTickets, {
    userId: user?.id ?? "",
  });

  if (!tickets) {
    return null;
  }

  const validTickets = tickets.filter((ticket) => ticket.status === "valid");
  const otherTickets = tickets.filter((ticket) => ticket.status !== "valid");

  const upcomingTickets = validTickets.filter(
    (ticket) => ticket.event && ticket.event.eventDate > Date.now(),
  );
  const pastTickets = validTickets.filter(
    (ticket) => ticket.event && ticket.event.eventDate <= Date.now(),
  );

  return <div>my tickets</div>;
};

export default MyTicketsPage;
