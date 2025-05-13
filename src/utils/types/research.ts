export interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  publisher: string;
  summary: string;
  tags: string[];
  selected: boolean;
}
