import { axios } from '../utils';
import { userActions } from '../redux/actions/userActions';
import { IUserStoreToken } from '../interfaces/redux/store';
import { authService } from '../services/auth';
import { jwtDecode } from 'jwt-decode';
import { IToken } from '../interfaces/auth/token';

class Session {
    private accessToken: string | null;
    private refreshToken: string | null;
    private expireTimer: NodeJS.Timeout | null;

    constructor() {
        this.accessToken = null;
        this.refreshToken = null;
        this.expireTimer = null;
    }

    //
    private async updateAccessToken(refresh: string) {
        axios.defaults.headers.common.Authorization = `Bearer ${refresh}`;
        const newAccess = await authService.refresh();
        delete axios.defaults.headers.common.Authorization;

        userActions.setAccessToken(newAccess.access);
        return newAccess.access;
    }

    //
    public async restoreSession({ access, refresh }: IUserStoreToken) {
        if (this.expireTimer) clearTimeout(this.expireTimer);

        if (!refresh || this.checkTokenOnExp(refresh)) {
            this.closeSession();
        } else if (access && !this.checkTokenOnExp(access)) {
            this.accessToken = access;
            this.refreshToken = refresh;
            axios.defaults.headers.common.Authorization = access;
            this.setTimer();
        } else {
            const newToken = await this.updateAccessToken(refresh);
            this.accessToken = newToken;
            this.refreshToken = refresh;
            axios.defaults.headers.common.Authorization = newToken;
            this.setTimer();
        }
    }

    //
    public closeSession() {
        if (this.expireTimer) clearTimeout(this.expireTimer);
        delete axios.defaults.headers.common.Authorization;
        userActions.logout();
    }

    //
    private setTimer() {
        if (!this.accessToken) return;
        if (this.expireTimer) clearTimeout(this.expireTimer);

        const sessionTime = this.getExpTime(this.accessToken);

        this.expireTimer = setTimeout(() => {
            this.restoreSession({ access: this.accessToken, refresh: this.refreshToken });
        }, sessionTime);
    }

    //
    //
    //

    private checkTokenOnExp = (token: string | null): boolean => {
        try {
            if (!token) return true;

            const currentTime = Date.now();
            const tokenDecode = jwtDecode(token) as IToken;
            const expTokenDate = tokenDecode.exp * 1000;

            return expTokenDate < currentTime;
        } catch (error) {
            return true;
        }
    };

    private getExpTime = (token: string | null): number => {
        try {
            if (!token) return 0;

            const currentTime = Date.now();
            const tokenDecode = jwtDecode(token) as IToken;
            const expTokenDate = tokenDecode.exp * 1000;
            const sessionTime = expTokenDate - currentTime;

            return sessionTime;
        } catch (error) {
            return 0;
        }
    };
}

export const session = new Session();
