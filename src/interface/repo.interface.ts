export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
}

export interface ReposState {
    repos: Repo[];
    isLoading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
    user: string;
}
