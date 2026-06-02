import postsApi from "apis/posts";
import { useMutation, useQuery } from "reactquery";

export const useFetchPosts = () =>
  useQuery({
    queryFn: () => postsApi.fetch(),
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
