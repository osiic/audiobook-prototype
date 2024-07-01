export interface chapterTypes {
  slug?: string;
  id: number;
  title: string;
  script: string;
  audio: string;
  delete?: boolean;
  audiobook_id?: number;
  map?: () => void;
}
