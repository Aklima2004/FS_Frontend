export interface RepositoryOwner {
  login: string;
  avatar_url: string;
}

export interface Repository {
  id: number;
  full_name: string;
  html_url: string;
  stargazers_count: number;
  description: string | null;
  owner: RepositoryOwner;
}

export interface SearchResponse {
  total_count: number;
  items: Repository[];
}
