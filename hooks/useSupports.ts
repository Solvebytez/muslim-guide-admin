import axiosInstance from "@/lib/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetSupports = () => {
    return useQuery({
        queryKey: ["supports"],
        queryFn: async () => {
            const response = await axiosInstance.get("/all-support-ticket");
            return response.data.data;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes - avoids refetching if data is still fresh
        refetchOnWindowFocus: false, // optional: avoid refetching when window regains focus
    });
};