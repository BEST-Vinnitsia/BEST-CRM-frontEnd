import { createSlice } from '@reduxjs/toolkit';
import { IUtilsStore } from '../../interfaces/store.interface';

const initialState: IUtilsStore = {
    isLoading: false,
    message: [],
    windowSize: null,
};

const slice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        updateWindowSize(state, action) {
            state.windowSize = action.payload;
        },

        addMessage(state, action) {
            state.message = state.message.concat(action.payload);
        },

        deleteMessage(state, action) {
            state.message = state.message.filter((item, i) => i !== action.payload);
        },
    },
});

export default slice;
