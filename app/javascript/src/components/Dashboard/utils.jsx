import { Tag } from "neetoui";

import Entry from "./Entry";

export const createPostEntries = posts =>
  posts.map(post => <Entry key={post.id} {...post} />);

export const createCategoryTags = categories =>
  categories.map(category => <Tag key={category} label={category} />);
