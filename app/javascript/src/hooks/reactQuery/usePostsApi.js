import postsApi from "apis/posts";
import { useMutation, useQuery } from "reactquery";

export const useFetchPosts = ({ personal = false, categories = [] }) =>
  useQuery({
    queryKey: ["posts", categories, personal],
    queryFn: () => postsApi.fetch({ categories, personal }),
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
    mutationFn: ({
      slug,
      quiet = false,
      title,
      status,
      description,
      categoryIds,
    }) =>
      postsApi.update({ slug, quiet, title, description, status, categoryIds }),
  });

export const useDeletePost = () =>
  useMutation({
    mutationFn: ({ slug, quiet = false }) => postsApi.destroy({ slug, quiet }),
  });
