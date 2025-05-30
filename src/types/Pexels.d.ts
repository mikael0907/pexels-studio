interface Photo {
  id: number;
  name: string;
  width: string;
  height: string;
  photographer: string;
  url: string;
  photographer_url: string;
  avg_color?: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
  };
  liked: boolean;
  alt: string;
}

interface ApiResponse {
  photos: Photo[];
  page: number;
  per_page: number;
  prevPage?: string;
  nextPage?: string;
  totalResults: number;
}

type Orientation = "portrait" | "landscape" | "square" | "all";
type Colors = "red" | "green" | "yellow" | "blue" | "all";
