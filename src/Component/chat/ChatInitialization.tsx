import React, { useState, useEffect } from "react";
import { triggerPaperProcessing } from "../../services/paperApi";
import { getPaperStatus } from "../../services/paperApi";
import { ApiError, SelectedPaper } from "../../utils/types/apiTypes"

interface ChatInitializationProps {
  selectedPapers: SelectedPaper[];
  onChatStart: (paperIds: number[]) => void;
}

const ChatInitialization: React.FC<ChatInitializationProps> = ({
  selectedPapers,
  onChatStart,
}) => {
  const [processingStates, setProcessingStates] = useState<
    Record<number, string>
  >({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [allReady, setAllReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check initial processing status
    const checkProcessingStatus = async () => {
      const states: Record<number, string> = {};
      let allProcessed = true;

      for (const paper of selectedPapers) {
        try {
          if (!paper.is_processed_for_chat) {
            allProcessed = false;
            states[paper.db_id] = "Not processed";
          } else {
            states[paper.db_id] = "Ready for chat";
          }
        } catch (err) {
          const error = err as ApiError;
          states[paper.db_id] = "Status check failed";
          allProcessed = false;
          console.error(`Error checking paper ${paper.db_id}:`, error.message);
        }
      }

      setProcessingStates(states);
      setAllReady(allProcessed);
    };

    checkProcessingStatus();
  }, [selectedPapers]);

  const processPaper = async (paperId: number) => {
    setIsProcessing(true);
    setError(null);

    try {
      setProcessingStates((prev) => ({
        ...prev,
        [paperId]: "Processing started",
      }));

      await triggerPaperProcessing(paperId);

      // Poll for status updates
      let isReady = false;
      let attempts = 0;
      const maxAttempts = 10; // Prevent infinite loops

      while (!isReady && attempts < maxAttempts) {
        attempts++;
        try {
          const status = await getPaperStatus(paperId);
          setProcessingStates((prev) => ({
            ...prev,
            [paperId]: status.processing_status_notes || "Processing",
          }));

          if (status.is_ready_for_chat) {
            isReady = true;
            setProcessingStates((prev) => ({
              ...prev,
              [paperId]: "Ready for chat",
            }));
          } else {
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        } catch (err) {
          const error = err as ApiError;
          setProcessingStates((prev) => ({
            ...prev,
            [paperId]: `Error: ${error.message || "Status check failed"}`,
          }));
          break;
        }
      }

      if (!isReady) {
        setProcessingStates((prev) => ({
          ...prev,
          [paperId]: "Processing timeout",
        }));
      }
    } catch (err) {
      const error = err as ApiError;
      setProcessingStates((prev) => ({
        ...prev,
        [paperId]: `Failed: ${error.message || "Processing error"}`,
      }));
      setError(`Failed to process paper ${paperId}: ${error.message}`);
      console.error("Processing error:", error);
    } finally {
      setIsProcessing(false);
      checkAllReady();
    }
  };

  const checkAllReady = () => {
    const allReadyNow = selectedPapers.every(
      (paper) => processingStates[paper.db_id] === "Ready for chat"
    );
    setAllReady(allReadyNow);
  };

  const handleStartChat = () => {
    onChatStart(selectedPapers.map((p) => p.db_id));
  };

  return (
    <div className="chat-init-container">
      <h2>Chat Preparation</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="paper-status-list">
        {selectedPapers.map((paper) => (
          <div key={paper.db_id} className="paper-status">
            <div className="paper-title">{paper.title}</div>
            <div
              className={`status ${
                processingStates[paper.db_id]?.includes("Ready") ? "ready" : ""
              }`}
            >
              {processingStates[paper.db_id] || "Checking status..."}
            </div>
            {!paper.is_processed_for_chat && (
              <button
                onClick={() => processPaper(paper.db_id)}
                disabled={
                  isProcessing || processingStates[paper.db_id] === "Processing"
                }
              >
                {processingStates[paper.db_id] === "Processing"
                  ? "Processing..."
                  : "Process Paper"}
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleStartChat}
        disabled={!allReady || isProcessing}
        className="start-chat-button"
      >
        Start Chat Session
      </button>
    </div>
  );
};

export default ChatInitialization;
