// // src/components/Chat/ChatInterface.tsx
import React, { useState } from "react";
// import { chatWithPapers } from "../../services/ragApi";
import { ApiError, ChatMessage } from "../../utils/types/apiTypes";
import { chatWithPapers } from "../../services/ragApi";

interface ChatInterfaceProps {
  paperIds: number[];
  sessionId: number;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  paperIds,
  sessionId,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now(),
      session_id: sessionId,
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await chatWithPapers(
        input, // query
        paperIds, // selectedPaperIds
        sessionId // chatSessionId
      );

      const assistantMessage: ChatMessage = {
        id: Date.now() + 1,
        session_id: sessionId,
        role: "assistant",
        content: response.response,
        timestamp: new Date().toISOString(),
        sources: response.sources,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const error = err as ApiError;
      setError("Failed to get response. Please try again.");
      console.error("Processing error:", error);
      // Remove the user message if the request failed
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>Chatting with {paperIds.length} papers</h3>
      </div>

      {/* Display error message if exists */}
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.role}`}>
            <div className="message-content">{msg.content}</div>
            {msg.role === "assistant" && msg.sources && (
              <div className="message-sources">
                <h4>Sources:</h4>
                {Object.entries(msg.sources).map(([paperId, source]) => (
                  <div key={paperId} className="source">
                    <h5>{source.title}</h5>
                    <p>{source.text.substring(0, 150)}...</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant loading">Thinking...</div>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the selected papers..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
// import React, { useState, useEffect } from "react";
// import { chatWithPapers } from "../../services/ragApi";
// import { ChatResponse, ChatMessage } from "../../utils/types/apiTypes";

// interface ChatInterfaceProps {
//   paperIds: number[];
//   sessionId: number;
// }

// const ChatInterface: React.FC<ChatInterfaceProps> = ({
//   paperIds,
//   sessionId,
// }) => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Add user message immediately
//     const userMessage: ChatMessage = {
//       id: Date.now(),
//       session_id: sessionId,
//       role: "user",
//       content: input,
//       timestamp: new Date().toISOString(),
//     };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await chatWithPapers({
//         query: input,
//         selected_paper_ids: paperIds,
//         chat_session_id: sessionId,
//       });

//       const assistantMessage: ChatMessage = {
//         id: Date.now() + 1,
//         session_id: sessionId,
//         role: "assistant",
//         content: response.response,
//         timestamp: new Date().toISOString(),
//         sources: response.sources,
//       };
//       setMessages((prev) => [...prev, assistantMessage]);
//     } catch (err) {
//       setError("Failed to get response. Please try again.");
//       // Remove the user message if the request failed
//       setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="chat-interface">
//       <div className="chat-header">
//         <h3>Chatting with {paperIds.length} papers</h3>
//       </div>

//       <div className="chat-messages">
//         {messages.map((msg) => (
//           <div key={msg.id} className={`message ${msg.role}`}>
//             <div className="message-content">{msg.content}</div>
//             {msg.role === "assistant" && msg.sources && (
//               <div className="message-sources">
//                 <h4>Sources:</h4>
//                 {Object.entries(msg.sources).map(([paperId, source]) => (
//                   <div key={paperId} className="source">
//                     <h5>{source.title}</h5>
//                     <p>{source.text.substring(0, 150)}...</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//         {isLoading && (
//           <div className="message assistant loading">Thinking...</div>
//         )}
//       </div>

//       <form onSubmit={handleSendMessage} className="chat-input">
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask about the selected papers..."
//           disabled={isLoading}
//         />
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? "Sending..." : "Send"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ChatInterface;
