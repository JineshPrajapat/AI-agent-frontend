import { useState } from "react";

export const usePapers = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [summary, setSummary] = useState([]);
  const [selectedPapersMap] = useState(new Map()); // Use a Map for efficient lookups
  const [selectedCount, setSelectedCount] = useState(0);

  const search = async (query) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        {
          id: "1",
          title: "Paper 1",
          authors: ["Author A", "Co-author 1"],
          abstract: "Abstract 1...",
          year: 2023,
          publisher: "Publisher X",
          summary: "Summary 1",
          tags: ["AI", "ML"],
        },
        {
          id: "2",
          title: "Paper 2",
          authors: ["Author B"],
          abstract: "Abstract 2...",
          year: 2024,
          publisher: "Publisher Y",
          summary: "Summary 2",
          tags: ["Data Science", "Statistics"],
        },
        {
          id: "3",
          title: "Paper 3",
          authors: ["Author C", "Co-author 2", "Co-author 3"],
          abstract: "Abstract 3...",
          year: 2022,
          publisher: "Publisher Z",
          summary: "Summary 3",
          tags: ["NLP", "Deep Learning"],
        },
      ];
      // Initialize isSelected to false for all papers on search
      const resultsWithSelection = mockResults.map((paper) => ({
        ...paper,
        isSelected: false,
      }));
      setPapers(resultsWithSelection);
      setSummary(["This is a summary of the search results."]);
      setSearchPerformed(true);
      setLoading(false);
      selectedPapersMap.clear();
      setSelectedCount(0);
    }, 1000);
  };

  const toggleSelection = (paperId, paper) => {
    const isSelected = selectedPapersMap.has(paperId);
    const updatedPapers = papers.map((p) =>
      p.id === paperId ? { ...p, isSelected: !isSelected } : p
    );
    setPapers(updatedPapers);

    if (isSelected) {
      selectedPapersMap.delete(paperId);
      setSelectedCount((prevCount) => prevCount - 1);
    } else {
      selectedPapersMap.set(paperId, paper);
      setSelectedCount((prevCount) => prevCount + 1);
    }
  };

  const toggleAllSelection = (selectAll) => {
    const updatedPapers = papers.map((p) => ({ ...p, isSelected: selectAll }));
    setPapers(updatedPapers);

    selectedPapersMap.clear();
    if (selectAll) {
      papers.forEach((paper) => selectedPapersMap.set(paper.id, paper));
      setSelectedCount(papers.length);
    } else {
      setSelectedCount(0);
    }
  };

  // Derive the selected papers array from the map
  const selectedPapers = Array.from(selectedPapersMap.values());

  return {
    papers,
    loading,
    search,
    summary,
    searchPerformed,
    toggleSelection,
    toggleAllSelection,
    selectedCount,
    selectedPapers, // Expose the selected papers
  };
};
