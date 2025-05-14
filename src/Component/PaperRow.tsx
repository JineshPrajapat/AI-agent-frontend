import {
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Box,
  Chip,
  Button,
  Grow,
} from "@mui/material";
import { Eye, Download } from "lucide-react";
import { ResearchPaper } from "../utils/types/research";

interface PaperRowProps {
  paper: ResearchPaper;
  onToggle: () => void;
  animationDelay: number;
}

export default function PaperRow({
  paper,
  onToggle,
  animationDelay,
}: PaperRowProps) {
  return (
    <Grow in timeout={(animationDelay + 1) * 200}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox checked={paper.selected} onChange={onToggle} />
        </TableCell>
        <TableCell>
          <Typography fontWeight={500}>{paper.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {paper.authors.join(", ")} ({paper.year})
          </Typography>
          <Typography variant="caption" display="block">
            {paper.publisher}
          </Typography>
          <Box mt={1} display="flex" flexWrap="wrap" gap={0.5}>
            {paper.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{paper.summary}</Typography>
        </TableCell>
        <TableCell align="center">
          <Button variant="outlined" startIcon={<Eye size={16} />} fullWidth>
            View
          </Button>
          <Button
            variant="text"
            color="primary"
            startIcon={<Download size={16} />}
            fullWidth
          >
            Download
          </Button>
        </TableCell>
      </TableRow>
    </Grow>
  );
}
