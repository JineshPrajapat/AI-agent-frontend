import React from "react";
import { Paper, Typography, Box } from "@mui/material";

const Summary = ({ sentences }) => {
  if (!sentences || sentences.length === 0) {
    return null;
  }
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Summary
      </Typography>
      {sentences.map((sentence, index) => (
        <Typography key={index} paragraph>
          {sentence}
        </Typography>
      ))}
    </Paper>
  );
};

export default Summary;
