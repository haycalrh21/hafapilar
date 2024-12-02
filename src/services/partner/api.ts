import { PartnerResponse } from "@/app/types/candidate";
import { useQuery } from "@tanstack/react-query";

const api_url = process.env.NEXT_PUBLIC_API_URL;

// Fetch data users dari API
const fetchPartner = async (
  page: number,
  limit: number
): Promise<PartnerResponse> => {
  const response = await fetch(`${api_url}/partner`);
  if (!response.ok) {
    throw new Error("Failed to fetch candidates");
  }
  const data = await response.json();
  // console.log(data)
  // Log untuk cek data yang diterima
  // console.log("Data API:", data);
  return data;
};

// Menggunakan React Query untuk fetch data
export const getDataPartner = (page: number, limit: number) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["partner", page, limit],
    queryFn: async () => {
      const response = await fetchPartner(page, limit);
      return response;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 2,
  });

  const dataPartner = data?.data || []; // Data kandidat
  const totalCount = data?.totalCount || 0; // Total count dari API
  const totalPages = data?.totalPages || 0; // Total halaman dari API

  return {
    dataPartner,
    isLoading,
    error,
    refetch,
    totalCount,
    totalPages,
  };
};
