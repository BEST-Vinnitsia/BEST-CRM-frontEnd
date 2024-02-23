import { axios } from '../utils';
import {
    ICadenceCreateRes,
    ICadenceDeleteArrayRes,
    ICadenceDeleteRes,
    ICadenceGetByIdRes,
    ICadenceGetListRes,
    ICadenceUpdateRes,
} from '../interfaces/cadence/cadenceRes';
import {
    ICadenceCreateReq,
    ICadenceDeleteArrayReq,
    ICadenceDeleteReq,
    ICadenceGetByIdReq,
    ICadenceUpdateReq,
} from '../interfaces/cadence/cadenceReq';
import { API } from '../constants';

class CadenceService {
    root: string = 'cadence';

    /* --------- GET ---------- */
    getList = () => {
        return new Promise<ICadenceGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICadenceGetByIdReq) => {
        return new Promise<ICadenceGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICadenceCreateReq) => {
        return new Promise<ICadenceCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICadenceUpdateReq) => {
        return new Promise<ICadenceUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = (data: ICadenceDeleteReq) => {
        return new Promise<ICadenceDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: ICadenceDeleteArrayReq) => {
        return new Promise<ICadenceDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const cadenceService = new CadenceService();
