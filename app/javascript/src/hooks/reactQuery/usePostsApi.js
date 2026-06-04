import postsApi from "apis/posts";
import { useMutation, useQuery } from "reactquery";

export const useFetchPosts = (categories = []) =>
  useQuery({
    queryKey: ["posts", categories],
    queryFn: () => postsApi.fetch(categories),
    staleTime: 0,
    cacheTime: 0,
  });

export const useShowPost = ({ slug }) =>
  useQuery({
    queryKey: ["posts", slug],
    queryFn: () => postsApi.show(slug),
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: ({ title, description, categoryIds, status }) =>
      postsApi.create({ title, description, categoryIds, status }),
  });

export const useUpdatePost = () =>
  useMutation({
    mutationFn: ({ slug, title, description, categoryIds }) =>
      postsApi.update({ slug, title, description, categoryIds }),
  });

export const useDeletePost = () =>
  useMutation({
    mutationFn: slug => postsApi.destroy(slug),
  });
