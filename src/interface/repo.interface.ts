export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    updated_at: string;
}

export interface ReposState {
    repos: Repo[];
    isLoading: boolean;
    error: string | null;
    page: number;
    user: string;
}

export interface SearchBarProps {
    onSearch: (username: string) => void;
}