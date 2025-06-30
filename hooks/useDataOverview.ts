import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// API call
const getTodos = async () => {
  const res = await axiosInstance.get("/data-overview");
  console.log(res);
  return res.data.data;
};

// Hook with cache and stale time
export default function useDataOverview() {
  return useQuery({
    queryKey: ["all-data"],
    queryFn: getTodos,
    staleTime: 5 * 60 * 1000, // 5 minutes - avoids refetching if data is still fresh   
    refetchOnWindowFocus: false, // optional: avoid refetching when window regains focus
  });
}


const getAllUers = async () => {
  const res = await axiosInstance.get("/get-active-users");
  console.log(res);
  return res.data.data;
};

// Hook with cache and stale time
export function useGetAllUsers() {
  return useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUers,
    staleTime: 5 * 60 * 1000, // 5 minutes - avoids refetching if data is still fresh   
    refetchOnWindowFocus: false, // optional: avoid refetching when window regains focus
  });
}

const blockUser = async (id: string) => {
  const res = await axiosInstance.put(`/block-user/${id}`);
  console.log(res);
  return res.data.data;
};

// Hook with cache and stale time
export function useBlockUser() {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blockUser,
     onSuccess: () => {
      // Refresh the list of users
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
}

const unblockUser = async (id: string) => {
  const res = await axiosInstance.put(`/unblock-user/${id}`);
  console.log(res);
  return res.data.data;
};

// Hook with cache and stale time
export function useUnblockUser() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: unblockUser,
    onSuccess: () => {
      // Refresh the list of users
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
    },
  });
}