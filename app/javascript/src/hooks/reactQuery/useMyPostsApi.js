import { useMutation, useQuery } from "@tanstack/react-query";
import myPostsApi from "apis/myPosts";
import queryClient from "utils/queryClient";

export const useFetchPosts = ({ categories, status, title }) =>
  useQuery({
    queryKey: ["posts", categories, title, status],
    queryFn: () => myPostsApi.fetch({ categories, title, status }),
    staleTime: 0,
    cacheTime: 0,
  });

export const useUpdateBulkPosts = () =>
  useMutation({
    mutationFn: ({ slugs, status }) => myPostsApi.updateBulk({ slugs, status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });

export const useDeleteBulkPosts = () =>
  useMutation({
    mutationFn: slugs => myPostsApi.destroyBulk(slugs),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["posts"] }),
  });
