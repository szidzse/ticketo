"use client";

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useStorageUrl } from "@/lib/utils";
import Spinner from "@/components/Spinner";
import Image from "next/image";

const Ticket = ({ ticketId }: { ticketId: Id<"tickets"> }) => {
  const ticket = useQuery(api.tickets.getTicketWithDetails, { ticketId });
  const user = useQuery(api.users.getUserById, {
    userId: ticket?.userId ?? "",
  });
  const imageUrl = useStorageUrl(ticket?.event?.imageStorageId);

  if (!ticket || !ticket.event || !user) {
    return <Spinner />;
  }

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-xl border ${ticket.event.is_cancelled ? "border-red-200" : "border-gray-100"}`}
    >
      {/* Event Header with Image */}
      <div className="relative">
        {imageUrl && (
          <div className="relative w-full aspect-[21/9] ">
            <Image
              src={imageUrl}
              alt={ticket.event.name}
              fill
              className={`object-cover object-center ${ticket.event.is_cancelled ? "opacity-50" : ""}`}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/90" />
          </div>
        )}
        <div
          className={`px-6 py-4 ${imageUrl ? "absolute bottom-0 left-0 right-0" : ticket.event.is_cancelled ? "bg-red-600" : "bg-blue-600"} `}
        >
          <h2
            className={`text-2xl font-bold ${imageUrl || !imageUrl ? "text-white" : "text-black"}`}
          >
            {ticket.event.name}
          </h2>
          {ticket.event.is_cancelled && (
            <p className="text-red-300 mt-1">This event has been cancelled</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
