/**
 * Author : Dhruv Parthasarathy
 * This file contains the various API calls wrapped around react query's useQuery API
 * 
 * All the queries use the following settings by default
    staleTime: Infinity, // Data never goes stale automatically
    refetchOnWindowFocus: false, // Do not refetch on window focus
    refetchOnReconnect: false, // Do not refetch on reconnect
    refetchOnMount: false, // Do not refetch on mount

   Manually update the options for specific APIs following the documentation
   https://tanstack.com/query/latest/docs/framework/react/reference/useQuery
 */
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "./util";
import userData from "./sample_data.json"
import { User } from "./types";

export const QueryKeyById = {
    useUserData: "userData",
  }

const GetUseQuery = (
  queryKey: string[],
  queryFn: Promise<any[] | undefined>,
  options?: any
) => {
  return useQuery({
    queryKey,
    queryFn: () => queryFn,
    staleTime: options?.staleTime || Infinity, // Data never goes stale automatically
    refetchOnWindowFocus: options?.refetchOnWindowFocus || false, // Do not refetch on window focus
    refetchOnReconnect: options?.refetchOnReconnect || false, // Do not refetch on reconnect
    refetchOnMount: options?.refetchOnMount || false, // Do not refetch on mount
  });
};

/**
 * 
 * @returns 
 */
export const useUserData = () => {
    return GetUseQuery(
      [QueryKeyById.useUserData],
      apiRequest<any[]>({ method: "get", url: "user_data" })
    );
  };
