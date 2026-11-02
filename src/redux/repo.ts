import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "axios";
import { Repo, ReposState } from "../interface/repo.interface.ts";

export const PER_PAGE = 20;

const initialState: ReposState = {
    repos: [],
    isLoading: false,
    error: null,
    page: 1,
    hasMore: false,
    user: "",
};

const getErrorMessage = (error: unknown): string => {
    if (isAxiosError(error)) {
        if (error.response?.status === 404) return "Пользователь не найден";
        if (error.response?.status === 403) {
            return "Превышен лимит запросов GitHub API. Попробуйте позже";
        }
        if (!error.response) return "Нет соединения с сервером";
    }
    return "Не удалось загрузить данные";
};

export const fetchRepos = createAsyncThunk<
    Repo[],
    { user: string; page: number },
    { rejectValue: string }
>("repos/fetchRepos", async ({ user, page }, { rejectWithValue, signal }) => {
    try {
        const response = await axios.get<Repo[]>(
            `https://api.github.com/users/${encodeURIComponent(user)}/repos`,
            { params: { per_page: PER_PAGE, page, sort: "updated" }, signal }
        );
        return response.data;
    } catch (error) {
        return rejectWithValue(getErrorMessage(error));
    }
});

const reposSlice = createSlice({
    name: "repos",
    initialState,
    reducers: {
        setUser(_state, action: PayloadAction<string>) {
            return { ...initialState, user: action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                // игнорируем устаревший ответ, если пользователь уже сменил запрос
                if (action.meta.arg.user !== state.user) return;
                state.isLoading = false;
                state.repos.push(...action.payload);
                state.hasMore = action.payload.length === PER_PAGE;
                state.page = action.meta.arg.page + 1;
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                if (action.meta.arg.user !== state.user) return;
                state.isLoading = false;
                state.hasMore = false;
                state.error = action.payload ?? "Не удалось загрузить данные";
            });
    },
});

export const { setUser } = reposSlice.actions;
export default reposSlice.reducer;
