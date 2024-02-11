import { axios } from '../../utils';
import {
    IMember,
    IMemberCreate,
    IMemberDeleteArray,
    IMemberGetId,
    IMemberUpdate,
} from '../../interfaces/member/member';

class MemberService {
    root: string = 'member';

    private path(route: string) {
        return `${process.env.REACT_APP_API_URL}/${this.root}/${route}`;
    }

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<IMember[]>((resolve, reject) => {
            axios
                .get(this.path('list'))
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: IMemberGetId) => {
        return new Promise<IMember>((resolve, reject) => {
            axios
                .get(this.path('by-id'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: IMemberCreate) => {
        return new Promise((resolve, reject) => {
            axios
                .post(this.path('create'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: IMemberUpdate) => {
        return new Promise((resolve, reject) => {
            axios
                .put(this.path('update'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    deleteMany = (data: IMemberDeleteArray) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(this.path('delete'), { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const memberService = new MemberService();
