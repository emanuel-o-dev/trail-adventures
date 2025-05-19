export interface ITrailFull {
  id?: number;
  name: string;
  difficulty: string;
  duration: string;
  terrain: string;
  distance: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  image: string;
  description: string;
  location: string;
  createdAt?: string;
  updatedAt?: string;
}
