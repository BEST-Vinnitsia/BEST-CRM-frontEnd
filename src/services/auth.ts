import { axios } from '../utils';
import { API } from '../constants';
import { ILogin, ILoginRes, IRefresh } from '../interfaces/services/auth';

class AuthService {
    root: string = 'auth';

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
