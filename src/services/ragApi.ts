// src/services/ragApi.ts
import api from "./api";
import {
  ChatRequest,
  ChatResponse,
  ChatSession,
  ChatMessagesResponse,
  ApiError,
} from "../utils/types/apiTypes";

export const chatWithPapers = async (
  query: string,
  selectedPaperIds: number[],
  chatSessionId: number | null = null
): Promise<ChatResponse> => {
  try {
    const request: ChatRequest = {
      query,
      selected_paper_ids: selectedPaperIds,
      chat_session_id: chatSessionId,
    };
    const response = await api.post("/rag/chat", request);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const getChatSessions = async (): Promise<ChatSession[]> => {
  try {
    const response = await api.get("/rag/sessions");
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const getChatMessages = async (
  sessionId: number
): Promise<ChatMessagesResponse> => {
  try {
    const response = await api.get(`/rag/sessions/${sessionId}/messages`);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};
