import { Tag } from "neetoui";

import Entry from "./Entry";

export const createPostEntries = posts =>
  posts.map(post => <Entry key={post.slug} {...post} />);

export const createCategoryTags = categories =>
  categories.map(category => (
    <Tag
      className="scale-95 bg-black text-white"
      key={category}
      label={category}
      size="small"
      style="secondary"
      type="solid"
    />
  ));
