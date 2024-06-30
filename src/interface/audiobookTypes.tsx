
export interface audiobookTypes {
  slug?: string;
  id: number;
  name: string;
  delete?: boolean; // Opsional, bisa ditambahkan atau tidak
  map?: () => void
}

