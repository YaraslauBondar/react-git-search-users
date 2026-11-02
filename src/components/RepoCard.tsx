import { Repo } from "../interface/repo.interface.ts";

interface RepoCardProps {
    repo: Repo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
    return (
        <div className="w-full max-w-full p-4 md:p-6 border rounded-lg shadow-md bg-white overflow-hidden">
            <h2 className="text-xl font-bold break-words">{repo.name}</h2>
            <p className="my-1">{repo.description || "Описание отсутствует"}</p>
            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
            >
                Открыть репозиторий
            </a>
            <p className="mt-2 text-sm text-gray-600">
                ⭐ {repo.stargazers_count} · 🍴 {repo.forks_count}
                {repo.language && ` · ${repo.language}`} · Обновлено:{" "}
                {new Date(repo.updated_at).toLocaleDateString("ru-RU")}
            </p>
        </div>
    );
};

export default RepoCard;
