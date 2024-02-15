import { axios } from '../../utils';
import {
    ICoordinator,
    ICoordinatorCreate,
    ICoordinatorDeleteArray,
    ICoordinatorGetById,
    ICoordinatorUpdate,
} from '../../interfaces/coordinator/coordinator';
import { ICoordinatorAllInfo } from '../../interfaces/coordinator/coordinatorAllInfo';

class CoordinatorService {
    root: string = 'coordinator';

    private path(route: string) {
        return `${process.env.REACT_APP_API_URL}/${this.root}/${route}`;
    }

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<ICoordinator[]>((resolve, reject) => {
            axios
                .get(this.path('list'))
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICoordinatorGetById) => {
        return new Promise<ICoordinator>((resolve, reject) => {
            axios
                .get(this.path('by-id'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getByIdAllInfo = ({ id }: ICoordinatorGetById) => {
        return new Promise<ICoordinatorAllInfo>((resolve, reject) => {
            axios
                .get(this.path('by-id-all-info'), { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICoordinatorCreate) => {
        return new Promise<ICoordinator>((resolve, reject) => {
            axios
                .post(this.path('create'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICoordinatorUpdate) => {
        return new Promise<ICoordinator>((resolve, reject) => {
            axios
                .put(this.path('update'), data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    deleteMany = (data: ICoordinatorDeleteArray) => {
        return new Promise((resolve, reject) => {
            axios
                .delete(this.path('delete'), { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const coordinatorService = new CoordinatorService();
