import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, Checkbox, TableBody } from '@mui/material';
import PaperRow from './PaperRow';
import { ResearchPaper } from '../utils/types/research';

interface PaperTableProps {
  papers: ResearchPaper[];
  toggleAllSelection: (checked: boolean) => void;
  toggleSelection: (id: string) => void;
}

export default function PaperTable({ papers, toggleAllSelection, toggleSelection }: PaperTableProps) {
  const allSelected = papers.every(p => p.selected);
  const someSelected = papers.some(p => p.selected && !allSelected);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={someSelected}
                checked={allSelected}
                onChange={(e) => toggleAllSelection(e.target.checked)}
              />
            </TableCell>
            <TableCell>PAPER</TableCell>
            <TableCell>SUMMARY</TableCell>
            <TableCell align="center">ACTIONS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {papers.map((paper, index) => (
            <PaperRow 
              key={paper.id}
              paper={paper}
              onToggle={() => toggleSelection(paper.id)}
              animationDelay={index}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
