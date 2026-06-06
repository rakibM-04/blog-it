import { QueryClient } from "reactquery";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: 3_600_000,
    },
  },
});

export default queryClient;
