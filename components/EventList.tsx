"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Spinner from "@/components/Spinner";

const EventList = () => {
  const events = useQuery(api.events.get);

  if (!events) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <div>event list</div>;
};

export default EventList;
