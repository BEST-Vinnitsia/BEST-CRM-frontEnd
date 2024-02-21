import { axios } from '../../utils';
import {
    ICoordinatorCreateRes,
    ICoordinatorDeleteArrayRes,
    ICoordinatorDeleteRes,
    ICoordinatorGetByIdRes,
    ICoordinatorGetListRes,
    ICoordinatorUpdateRes,
} from '../../interfaces/coordinator/coordinatorRes';
import { API } from '../../constants';
import {
    ICoordinatorCreateReq,
    ICoordinatorDeleteArrayReq,
    ICoordinatorDeleteReq,
    ICoordinatorGetByIdReq,
    ICoordinatorUpdateReq,
} from '../../interfaces/coordinator/coordinatorReq';

class CoordinatorService {
    root: string = 'coordinator';

    getList = () => {
        return new Promise<ICoordinatorGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICoordinatorGetByIdReq) => {
        return new Promise<ICoordinatorGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICoordinatorCreateReq) => {
        return new Promise<ICoordinatorCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICoordinatorUpdateReq) => {
        return new Promise<ICoordinatorUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = ({ id }: ICoordinatorDeleteReq) => {
        return new Promise<ICoordinatorDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: ICoordinatorDeleteArrayReq) => {
        return new Promise<ICoordinatorDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const coordinatorService = new CoordinatorService();
