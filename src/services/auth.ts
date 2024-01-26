import axios from '../utils/axios';
import { API } from '../constants/api';
import { ILogin, ILoginRes, IRefresh } from '../interfaces/services/auth';

class AuthService {
    root: string;

    constructor() {
        this.root = 'auth';
    }

    private path(route: string) {
        return `${API}/${this.root}/${route}`;
    }

    //
    login = (data: ILogin) => {
        return new Promise<ILoginRes>((resolve, reject) => {
            axios
                .post(this.path('login'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    //
    refresh = () => {
        return new Promise<IRefresh>((resolve, reject) => {
            axios
                .post(this.path('refresh'))
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const authService = new AuthService();
