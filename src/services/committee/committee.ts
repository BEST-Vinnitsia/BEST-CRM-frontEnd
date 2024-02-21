import { axios } from '../../utils';

import {
    ICommitteeCreateRes,
    ICommitteeDeleteArrayRes,
    ICommitteeDeleteRes,
    ICommitteeGetByIdRes,
    ICommitteeGetListRes,
    ICommitteeUpdateRes,
} from '../../interfaces/committee/committeeRes';
import { API } from '../../constants';
import {
    ICommitteeCreateReq,
    ICommitteeDeleteArrayReq,
    ICommitteeDeleteReq,
    ICommitteeGetByIdReq,
    ICommitteeUpdateReq,
} from '../../interfaces/committee/committeeReq';

class CommitteeService {
    root: string = 'committee';

    getList = () => {
        return new Promise<ICommitteeGetListRes[]>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}/list`)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    getById = ({ id }: ICommitteeGetByIdReq) => {
        return new Promise<ICommitteeGetByIdRes>((resolve, reject) => {
            axios
                .get(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- POST ---------- */
    create = (data: ICommitteeCreateReq) => {
        return new Promise<ICommitteeCreateRes>((resolve, reject) => {
            axios
                .post(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- PUT ---------- */
    update = (data: ICommitteeUpdateReq) => {
        return new Promise<ICommitteeUpdateRes>((resolve, reject) => {
            axios
                .put(`${API}/${this.root}`, data)
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    /* --------- DELETE ---------- */
    delete = ({ id }: ICommitteeDeleteReq) => {
        return new Promise<ICommitteeDeleteRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}`, { params: { id } })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };

    deleteArray = (data: ICommitteeDeleteArrayReq) => {
        return new Promise<ICommitteeDeleteArrayRes>((resolve, reject) => {
            axios
                .delete(`${API}/${this.root}/delete-array`, { data })
                .then((response) => response.data && resolve(response.data))
                .catch((error) => reject(error));
        });
    };
}

export const committeeService = new CommitteeService();
