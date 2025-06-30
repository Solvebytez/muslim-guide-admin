import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetPendingTable=()=>{
    return useQuery({
        queryKey: ['pendingTable'],
        queryFn: async () => {
            const response = await axiosInstance.get('/pending-restaureants')
            return response.data.data
        },
        staleTime: 5 * 60 * 1000, // 5 minutes - avoids refetching if data is still fresh   
        refetchOnWindowFocus: false, // optional: avoid refetching when window regains focus
      })
}


const approveRestrurent = async (id: string) => {
  const res = await axiosInstance.put(`/approve-restaurant/${id}`);
  console.log(res);
  return res.data.data;
};

// Hook with cache and stale time
export function useApproveResturent() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveRestrurent,
    onSuccess: () => {
      // Refresh the list of users
      queryClient.invalidateQueries({ queryKey: ["pendingTable"] });
      queryClient.invalidateQueries({ queryKey: ["approvedTable"] });
      queryClient.invalidateQueries({ queryKey: ["rejectedTable"] });
    },
  });
}

const rejectResturent = async (id: string) => {
  const res = await axiosInstance.put(`/restaurant-reject/${id}`);
  console.log(res);
  return res.data.data;
};

// Hook with cache and stale time
export function useRejectResturent() {
   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectResturent,
    onSuccess: () => {
      // Refresh the list of users
      queryClient.invalidateQueries({ queryKey: ["approvedTable"] });     
      queryClient.invalidateQueries({ queryKey: ["rejectedTable"] });
    },
  });
}





export const useGetApprovedTable=()=>{
    return useQuery({
        queryKey: ['approvedTable'],
        queryFn: async () => {
            const response = await axiosInstance.get('/all-approved-restaureants')
            return response.data.data
        },
        staleTime: 5 * 60 * 1000, // 5 minutes - avoids refetching if data is still fresh   
        refetchOnWindowFocus: false, // optional: avoid refetching when window regains focus
      })
}


export const useGetRejectedTable=()=>{
    return useQuery({
        queryKey: ['rejectedTable'],
        queryFn: async () => {
            const response = await axiosInstance.get('/all-rejected-restaureants')
            return response.data.data
        },
        staleTime: 5 * 60 * 1000, // 5 minutes - avoids refetching if data is still fresh   
        refetchOnWindowFocus: false, // optional: avoid refetching when window regains focus
      })
}


export const useDeleteResturent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete(`/delete-restaurant/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      // Refresh the list of users    
      queryClient.invalidateQueries({ queryKey: ["rejectedTable"] });
    },
  });
};