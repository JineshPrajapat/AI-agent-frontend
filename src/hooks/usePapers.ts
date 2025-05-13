import { useState } from 'react';
import { INITIAL_DATA } from '../data/samplePapers';
import { ResearchPaper } from '../utils/types/research';

export function usePapers() {
  const [papers, setPapers] = useState<ResearchPaper[]>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [summary, setSummary] = useState<string[]>([]);

  const search = async (query: string) => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 1200));
    const updated = INITIAL_DATA.map(p => ({ ...p, selected: false }));
    setPapers(updated);
    setSearchPerformed(true);
    setLoading(false);
    setSummary([
      `Found ${updated.length} papers for "${query}".`,
      `Years range from 2012 to 2016.`,
      `Popular tags include deep learning, computer vision, etc.`,
    ]);
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
    selectedCount: papers.filter(p => p.selected).length,
  };
}
