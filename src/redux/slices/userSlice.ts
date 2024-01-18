import { createSlice } from '@reduxjs/toolkit';
import { IUserStore } from '../../interfaces/store.interface';

const initialState: IUserStore = {
    name: null,
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
