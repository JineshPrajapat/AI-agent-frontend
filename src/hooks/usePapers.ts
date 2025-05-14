import { useState } from 'react';
import { ResearchPaper } from '../utils/types/research';
import { searchPapers } from '@/services/paperApi';
// import { INITIAL_DATA } from '@/data/samplePapers';
// hooks/usePapers.ts

export function usePapers() {
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(true);
  const [summary, setSummary] = useState<string>('');

  const search = async (query: string) => {
    setLoading(true);
    try {
      const searchResults =  await searchPapers(query) ;
      // Map the API response to ResearchPaper type
      const mappedPapers = searchResults.papers.map((paper, _index) => ({
        id: paper.paper_id,
        title: paper.title,
        authors: paper.authors.join(', '),
        abstract: paper.abstract,
        summary: paper.individual_summary,
        publishedDate: paper.published,
        pdfUrl: paper.pdf_url,
        selected: false,
        source: paper.source,
        tags: [] // You can add tags from the consolidated_summary if needed
      }));

      setPapers(mappedPapers);
      setSearchPerformed(true);
      
      // Create summary from the consolidated_summary
      setSummary(searchResults?.consolidated_summary);
      
    } catch (error) {
      console.error('Search failed:', error);
      setPapers([]);
      setSummary('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (id: string) =>
    setPapers(prev => prev.map(p => p.id === id ? { ...p, selected: !p.selected } : p));

  const toggleAllSelection = (checked: boolean) =>
    setPapers(prev => prev.map(p => ({ ...p, selected: checked })));

  return {
    papers,
    loading,
    searchPerformed,
    summary,
    search,
    toggleSelection,
    toggleAllSelection,
    selectedCount: papers?.filter(p => p.selected).length ?? 0,
  };
}