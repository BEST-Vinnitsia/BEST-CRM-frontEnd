import { createSlice } from '@reduxjs/toolkit';
import { IUtilsStore } from '../../interfaces/store.interface';

const initialState: IUtilsStore = {
    isLoading: false,
    error: null,
    windowSize: null,
};

const slice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        updateWindowSize(state, action) {
            state.windowSize = action.payload;
        },
    },
});

export default slice;
