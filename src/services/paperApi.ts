// src/services/papersApi.ts
import api from "./api";
import {
  PaperSearchQuery,
  PaperSearchResponse,
  PaperStatusResponse,
  ApiError,
} from "../utils/types/apiTypes";

export const searchPapers = async (
  query: string
): Promise<PaperSearchResponse> => {
  try {
    const response = await api.post("/papers/search", {
      query,
    } as PaperSearchQuery);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const getPaperStatus = async (
  paperDbId: number
): Promise<PaperStatusResponse> => {
  try {
    const response = await api.get(`/papers/${paperDbId}/status`);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const triggerPaperProcessing = async (
  paperDbId: number
): Promise<{ msg: string }> => {
  try {
    const response = await api.post(`/papers/${paperDbId}/process-manual`);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
