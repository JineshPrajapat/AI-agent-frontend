import { Paper, Typography, Box, Grow } from '@mui/material';

interface SummaryProps {
  sentences: string[];
}

export default function Summary({ sentences }: SummaryProps) {
  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Summary</Typography>
      {sentences.map((s, i) => (
        <Grow in key={i} timeout={(i + 1) * 300}>
          <Box component="p" mb={0.5}>{s}</Box>
        </Grow>
      ))}
    </Paper>
  );
}
