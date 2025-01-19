"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const EventList = () => {
  const events = useQuery(api.events.get);

  console.log(events);

  return <div>event list</div>;
};

export default EventList;
