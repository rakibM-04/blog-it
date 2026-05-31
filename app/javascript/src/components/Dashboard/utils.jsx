import Post from "./Entry";

export const createPostEntries = posts =>
  posts.map(post => <Post key={post.id} {...post} />);
