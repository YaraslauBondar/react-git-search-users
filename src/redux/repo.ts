import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ReposState } from "../interface/repo.interface.ts";

const initialState: ReposState = {
    repos: [],
    isLoading: false,
    error: null,
    page: 1,
    user: "",
};

export const fetchRepos = createAsyncThunk(
    "repos/fetchRepos",
    async ({ user, page }: { user: string; page: number }) => {
        const response = await axios.get(
            `https://api.github.com/users/${user}/repos?per_page=20&page=${page}`
        );
        return response.data;
    }
);

const reposSlice = createSlice({
    name: "repos",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<string>) {
            state.user = action.payload;
            state.repos = [];
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepos.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRepos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.repos = [...state.repos, ...action.payload];
                state.page += 1;
            })
            .addCase(fetchRepos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
            });
    },
});

export const { setUser } = reposSlice.actions;
export default reposSlice.reducer;
