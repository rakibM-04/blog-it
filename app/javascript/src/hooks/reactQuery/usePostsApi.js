import postsApi from "apis/posts";
import { useMutation, useQuery } from "reactquery";

export const useFetchPosts = (categories = []) =>
  useQuery({
    queryKey: ["posts", "fetch", categories],
    queryFn: () => postsApi.fetch(categories),
    staleTime: 0,
    cacheTime: 0,
  });

export const useShowPost = ({ slug }) =>
  useQuery({
    queryKey: ["posts", "show", slug],
    queryFn: () => postsApi.show(slug),
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: ({ title, description, categoryIds }) =>
      postsApi.create({ title, description, categoryIds }),
  });

export const useUpdatePost = () =>
  useMutation({
    mutationFn: ({ slug, title, description, categoryIds }) =>
      postsApi.update({ slug, title, description, categoryIds }),
  });
