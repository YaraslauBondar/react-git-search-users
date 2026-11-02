import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchRepos } from "../redux/repo";
import RepoCard from "./RepoCard.tsx";
import Loader from "./Loader.tsx";

const RepoList = () => {
    const dispatch = useAppDispatch();
    const { repos, isLoading, error, page, hasMore, user } = useAppSelector(
        (state) => state.repos
    );

    if (!user) return null;

    const loadMore = () => {
        if (!isLoading) dispatch(fetchRepos({ user, page }));
    };

    if (isLoading && repos.length === 0) return <Loader />;

    if (error && repos.length === 0) {
        return <p role="alert" className="text-red-500">{error}</p>;
    }

    if (repos.length === 0) {
        return <p className="text-gray-500">У пользователя нет публичных репозиториев</p>;
    }

    return (
        <InfiniteScroll
            dataLength={repos.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<Loader />}
        >
            <div className="grid gap-4">
                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
            {error && <p role="alert" className="text-red-500 mt-4">{error}</p>}
        </InfiniteScroll>
    );
};

export default RepoList;
