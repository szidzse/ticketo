import { mutation, query } from "@/convex/_generated/server";
import { v } from "convex/values";

// Retrieves a public URL for accessing a file stored in Convex Storage.
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});

// Generates a signed upload URL for uploading files to Convex Storage.
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Updates an event's image with a new storage ID or removes it if null.
export const updateEventImage = mutation({
  args: {
    eventId: v.id("events"),
    storageId: v.union(v.id("_storage"), v.null()),
  },
  handler: async (ctx, { eventId, storageId }) => {
    await ctx.db.patch(eventId, {
      imageStorageId: storageId ?? undefined,
    });
  },
});

// Deletes a file from Convex Storage by its storage ID.
export const deleteImage = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, { storageId }) => {
    await ctx.storage.delete(storageId);
  },
});
