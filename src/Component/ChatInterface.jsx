// Component/ChatInterface.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Paper,
  Divider,
  Avatar,
} from "@mui/material";
import { Send, X } from "lucide-react";

const CHAT_HISTORY_KEY = "researchChatHistory";

const ChatInterface = ({ selectedPapers, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      setMessages(JSON.parse(storedHistory));
    } else if (selectedPapers && selectedPapers.length > 0) {
      const paperDetails = selectedPapers
        .map((paper) =>
          Object.entries(paper)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")
        )
        .join("\n\n---\n\n");

      setMessages([
        {
          sender: "system",
          text: `Now you can do deep research on the following selected papers:\n\n${paperDetails}`,
        },
      ]);
    } else {
      setMessages([
        {
          sender: "system",
          text: "No papers selected. Please select papers to start a focused chat.",
        },
      ]);
    }
  }, [selectedPapers]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { sender: "user", text: newMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          sender: "ai",
          text: `This is a simulated response to your question: "${newMessage}" based on the selected papers.`,
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 500);
      setNewMessage("");
    }
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      bgcolor="rgba(0, 0, 0, 0.5)"
      zIndex={1301}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Paper
        sx={{
          width: "70%",
          maxHeight: "80%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            bgcolor: "#f4f6f8",
          }}
        >
          <Typography variant="h6">Research Chat</Typography>
          <IconButton onClick={onClose}>
            <X />
          </IconButton>
        </Box>
        <Divider />
        <Box
          ref={chatContainerRef}
          sx={{
            p: 2,
            flexGrow: 1, // Allows the message area to take up remaining vertical space
            overflowY: "auto",
          }}
        >
          <List>
            {messages.map((message, index) => (
              <ListItem
                key={index}
                alignItems="flex-start"
                sx={{
                  flexDirection:
                    message.sender === "user" ? "row-reverse" : "row",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:
                      message.sender === "user" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Avatar
                    sx={{
                      mr: message.sender === "user" ? 0 : 1,
                      ml: message.sender === "user" ? 1 : 0,
                      bgcolor:
                        message.sender === "system"
                          ? "grey"
                          : message.sender === "user"
                          ? "primary.main"
                          : "secondary.main",
                    }}
                  >
                    {message.sender.charAt(0).toUpperCase()}
                  </Avatar>
                  <Paper
                    sx={{
                      p: 1.5,
                      borderRadius: "8px",
                      maxWidth: "70%",
                      wordBreak: "break-word",
                      bgcolor:
                        message.sender === "system"
                          ? "#f0f0f0"
                          : message.sender === "user"
                          ? "#e3f2fd"
                          : "#fce4ec",
                      color:
                        message.sender === "system"
                          ? "text.secondary"
                          : "text.primary",
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {message.sender === "system"
                        ? "System"
                        : message.sender === "user"
                        ? "You"
                        : "AI"}
                    </Typography>
                  </Paper>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
        <Box p={2} display="flex" alignItems="center">
          <TextField
            fullWidth
            label="Ask a question..."
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSendMessage} color="primary">
                    <Send />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatInterface;
