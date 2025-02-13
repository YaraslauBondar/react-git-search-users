import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchRepos } from "../redux/repo";
import InfiniteScroll from "react-infinite-scroll-component";
import RepoCard from "./RepoCard.tsx";
import Loader from "./Loader.tsx";

const RepoList = () => {
    const dispatch = useAppDispatch();

    const { repos, isLoading, error, page, user } = useAppSelector(
        (state) => state.repos
    );

    const loadMore = () => {
        if (user && !isLoading) {
            dispatch(fetchRepos({ user, page }));
        }
    };

    if (isLoading && page === 1) return <Loader />;

    if (error) return <p className="text-red-500">Ошибка загрузки данных: {error}</p>;

    return (
        <InfiniteScroll
            dataLength={repos?.length || 0}
            next={loadMore}
            hasMore={repos?.length >= 20}
            loader={undefined}
        >
            <div className="grid gap-4">
                {repos?.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default RepoList;
