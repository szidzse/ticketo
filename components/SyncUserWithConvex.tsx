"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// This component syncs the currently logged-in user's data from Clerk to Convex database
// Automatically updates or creates the user entry when changes occur
const SyncUserWithConvex = () => {
  const { user } = useUser();

  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!user) return;

    const syncUser = async () => {
      try {
        await updateUser({
          userId: user.id,
          name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
          email: user.emailAddresses[0]?.emailAddress ?? "",
        });
      } catch (error) {
        console.error("Error syncing user: ", error);
      }
    };

    syncUser();
  }, [user, updateUser]);

  return null;
};

export default SyncUserWithConvex;
