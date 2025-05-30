import axios from "axios";
import { useCallback, useState } from "react";
import apiClient from "../utils/apiClient";

export const usePexelsApi = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPhotos = useCallback(
    async (
      query: string,
      page: number = 1,
      filters?: { color?: Colors; orientation?: Orientation }
    ): Promise<Photo[] | null> => {
      if (!query.trim()) return null;

      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<ApiResponse>("/search", {
          params: {
            query,
            page,
            per_page: 30,
            ...(filters?.color &&
              filters.color !== "all" && { color: filters.color }),
            ...(filters?.orientation &&
              filters.orientation !== "all" && {
                orientation: filters.orientation,
              }),
          },
        });
        return response.data.photos;
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || "Failed to fetch photos"
            : "An unknown error occurred"
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { fetchPhotos, isLoading, error };
};
