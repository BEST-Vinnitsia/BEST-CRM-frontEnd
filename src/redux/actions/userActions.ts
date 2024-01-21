import { dispatch } from '../store';
import slice from '../slices/userSlice';

import { IUserStore } from '../../interfaces/store';

class UserActions {
    myAccount({ name }: IUserStore) {
        dispatch(slice.actions.setUserName(name));
    }
}

export const userActions = new UserActions();
