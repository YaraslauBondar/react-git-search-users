import { useCallback, useState } from "react";
import { fetchRepos, setUser } from "../redux/repo.ts";
import { useAppDispatch } from "../hooks.ts";
import debounce from "lodash.debounce";
import { SearchBarProps } from "../interface/repo.interface.ts";


const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [value, setValue] = useState("");

    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onSearch(e.target.value);
        debouncedSearch(e.target.value);
    };

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            if (value) {
                dispatch(setUser(value));
                dispatch(fetchRepos({ user: value, page: 1 }));
            }
        }, 500),
        [dispatch]
    );

    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Введите имя пользователя GitHub"
        />
    );
};

export default SearchBar;
