import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@mui/material";

const PaperTable = ({ papers, toggleSelection, toggleAllSelection }) => {
  const handleCheckboxChange = (event, paper) => {
    toggleSelection(paper.id, paper);
  };

  const handleSelectAllClick = (event) => {
    toggleAllSelection(event.target.checked);
  };

  const allSelected = papers.every((paper) => paper.isSelected);
  const isSomeSelected = papers.some((paper) => paper.isSelected);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={isSomeSelected && !allSelected}
                checked={allSelected}
                onChange={handleSelectAllClick}
              />
            </TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Authors</TableCell>
            <TableCell>Abstract</TableCell>
            {/* Add more headers based on your ResearchPaper interface if needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {papers.map((paper) => (
            <TableRow
              key={paper.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              style={{
                backgroundColor: paper.isSelected ? "#f0f8ff" : "white",
              }} // Example visual feedback
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={paper.isSelected || false}
                  onChange={(event) => handleCheckboxChange(event, paper)}
                />
              </TableCell>
              <TableCell>{paper.title}</TableCell>
              <TableCell>
                {Array.isArray(paper.authors)
                  ? paper.authors.join(", ")
                  : paper.authors}
              </TableCell>
              <TableCell>{paper.abstract}</TableCell>
              {/* Add more cells based on your ResearchPaper interface if needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaperTable;
