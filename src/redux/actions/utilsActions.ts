import { dispatch } from '../store';
import slice from '../slices/utilsSlice';

class UtilsActions {
    public updateWindowSize(windowSize: { width: number; height: number }) {
        dispatch(slice.actions.updateWindowSize(windowSize));
    }
}

export const utilsActions = new UtilsActions();
