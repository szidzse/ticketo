"use client";

import { Id } from "@/convex/_generated/dataModel";

const JoinQueue = ({
  eventId,
  userId,
}: {
  eventId: Id<"events">;
  userId: Id<"users">;
}) => {
  return <div>join queue</div>;
};

export default JoinQueue;
