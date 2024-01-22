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
        setUserName(state, action) {
            state.name = action.payload;
        },
    },
});

export default slice;
