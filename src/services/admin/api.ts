import { ApiBaseResponse } from "@/app/types/candidate";
import { useQuery } from "@tanstack/react-query";

const api_url = process.env.NEXT_PUBLIC_API_URL;

// Fetch data users dari API
const fetchUser = async (): Promise<ApiBaseResponse> => {
  const response = await fetch(api_url + "/auth/all");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();

  return data;
};

// Menggunakan React Query untuk fetch data
export const getDataAdmin = () => {
  const { data, error, isLoading, refetch } = useQuery<ApiBaseResponse, Error>({
    queryKey: ["candidate"],
    queryFn: fetchUser,
    // Atur cache time, stale time, dan refetch behavior
    staleTime: 1000 * 60 * 5,

    refetchOnWindowFocus: false,
    retry: 2,
  });

  // Cek data?.users langsung
  const dataUser = data?.users || []; // Ambil data.users langsung

  return {
    dataUser, // dataUser berisi array users jika data tersedia
    isLoading,
    error,
    refetch,
  };
};
