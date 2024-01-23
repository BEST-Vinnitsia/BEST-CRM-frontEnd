import { createSlice } from '@reduxjs/toolkit';
import { IUserStore } from '../../interfaces/store';

const initialState: IUserStore = {
    name: null,
    claims: [],
    token: {
        access: null,
        refresh: null,
    },
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // token
        setAccessToken(state, action) {
            state.token.access = action.payload;
        },

        setRefreshToken(state, action) {
            state.token.refresh = action.payload;
        },

        //
        setName(state, action) {
            state.name = action.payload;
        },

        setClaims(state, action) {
            state.claims = action.payload;
        },

        //
        logout(state) {
            state.name = null;
            state.claims = [];
            state.token = {
                access: null,
                refresh: null,
            };
        },
    },
});

export default slice;
