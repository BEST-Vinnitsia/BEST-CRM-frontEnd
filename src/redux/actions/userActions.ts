import { dispatch } from '../store';
import slice from '../slices/userSlice';

class UserActions {
    // token
    setAccessToken(accessToken: string) {
        dispatch(slice.actions.setAccessToken(accessToken));
    }

    setRefreshToken(refreshToken: string) {
        dispatch(slice.actions.setRefreshToken(refreshToken));
    }

    //
    setName(name: string) {
        dispatch(slice.actions.setName(name));
    }

    setClaims(claims: string[]) {
        dispatch(slice.actions.setClaims(claims));
    }

    //
    logout() {
        dispatch(slice.actions.logout());
    }
}

export const userActions = new UserActions();
