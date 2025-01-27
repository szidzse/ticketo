"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useStorageUrl } from "@/lib/utils";

const Ticket = ({ ticketId }: { ticketId: Id<"tickets"> }) => {
  const ticket = useQuery(api.tickets.getTicketWithDetails, { ticketId });
  const user = useQuery(api.users.getUserById, {
    userId: ticket?.userId ?? "",
  });
  const imageUrl = useStorageUrl(ticket?.event?.imageStorageId);

  return <div>Ticket</div>;
};

export default Ticket;
