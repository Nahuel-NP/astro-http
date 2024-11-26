
import { defineAction } from "astro:actions"
import { z } from "astro:content"
import { db, eq, Posts } from "astro:db";

export const getPostsLikes = defineAction({
  input: z.string(),
  handler: async (postId) => {
    const [post] = await db.select().from(Posts).where(eq(Posts.id, postId));
    
    if (!post) {
      return { likes: 0 }
    }
    
    return {
      likes: post.likes
    }
  }
})