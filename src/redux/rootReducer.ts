import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// slices
import userSlice from './slices/userSlice';
import utilsSlice from './slices/utilsSlice';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const userPersistConfig = {
    key: 'user',
    storage,
    keyPrefix: 'redux-',
    whitelist: ['name', 'claims', 'token'],
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userSlice.reducer),
    utils: utilsSlice.reducer,
});

// ----------------------------------------------------------------------

export { rootPersistConfig, rootReducer };
