import postsApi from "apis/posts";
import { useQuery } from "react-query";

export const useFetchPosts = () =>
  useQuery({
    queryFn: () => postsApi.fetch(),
  });

export const useShowPost = ({ slug }) =>
  useQuery({
    queryKey: [slug],
    queryFn: () => postsApi.show({ slug }),
  });
