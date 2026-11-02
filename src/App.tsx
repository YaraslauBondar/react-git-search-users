import { Provider } from "react-redux";
import { store } from "./redux/store";
import RepoList from "./components/RepoList.tsx";
import SearchBar from "./components/SearchBar.tsx";

const App = () => (
    <Provider store={store}>
        <main className="w-[90%] lg:w-[50%] mx-auto py-4">
            <h1 className="text-2xl font-bold mb-4">Поиск репозиториев GitHub</h1>
            <SearchBar />
            <div className="mt-4">
                <RepoList />
            </div>
        </main>
    </Provider>
);

export default App;
