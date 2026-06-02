import postsApi from "apis/posts";
import { useMutation, useQuery } from "reactquery";

export const useFetchPosts = ({ categories = [] }) =>
  useQuery({
    queryKey: ["posts", categories],
    queryFn: () => postsApi.fetch({ categories }),
    staleTime: 0,
    cacheTime: 0,
  });

export const useShowPost = ({ slug }) =>
  useQuery({
    queryKey: [slug],
    queryFn: () => postsApi.show(slug),
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: ({ title, description, category_ids }) =>
      postsApi.create({ title, description, category_ids }),
  });
