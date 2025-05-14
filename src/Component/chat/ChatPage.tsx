import React from "react";
import { useParams, useLocation } from "react-router-dom";
import ChatInterface from "./ChatInterface";

const ChatPage = () => {
  const { sessionId } = useParams();
  const location = useLocation();
  const paperIds = location.state?.paperIds || [];

  return (
    <div className="chat-page">
      <ChatInterface
        paperIds={paperIds.map(Number)}
        sessionId={Number(sessionId)}
      />
    </div>
  );
};

export default ChatPage;
