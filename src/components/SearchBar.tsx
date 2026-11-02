import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { fetchRepos, setUser } from "../redux/repo.ts";
import { useAppDispatch } from "../hooks.ts";

const SearchBar = () => {
    const [value, setValue] = useState("");
    const dispatch = useAppDispatch();

    const debouncedSearch = useMemo(
        () =>
            debounce((query: string) => {
                dispatch(setUser(query));
                if (query) dispatch(fetchRepos({ user: query, page: 1 }));
            }, 500),
        [dispatch]
    );

    useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        debouncedSearch(e.target.value.trim());
    };

    return (
        <input
            type="search"
            value={value}
            onChange={handleChange}
            aria-label="Имя пользователя GitHub"
            className="w-full p-2 border rounded"
            placeholder="Введите имя пользователя GitHub"
            autoFocus
        />
    );
};

export default SearchBar;
