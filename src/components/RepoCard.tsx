import { Repo } from "../interface/repo.interface.ts";

interface RepoCardProps {
    repo: Repo
}

const RepoCard = ({ repo }: RepoCardProps) => {
    return (
        <div className="w-full max-w-full p-4 md:p-6 border rounded-lg shadow-md bg-white overflow-hidden">
            <h2 className="text-xl font-bold">{repo.name}</h2>
            <p>{repo.description || "Описание отсутствует"}</p>
            <a href={repo.html_url} target="_blank" className="text-blue-500">
                Открыть репозиторий
            </a>
            <p>⭐ {repo.stargazers_count} | Обновлено: {new Date(repo.updated_at).toLocaleDateString()}</p>
        </div>
    );
};

export default RepoCard;