import { axios } from '../../utils';
import {
    ICoordinatorToMember,
    ICoordinatorToMemberCreate,
    ICoordinatorToMemberDeleteArray,
    ICoordinatorToMemberGetById,
    ICoordinatorToMemberUpdate,
} from '../../interfaces/coordinator/coordinatorToMember';

class CoordinatorToMemberService {
    root: string = 'coordinator-to-member';

    private path(route: string) {
        return `${process.env.REACT_APP_API_URL}/${this.root}/${route}`;
    }

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<ICoordinatorToMember[]>((resolve, reject) => {
            axios
                .get(this.path('list'))
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICoordinatorToMemberGetById) => {
        return new Promise<ICoordinatorToMember>((resolve, reject) => {
            axios
                .get(this.path('by-id'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICoordinatorToMemberCreate) => {
        return new Promise<ICoordinatorToMember>((resolve, reject) => {
            axios
                .post(this.path('create'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICoordinatorToMemberUpdate) => {
        return new Promise<ICoordinatorToMember>((resolve, reject) => {
            axios
                .put(this.path('update'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    deleteMany = (data: ICoordinatorToMemberDeleteArray) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(this.path('delete'), { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const coordinatorToMemberService = new CoordinatorToMemberService();
