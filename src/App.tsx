import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RepoList from "./components/RepoList.tsx";
import SearchBar from "./components/SearchBar.tsx";

const App= () => {

    const [username, setUsername] = useState("");

    return (
        <Provider store={store}>
            <div className="w-[80%] lg:w-[50%] mx-auto py-4">
                <h1 className="text-2xl font-bold mb-4">GitHub Репозитории</h1>
                <SearchBar onSearch={setUsername} />
                {username && <RepoList />}
            </div>
        </Provider>
    );
};

export default App;
