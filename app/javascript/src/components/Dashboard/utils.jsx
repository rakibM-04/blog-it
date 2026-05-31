import Post from "./Entry";

export const formatDate = dateString => {
  const date = new Date(dateString);

  const day = date.getDate();
  const ordinal = d => {
    const s = ["th", "st", "nd", "rd"];
    const v = d % 100;

    return d + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  const options = { year: "numeric", month: "long" };
  const monthYear = date.toLocaleDateString("en-US", options);

  const [month, year] = monthYear.split(" ");

  return `${month} ${ordinal(day)}, ${year}`;
};

export const createPostEntries = posts =>
  posts.map(post => <Post key={post.id} {...post} />);
