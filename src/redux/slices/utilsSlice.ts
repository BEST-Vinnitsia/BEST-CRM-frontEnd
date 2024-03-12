import { createSlice } from '@reduxjs/toolkit';
import { IUtilsStore } from '../../interfaces/redux/store';

const initialState: IUtilsStore = {
    isLoading: false,
    isLoadingApp: false,
    message: [],
    windowSize: null,
    smallSidebar: false,
};

const slice = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        // loading
        loading(state, action) {
            state.isLoading = action.payload;
        },

        // loading app
        loadingApp(state, action) {
            state.isLoadingApp = action.payload;
        },

        // window size
        updateWindowSize(state, action) {
            state.windowSize = action.payload;
        },

        // message
        addMessage(state, action) {
            state.message = state.message.concat(action.payload);
        },

        deleteMessage(state, action) {
            state.message = state.message.filter((item) => item.id !== action.payload);
        },

        // sidebar
        smaleSidebar(state, action) {
            state.smallSidebar = action.payload;
        },
    },
});

export default slice;
