import postsApi from "apis/posts";
import { useMutation, useQuery } from "reactquery";
import queryClient from "utils/queryClient";

export const useFetchPosts = ({ categories, status, title }) =>
  useQuery({
    queryKey: ["posts", categories, title, status],
    queryFn: () => postsApi.fetch({ categories, title, status }),
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
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

export const useUpdatePost = slug =>
  useMutation({
    mutationFn: ({ quiet = false, title, status, description, categoryIds }) =>
      postsApi.update({ slug, quiet, title, description, status, categoryIds }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

export const useDeletePost = slug =>
  useMutation({
    mutationFn: ({ quiet = false }) => postsApi.destroy({ slug, quiet }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

export const useUpvotePost = () =>
  useMutation({
    mutationFn: slug => postsApi.upvote(slug),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

export const useDownvotePost = () =>
  useMutation({
    mutationFn: slug => postsApi.downvote(slug),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
