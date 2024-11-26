import { getGreeting } from "./greetings/get-greetings.action";
import { getPostsLikes } from "./posts/get-post-likes.action";
import { updatePostLikes } from "./posts/update-likes.action";

export const server = {
  getGreeting,
  getPostsLikes,
  updatePostLikes
}


