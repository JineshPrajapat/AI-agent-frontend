// src/services/ragApi.ts
import api from "../api/api"
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
        const access_token = localStorage.getItem('accessToken')
        const response = await api.post("/rag/chat", request, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error as ApiError;
    }
};

export const getChatSessions = async (): Promise<ChatSession[]> => {
    try {
        const access_token = localStorage.getItem('accessToken')
        const response = await api.get("/rag/sessions", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error as ApiError;
    }
};

export const getChatMessages = async (
    sessionId: number
): Promise<ChatMessagesResponse> => {
    try {
        const access_token = localStorage.getItem('accessToken')
        const response = await api.get(`/rag/sessions/${sessionId}/messages`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error as ApiError;
    }
};
